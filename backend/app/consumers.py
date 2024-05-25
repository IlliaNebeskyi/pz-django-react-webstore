import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.core.exceptions import PermissionDenied
from .models import Chat, Message, Auction

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.auction_id = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.auction_id}'
        self.user = self.scope['user']

        # Ensure the user is authenticated
        if not self.user.is_authenticated:
            await self.close()
            raise PermissionDenied("User is not authenticated")

        # Fetch the auction asynchronously
        self.auction = await self.get_auction(self.auction_id)

        # Check if the user is part of the chat
        is_client = await self.is_client()
        auction_seller = await self.get_auction_seller()

        if self.user != auction_seller and not is_client:
            await self.close()
            raise PermissionDenied("User is not part of this chat")

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        print(f"WebSocket connection opened for auction {self.auction_id} by user {self.user.username}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print(f"WebSocket connection closed for auction {self.auction_id}")

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        client_id = text_data_json.get('client_id')

        print(f"Message received: {message} from user {self.user.username}")

        # Validate message and client_id
        if not message:
            await self.send_error("Message text is required")
            return
        if self.user == await self.get_auction_seller() and not client_id:
            await self.send_error("Client ID is required for the seller to reply")
            return

        # Get or create the chat
        if self.user != await self.get_auction_seller():
            chat, _ = await self.get_or_create_chat(self.auction, self.user)
        else:
            try:
                client = await self.get_user(client_id)
                chat = await self.get_chat(self.auction, client)
            except User.DoesNotExist:
                await self.send_error("Client not found")
                return
            except Chat.DoesNotExist:
                await self.send_error("Chat not found")
                return

        # Save the message to the database
        message_instance = await self.create_message(chat, self.user, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': self.user.username,
                'created': str(message_instance.created)
            }
        )

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        created = event['created']

        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender,
            'created': created
        }))

    @database_sync_to_async
    def get_auction(self, auction_id):
        return Auction.objects.get(pk=auction_id)

    @database_sync_to_async
    def is_client(self):
        return Chat.objects.filter(auction=self.auction, client=self.user).exists()

    @database_sync_to_async
    def get_or_create_chat(self, auction, client):
        return Chat.objects.get_or_create(auction=auction, client=client)

    @database_sync_to_async
    def get_user(self, user_id):
        return User.objects.get(pk=user_id)

    @database_sync_to_async
    def get_chat(self, auction, client):
        return Chat.objects.get(auction=auction, client=client)

    @database_sync_to_async
    def create_message(self, chat, sender, message):
        return Message.objects.create(chat=chat, sender=sender, message=message)

    @database_sync_to_async
    def get_auction_seller(self):
        return self.auction.seller

    async def send_error(self, error_message):
        await self.send(text_data=json.dumps({
            'error': error_message
        }))
