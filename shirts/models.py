from django.db import models
from django.forms import CharField

# Create your models here.
class Shirt(models.Model):
    name = models.CharField(max_length=250, default=None)
    year = models.PositiveBigIntegerField(default=None)
    description = models.CharField(max_length=5000, default=None)
    link = models.CharField(max_length=5000, default=None)
    brand = models.CharField(max_length=50, default=None)
    primary_image = models.CharField(max_length=1000, default=None, null=True)
    image_two = models.CharField(max_length=1000, default=None, null=True)
    image_three = models.CharField(max_length=1000, default=None, null=True)
    league = models.CharField(max_length=50, default=None)
    price = models.DecimalField(default=None, max_digits=6, decimal_places=2)
    

    def __str__(self):
        return f"{self.name} - {self.year} - {self.brand}"



