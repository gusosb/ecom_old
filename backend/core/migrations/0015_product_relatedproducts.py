# Generated by Django 3.2.2 on 2021-09-20 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_category_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='relatedProducts',
            field=models.ManyToManyField(related_name='_core_product_relatedProducts_+', to='core.Product'),
        ),
    ]
