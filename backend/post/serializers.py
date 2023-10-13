from rest_framework import serializers

from .models import Post, PostFile, Comment

class PostSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField()
    class Meta:
        model = Post
        fields = ("author", "author_name", "avatar", "description", "likes", "publish_date", "files")

class PostFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostFile
        fields = ("__all__")

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("author", "post", "likes", "text", "post_date", "parent", "is_parent", "children")
        