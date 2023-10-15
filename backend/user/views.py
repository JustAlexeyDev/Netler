from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    if user.avatar:
        return Response({
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'avatar': user.avatar.url,
        })
    else:
        return Response({
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'avatar': None,
        })