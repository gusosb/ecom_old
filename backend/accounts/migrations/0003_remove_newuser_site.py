# Generated by Django 3.2.2 on 2021-09-20 16:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_newuser_site'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='newuser',
            name='site',
        ),
    ]