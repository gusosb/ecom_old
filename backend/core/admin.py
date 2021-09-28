from django.contrib import admin
from .models import Product, Site, Category, User

admin.site.register(Site)


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