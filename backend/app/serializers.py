from rest_framework import serializers
from app import models

from app import logs

log = logs.setup_logging(__name__)


class ServerStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ServerStat
        fields = ('id', 'name', 'value')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'username', 'email', 'city', 'street', 'street_number', 'bank_number')


class AuctionSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.username', read_only=True)

    class Meta:
        model = models.Auction
        fields = ('id', 'title', 'body', 'seller', 'buyer', 'status', 'price', 'created', 'seller_name')


class ChatSerializer(serializers.ModelSerializer):
    auction_title = serializers.CharField(source='auction.title', read_only=True)
    client_name = serializers.CharField(source='client.username', read_only=True)

    class Meta:
        model = models.Chat
        fields = ('id', 'auction', 'client', 'auction_title', 'client_name')


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)

    class Meta:
        model = models.Message
        fields = ('id', 'chat', 'sender', 'message', 'created', 'sender_name')


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = models.User
        fields = ['username', 'email', 'city', 'street', 'street_number', 'bank_number', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = models.User(username=self.validated_data['username'],
                           email=self.validated_data['email'],
                           city=self.validated_data['city'],
                           street=self.validated_data['street'],
                           street_number=self.validated_data['street_number'],
                           bank_number=self.validated_data['bank_number']
                           )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={"input_type": "password"}, required=True)
    new_password = serializers.CharField(style={"input_type": "password"}, required=True)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError({'current_password': 'Does not match'})
        return value
