from django.urls import path
from .views import ShirtListView, ShirtDetailView


urlpatterns = [
  path('', ShirtListView.as_view()),
  path('<int:pk>/', ShirtDetailView.as_view())
]