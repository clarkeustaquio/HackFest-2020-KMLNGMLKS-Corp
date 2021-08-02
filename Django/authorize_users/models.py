from django.db import models
from django.contrib.auth.models import AbstractUser

class AuthorizeUser(AbstractUser):
    is_authorize = models.BooleanField(default=False)
    is_complete_approval = models.BooleanField(default=False)
    username = models.EmailField(max_length=250, unique=True)
    place = models.CharField(max_length=250, default='Philippines')
    valid_id = models.ImageField(default=None, blank=True, null=True, upload_to='valid_ids')

    REQUIRED_FIELDS = ['first_name', 'last_name', 'place']

class Announcements(models.Model):
    user = models.ForeignKey(AuthorizeUser, on_delete=models.CASCADE)
    announcement = models.TextField(default="Bayanihan News")

    def __str__(self):
        return self.announcement[:50]