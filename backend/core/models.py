from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill, ResizeToFit
from django.db.models.deletion import CASCADE
from django.contrib.auth import get_user_model


User = get_user_model()

class Site(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='siteuser')
    footerdesc = models.CharField(max_length=400, null=True, blank=True)
    youtube = models.CharField(max_length=400, null=True, blank=True)
    twitter = models.CharField(max_length=400, null=True, blank=True)
    facebook = models.CharField(max_length=400, null=True, blank=True)
    siteimg = models.FileField('Logotyp', upload_to='images/', null=True, blank=True)
    stripekey = models.CharField(max_length=150, blank=True, null=True)
    url = models.CharField(max_length=100, blank=True, null=True)
    siteemail = models.CharField('from_email', max_length=200, null=True, blank=True)
    file = models.FileField(upload_to='files/', blank=True, null=True)
    checkoutgoods = models.ManyToManyField('Product', blank=True, verbose_name='Merförsäljning i kassan')

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
    prodImg = models.ImageField('Primära produktbilden', upload_to='images/', null=True, blank=True)
    prodImgList = ImageSpecField(source='prodImg', processors=[ResizeToFill(240, 350)], format='webp', options={'quality': 90})
    prodImg435 = ImageSpecField(source='prodImg', processors=[ResizeToFill(320, 455)], format='webp', options={'quality': 90})
    prodImgSmall = ImageSpecField(source='prodImg', processors=[ResizeToFill(652, 978)], format='webp', options={'quality': 90})
    twoImg = models.ImageField('Andra produktbilden', upload_to='images/', null=True, blank=True)
    twoImgSmall = ImageSpecField(source='twoImg', processors=[ResizeToFill(652, 978)], format='webp', options={'quality': 90})
    threeImg = models.ImageField('Tredje produktbilden', upload_to='images/', null=True, blank=True)
    threeImgSmall = ImageSpecField(source='threeImg', processors=[ResizeToFill(652, 978)], format='webp', options={'quality': 90})
    tabNamn1 = models.CharField('Namn för flik ett', max_length=150, blank=True, null=True)
    tabDesc1 = models.CharField('Flikinnehåll för flik ett', max_length=500, blank=True, null=True)
    tabNamn2 = models.CharField('Namn för flik två', max_length=150, blank=True, null=True)
    tabDesc2 = models.CharField('Flikinnehåll för flik två', max_length=500, blank=True, null=True)
    tabNamn3 = models.CharField('Namn för flik tre', max_length=150, blank=True, null=True)
    tabDesc3 = models.CharField('Flikinnehåll för flik tre', max_length=500, blank=True, null=True)
    artno = models.CharField('Artikelnummer', max_length=150, null=True, blank=True)
    related = models.ManyToManyField('self', blank=True, verbose_name='Relaterade produkter')
    prodQty = models.PositiveSmallIntegerField('Lagerkvantitet', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=CASCADE, related_name='products', verbose_name='Kategori')
    taxrate = models.FloatField('Moms', default=0.25)
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='produser', verbose_name='Användare')
    is_active = models.BooleanField('Aktiv', default=True)
    class state(models.IntegerChoices):
        NY = 1, 'Nyskick'
        DE = 2, 'Demo'
        BE = 3, 'Begagnad'
        DL = 4, 'Nedladdning'
    condition = models.PositiveSmallIntegerField(choices=state.choices, default=1)
    brand = models.CharField('Varumärke/tillverkare', max_length=150)

    def __str__(self):
        return self.prodName


class Order(models.Model):
    site = models.ForeignKey(Site, on_delete=CASCADE, related_name='orders')
    customeruser = models.ForeignKey(User, on_delete=CASCADE, related_name='cuser', blank=True, null=True, verbose_name='Kundanvändare')
    customeremail = models.CharField('Epostadress', max_length=250, null=True, blank=True)
    cuname = models.CharField('Namn', max_length=300)
    custreet = models.CharField('Adress', max_length=300)
    cuzip = models.CharField('Postkod', max_length=6)
    cuarea = models.CharField('Ort', max_length=50)
    cuphone = models.CharField('Mobilnummer', max_length=20)
    total = models.CharField('Totalsumma', max_length=25)
    class stat(models.IntegerChoices):
        FR = 1, 'Mottagen'
        SN = 2, 'Skickad'
    status = models.PositiveSmallIntegerField(choices=stat.choices, default=1)
    is_handled = models.BooleanField('Hanterad', default=False)
    is_paid = models.BooleanField('Betald genom Checkout', default=False)
    sessionid = models.CharField(max_length=250, unique=True, blank=True, null=True)
    created_at = models.DateField('Skapad', auto_now_add=True)
    trackingid = models.CharField(max_length=150, blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.trackingid:
            pass
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    site = models.ForeignKey(Site, on_delete=CASCADE, related_name='orderitems')
    prodName = models.CharField('Produktnamn', max_length=150)
    prodPrice = models.FloatField('Pris', blank=True, null=True)
    prodQty = models.PositiveSmallIntegerField('Antal')
    prodImg = models.CharField(max_length=500, blank=True, null=True)
    prodImgList = models.CharField(max_length=500, blank=True, null=True)
    prodid = models.PositiveSmallIntegerField(blank=True, null=True)
    prodcat = models.PositiveSmallIntegerField(blank=True, null=True)
    prodVal = models.CharField(max_length=150, blank=True, null=True)
    prodValnamn = models.CharField('Produktval', max_length=150, blank=True, null=True)
    artno = models.CharField('Artikelnummer', max_length=150, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=CASCADE, related_name='orderitem')