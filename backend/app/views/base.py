from rest_framework import viewsets
from app import serializers
from app import models


class ServerStatView(viewsets.ModelViewSet):
    serializer_class = serializers.ServerStatSerializer
    queryset = models.ServerStat.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()


class AuctionView(viewsets.ModelViewSet):
    serializer_class = serializers.AuctionSerializer
    queryset = models.Auction.objects.all()


class ChatView(viewsets.ModelViewSet):
    serializer_class = serializers.ChatSerializer
    queryset = models.Chat.objects.all()


class MessageView(viewsets.ModelViewSet):
    serializer_class = serializers.MessageSerializer
    queryset = models.Message.objects.all()
