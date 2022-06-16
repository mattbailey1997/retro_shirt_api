from django.db import models

# Create your models here.
class Review(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True) #Timestamps for review
    shirt = models.ForeignKey(
        'shirts.Shirt',
        related_name='reviews',
        on_delete= models.CASCADE 
        )
