# mysite/urls.py
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from . import views


urlpatterns = [
    path("clerk-auth/",views.get_users, name= "getUser"),
]
