from django.shortcuts import render
from django.http import FileResponse, Http404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from .serializers import OrderSerializer
from products.models import Product
from activities.models import Activity
# 🔥 IMPORT CART
from cart.models import Cart, CartItem
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        )
    # 🔥 CREATE ORDER (achat direct d'un seul produit)
    @action(detail=False, methods=['post'])
    def create_order(self, request):
        product_id = request.data.get('product_id')
        try:
            product = Product.objects.get(
                id=product_id
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Produit introuvable"},
                status=404
            )
        # CREATE ORDER
        order = Order.objects.create(
            user=request.user,
            total_price=product.price
        )
        # CREATE ITEM
        OrderItem.objects.create(
            order=order,
            product=product,
            price=product.price
        )
        # UPDATE SALES
        product.sales_count += 1
        product.save()
        # CREATE ACTIVITY
        Activity.objects.create(
            user=request.user,
            action="order_created",
            content=f"{request.user.username} a acheté {product.title}"
        )
        serializer = OrderSerializer(order)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
    # 🔥🔥 CHECKOUT (Panier → Commande complète)
    @action(detail=False, methods=['post'])
    def checkout(self, request):
        try:
            cart = Cart.objects.get(
                user=request.user
            )
        except Cart.DoesNotExist:
            return Response(
                {"error": "Panier vide"},
                status=400
            )
        items = cart.items.all()
        if not items.exists():
            return Response(
                {"error": "Panier vide"},
                status=400
            )
        total_price = 0
        # CREATE ORDER
        order = Order.objects.create(
            user=request.user,
            status="pending"
        )
        # LOOP CART ITEMS
        for item in items:
            product = item.product
            price = product.price * item.quantity
            total_price += price
            # CREATE ORDER ITEM
            OrderItem.objects.create(
                order=order,
                product=product,
                price=product.price
            )
            # UPDATE SALES
            product.sales_count += item.quantity
            product.save()
            # CREATE ACTIVITY
            Activity.objects.create(
                user=request.user,
                action="order_created",
                content=f"{request.user.username} a acheté {product.title}"
            )
        # UPDATE TOTAL
        order.total_price = total_price
        order.save()
        # 🔥 VIDER PANIER
        items.delete()
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    # 🔥📦 MES PRODUITS ACHETÉS
    @action(detail=False, methods=['get'])
    def my_products(self, request):
        orders = Order.objects.filter(
            user=request.user,
            status="paid"
        )
        products = []
        for order in orders:
            items = OrderItem.objects.filter(
                order=order
            )
            for item in items:
                product = item.product
                products.append({
                    "product_id": product.id,
                    "title": product.title,
                    "file": (
                        product.file.url
                        if product.file
                        else None
                    )
                })
        return Response(products)
    # 🔐 DOWNLOAD SÉCURISÉ PRODUIT DIGITAL
    @action(
        detail=False,
        methods=['get'],
        url_path='download/(?P<product_id>[^/.]+)'
    )
    def download(self, request, product_id=None):
        user = request.user
        # 🔎 Chercher commandes payées
        orders = Order.objects.filter(
            user=user,
            status="paid"
        )
        has_access = False
        product_file = None
        # 🔎 Vérifier si produit acheté
        for order in orders:
            items = OrderItem.objects.filter(
                order=order,
                product_id=product_id
            )
            if items.exists():
                product = items.first().product
                if product.file:
                    has_access = True
                    product_file = product.file.path
                break
        # ❌ Accès refusé
        if not has_access:
            return Response(
                {"error": "Vous n'avez pas accès à ce produit"},
                status=403
            )
        # 📥 Télécharger fichier
        try:
            return FileResponse(
                open(product_file, 'rb'),
                as_attachment=True
            )
        except FileNotFoundError:
            raise Http404("Fichier introuvable")