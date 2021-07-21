from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        if user.is_authorize:
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'place': user.place
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'status': 'Your account is still waiting for approval.'
            }, status=status.HTTP_202_ACCEPTED)