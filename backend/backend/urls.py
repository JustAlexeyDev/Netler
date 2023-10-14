"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

import post.views as post_view
import user.views as user_view

router = routers.DefaultRouter()
router.register(r"posts", post_view.PostViewSet)
router.register(r"posts_files", post_view.PostFileViewSet)
router.register(r"comments", post_view.CommentViewSet)
router.register(r"users", user_view.UserViewset)

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('', include(router.urls)),
    path('get_user/', user_view.get_user)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
