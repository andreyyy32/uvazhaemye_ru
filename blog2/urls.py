from django.urls import path
from .views import *

urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('category/<str:slug>/', PostsByCategory.as_view(), name='category'),
    path('region/<str:slug>/', PostsByRegion.as_view(), name='region'),
    path('post/<str:slug>/', GetPost.as_view(), name='post'),
    path('form_app/', form_app, name='form_app'),
    path('diplom/', diplom, name='diplom'),
    path('donut/', donut, name='donut'),
    path('agreement/', agreement, name='agreement'),
    path('privacy_policy/', privacy_policy, name='privacy_policy'),
    path('search/', Search.as_view(), name='search'),
]
