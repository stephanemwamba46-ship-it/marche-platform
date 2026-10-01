from django.db import models
from django.conf import settings
from products.models import Product
User = settings.AUTH_USER_MODEL
class Earning(models.Model):
    seller = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="earnings"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    order = models.ForeignKey(
        "orders.Order",
        on_delete=models.CASCADE
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    commission = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    seller_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    def __str__(self):
        return f"{self.seller} - {self.amount}"