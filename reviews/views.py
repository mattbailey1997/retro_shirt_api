from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.common import ReviewSerializer
from .models import Review

# Create your views here.
class ReviewListView(APIView):

    def post(self, request):
        print('request ->', request)
        review_to_add = ReviewSerializer(data=request.data)
        try:
            review_to_add.is_valid()
            review_to_add.save()
            return Response(review_to_add.data, status.HTTP_201_CREATED)
        except Exception as e:
          print(e)
          return Response({ 'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


# The endpoing for 
class ReviewDetailView(APIView):

    def get_review(self, pk):
        try:
            return Review.objects.get(pk=pk)
          
        except Review.DoesNotExist:
            raise NotFound("Review not found")

    def delete(self, _request, pk):
        print('PK', pk)
        review_to_delete = self.get_review(pk)
        review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)