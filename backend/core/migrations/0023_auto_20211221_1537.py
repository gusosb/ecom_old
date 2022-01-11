# Generated by Django 3.2.2 on 2021-12-21 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0022_alter_site_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='brand',
            field=models.CharField(default=1, max_length=150, verbose_name='Varumärke'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='site',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='files/'),
        ),
    ]
