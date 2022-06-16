from django.urls import path  
from .views import ReviewListView, ReviewDetailView #The view that has the post request

urlpatterns = [
    path('', ReviewListView.as_view()),
    path('<int:pk>/', ReviewDetailView.as_view())
]