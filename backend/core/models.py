from django.db import models
from django.db.models.deletion import CASCADE
from django.contrib.auth import get_user_model
from accounts.models import NewUser
User = get_user_model()

class Site(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='siteuser')
    siteimg = models.FileField(upload_to='images/', null=True, blank=True)
    stripekey = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    catName = models.CharField(max_length=150)
    site = models.ForeignKey(Site, on_delete=CASCADE, related_name='categories')
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='catuser')

    def __str__(self):
        return self.catName

class Product(models.Model):
    prodName = models.CharField(max_length=150)
    prodDescription = models.CharField(max_length=500)
    prodPrice = models.FloatField(blank=True, null=True)
    prodMark = models.CharField(max_length=150, blank=True, null=True)
    prodValnamn = models.CharField(max_length=150, blank=True, null=True)
    prodVal1 = models.CharField(max_length=150, blank=True, null=True)
    prodVal2 = models.CharField(max_length=150, blank=True, null=True)
    prodVal3 = models.CharField(max_length=150, blank=True, null=True)
    prodImg = models.ImageField(upload_to='images/', null=True, blank=True)
    twoImg = models.ImageField(upload_to='images/', null=True, blank=True)
    threeImg = models.ImageField(upload_to='images/', null=True, blank=True)
    tabNamn1 = models.CharField(max_length=150, blank=True, null=True)
    tabDesc1 = models.CharField(max_length=500, blank=True, null=True)
    tabNamn2 = models.CharField(max_length=150, blank=True, null=True)
    tabDesc2 = models.CharField(max_length=500, blank=True, null=True)
    tabNamn3 = models.CharField(max_length=150, blank=True, null=True)
    tabDesc3 = models.CharField(max_length=500, blank=True, null=True)
    related = models.ManyToManyField('self', blank=True)
    prodQty = models.PositiveSmallIntegerField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=CASCADE, related_name='products')
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='produser')

    def __str__(self):
        return self.prodName