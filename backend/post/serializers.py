from rest_framework import serializers

from .models import Post, PostFile, Comment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("__all__")

class PostFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostFile
        fields = ("__all__")

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("__all__")
        