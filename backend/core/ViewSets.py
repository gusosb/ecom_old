from rest_framework import viewsets
from .models import Category, Site
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import SiteSerializer


class SiteViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Site.objects.all()
    serializer_class = SiteSerializer
    permission_classes = [AllowAny,]

    def get_queryset(self):
        return Site.objects.all()