from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Count
from datetime import timedelta
from django.utils import timezone
from orders.models import Order
from products.models import Product
from earnings.models import Earning
@api_view(['GET'])
def global_dashboard(request):
    # 💰 TOTAL EARNINGS
    total_earnings = Earning.objects.aggregate(
        total=Sum("amount")
    )["total"] or 0
    # 📦 TOTAL SALES
    total_sales = Order.objects.filter(
        status="paid"
    ).count()
    # 🏆 TOP PRODUCTS
    top_products = Product.objects.order_by(
        "-sales_count"
    )[:5]
    top_products_data = []
    for p in top_products:
        top_products_data.append({
            "title": p.title,
            "sales": p.sales_count,
            "earnings": float(p.price * p.sales_count)
        })
    # 📈 GROWTH (7 jours)
    today = timezone.now()
    growth = []
    for i in range(7):
        day = today - timedelta(days=i)
        daily_sales = Order.objects.filter(
            status="paid",
            created_at__date=day.date()
        ).count()
        growth.append({
            "date": day.strftime("%Y-%m-%d"),
            "sales": daily_sales
        })
    growth.reverse()
    # 📊 RESPONSE FINAL
    return Response({
        "total_earnings": float(total_earnings),
        "total_sales": total_sales,
        "top_products": top_products_data,
        "growth": growth,
        "total_products": Product.objects.count(),
    })