# Generated by Django 3.1.3 on 2021-07-28 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorize_users', '0009_auto_20210728_0747'),
    ]

    operations = [
        migrations.AlterField(
            model_name='authorizeuser',
            name='valid_id',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='static/valid_ids'),
        ),
    ]