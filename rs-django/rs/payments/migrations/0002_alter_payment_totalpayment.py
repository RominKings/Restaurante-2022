# Generated by Django 3.2.7 on 2022-10-19 04:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='totalPayment',
            field=models.DecimalField(decimal_places=3, max_digits=10),
        ),
    ]