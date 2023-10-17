from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    banner = models.ImageField(upload_to='banners/', blank=True)
    friends = models.ManyToManyField("User", blank=True, related_name="user_friends")
    subscriptions = models.ManyToManyField("User", blank=True, related_name="user_subscriptions")
    is_verificated = models.BooleanField(default=False)
    REQUIRED_FIELDS = ["email", "password", "avatar"]