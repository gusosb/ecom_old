# Generated by Django 3.2.2 on 2021-12-09 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_auto_20211209_1947'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='taxconversion',
            field=models.FloatField(default=0.8),
        ),
    ]
