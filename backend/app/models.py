"""
    DB models declaration.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class ServerStat(models.Model):
    """
        Stores a single server stat entry.
    """
    name = models.CharField(max_length=30)
    value = models.IntegerField()


class User(AbstractUser):
    """
        User model.
    """
    REQUIRED_FIELDS = ['email', 'username']
    
    city = models.CharField(_('city'), max_length=63)
    street = models.CharField(_('street'), max_length=63)
    street_number = models.CharField(_('street number'), max_length=63)
    bank_number = models.CharField(_('bank number'), max_length=63)


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
    seller = models.ForeignKey(_('seller'), User)
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

    buyer = models.ForeignKey(_('buyer'), User)
    auction = models.ForeignKey(_('auction'), Auction)
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
    auction = models.ForeignKey(_('auction'), Auction)
    bidder = models.ForeignKey(_('bidder'), User)
    value = models.DecimalField(_('value'), max_digits=10, decimal_places=2)
    created = models.DateTimeField(_('created at'), auto_now_add=True)


class Message(models.Model):
    """
        Stores a single message entry, related to :model:`models.Blog`.
    """
    class Sender(models.TextChoices):
        BUYER = 'BU', _('buyer')
        SELLER = 'SE', _('seller')

    order = models.ForeignKey(_('order'), Order)
    sender = models.CharField(
        _('sender'),
        max_length=2,
        choices=Sender.choices,
        default=Sender.BUYER
    )
    message = models.CharField(_('message'), max_length=255)
    created = models.DateTimeField(_('created at'), auto_now_add=True)
