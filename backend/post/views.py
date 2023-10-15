from rest_framework import viewsets
from rest_framework.decorators import action, permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import *
from .serializers import *

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, methods=['post'])
    @permission_classes([IsAuthenticated])
    def like(self, request, pk=None):
        post = self.get_object()
        post.toggle_like(request.user)
        return Response({'status': 'success'})

@api_view(['POST'])
def create_post(request):
    user = request.user
    post = Post(author=user, description=request.data['description'])
    post.save()

    files = request.FILES.getlist('files')

    for file in files:
        post_file = PostFile(post=post, file=file)
        post_file.save()

    return Response({'id': post.id})

class PostFileViewSet(viewsets.ModelViewSet):
    queryset = PostFile.objects.all()
    serializer_class = PostFileSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer