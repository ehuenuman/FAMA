from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils import timezone
from django.core import serializers
from datetime import timedelta

from .models import Play

# Create your views here.
@login_required
def stop_play(request):
	if request.method == "POST":
		play = Play.objects.get(id=request.POST["playId"])
		play.is_active = 0
		play.save()

		return JsonResponse({"data": "OK"})
