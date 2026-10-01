from rest_framework import serializers
from .models import Cart, CartItem
class CartItemSerializer(serializers.ModelSerializer):
    product_title = serializers.ReadOnlyField(
        source="product.title"
    )
    class Meta:
        model = CartItem
        fields = [
            'id',
            'product',
            'product_title',
            'quantity'
        ]
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Cart
        fields = [
            'id',
            'items'
        ]