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
    url = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    catName = models.CharField(max_length=150)
    site = models.ForeignKey(Site, on_delete=CASCADE, related_name='categories')
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='catuser')

    def __str__(self):
        return self.catName

class Product(models.Model):
    prodName = models.CharField('Produktnamn', max_length=150)
    prodDescription = models.CharField('Produktbeskrivning', max_length=500)
    prodPrice = models.FloatField('Pris', blank=True, null=True)
    prodValnamn = models.CharField('Produktval', max_length=150, blank=True, null=True)
    prodVal1 = models.CharField('Val ett', max_length=150, blank=True, null=True)
    prodVal2 = models.CharField('Val två', max_length=150, blank=True, null=True)
    prodVal3 = models.CharField('Val tre', max_length=150, blank=True, null=True)
    prodImg = models.ImageField('Första produktbilden', upload_to='images/', null=True, blank=True)
    twoImg = models.ImageField('Andra produktbilden', upload_to='images/', null=True, blank=True)
    threeImg = models.ImageField('Tredje produktbilden', upload_to='images/', null=True, blank=True)
    tabNamn1 = models.CharField('Namn för flik ett', max_length=150, blank=True, null=True)
    tabDesc1 = models.CharField('Flikinnehåll för flik ett', max_length=500, blank=True, null=True)
    tabNamn2 = models.CharField('Namn för flik två', max_length=150, blank=True, null=True)
    tabDesc2 = models.CharField('Flikinnehåll för flik två', max_length=500, blank=True, null=True)
    tabNamn3 = models.CharField('Namn för flik tre', max_length=150, blank=True, null=True)
    tabDesc3 = models.CharField('Flikinnehåll för flik tre', max_length=500, blank=True, null=True)
    related = models.ManyToManyField('self', blank=True, verbose_name='Relaterade produkter')
    prodQty = models.PositiveSmallIntegerField('Tillgänglig kvantitet', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=CASCADE, related_name='products', verbose_name='Kategori')
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='produser', verbose_name='Användare')

    def __str__(self):
        return self.prodName


class Order(models.Model):
    site = models.ForeignKey(Site, on_delete=CASCADE, related_name='orders')
    customeruser = models.ForeignKey(User, on_delete=CASCADE, related_name='cuser', blank=True, null=True)
    class stat(models.IntegerChoices):
        FR = 1, 'Mottagen'
        SN = 2, 'Skickad'
    status = models.PositiveSmallIntegerField(choices=stat.choices, default=1)
    is_handled = models.BooleanField('Hanterad', default=False)