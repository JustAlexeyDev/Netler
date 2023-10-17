# Generated by Django 4.2.6 on 2023-10-17 04:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_user_is_verificated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='subscriptions',
        ),
        migrations.AddField(
            model_name='user',
            name='subscribers',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]