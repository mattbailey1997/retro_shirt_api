# Generated by Django 4.0.5 on 2022-06-10 14:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_alter_user_first_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_name',
        ),
    ]
