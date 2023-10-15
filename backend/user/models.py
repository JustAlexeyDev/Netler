from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', blank=False)
    friends = models.ManyToManyField("User", blank=True, related_name="user_friends")
    subscriptions = models.ManyToManyField("User", blank=True, related_name="user_subscriptions")
    REQUIRED_FIELDS = ["email", "password", "avatar"]