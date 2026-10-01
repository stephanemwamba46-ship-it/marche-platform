from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem
from .serializers import CartSerializer
from products.models import Product
class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    # GET CART
    def list(self, request):
        cart, created = Cart.objects.get_or_create(
            user=request.user
        )
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    # ADD PRODUCT
    @action(detail=False, methods=['post'])
    def add(self, request):
        product_id = request.data.get(
            "product_id"
        )
        product = Product.objects.get(
            id=product_id
        )
        cart, created = Cart.objects.get_or_create(
            user=request.user
        )
        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product
        )
        if not created:
            item.quantity += 1
            item.save()
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    # REMOVE PRODUCT
    @action(detail=False, methods=['post'])
    def remove(self, request):
        product_id = request.data.get(
            "product_id"
        )
        cart = Cart.objects.get(
            user=request.user
        )
        CartItem.objects.filter(
            cart=cart,
            product_id=product_id
        ).delete()
        serializer = CartSerializer(cart)
        return Response(serializer.data)