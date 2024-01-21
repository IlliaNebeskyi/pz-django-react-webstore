from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from app import models
from app import serializers

from app.logs import setup_logging

log = setup_logging(__name__)


class ListChatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        client_chats = models.Chat.objects.filter(client=request.user)
        seller_chats = models.Chat.objects.filter(auction__seller=request.user)

        all_chats = (client_chats | seller_chats).distinct()

        serializer = serializers.ChatSerializer(all_chats, many=True)
        return Response(serializer.data)
        
# class ListAuctionChatsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, auction_id):
#         try:
#             auction = models.AddAuction.objects.get(pk=auction_id)

#             if request.user != auction.seller:
#                 return Response({'error': 'You are not the seller of this auction'}, status=403)

#             chats = models.Chat.objects.filter(auction=auction)
#             serializer = serializers.ChatSerializer(chats, many=True)
#             return Response(serializer.data)

#         except models.AddAuction.DoesNotExist:
#             return Response({'error': 'Auction not found'}, status=404)
#         except Exception as e:
#             return Response({'error': str(e)}, status=500)


class ListChatMessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, auction_id):
        try:
            auction = models.Auction.objects.get(pk=auction_id)

            if request.user == auction.seller:
                client_id = request.query_params.get('client_id')
                if not client_id:
                    return Response({'error': 'Client ID is required for sellers'}, status=400)
                
                try:
                    client = models.User.objects.get(pk=client_id)
                except models.User.DoesNotExist:
                    return Response({'error': 'Client not found'}, status=404)

                try:
                    chat = models.Chat.objects.get(auction=auction, client=client)
                except models.Chat.DoesNotExist:
                    return Response({'error': 'Chat not found'}, status=404)
            else:
                try:
                    chat, _ = models.Chat.objects.get_or_create(auction=auction, client=request.user)
                except models.Chat.DoesNotExist:
                    return Response({'error': 'Chat not found'}, status=404)

            messages = models.Message.objects.filter(chat=chat).order_by('created')
            serializer = serializers.MessageSerializer(messages, many=True)
            return Response(serializer.data)

        except models.Auction.DoesNotExist:
            return Response({'error': 'Auction not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)


class SendMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, auction_id):
        try:
            auction = models.Auction.objects.get(pk=auction_id)

            if request.user != auction.seller:
                chat, _ = models.Chat.objects.get_or_create(auction=auction, client=request.user)
            else:
                try:
                    client_id = request.data.get('client_id')
                    if not client_id:
                        return Response({'error': 'Client ID is required for the seller to reply'}, status=400)

                    client = models.User.objects.get(pk=client_id)
                    chat = models.Chat.objects.get(auction=auction, client=client)
                except models.User.DoesNotExist:
                    return Response({'error': 'Client not found'}, status=404)
                except models.Chat.DoesNotExist:
                    return Response({'error': 'Chat not found'}, status=404)

            message_text = request.data.get('message')
            if not message_text:
                return Response({'error': 'Message text is required'}, status=400)

            message = models.Message.objects.create(chat=chat, sender=request.user, message=message_text)
            return Response(serializers.MessageSerializer(message).data, status=201)

        except models.Auction.DoesNotExist:
            return Response({'error': 'Auction not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

