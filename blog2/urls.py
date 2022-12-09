from django.urls import path
from .views import *

urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('category/<str:slug>/', PostsByCategory.as_view(), name='category'),
    path('region/<str:slug>/', PostsByRegion.as_view(), name='region'),
    path('post/<str:slug>/', GetPost.as_view(), name='post'),
    path('search/', Search.as_view(), name='search'),
    path('pages/agreement/', agreement, name='agreement'),
    path('pages/privacy_policy/', privacy_policy, name='privacy_policy'),
    path('form/', form, name='form'),
]
