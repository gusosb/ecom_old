# Generated by Django 3.2.2 on 2021-10-28 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20211026_2031'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='prodValnamn',
            field=models.CharField(blank=True, max_length=150, null=True, verbose_name='Produktval'),
        ),
    ]
