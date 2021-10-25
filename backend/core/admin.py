from django.contrib import admin
from django.http import request
from .models import Order, OrderItem, Product, Site, Category, User


class SiteAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

    def get_fieldsets(self, request, obj=None):
        if not request.user.is_superuser:
            return [(None, {'fields': ('name', 'stripekey', 'siteimg', 'url')}),]
        else:
            return [(None, {'fields': self.get_fields(request, obj)})]

admin.site.register(Site, SiteAdmin)




class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = ['site', 'user']

    def save_model(self, request, obj, form, change):
        site1 = Site.objects.get(user=request.user)
        obj.user = request.user
        obj.site = site1
        super().save_model(request, obj, form, change)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

admin.site.register(Category, CategoryAdmin)




class ProductAdmin(admin.ModelAdmin):
    readonly_fields = ['user']
    save_as = True
    

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        
        super().save_model(request, obj, form, change)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "category":
            kwargs["queryset"] = Category.objects.filter(user=request.user)
        if db_field.name == "related":
            kwargs["queryset"] = Product.objects.filter(user=request.user)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "related":
            kwargs["queryset"] = Product.objects.filter(user=request.user)
            return super().formfield_for_manytomany(db_field, request, **kwargs)


admin.site.register(Product, ProductAdmin)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    exclude = ['site']

    def get_extra(self, request, obj=None, **kwargs):
        extra = 0
        return extra

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_handled', 'status', 'customeremail', 'created_at')
    readonly_fields = ['site', 'created_at', 'sessionid']
    inlines = [
        OrderItemInline,
    ]
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        site1 = Site.objects.get(user=request.user)
        return qs.filter(site=site1, is_paid=True)

admin.site.register(Order, OrderAdmin)


class OrderItemAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        site1 = Site.objects.get(user=request.user)
        return qs.filter(site=site1)

admin.site.register(OrderItem, OrderItemAdmin)