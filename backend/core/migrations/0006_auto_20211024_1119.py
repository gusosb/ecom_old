# Generated by Django 3.2.2 on 2021-10-24 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_order_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='site',
            name='siteemail',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='created_at',
            field=models.DateField(auto_now_add=True, verbose_name='Skapad'),
        ),
    ]
