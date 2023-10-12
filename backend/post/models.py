from django.utils import timezone
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=2200)
    likes = models.ManyToManyField(User, related_name="post_likes", blank=True)
    publish_date = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"{self.author} | {self.publish_date}"

class PostFile(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="files")
    file = models.FileField(upload_to="media/")

    def __str__(self) -> str:
        return f"{self.post}"

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name="comment_likes")
    text = models.CharField(max_length=2200)
    post_date = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self' , null=True , blank=True , on_delete=models.CASCADE , related_name='replies')

    def __str__(self) -> str:
        return f"{self.post} | {self.author} | {self.post_date}"

    @property
    def children(self):
        return Comment.objects.filter(parent=self).reverse()
    
    @property
    def is_parent(self):
        if self.parent is None:
            return True
        return False