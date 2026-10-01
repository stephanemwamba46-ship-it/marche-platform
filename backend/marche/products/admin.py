from django.contrib import admin
from .models import Product
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "seller",
        "product_type",
        "price",
        "is_promoted",
        "created_at",
    ]
    search_fields = [
        "title",
        "seller__email"
    ]
    list_filter = [
        "product_type",
        "is_promoted",
        "created_at",
    ]
    readonly_fields = [
        "slug",
        "views_count",
        "sales_count",
    ]