# Generated by Django 3.2.2 on 2021-11-12 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_site_footerdesc'),
    ]

    operations = [
        migrations.AddField(
            model_name='site',
            name='youtube',
            field=models.CharField(blank=True, max_length=400, null=True),
        ),
    ]
