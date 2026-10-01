from django.contrib import admin
from .models import (
    User,
    IndividualProfile,
    CompanyProfile,
    OrganizationProfile
)
# =========================
# USER ADMIN
# =========================
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "username",
        "account_type",
        "profile_completed",
        "is_seller",
        "is_verified",
        "date_created"
    )
    list_filter = (
        "account_type",
        "profile_completed",
        "is_seller",
        "is_verified"
    )
    search_fields = (
        "email",
        "username"
    )
    ordering = (
        "-date_created",
    )
# =========================
# INDIVIDUAL PROFILE ADMIN
# =========================
@admin.register(IndividualProfile)
class IndividualProfileAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "country",
        "city",
        "user"
    )
    search_fields = (
        "full_name",
        "city"
    )
# =========================
# COMPANY PROFILE ADMIN
# =========================
@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = (
        "company_name",
        "country",
        "city",
        "company_email",
        "user"
    )
    search_fields = (
        "company_name",
        "company_email"
    )
# =========================
# ORGANIZATION PROFILE ADMIN
# =========================
@admin.register(OrganizationProfile)
class OrganizationProfileAdmin(admin.ModelAdmin):
    list_display = (
        "organization_name",
        "organization_type",
        "country",
        "user"
    )
    search_fields = (
        "organization_name",
    )