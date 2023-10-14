from rest_framework import serializers

from .models import Post, PostFile, Comment


class PostFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostFile
        fields = ("__all__")

class CommentSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    
    def get_children(self, obj):
        children_queryset = Comment.objects.filter(parent=obj.pk)
        serializer = CommentSerializer(children_queryset, many=True)
        return serializer.data

    class Meta:
        model = Comment
        fields = ("id", "author", "post", "likes", "text", "post_date", "parent", "is_parent", "children")
        
class PostSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(read_only=True)
    files = PostFileSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ("id", "author", "author_name", "avatar", "description", "likes", "views", "publish_date", "files", "comments")
