# Generated by Django 3.2.2 on 2021-09-20 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_product_relatedproducts'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='relatedProducts',
        ),
        migrations.AddField(
            model_name='product',
            name='related',
            field=models.ManyToManyField(related_name='_core_product_related_+', to='core.Product'),
        ),
    ]
