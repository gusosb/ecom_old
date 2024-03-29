# Generated by Django 3.2.2 on 2021-12-09 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_product_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='total',
            field=models.CharField(default=1, max_length=25, verbose_name='Totalsumma'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='prodQty',
            field=models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Lagerkvantitet'),
        ),
    ]
