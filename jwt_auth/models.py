from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    favourites = models.ManyToManyField(
        'shirts.Shirt',
        related_name='shirts',
        blank=True
    )