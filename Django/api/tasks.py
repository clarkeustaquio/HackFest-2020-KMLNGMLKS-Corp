from celery import shared_task
from rest_framework.response import Response

from .views import request_call

@shared_task
def send_request():
    request_call()
    return True