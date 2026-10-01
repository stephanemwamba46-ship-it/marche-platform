from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    ActivityViewSet,
    MyActivitiesListView,
    UpdateActivityView,
    DeleteActivityView
)
# =========================
# ROUTER
# =========================
router = DefaultRouter()
router.register(
    r'activities',
    ActivityViewSet,
    basename='activities'
)
# =========================
# URLS
# =========================
urlpatterns = [
    # Mes activités
    path(
        'my-activities/',
        MyActivitiesListView.as_view(),
        name='my_activities'
    ),
    # Update
    path(
        'update/<int:pk>/',
        UpdateActivityView.as_view(),
        name='update_activity'
    ),
    # Delete
    path(
        'delete/<int:pk>/',
        DeleteActivityView.as_view(),
        name='delete_activity'
    ),
]
# Ajouter router
urlpatterns += router.urls