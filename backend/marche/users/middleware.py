from django.shortcuts import redirect
from django.urls import reverse
class ProfileCompletionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
        if request.user.is_authenticated:
            user = request.user
            # Vérifie si activité créée
            if user.has_created_activity:
                # Vérifie si profil complété
                if not user.profile_completed:
                    allowed_paths = [
                        reverse(
                            "complete_individual_profile"
                        ),
                        reverse(
                            "complete_company_profile"
                        ),
                        reverse(
                            "complete_organization_profile"
                        ),
                    ]
                    if request.path not in allowed_paths:
                        if user.account_type == "individual":
                            return redirect(
                                "complete_individual_profile"
                            )
                        elif user.account_type == "company":
                            return redirect(
                                "complete_company_profile"
                            )
                        elif user.account_type == "organization":
                            return redirect(
                                "complete_organization_profile"
                            )
        response = self.get_response(request)
        return response