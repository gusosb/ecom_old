# Generated by Django 3.2.2 on 2021-12-27 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0026_auto_20211223_1345'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='trackingid',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
