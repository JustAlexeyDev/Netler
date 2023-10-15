from rest_framework import serializers

from .models import User

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "avatar")

class UserSerializer(serializers.ModelSerializer):
    subscribers = serializers.SerializerMethodField()

    def get_subscribers(self, obj):
        queryset = User.objects.filter(subscriptions=obj.pk)
        serializer = SubscriberSerializer(queryset, many=True)
        return serializer.data

    class Meta:
        model = User
        fields = ("id", "username", "avatar", "friends", "subscribers")