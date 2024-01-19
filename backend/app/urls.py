from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from app.views.user_creation import RegistrationView, LoginView, LogoutView, ChangePasswordView
from app.views.base import ServerStatView, UserView, AuctionView, ChatView, MessageView  # , BuyView
from app.views.auction import AddAuctionView, EditAuctionView, BuyView
from app.views.chat import ListChatsView, ListChatMessagesView, SendMessageView


router = routers.DefaultRouter()
router.register(r'stats', ServerStatView, 'stat')
router.register(r'users', UserView, 'user')
router.register(r'auctions', AuctionView, 'auction')
router.register(r'chats', ChatView, 'chat')
router.register(r'messages', MessageView, 'message')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register', RegistrationView.as_view(), name='register'),
    path('api/login', LoginView.as_view(), name='login'),
    path('api/logout', LogoutView.as_view(), name='logout'),
    path('api/change-password', ChangePasswordView.as_view(), name='change-password'),
    path('api/token-refresh', jwt_views.TokenRefreshView.as_view(), name='token-refresh'),
    path('api/auctions/buy/<int:auction_id>', BuyView.as_view(), name='buy'),
    path('api/auctions/add-auction', AddAuctionView.as_view(), name='add-auction'),
    path('api/auctions/edit-auction/<int:auction_id>/', EditAuctionView.as_view(), name='edit-auction'),
    path('api/chats/', ListChatsView.as_view(), name='list-chats'),
    path('api/chats/auctions/<int:auction_id>/', ListChatMessagesView.as_view(), name='list-chat-messages'),
    path('api/chats/auctions/<int:auction_id>/send-message/', SendMessageView.as_view(), name='send-message'),
    path('api/', include(router.urls)),
]
