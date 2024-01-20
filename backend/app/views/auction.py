from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from app import models

from app.logs import setup_logging

log = setup_logging(__name__)

User = get_user_model()

used_permission_classes = [IsAuthenticated]


class BuyView(APIView):
    permission_classes = used_permission_classes

    def patch(self, request, auction_id):
        log.info(request.data)
        try:
            auction = models.Auction.objects.get(pk=auction_id)

            if auction.seller == request.user:
                return Response({'error': 'Seller cannot buy their own auction'}, status=status.HTTP_400_BAD_REQUEST)

            if auction.status != models.Auction.Status.ACTIVE:
                return Response({'error': 'AddAuction is not active'}, status=status.HTTP_400_BAD_REQUEST)

            with transaction.atomic():
                auction.status = models.Auction.Status.FINISHED
                auction.buyer = request.user
                auction.save()

            return Response({'message': 'AddAuction finished successfully'}, status=status.HTTP_200_OK)

        except models.Auction.DoesNotExist:
            return Response({'error': 'AddAuction not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class AddAuctionView(APIView):
    permission_classes = used_permission_classes

    def post(self, request):
        try:
            title = request.data['title']
            body = request.data['body']
            price = request.data['price']

            if not title or not body or not price:
                return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

            auction = models.Auction.objects.create(
                title=title,
                body=body,
                price=price,
                seller=request.user
            )

            return Response({'message': 'AddAuction created successfully', 'auction_id': auction.id}, status=status.HTTP_201_CREATED)

        except KeyError:
            return Response({'error': 'Invalid or missing data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            log.error(e)
            return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EditAuctionView(APIView):
    permission_classes = used_permission_classes

    def patch(self, request, auction_id):
        try:
            auction = models.Auction.objects.get(id=auction_id)

            if auction.seller.id != request.user.id:
                return Response({'error': 'You do not have permission to edit this auction'}, status=status.HTTP_403_FORBIDDEN)

            for field in ['title', 'body', 'price']:
                if field in request.data:
                    setattr(auction, field, request.data[field])
            auction.save()

            return Response({'message': 'AddAuction updated successfully'}, status=status.HTTP_200_OK)

        except models.Auction.DoesNotExist:
            return Response({'error': 'AddAuction not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            log.error(e)


class CancelAuctionView(APIView):
    permission_classes = used_permission_classes

    def patch(self, request, auction_id):
        try:
            auction = models.Auction.objects.get(id=auction_id)

            if auction.seller.id != request.user.id:
                return Response({'error': 'You do not have permission to cancel this auction'}, status=status.HTTP_403_FORBIDDEN)

            with transaction.atomic():
                auction.status = models.Auction.Status.CANCELED
                auction.save()

            return Response({'message': 'AddAuction canceled successfully'}, status=status.HTTP_200_OK)

        except models.Auction.DoesNotExist:
            return Response({'error': 'AddAuction not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            log.error(e)
