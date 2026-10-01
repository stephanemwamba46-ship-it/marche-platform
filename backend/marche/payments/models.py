from django.db import models
from django.conf import settings
from orders.models import Order
User = settings.AUTH_USER_MODEL
class Payment(models.Model):
    PAYMENT_METHODS = (
        ('mobile_money', 'Mobile Money'),
        ('card', 'Card'),
        ('cash', 'Cash'),
    )
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHODS,
        default='mobile_money'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    transaction_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    def __str__(self):
        return f"Payment {self.id} - {self.status}"