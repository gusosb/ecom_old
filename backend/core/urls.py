from .ViewSets import SiteViewSet
from django.urls import path
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings
from . import views


router = DefaultRouter()
router.register(r'content', SiteViewSet)

#urlpatterns = router.urls

urlpatterns = [
    path('create-checkout-session/', views.create_checkout_session, name='checkoutsession'),
    path('get-success-session/', views.order_success, name='getsuccess'),
] + router.urls

