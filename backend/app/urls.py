from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from app.views.user_creation import RegistrationView, LoginView, LogoutView, ChangePasswordView
from app.views.base import ServerStatView, UserView, AuctionView, OrderView, BidView, MessageView


router = routers.DefaultRouter()
router.register(r'stats', ServerStatView, 'stat')
router.register(r'users', UserView, 'user')
router.register(r'auctions', AuctionView, 'auction')
router.register(r'orders', OrderView, 'order')
router.register(r'bids', BidView, 'bid')
router.register(r'messages', MessageView, 'message')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register', RegistrationView.as_view(), name='register'),
    path('api/login', LoginView.as_view(), name='login'),
    path('api/logout', LogoutView.as_view(), name='logout'),
    path('api/change-password', ChangePasswordView.as_view(), name='change-password'),
    path('api/token-refresh', jwt_views.TokenRefreshView.as_view(), name='token-refresh'),
    path('api/', include(router.urls)),
]
