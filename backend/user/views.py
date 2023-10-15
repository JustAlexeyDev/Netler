from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['GET'])
    def subscribers(self, request, pk=None):
        queryset = User.objects.filter(subscriptions=pk)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['GET'])
    def friends(self, request, pk=None):
        queryset = User.objects.get(pk=pk).friends.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    
    if user.avatar.url:
        avatar = user.avatar.url
    else:
        avatar = None

    if user.banner.url:
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