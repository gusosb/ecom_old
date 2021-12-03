from os import read, truncate
from django.db.models import fields
from django.db.models.fields import related
from django.utils import tree
from rest_framework.serializers import ImageField
from .models import Category, Order, OrderItem, Product, Site
from rest_framework import serializers


class FilteredProductSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(is_active=True)
        return super().to_representation(data)

class RelatedSerializer(serializers.ModelSerializer):
    prodImgList = ImageField(read_only=True)
    class Meta:
        list_serializer_class = FilteredProductSerializer
        model = Product
        exclude = ['related', 'is_active']


class ProductSerializer(serializers.ModelSerializer):
    prodImgList = ImageField(read_only=True)
    prodImgSmall = ImageField(read_only=True)
    twoImgSmall = ImageField(read_only=True)
    threeImgSmall = ImageField(read_only=True)
    related = RelatedSerializer(many=True, read_only=True)

    class Meta:
        list_serializer_class = FilteredProductSerializer
        model = Product
        exclude = ['user', 'is_active']


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        exclude = ['site', 'user']

    

class SiteSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Site
        exclude = ['stripekey', 'url', 'user']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderitem = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'site', 'get_status_display', 'customeruser', 'customeremail', 'orderitem')