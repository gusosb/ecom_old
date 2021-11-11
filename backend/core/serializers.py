from os import read
from django.db.models import fields
from django.db.models.fields import related
from django.utils import tree
from rest_framework.serializers import ImageField
from .models import Category, Order, OrderItem, Product, Site
from rest_framework import serializers


class RelatedSerializer(serializers.ModelSerializer):
    prodImgList = ImageField(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    prodImgList = ImageField(read_only=True)
    related = RelatedSerializer(many=True, read_only=True)

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
        fields = ('name', 'categories', 'id', 'siteimg', 'footerdesc')


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderitem = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'site', 'get_status_display', 'customeruser', 'customeremail', 'orderitem')