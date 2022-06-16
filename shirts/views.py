from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

# Custom Imports
from .models import Shirt
from .serializers.common import ShirtSerializer
from .serializers.populated import PopulatedShirtSerializer

class ShirtListView(APIView):

    def get(self, _request):

      shirts = Shirt.objects.all()

      serialized_shirts = ShirtSerializer(shirts, many=True)
  
      return Response(serialized_shirts.data, status=status.HTTP_200_OK)


class ShirtDetailView(APIView):

  def get_shirt(self, pk):
    try:
    
      return Shirt.objects.get(pk=pk)
    except Shirt.DoesNotExist as e:
      print(e)
      raise NotFound({ 'detail': str(e)}, status.HTTP_404_NOT_FOUND)
  
  def get(self, _request, pk):
      shirt = self.get_shirt(pk)
      print('shirt --->', shirt)
      serialized_shirt = PopulatedShirtSerializer(shirt)
      return Response(serialized_shirt.data, status.HTTP_200_OK)