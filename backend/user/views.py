from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from post.serializers import PostSerializer

from .models import User
from .serializers import UserSerializer
from chat.serializers import RoomSerializer

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['GET'])
    def subscriptions(self, request, pk=None):
        queryset = User.objects.filter(subscribers=pk)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['GET'])
    def subscribers(self, request, pk=None):
        queryset = User.objects.get(pk=pk).subscribers.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['GET'])
    def friends(self, request, pk=None):
        queryset = User.objects.get(pk=pk).friends.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['GET'])
    def rooms(self, request, pk=None):
        queryset = User.objects.get(pk=pk).rooms.all()
        serializer = RoomSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['GET'])
    def posts(self, request, pk=None):
        queryset = User.objects.get(pk=pk).posts.all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['POST'])
    def subscribe(self, request, pk=None):
        user = self.get_object()
        user.toggle_subscription(request.user)
        return Response({'status': 'success'})

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_user(request):
    user = request.user
    
    if user.avatar:
        avatar = user.avatar.url
    else:
        avatar = None

    if user.banner:
        banner = user.banner.url
    else:
        banner = None
    
    return Response({
        'id': user.id,
        'email': user.email,
        'username': user.username,
        'avatar': avatar,
        'banner': banner,
    })

@api_view(['POST'])
def update_profile(request):
    user = request.user
    new_banner = request.FILES.get('banner')
    new_avatar = request.FILES.get('avatar')

    if new_banner:
        user.banner = new_banner
    if new_avatar:
        user.avatar = new_avatar

    user.save()

    return Response(UserSerializer(user).data)