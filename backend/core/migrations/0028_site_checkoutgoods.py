# Generated by Django 3.2.2 on 2022-01-03 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0027_order_trackingid'),
    ]

    operations = [
        migrations.AddField(
            model_name='site',
            name='checkoutgoods',
            field=models.ManyToManyField(blank=True, to='core.Product', verbose_name='Merförsäljning i kassan'),
        ),
    ]
