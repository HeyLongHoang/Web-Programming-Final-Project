# Generated by Django 4.2.2 on 2023-07-08 16:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myadmin', '0004_servicetype'),
        ('homestays', '0003_rename_descrpition_homestay_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField()),
                ('description', models.TextField()),
                ('availability', models.BooleanField()),
                ('homestay_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='homestay', to='homestays.homestay')),
                ('service_type_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service_type', to='myadmin.servicetype')),
            ],
        ),
    ]
