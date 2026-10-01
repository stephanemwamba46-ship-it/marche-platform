from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Product
from activities.models import Activity
from categories.models import Category
from .serializers import (
    ProductSerializer,
    CategorySerializer
)
# =========================
# CATEGORY VIEWSET
# =========================
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]
# =========================
# PRODUCT VIEWSET
# =========================
class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "slug"
    # =========================
    # QUERYSET + FILTERS
    # =========================
    def get_queryset(self):
        queryset = Product.objects.all()
        # 🔎 Recherche
        search = self.request.query_params.get(
            "search"
        )
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search)
                |
                Q(description__icontains=search)
            )
        # 📂 Catégorie
        category = self.request.query_params.get(
            "category"
        )
        if category:
            queryset = queryset.filter(
                category_id=category
            )
        # ⭐ Produits promus
        promoted = self.request.query_params.get(
            "promoted"
        )
        if promoted == "true":
            queryset = queryset.filter(
                is_promoted=True
            )
        return queryset
    # =========================
    # CREATE PRODUCT
    # =========================
    def perform_create(self, serializer):
        product = serializer.save(
            seller=self.request.user
        )
        Activity.objects.create(
            user=self.request.user,
            action="product_created",
            content=f"{self.request.user.username} a ajouté un produit : {product.title}"
        )
    # =========================
    # VIEW COUNT
    # =========================
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save()
        serializer = self.get_serializer(
            instance
        )
        return Response(
            serializer.data
        )
    # =========================
    # MES PRODUITS
    # =========================
    @action(
        detail=False,
        methods=["get"]
    )
    def my_products(self, request):
        products = Product.objects.filter(
            seller=request.user
        )
        serializer = self.get_serializer(
            products,
            many=True
        )
        return Response(
            serializer.data
        )
    # =========================
    # PRODUITS PROMUS
    # =========================
    @action(
        detail=False,
        methods=["get"]
    )
    def promoted(self, request):
        products = Product.objects.filter(
            is_promoted=True
        )
        serializer = self.get_serializer(
            products,
            many=True
        )
        return Response(
            serializer.data
        )