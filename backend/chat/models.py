from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Room(models.Model):
    members = models.ManyToManyField(User, related_name='rooms')

    def __str__(self) -> str:
        return f"{self.id} | {list(self.members.all())}"

class Message(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, default=None, related_name="messages")
    text = models.CharField(max_length=2200)
    creation_time = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.id} | Room: {self.room.id} | {self.creation_time} | {self.text}"