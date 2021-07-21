from . import views
from django.urls import path
from rest_framework.authtoken import views as auth_token
from .authentication import CustomAuthToken

app_name = 'authorize_users'

urlpatterns = [
    path('create-account/', views.create_account, name='create_account'),
    path('authorize-login/',  CustomAuthToken.as_view(), name='authorize_login'),
    path('authorize-logout/', views.authorize_logout, name='authorize_logout'),
    path('authorize-token/', views.authorize_token, name='authorize_token'),
    path('get-people/', views.get_people, name='get_people'),
    path('send-announcement/', views.send_announcement, name='send_announcement'),
    path('add-subscriber/', views.add_subscriber, name='add_subscriber'),
    path('import-subscriber/', views.import_subscriber, name='import_subscriber'),
    path('edit-subscriber/', views.edit_subscriber, name='edit_subscriber'),
    path('delete-subscriber/', views.delete_subscriber, name='delete_subscriber')
]
