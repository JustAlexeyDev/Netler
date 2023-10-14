from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    avatar = models.ImageField(upload_to='media/avatars/', blank=False)
    REQUIRED_FIELDS = ["email", "password", "avatar"]