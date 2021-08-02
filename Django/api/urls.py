from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('send-sms/', views.send_sms, name='send-sms'),
    path('daily-news/', views.daily_news, name='daily_news'),
    path('bot/', views.bot_sms, name='bot_sms'),
    path('request-news/', views.request_news, name='request_news'),
]