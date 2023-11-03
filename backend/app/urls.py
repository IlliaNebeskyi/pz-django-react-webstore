from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # add your app urls here
    # path('myapp/', include('myapp.urls')),
]