from django.contrib import admin
from .models import Earning
@admin.register(Earning)
class EarningAdmin(admin.ModelAdmin):
    list_display = (
        'seller',
        'product',
        'order',
        'amount',
        'commission',
        'seller_amount',
        'created_at',
    )
    list_filter = (
        'created_at',
        'seller',
    )
    search_fields = (
        'seller__username',
        'product__title',
        'order__id',
    )
    ordering = ('-created_at',)