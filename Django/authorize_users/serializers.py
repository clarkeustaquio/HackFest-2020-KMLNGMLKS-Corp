from rest_framework import serializers
from .models import Announcements, AuthorizeUser

class AuthorizeUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    place = serializers.CharField(required=True)

    class Meta:
        model = AuthorizeUser
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password')
        username = validated_data['username']

        user = super().create(validated_data)
        user.email = username
        user.set_password(password)
        user.save()
        return user

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcements
        fields = '__all__'

    def to_representation(self, instance):
        representation = super(AnnouncementSerializer, self).to_representation(instance)
        representation['user'] = instance.user.last_name.upper() + ', ' + instance.user.first_name.upper()
        return representation
