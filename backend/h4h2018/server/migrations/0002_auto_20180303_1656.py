# Generated by Django 2.0.2 on 2018-03-04 00:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='Latitude',
        ),
        migrations.RemoveField(
            model_name='location',
            name='Longitude',
        ),
        migrations.AddField(
            model_name='location',
            name='location',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]
