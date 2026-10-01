from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EarningViewSet
router = DefaultRouter()
router.register(
    r'earnings',
    EarningViewSet,
    basename='earnings'
)
urlpatterns = [
    path('', include(router.urls)),
]