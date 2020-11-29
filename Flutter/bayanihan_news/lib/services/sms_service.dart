import 'package:twilio_flutter/twilio_flutter.dart';

final TwilioFlutter twilioFlutter = TwilioFlutter(
    accountSid: 'AC4a31d5243351601a73e6223ecc8c67d3',
    authToken: '705a1782e90d1a8887a387fdacb6b5d3',
    twilioNumber: '+17343960320');

void sendSms(String phone, String message) async {
  twilioFlutter.sendSMS(toNumber: phone, messageBody: message);
}
