from os import read
from django.utils import tree
from .models import Category, Order, Product, Site
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'


class SiteSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Site
        fields = ('name', 'categories', 'id', 'siteimg')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'site', 'get_status_display', 'customeruser')

class OSerializer(serializers.Serializer):
    site = serializers.CharField(max_length=200)
    customeruser = serializers.EmailField()