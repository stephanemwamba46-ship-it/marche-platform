from django.urls import path
from .views import global_dashboard
urlpatterns = [
    path('global/', global_dashboard),
]