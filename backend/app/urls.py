from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from app import views


router = routers.DefaultRouter()
router.register(r'stats', views.ServerStatView, 'stat')
router.register(r'users', views.UserView, 'user')
router.register(r'auctions', views.AuctionView, 'auction')
router.register(r'orders', views.OrderView, 'order')
router.register(r'bids', views.BidView, 'bid')
router.register(r'messages', views.MessageView, 'message')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
