from rest_framework import serializers
from django.utils.text import slugify
from .models import (
    IndividualProfile,
    CompanyProfile,
    OrganizationProfile
)
# =========================
# INDIVIDUAL PROFILE
# =========================
class IndividualProfileSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = IndividualProfile
        exclude = ["user"]
    def validate_full_name(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Le nom complet est obligatoire."
            )
        return value.strip()
    def validate_country(self, value):
        return value.strip()
    def validate_city(self, value):
        return value.strip()
    def validate_address(self, value):
        if value:
            return value.strip()
        return value
# =========================
# COMPANY PROFILE
# =========================
class CompanyProfileSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = CompanyProfile
        exclude = ["user"]
    def validate_company_name(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Nom de l'entreprise obligatoire."
            )
        return value.strip()
    def validate_company_email(self, value):
        return value.lower()
    def validate_country(self, value):
        return value.strip()
    def validate_city(self, value):
        return value.strip()
    def create(self, validated_data):
        company_name = validated_data.get(
            "company_name"
        )
        validated_data["slug"] = slugify(
            company_name
        )
        return super().create(
            validated_data
        )
    def update(self, instance, validated_data):
        company_name = validated_data.get(
            "company_name"
        )
        if company_name:
            instance.slug = slugify(
                company_name
            )
        return super().update(
            instance,
            validated_data
        )
# =========================
# ORGANIZATION PROFILE
# =========================
class OrganizationProfileSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = OrganizationProfile
        exclude = ["user"]
    def validate_organization_name(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Nom de l'organisation obligatoire."
            )
        return value.strip()
    def validate_country(self, value):
        return value.strip()
    def create(self, validated_data):
        organization_name = validated_data.get(
            "organization_name"
        )
        validated_data["slug"] = slugify(
            organization_name
        )
        return super().create(
            validated_data
        )
    def update(self, instance, validated_data):
        organization_name = validated_data.get(
            "organization_name"
        )
        if organization_name:
            instance.slug = slugify(
                organization_name
            )
        return super().update(
            instance,
            validated_data
        )
    