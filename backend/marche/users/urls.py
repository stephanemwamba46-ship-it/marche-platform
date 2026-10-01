from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    CompleteIndividualProfileView,
    CompleteCompanyProfileView,
    CompleteOrganizationProfileView,
    GetMyProfileView,
    password_reset,
    password_reset_confirm,
    reset_password,
    send_reset_code,
    verify_reset_code,
    reset_password,
    UpdateMyProfileView

)
urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("complete-individual-profile/", CompleteIndividualProfileView.as_view(), name="complete_individual_profile"),
    path("complete-company-profile/", CompleteCompanyProfileView.as_view(), name="complete_company_profile"),
    path("complete-organization-profile/", CompleteOrganizationProfileView.as_view(), name="complete_organization_profile"),
    path("my-profile/", GetMyProfileView.as_view(), name="my_profile"),
    path("password-reset/", password_reset),
    path("password-reset-confirm/", password_reset_confirm),
    path("reset-password/<uid>/<token>/",reset_password,name="reset-password"),
    path(
        "send-reset-code/",
        send_reset_code
    ),
    path(
        "verify-reset-code/",
        verify_reset_code
    ),
    path("reset-password/",reset_password),
    path(
    "update-my-profile/",
    UpdateMyProfileView.as_view(),
    name="update_my_profile"
),
]
