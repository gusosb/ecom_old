from rest_framework import viewsets
from .models import Order, Site
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import SiteSerializer, OrderSerializer


class SiteViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Site.objects.all()
    serializer_class = SiteSerializer
    permission_classes = [AllowAny,]

    def get_queryset(self):
        return Site.objects.all()


class OrderViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(customeruser=user)