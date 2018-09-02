# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-08-20 05:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_char', models.CharField(max_length=100, unique=True)),
                ('name', models.CharField(max_length=50)),
                ('code', models.CharField(max_length=20)),
                ('semester', models.CharField(max_length=10)),
                ('year', models.CharField(max_length=4)),
                ('description', models.CharField(blank=True, max_length=200)),
                ('creation_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'course',
                'ordering': ('-creation_date',),
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CourseHasStudent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'course_has_student',
                'managed': False,
            },
        ),
    ]
