# Generated by Django 3.2.2 on 2021-10-23 08:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0003_alter_order_cuarea'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='cuarea',
            field=models.CharField(max_length=50, verbose_name='Ort'),
        ),
        migrations.AlterField(
            model_name='order',
            name='cuname',
            field=models.CharField(max_length=300, verbose_name='Namn'),
        ),
        migrations.AlterField(
            model_name='order',
            name='customeremail',
            field=models.CharField(blank=True, max_length=250, null=True, verbose_name='Epostadress'),
        ),
        migrations.AlterField(
            model_name='order',
            name='customeruser',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='cuser', to=settings.AUTH_USER_MODEL, verbose_name='Kundanvändare'),
        ),
        migrations.AlterField(
            model_name='order',
            name='custreet',
            field=models.CharField(max_length=300, verbose_name='Adress'),
        ),
        migrations.AlterField(
            model_name='order',
            name='cuzip',
            field=models.CharField(max_length=6, verbose_name='Postkod'),
        ),
    ]
