from shirts.serializers.common import ShirtSerializer
from .common import UserSerializer

class PopulatedUserSerializer(UserSerializer):

    favourites = ShirtSerializer(many=True)