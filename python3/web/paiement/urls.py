from django.urls import path
from . import views

app_name = "paiement"

urlpatterns = [
    path('', views.paiement, name="paiement"),
]