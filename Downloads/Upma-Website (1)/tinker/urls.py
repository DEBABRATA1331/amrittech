from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='tinker_index'),
    path('lab/', views.lab, name='tinker_lab'),
    path('campus/', views.campus, name='tinker_campus'),
    path('vault/', views.vault, name='tinker_vault'),
    path('vault/<slug:slug>/', views.post_detail, name='post_detail'),
    path('spectrum/', views.spectrum, name='tinker_spectrum'),
    path('tool/', views.tool, name='tinker_tool'),
    path('tool/create_order/', views.create_order, name='create_order'),
    path('tool/callback/', views.payment_callback, name='payment_callback'),
]
