from django.contrib import admin
from .models import Product, Site, Category

admin.site.register(Site)
admin.site.register(Category)
admin.site.register(Product)