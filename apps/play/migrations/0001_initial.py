# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-08-24 21:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Play',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creation_play', models.DateTimeField()),
                ('duration', models.DurationField()),
                ('start_play', models.DateTimeField()),
                ('limit_time', models.DurationField()),
                ('close_play', models.DateTimeField()),
                ('is_active', models.IntegerField()),
            ],
            options={
                'db_table': 'play',
                'ordering': ('creation_play', 'start_play'),
                'managed': False,
            },
        ),
    ]