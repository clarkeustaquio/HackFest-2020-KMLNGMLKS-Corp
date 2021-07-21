from django.db import models
from django.contrib.auth.models import AbstractUser

class AuthorizeUser(AbstractUser):
    is_authorize = models.BooleanField(default=False)
    username = models.EmailField(max_length=250, unique=True)
    place = models.CharField(max_length=250, default='Philippines')

    REQUIRED_FIELDS = ['first_name', 'last_name', 'place']