# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-16 18:59
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='play',
            options={'managed': False, 'ordering': ('-creation_play', '-start_play')},
        ),
    ]