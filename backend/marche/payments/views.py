from django.shortcuts import render
import uuid
from decimal import Decimal
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Payment
from .serializers import PaymentSerializer
from orders.models import Order, OrderItem
from activities.models import Activity
from notifications.models import Notification
# 💰 EARNINGS
from earnings.models import Earning
# 💰 COMMISSION (depuis product model pour rester cohérent)
from products.models import COMMISSION_RATE
class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Payment.objects.filter(
            user=self.request.user
        )
    # 🔥 PAY ORDER
    @action(detail=False, methods=['post'])
    def pay(self, request):
        order_id = request.data.get("order_id")
        try:
            order = Order.objects.get(
                id=order_id,
                user=request.user
            )
        except Order.DoesNotExist:
            return Response(
                {"error": "Commande introuvable"},
                status=404
            )
        # PROTECTION DOUBLE PAIEMENT
        if order.status == "paid":
            return Response(
                {"error":"Commande déjà payée."},
                status=400
            )
        # CREATE PAYMENT
        payment = Payment.objects.create(
            user=request.user,
            order=order,
            amount=order.total_price,
            status="completed",
            transaction_id=str(uuid.uuid4())
        )
        # UPDATE ORDER STATUS
        order.status = "paid"
        order.save()
        #CREATE NOTIFICATION
        Notification.objects.create(
            user=request.user,
            title="Paiement comfirmé",
            message=f"Votre paiement pour la commande {order.id} a été effectué avec succès."
            )
        for item in order.items.all():
            product = item.product
            seller = product.seller
            Notification.objects.create(
                user=seller,
                title="Nouvelle vente",
                message=(
                    f"Vous avez vendu'{product.title}'"
                )
            )
        # 💰 CREATE EARNINGS AUTOMATIQUEMENT
        items = OrderItem.objects.filter(order=order)
        for item in items:
            product = item.product
            seller = product.seller
            amount = Decimal(str(item.price))
            commission = amount * COMMISSION_RATE
            seller_amount = amount - commission
            Earning.objects.create(
                seller=seller,
                product=product,
                order=order,
                amount=amount,
                commission=commission,
                seller_amount=seller_amount
            )
        #UPDATE PRODUCT SALES COUNT
        product.sales_count +=1
        product.save()
        # 📡 CREATE ACTIVITY
        Activity.objects.create(
            user=request.user,
            action="payment_completed",
            content=f"{request.user.username} a payé la commande {order.id}"
        )
        
        serializer = PaymentSerializer(payment)
        return Response(serializer.data)