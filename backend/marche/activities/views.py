from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Activity
from .serializers import ActivitySerializer
# =========================
# CRUD GLOBAL ACTIVITIES
# =========================
class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )
# =========================
# MES ACTIVITÉS
# =========================
class MyActivitiesListView(
    generics.ListAPIView
):
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Activity.objects.filter(
            user=self.request.user
        )
# =========================
# UPDATE ACTIVITY
# =========================
class UpdateActivityView(
    generics.RetrieveUpdateAPIView
):
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Activity.objects.filter(
            user=self.request.user
        )
# =========================
# DELETE ACTIVITY
# =========================
class DeleteActivityView(
    generics.DestroyAPIView
):
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Activity.objects.filter(
            user=self.request.user
        )