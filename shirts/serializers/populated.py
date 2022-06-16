from .common import ShirtSerializer
from reviews.serializers.common import ReviewSerializer


class PopulatedShirtSerializer(ShirtSerializer):
    reviews = ReviewSerializer(many=True)