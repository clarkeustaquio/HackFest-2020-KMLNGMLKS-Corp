import 'package:twilio_flutter/twilio_flutter.dart';

final TwilioFlutter twilioFlutter = TwilioFlutter(
    accountSid: 'AC8771141b976682dbe6f93c5c343c0906',
    authToken: '4888b8667abfb1eb1aabcd52a7d48937',
    twilioNumber: '+14153478842');

void sendSms(String phone, String message) async {
  twilioFlutter.sendSMS(toNumber: phone, messageBody: message);
}
