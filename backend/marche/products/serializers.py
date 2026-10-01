from rest_framework import serializers
from .models import Product
from categories.models import Category
from categories.serializers import CategorySerializer
# =========================
# CATEGORY SERIALIZER
# =========================
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )
    class Meta:
        model = Category
        fields = "__all__"
# =========================
# PRODUCT SERIALIZER
# =========================
class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)
    seller_username = serializers.CharField(
    source="seller.username",
    read_only=True
)
    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )
    whatsapp_link = serializers.SerializerMethodField()
    commission = serializers.SerializerMethodField()
    seller_amount = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = [
            "id",
            "seller",
            "seller_username",
            "title",
            "description",
            "category",
            "category_name",
            "product_type",
            "price",
            "promo_price",
            "image",
            "digital_file",
            "whatsapp_number",
            "is_promoted",
            "promotion_end",
            "slug",
            "views_count",
            "sales_count",
            "created_at",
            "whatsapp_link",
            "commission",
            "seller_amount",
            "file",
           
        ]
        read_only_fields = [
            "seller",
            "slug",
            "views_count",
            "sales_count",
        ]
    def get_whatsapp_link(self, obj):
        return obj.get_whatsapp_link()
    def get_commission(self, obj):
        return obj.get_commission()
    def get_seller_amount(self, obj):
        return obj.get_seller_amount()
    def create(self, validated_data):
        validated_data["seller"] = self.context[
            "request"
        ].user
        return super().create(validated_data)