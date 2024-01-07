from rest_framework import serializers
from app import models


class ServerStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ServerStat
        fields = ('id', 'name', 'value')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'email', 'city', 'street', 'street_number', 'bank_number')


class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Auction
        fields = ('id', 'title', 'body', 'seller', 'created', 'status', 'price')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ('id', 'buyer', 'auction', 'created', 'created', 'status')


class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bid
        fields = ('id', 'auction', 'bidder', 'value', 'created')


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Message
        fields = ('id', 'order', 'sender', 'message', 'created')
