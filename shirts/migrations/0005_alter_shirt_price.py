# Generated by Django 4.0.5 on 2022-06-13 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shirts', '0004_alter_shirt_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shirt',
            name='price',
            field=models.DecimalField(decimal_places=2, default=None, max_digits=6),
        ),
    ]
