# Generated by Django 3.1.3 on 2021-07-19 01:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorize_users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='authorizeuser',
            name='place',
            field=models.CharField(default='Philippines', max_length=250),
        ),
    ]
