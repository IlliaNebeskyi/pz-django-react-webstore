"""
    DB models declaration.
"""

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class ServerStat(models.Model):
    """
        Stores a single server stat entry.
    """
    name = models.CharField(max_length=30)
    value = models.IntegerField()


class MyUserManager(BaseUserManager):
    def create_user(self, email, username, city, street, street_number, bank_number, password=None):
        """
        Creates and saves a User
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            city=city,
            street=street,
            street_number=street_number,
            bank_number=bank_number,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        """
        Creates and saves a superuser.
        """
        user = self.create_user(
            email,
            username,
            password=password,
            city=None,
            street=None,
            street_number=None,
            bank_number=None,
        )
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    """
        User model.
    """
    REQUIRED_FIELDS = ['email']
    
    city = models.CharField(_('city'), max_length=63)
    street = models.CharField(_('street'), max_length=63)
    street_number = models.CharField(_('street number'), max_length=63)
    bank_number = models.CharField(_('bank number'), max_length=63)


class Auction(models.Model):
    """
        Stores a single auction entry, related to :model:`models.Seller`.
    """

    class Status(models.TextChoices):
        ACTIVE = 'AC', _('active')
        CANCELED = 'CC', _('canceled')
        FINISHED = 'FI', _('finished')
        NO_OFFERS = 'NO', _('no offers')
        OBSOLETED = 'OB', _('obsoleted')

    title = models.CharField(_('title'), max_length=63)
    body = models.CharField(_('body'), max_length=1023)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_auctions')
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='auctions')
    created = models.DateTimeField(_('created at'), auto_now_add=True)
    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.ACTIVE
    )
    price = models.DecimalField(_('price'), max_digits=10, decimal_places=2)


class Chat(models.Model):
    """
        Identifies a single chat between the seller and potential buyer
    """
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)
    client = models.ForeignKey(User, on_delete=models.CASCADE)


class Message(models.Model):
    """
        Stores a single message entry, related to :model:`models.Chat`.
    """

    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(_('message'), max_length=255)
    created = models.DateTimeField(_('created at'), auto_now_add=True)
