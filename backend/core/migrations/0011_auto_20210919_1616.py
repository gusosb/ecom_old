# Generated by Django 3.2.6 on 2021-09-19 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_product_prodvalnamn'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='prodVal1',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='prodVal2',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='prodVal3',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
