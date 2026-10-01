from django.contrib import admin
from .models import Activity
@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'action', 'content', 'created_at']
    list_filter = ['action', 'created_at']
    search_fields = ['action', 'content', 'user__username']