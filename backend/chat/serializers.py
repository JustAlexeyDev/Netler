from rest_framework import serializers

from .models import *

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"

class RoomSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()

    def get_messages(self, obj):
        queryset = Room.objects.get(pk=obj.pk).messages.all()
        serializer = MessageSerializer(queryset, many=True)
        return serializer.data

    class Meta:
        model = Room
        fields = ("id", "members", "messages")