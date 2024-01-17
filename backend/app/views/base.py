from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

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


# class BuyView(APIView):
#     def put(self, request):
#         auction_id = request.data['auction_id']
#         buyer_id = request.data['buyer_id']
#
#         auction = models.Auction.objects.get(auction_id=auction_id)
#         buyer = models.Auction.objects.get(auction_id=buyer_id)
#         auction.status = 'FI'
#         auction.buyer = buyer
#
#         auction.save()
#
#         return Response({'msg': 'Invalid Credentials'}, status=status.HTTP_201_CREATED)
