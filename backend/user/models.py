from django.db import models
from django.contrib.auth.models import AbstractUser

# from .serializers import UserSerializer

class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', blank=False)
    friends = models.ManyToManyField("User", blank=True, related_name="user_friends")
    subscriptions = models.ManyToManyField("User", blank=True, related_name="user_subscriptions")
    REQUIRED_FIELDS = ["email", "password", "avatar"]

    # @property
    # def subscribers(self):
    #     queryset = User.objects.filter(subscriptions=self.pk)
    #     serializer = UserSerializer(queryset, many=True)
    #     return serializer.data