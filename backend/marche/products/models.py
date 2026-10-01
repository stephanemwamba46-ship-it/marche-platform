import uuid
import random
import string
from django.db import models
from django.conf import settings
from django.utils import timezone
from categories.models import Category
from decimal import Decimal
User = settings.AUTH_USER_MODEL
# =========================
# CONSTANTES BUSINESS
# =========================
COMMISSION_RATE = Decimal("0.20")
MAX_FREE_PHYSICAL_PRODUCTS = 20
# =========================
# GÉNÉRATEUR SLUG COURT
# =========================
def commission_amount(self):
    return self.price*COMMISSION_RATE
def generate_short_slug(length=16):
    """Slug court sécurisé (14–16 recommandé)"""
    characters = string.ascii_lowercase + string.digits
    while True:
        slug = ''.join(random.choices(characters, k=length))
        if not Product.objects.filter(slug=slug).exists():
            return slug
# =========================
# CATEGORY
# =========================
category = models.ForeignKey(
    "categories.Category",
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name="products"
)
# =========================
# PRODUCT
# =========================
class Product(models.Model):
    PRODUCT_TYPE_CHOICES = [
        ("digital", "Digital"),
        ("physical", "Physical"),
        ("service", "Service"),
        ("job", "Job"),
    ]
    seller = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="products"
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    product_type = models.CharField(
        max_length=20,
        choices=PRODUCT_TYPE_CHOICES
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    promo_price = models.DecimalField(
    max_digits=10,
    decimal_places=2,
    null=True,
    blank=True
    )
    # IMAGE PRODUIT
    image = models.ImageField(
        upload_to="products/images/",
        null=True,
        blank=True
    )
    # PRODUIT DIGITAL
    digital_file = models.FileField(
        upload_to="products/digital/",
        null=True,
        blank=True
    )
    # WHATSAPP (pour produits physiques)
    whatsapp_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )
    # PROMOTION
    is_promoted = models.BooleanField(default=False)
    promotion_end = models.DateTimeField(
        null=True,
        blank=True
    )
    # SLUG COURT
    slug = models.CharField(
        max_length=16,
        unique=True,
        blank=True
    )
    # STATS PRODUIT
    views_count = models.PositiveIntegerField(default=0)
    sales_count = models.PositiveIntegerField(default=0)
    # DATE
    created_at = models.DateTimeField(
        default=timezone.now
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )
    file = models.FileField(
    upload_to='products/files/',
    blank=True,
    null=True
    )
    # =========================
    # SAVE LOGIC
    # =========================
    def save(self, *args, **kwargs):
        # Générer slug court
        if not self.slug:
            self.slug = generate_short_slug()
        # Vérifier limite produits physiques
        if self.product_type == "physical":
            physical_count = Product.objects.filter(
                seller=self.seller,
                product_type="physical"
            ).count()
            if (
                physical_count >= MAX_FREE_PHYSICAL_PRODUCTS
                and not self.pk
            ):
                raise ValueError(
                    "Limite produits physiques atteinte."
                )
        super().save(*args, **kwargs)
    # =========================
    # COMMISSION
    # =========================
    def get_commission(self):
        return self.price * COMMISSION_RATE
    def get_seller_amount(self):
        return self.price - self.get_commission()
    # =========================
    # WHATSAPP LINK
    # =========================
    def get_whatsapp_link(self):
        if not self.whatsapp_number:
            return None
        message = (
            f"Bonjour,%0A"
            f"Je vous contacte depuis l'application marche.%0A"
            f"Je veux acheter:%0A"
            f"Produit: {self.title}%0A"
            f"Prix: {self.price}$"
        )
        return (
            f"https://wa.me/"
            f"{self.whatsapp_number}"
            f"?text={message}"
        )
    def __str__(self):
        return self.title