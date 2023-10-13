from rest_framework import serializers

from .models import Post, PostFile, Comment


class PostFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostFile
        fields = ("__all__")

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("id", "author", "post", "likes", "text", "post_date", "parent", "is_parent")
        
class PostSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(read_only=True)
    files = PostFileSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ("id", "author", "author_name", "avatar", "description", "likes", "publish_date", "files", "comments")
