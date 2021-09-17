from django.urls import path
from .views import CustomUserCreate, MyTokenObtainPairView

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name='create_user'),
    path('token/', MyTokenObtainPairView.as_view(), name='custom_token'),
]