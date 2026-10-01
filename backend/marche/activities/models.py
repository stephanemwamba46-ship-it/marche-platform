from django.db import models
from django.conf import settings
from categories.models import Category
User = settings.AUTH_USER_MODEL
class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)