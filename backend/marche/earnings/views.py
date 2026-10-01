from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import timedelta
from .models import Earning
class EarningViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    # 📊 DASHBOARD VENDEUR
    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        # 🔥 Earnings du vendeur
        earnings = Earning.objects.filter(
            seller=request.user
        )
        # 💰 TOTAL EARNINGS
        total_earnings = earnings.aggregate(
            total=Sum("seller_amount")
        )["total"] or 0
        # 📦 TOTAL SALES (nombre total ventes)
        total_sales = earnings.count()
        # 📦 TOTAL PRODUITS VENDUS
        # 👉 maintenant logique correcte
        total_products_sold = earnings.count()
        # 📊 STATS PRODUITS (SANS DOUBLONS)
        products_queryset = earnings.values(
            "product__title"
        ).annotate(
            sales_count=Count("id"),
            earnings_total=Sum("seller_amount")
        ).order_by("-sales_count")[:5]
        products_stats = []
        for p in products_queryset:
            products_stats.append({
                "product_name": p["product__title"],
                "sales_count": p["sales_count"],
                "earnings_total": float(
                    p["earnings_total"] or 0
                )
            })
        # 📈 CROISSANCE (7 DERNIERS JOURS)
        today = timezone.now()
        growth = []
        for i in range(6, -1, -1):
            day = today - timedelta(days=i)
            day_total = earnings.filter(
                created_at__date=day.date()
            ).aggregate(
                total=Sum("seller_amount")
            )["total"] or 0
            growth.append({
                "date": day.strftime("%Y-%m-%d"),
                "earnings": float(day_total)
            })
        # 🚀 RESPONSE PROPRE FRONTEND
        return Response({
            # 💰 KPI PRINCIPAL
            "total_earnings": float(total_earnings),
            "total_sales": total_sales,
            "total_products_sold": total_products_sold,
            # 📊 PRODUITS LES PLUS VENDUS
            "products_stats": products_stats,
            # 📈 GRAPHIQUE CROISSANCE
            "growth": growth
        })
    # 📜 HISTORIQUE VENTES VENDEUR
    @action(detail=False, methods=['get'])
    def my_earnings(self, request):
        earnings = Earning.objects.filter(
            seller=request.user
        ).order_by("-created_at")
        data = []
        for e in earnings:
            data.append({
                "product": e.product.title,
                "order_id": e.order.id,
                "amount": float(e.amount),
                "commission": float(e.commission),
                "seller_amount": float(e.seller_amount),
                "date": e.created_at.strftime(
                    "%Y-%m-%d %H:%M"
                )
            })
        return Response({
            "earnings": data
        })