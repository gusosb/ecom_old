# Generated by Django 3.2.6 on 2021-10-20 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20211020_0937'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='cuarea',
            field=models.CharField(max_length=50),
        ),
    ]
