import requests

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
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Twilio Configuration
client = Client(settings.TWILIO_SID, settings.TWILIO_TOKEN)

@api_view(['POST'])
def send_sms(request):
    url = 'http://newsapi.org/v2/top-headlines?country=ph&apiKey=a3befdaa830b4a0595fa9b145c17929e'
    request_news = requests.get(url)
    response_data = request_news.json()

    subscribe_body = 'Thank you for subscribing to Bayanihan News. You will receive daily news from us. \n\n'
    unsubscribe_body = 'You unsubscribe to Bayanihan News. You will no longer receives daily news. Thank you!'
    response = dict()
    isSuccess = False
    if(request_news.status_code >= 200 and request_news.status_code < 300):
        for daily_new in response_data['articles'][:5]:
            if(daily_new['title']):
                subscribe_body += daily_new['title'] + '\n\n'

    if request.method == 'POST':
        if(request.data):
            try:
                if(request.data['title'] == 'Subscribe'):
                    daily_news = client.messages.create(
                        body=subscribe_body[:1600], 
                        from_=settings.TWILIO_NUMBER, to=request.data['phoneNumber']
                    )
                elif (request.data['title'] == 'Unsubscribe'):
                    daily_news = client.messages.create(
                        body=unsubscribe_body, 
                        from_=settings.TWILIO_NUMBER, to=request.data['phoneNumber']
                    )
                isSuccess = True
            except TwilioException as E:
                print(E) # Should fail silently
        
        # response['twilio_sid'] = daily_news.sid
        
    if(isSuccess):
        response = {
            'status': 'OK',
            'success': 200,
            'message': 'DELIVERED',
        }
    else:
        response = {
            'status': 'ERROR',
            'success': 500,
            'message': 'FAILED',
        }

    return Response(response)

def request_call():
    url = 'http://newsapi.org/v2/top-headlines?country=ph&apiKey=a3befdaa830b4a0595fa9b145c17929e'

    cloud_datas = db.collection('users').get()
    list_numbers = list()

    for data in cloud_datas:
        try:
            list_numbers.append(data.get('phoneNumber'))
        except KeyError:
            pass

    request_news = requests.get(url)
    response_data = request_news.json()

    daily_news = 'Daily Bayanihan News \n\n'

    if(request_news.status_code >= 200 and request_news.status_code < 300):
        for daily_new in response_data['articles'][:5]:
            if(daily_new['title']):
                daily_news += daily_new['title'] + '\n\n'

    # Send message
    if(daily_news and list_numbers):
        for number in list_numbers:
            client.messages.create(
                body=daily_news[:1500],
                from_=settings.TWILIO_NUMBER, to=number
            )

    return Response({ 'status': 'OK' })

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
    url = 'http://newsapi.org/v2/top-headlines?country=ph&apiKey=a3befdaa830b4a0595fa9b145c17929e'
    request_news = requests.get(url)
    response_data = request_news.json()

    return Response(response_data)