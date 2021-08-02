from django.contrib import admin
from .models import Announcements, AuthorizeUser
# Register your models here.

admin.site.register(AuthorizeUser)
admin.site.register(Announcements)
