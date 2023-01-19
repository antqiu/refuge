from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Comment(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user")
    refuge_id = models.IntegerField(default=0)
    content = models.TextField(blank=True)
    time = models.DateTimeField(auto_now_add=True)
