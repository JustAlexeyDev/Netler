from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    banner = models.ImageField(upload_to='banners/', blank=True)
    friends = models.ManyToManyField("User", blank=True, related_name="user_friends")
    subscribers = models.ManyToManyField("User", blank=True)
    is_verificated = models.BooleanField(default=False)
    REQUIRED_FIELDS = ["email", "password", "avatar"]

    def toggle_subscription(self, user):
        if user in self.subscribers.all():
            self.subscribers.remove(user)
            if user in self.friends.all():
                self.friends.remove(user)
                user.friends.remove(self)
        else:
            self.subscribers.add(user)
            if self in user.subscribers.all():
                self.friends.add(user)
                user.friends.add(self)