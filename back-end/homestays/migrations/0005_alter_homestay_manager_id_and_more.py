# Generated by Django 4.2.2 on 2023-07-08 18:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myadmin', '0004_servicetype'),
        ('homestays', '0004_service'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homestay',
            name='manager_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='homestay',
            name='pricing_config_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='myadmin.pricingconfig'),
        ),
        migrations.AlterField(
            model_name='service',
            name='homestay_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homestays.homestay'),
        ),
        migrations.AlterField(
            model_name='service',
            name='service_type_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myadmin.servicetype'),
        ),
    ]