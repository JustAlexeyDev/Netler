from django.contrib import admin
from .models import Post, PostFile, Comment

admin.site.register(Post)
admin.site.register(PostFile)
admin.site.register(Comment)