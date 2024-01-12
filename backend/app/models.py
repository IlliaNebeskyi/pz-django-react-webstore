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
        user.is_admin = True
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
    is_admin = models.BooleanField(default=False)


class Auction(models.Model):
    """
        Stores a single auction entry, related to :model:`models.Seller`.
    """
    class Type(models.TextChoices):
        DEFAULT = 'DE', _('default')
        BIDDING = 'BI', _('bidding')

    class Status(models.TextChoices):
        ACTIVE = 'AC', _('active')
        CANCELED = 'CC', _('canceled')
        FINISHED = 'FI', _('finished')
        NO_OFFERS = 'NO', _('no offers')
        OBSOLETED = 'OB', _('obsoleted')

    type = models.CharField(
        max_length=2,
        choices=Type.choices,
        default=Type.DEFAULT
    )

    title = models.CharField(_('title'), max_length=63)
    body = models.CharField(_('body'), max_length=1023)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(_('created at'), auto_now_add=True)
    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.ACTIVE
    )
    price = models.DecimalField(_('price'), max_digits=10, decimal_places=2)


class Order(models.Model):
    """
        Stores a single order entry, related to :model:`models.Auction and :model:`models.User`.
    """
    class Status(models.TextChoices):
        NEW = 'NE', _('new')
        PAID = 'PA', _('paid')
        SENT = 'SE', _('sent')
        DONE = 'DO', _('done')

    buyer = models.ForeignKey(User, on_delete=models.CASCADE)
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)
    created = models.DateTimeField(_('created at'), auto_now_add=True)
    status = models.CharField(
        _('status'),
        max_length=2,
        choices=Status.choices,
        default=Status.NEW
    )


class Bid(models.Model):
    """
        Stores a single bid entry, related to :model:`models.Auction and :model:`models.User`.
    """
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)
    bidder = models.ForeignKey(User, on_delete=models.CASCADE)
    value = models.DecimalField(_('value'), max_digits=10, decimal_places=2)
    created = models.DateTimeField(_('created at'), auto_now_add=True)


class Message(models.Model):
    """
        Stores a single message entry, related to :model:`models.Blog`.
    """
    class Sender(models.TextChoices):
        BUYER = 'BU', _('buyer')
        SELLER = 'SE', _('seller')

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    sender = models.CharField(
        _('sender'),
        max_length=2,
        choices=Sender.choices,
        default=Sender.BUYER
    )
    message = models.CharField(_('message'), max_length=255)
    created = models.DateTimeField(_('created at'), auto_now_add=True)
