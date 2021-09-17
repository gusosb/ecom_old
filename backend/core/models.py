from django.db import models
from django.db.models.deletion import CASCADE
from django.contrib.auth import get_user_model
from accounts.models import NewUser
User = get_user_model()

class Site(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='siteuser')

class Category(models.Model):
    catName = models.CharField(max_length=150)
    site = models.ForeignKey(Site, on_delete=CASCADE, related_name='catsite')
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='catuser')


class Product(models.Model):
    prodName = models.CharField(max_length=150)
    prodDescription = models.CharField(max_length=500)
    prodPrice = models.FloatField(blank=True, null=True)
    prodImg = models.ImageField(upload_to='images/', null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=CASCADE, related_name='prodcat')
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='produser')