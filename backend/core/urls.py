from .ViewSets import SiteViewSet
from django.urls import path
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings


router = DefaultRouter()
router.register(r'content', SiteViewSet)

urlpatterns = router.urls

#urlpatterns = [
#    #path('create/', CustomUserCreate.as_view(), name='create_user'),
#    path('clients/', AccountViewSet.as_view(), name='client_obtain'),
#]