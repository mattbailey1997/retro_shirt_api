from rest_framework import serializers
from ..models import Shirt

class ShirtSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Shirt
        fields = '__all__'
