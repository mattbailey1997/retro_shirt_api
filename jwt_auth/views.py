from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from datetime import datetime, timedelta
from django.conf import settings
import jwt
from .serializers.populated import PopulatedUserSerializer


from .serializers.common import UserSerializer

from django.contrib.auth import get_user_model
User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        user_to_add = UserSerializer(data=request.data)
        try:
            user_to_add.is_valid(True)
            print("Errors ->", user_to_add.errors)
            user_to_add.save()
            return Response({'message': 'Registration Successful'}, status.HTTP_202_ACCEPTED)

        except Exception as e:
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_to_validate = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied('Invalid credentials')

        if not user_to_validate.check_password(password):
            raise PermissionDenied('Invalid credentials')

        dt = datetime.now() + timedelta(hours=3)

        token = jwt.encode(
            {
                'sub': user_to_validate.id,
                'exp': int(dt.strftime('%s'))
            },
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({'message': f"Welcome back, {user_to_validate.username}", 'token': token}, status.HTTP_202_ACCEPTED)


class UserListView(APIView):

    def get(self, _request):

        users = User.objects.all()

        serialized_users = PopulatedUserSerializer(users, many=True)
        
        return Response(serialized_users.data, status=status.HTTP_200_OK)


class UserDetailView(APIView):
    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)

        except User.DoesNotExist as e:
            print(e)
            raise NotFound({ 'detail': str(e)}, status.HTTP_404_NOT_FOUND)
      
    def get(self, _request, pk):
        user = self.get_user(pk)
        print('user  --->', user)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status.HTTP_200_OK)

    def put(self, request, pk):
        user_update = self.get_user(pk)
        deserialized_user = UserSerializer(instance=user_update, data=request.data)

        try:
            deserialized_user.is_valid()
            print('Errors ---> ', deserialized_user.errors)
            deserialized_user.save()

            return Response(deserialized_user.data, status.HTTP_202_ACCEPTED)

        except Exception as e:
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

