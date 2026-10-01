from django.contrib.auth.models import AbstractUser
from django.db import models
# =========================
# USER MODEL
# =========================
class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )
    profile_photo = models.ImageField(
        upload_to="profile_photos/",
        blank=True,
        null=True
    )
    is_verified = models.BooleanField(
        default=False
    )
    profile_completed = models.BooleanField(
        default=False
    )
    has_created_activity = models.BooleanField(
        default=False
    )
    is_profile_locked = models.BooleanField(
        default=False
    )
    ACCOUNT_TYPE_CHOICES = (
        ("individual", "Individual"),
        ("company", "Company"),
        ("organization", "Organization"),
    )
    account_type = models.CharField(
        max_length=20,
        choices=ACCOUNT_TYPE_CHOICES,
        blank=True,
        null=True
    )
    rating = models.FloatField(default=0)
    total_reviews = models.IntegerField(default=0)
    is_seller = models.BooleanField(default=False)
    date_created = models.DateTimeField(
        auto_now_add=True
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    def __str__(self):
        return self.email
# =========================
# INDIVIDUAL PROFILE
# =========================
class IndividualProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="individual_profile"
    )
    full_name = models.CharField(
        max_length=255
    )
    country = models.CharField(
        max_length=100
    )
    city = models.CharField(
        max_length=100
    )
    address = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    description = models.TextField(
        blank=True,
        null=True
    )
    date_created = models.DateTimeField(
        auto_now_add=True
    )
    def __str__(self):
        return f"{self.full_name} ({self.user.email})"
# =========================
# COMPANY PROFILE
# =========================
class CompanyProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="company_profile"
    )
    company_name = models.CharField(
        max_length=255
    )
    slug = models.SlugField(
        unique=True,
        blank=True,
        null=True
    )
    headquarters_address = models.CharField(
        max_length=255
    )
    country = models.CharField(
        max_length=100
    )
    city = models.CharField(
        max_length=100
    )
    company_phone = models.CharField(
        max_length=20
    )
    company_email = models.EmailField()
    business_description = models.TextField(
        blank=True,
        null=True
    )
    date_created = models.DateTimeField(
        auto_now_add=True
    )
    def __str__(self):
        return f"{self.company_name} ({self.user.email})"
# =========================
# ORGANIZATION PROFILE
# =========================
class OrganizationProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="organization_profile"
    )
    organization_name = models.CharField(
        max_length=255
    )
    slug = models.SlugField(
        unique=True,
        blank=True,
        null=True
    )
    organization_type = models.CharField(
        max_length=100
    )
    responsible_person = models.CharField(
        max_length=255
    )
    country = models.CharField(
        max_length=100
    )
    description = models.TextField(
        blank=True,
        null=True
    )
    date_created = models.DateTimeField(
        auto_now_add=True
    )
    def __str__(self):
        return f"{self.organization_name} ({self.user.email})"
import random
from django.conf import settings
from django.db import models
from django.utils import timezone
from datetime import timedelta
class PasswordResetCode(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    code = models.CharField(
        max_length=6
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    def generate_code(self):
        return str(
            random.randint(100000, 999999)
        )
    def is_expired(self):
        return timezone.now() > (
            self.created_at + timedelta(minutes=1)
        )
    def __str__(self):
        return f"{self.user.email} - {self.code}"