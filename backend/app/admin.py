from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
from django import forms

import app.models as models


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = models.User
        fields = ('username', 'email', 'city', 'street', 'street_number', 'bank_number')

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = models.User
        fields = ('email', 'password', 'city', 'street', 'street_number', 'bank_number', 'is_staff')

    def clean_password(self):
        return self.initial["password"]


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('username', 'email', 'city', 'street', 'street_number', 'bank_number', 'is_staff')
    list_filter = ('is_staff', )
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal info', {'fields': ('city', 'street', 'street_number', 'bank_number')}),
        ('Permissions', {'fields': ('is_staff',)})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'city', 'street', 'street_number', 'bank_number', 'password1', 'password2'),
        }),
    )
    search_fields = ('username', 'email',)
    ordering = ('username',)
    filter_horizontal = ()


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Auction)
admin.site.register(models.Message)
admin.site.register(models.Chat)
admin.site.register(models.ServerStat)
