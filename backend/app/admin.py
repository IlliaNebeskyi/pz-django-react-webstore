from django.contrib import admin

import app.models as models

admin.site.register(models.Bid)
admin.site.register(models.User)
admin.site.register(models.Order)
admin.site.register(models.Auction)
admin.site.register(models.Message)
admin.site.register(models.ServerStat)
