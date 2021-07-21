from rest_framework import serializers
from .models import AuthorizeUser

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