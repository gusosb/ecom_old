# Generated by Django 3.2.6 on 2021-09-19 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20210918_2236'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='descImg',
            new_name='threeImg',
        ),
        migrations.AddField(
            model_name='product',
            name='twoImg',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]