# Generated by Django 3.2.2 on 2021-10-05 12:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_newuser_last_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='newuser',
            old_name='first_name',
            new_name='firstname',
        ),
        migrations.RenameField(
            model_name='newuser',
            old_name='last_name',
            new_name='lastname',
        ),
    ]