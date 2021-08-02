import pytz
import requests
import datetime
from django.utils import timezone

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from twilio.rest import Client, TwilioException
from twilio.twiml.messaging_response import MessagingResponse
from django.conf import settings

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Firebase Configuration
if not firebase_admin._apps:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred)

db = firestore.client()

# Twilio Configuration
client = Client(settings.TWILIO_SID, settings.TWILIO_TOKEN)

url = 'http://newsapi.org/v2/top-headlines?country=ph&apiKey=a3befdaa830b4a0595fa9b145c17929e'

@api_view(['POST'])
def send_sms(request):
    request_news = requests.get(url)
    response_data = request_news.json()

    current_date = datetime.datetime.now().replace(
        tzinfo=pytz.UTC).astimezone(pytz.timezone('Asia/Manila')).strftime('%B %d, %Y %I:%M:%S %p')

    subscribe_body = '''Thank you for subscribing to Bayanihan News. 
        You will receive daily news from us. \n\n{} \n\n'''.format(current_date)

    unsubscribe_body = '''You unsubscribe to Bayanihan News. 
        You will no longer receive daily news. Thank you! \n\n{}'''.format(current_date)

    # response['twilio_sid'] = daily_news.sid
  
    if request_news.status_code >= 200 and request_news.status_code < 300:
        for daily_new in response_data['articles'][:5]:
            if daily_new['title']:
                subscribe_body += daily_new['title'] + '\n\n'
  
    if request.data:
        try:
            phone_number = request.data['phoneNumber']
        except KeyError:
            return Response({
                'phoneNumber': 'This field is required.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            title = request.data['title']    
        except KeyError:   
            return Response({
                'title': 'This field is required.'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            if title == 'Subscribe':
                client.messages.create(
                    body=subscribe_body[:1600], 
                    from_=settings.TWILIO_NUMBER, to=phone_number
                )
   
            elif title == 'Unsubscribe':
                client.messages.create(
                    body=unsubscribe_body, 
                    from_=settings.TWILIO_NUMBER, to=phone_number
                )
            else:
                return Response({
                    'title': 'Keyword is invalid.'
                }, status=status.HTTP_400_BAD_REQUEST)
    
            return Response({
                'status': 'Message Delivered.'
            }, status=status.HTTP_200_OK)

        except TwilioException as e:
            return Response({
                'status': 'Twilio Exception Occured.'
            }, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({
            'status': 'Required fields are missing.',
            'title': 'This field is required.',
            'phoneNumber': 'This field is required.'
        }, status=status.HTTP_400_BAD_REQUEST)

def request_call():
    cloud_datas = db.collection('Subscribers').get()
    list_numbers = list()

    for data in cloud_datas:
        try:
            list_numbers.append(data.get('phoneNumber'))
        except KeyError:
            pass

    request_news = requests.get(url)
    response_data = request_news.json()

    current_date = datetime.datetime.now().replace(
        tzinfo=pytz.UTC).astimezone(pytz.timezone('Asia/Manila')).strftime('%B %d, %Y %I:%M:%S %p')

    daily_news = '{} - Daily Bayanihan News \n\n'.format(current_date)

    if request_news.status_code >= 200 and request_news.status_code < 300:
        for daily_new in response_data['articles'][:5]:
            if(daily_new['title']):
                daily_news += daily_new['title'] + '\n\n'

    # Send message
    if daily_news and list_numbers:
        for number in list_numbers:
            try:
                client.messages.create(
                    body=daily_news[:1500],
                    from_=settings.TWILIO_NUMBER, to=number
                )
            except Exception as e:
                pass

@api_view(['POST'])
def daily_news(request):
    request_call()
    return Response({ 'status': 'OK' })

# Pending, too expensive
@api_view(['POST', 'GET'])
def bot_sms(request):
    response = MessagingResponse()

    response.message('Hello World this is a bot.')
    return Response({ 'response': str(response) })

@api_view(['POST', 'GET'])
def request_news(request):
    request_news = requests.get(url)
    response_data = request_news.json()

    return Response(response_data, status=status.HTTP_200_OK)

# Fix celery execution of receive_call