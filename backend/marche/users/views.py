from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import IndividualProfile, CompanyProfile, OrganizationProfile
from .serializers import IndividualProfileSerializer, CompanyProfileSerializer, OrganizationProfileSerializer
User = get_user_model()
# =========================
# REGISTER
# =========================
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        username = request.data.get("username")
        password = request.data.get("password")
        if not email or not password:
            return Response(
                {"error": "Email et mot de passe requis"},
                status=status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.create_user(
            email=email,
            username=username,
            password=password
        )
        return Response(
            {"message": "Utilisateur créé"},
            status=status.HTTP_201_CREATED
        )
# =========================
# LOGIN
# =========================
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "Utilisateur introuvable"},
                status=status.HTTP_404_NOT_FOUND
            )
        if not user.check_password(password):
            return Response(
                {"error": "Mot de passe incorrect"},
                status=status.HTTP_400_BAD_REQUEST
            )
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })
# =========================
# PROFILE COMPLETION BASE
# =========================
class BaseProfileUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    def perform_update(self, serializer):
        user = self.request.user
        serializer.save(user=user)
        user.profile_completed = True
        user.save()
# =========================
# INDIVIDUAL PROFILE
# =========================
class CompleteIndividualProfileView(BaseProfileUpdateView):
    serializer_class = IndividualProfileSerializer
    def get_object(self):
        profile, created = IndividualProfile.objects.get_or_create(
            user=self.request.user
        )
        return profile
    def perform_update(self, serializer):
        user = self.request.user
        if user.account_type and user.account_type != "individual":
            raise Exception("Vous avez déjà choisi un autre type de compte.")
        serializer.save(user=user)
        user.account_type = "individual"
        user.profile_completed = True
        user.save()
# =========================
# COMPANY PROFILE
# =========================
class CompleteCompanyProfileView(BaseProfileUpdateView):
    serializer_class = CompanyProfileSerializer
    def get_object(self):
        profile, created = CompanyProfile.objects.get_or_create(
            user=self.request.user
        )
        return profile
    def perform_update(self, serializer):
        user = self.request.user
        if user.account_type and user.account_type != "company":
            raise Exception("Vous avez déjà choisi un autre type de compte.")
        serializer.save(user=user)
        user.account_type = "company"
        user.profile_completed = True
        user.save()
# =========================
# ORGANIZATION PROFILE
# =========================
class CompleteOrganizationProfileView(BaseProfileUpdateView):
    serializer_class = OrganizationProfileSerializer
    def get_object(self):
        profile, created = OrganizationProfile.objects.get_or_create(
            user=self.request.user
        )
        return profile
    def perform_update(self, serializer):
        user = self.request.user
        if user.account_type and user.account_type != "organization":
            raise Exception("Vous avez déjà choisi un autre type de compte.")
        serializer.save(user=user)
        user.account_type = "organization"
        user.profile_completed = True
        user.save()
# =========================
# GET MY PROFILE
# =========================
class GetMyProfileView(APIView):
    permission_classes = [IsAuthenticated]
        # PUT UPDATE USER PROFILE
    # =========================
    def put(self, request):
        user = request.user
        username = request.data.get("username")
        email = request.data.get("email")
        if username:
            user.username = username
        if email:
            user.email = email
        user.save()
        return Response({
            "message": "Profil mis à jour avec succès",
            "username": user.username,
            "email": user.email
        })
    def get(self, request):
        user = request.user
        data = {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "account_type": user.account_type,
            "profile_completed": user.profile_completed,
        }
        # Si profil déjà créé
        if user.account_type == "individual" and hasattr(user, "individual_profile"):
            profile = user.individual_profile
            serializer = IndividualProfileSerializer(profile)
            data["profile"] = serializer.data
        elif user.account_type == "company" and hasattr(user, "company_profile"):
            profile = user.company_profile
            serializer = CompanyProfileSerializer(profile)
            data["profile"] = serializer.data
        elif user.account_type == "organization" and hasattr(user, "organization_profile"):
            profile = user.organization_profile
            serializer = OrganizationProfileSerializer(profile)
            data["profile"] = serializer.data
        else:
            # Profil pas encore complété
            data["profile"] = None
        return Response(data)
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
reset_tokens = {}
@api_view(["POST"])
def password_reset(request):
    email = request.data.get("email")
    try:
        user = User.objects.get(email=email)
        token = get_random_string(50)
        reset_tokens[token] = user.username
        reset_link = f"http://localhost:5173/reset-password/{token}"
        send_mail(
            "Réinitialisation mot de passe - Marché",
            f"Cliquez ici pour réinitialiser votre mot de passe: {reset_link}",
            "no-reply@marche.com",
            [email],
            fail_silently=False,
        )
        return Response(
            {"message": "Lien envoyé par email"},
            status=status.HTTP_200_OK
        )
    except User.DoesNotExist:
        return Response(
            {"message": "Email introuvable"},
            status=status.HTTP_404_NOT_FOUND
        )
@api_view(["POST"])
def password_reset_confirm(request):
    token = request.data.get("token")
    password = request.data.get("password")
    username = reset_tokens.get(token)
    if not username:
        return Response(
            {"message": "Token invalide"},
            status=status.HTTP_400_BAD_REQUEST
        )
    user = User.objects.get(username=username)
    user.set_password(password)
    user.save()
    del reset_tokens[token]
    return Response(
        {"message": "Mot de passe réinitialisé"},
        status=status.HTTP_200_OK
    )
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
@api_view(["POST"])
def reset_password(request, uid, token):
    try:
        uid = urlsafe_base64_decode(uid).decode()
        user = User.objects.get(pk=uid)
        if default_token_generator.check_token(user, token):
            password = request.data.get("password")
            user.set_password(password)
            user.save()
            return Response({
                "message": "Mot de passe changé"
            })
        else:
            return Response({
                "error": "Token invalide"
            }, status=400)
    except Exception:
        return Response({
            "error": "Erreur reset password"
        }, status=400)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.utils import timezone
from .models import PasswordResetCode
import random
User = get_user_model()
@api_view(["POST"])
def send_reset_code(request):
    email = request.data.get("email")
    if not email:
        return Response(
            {"error": "Email requis"},
            status=400
        )
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "Utilisateur non trouvé"},
            status=404
        )
    # Supprimer anciens codes
    PasswordResetCode.objects.filter(
        user=user
    ).delete()
    # Générer code
    code = str(
        random.randint(100000, 999999)
    )
    # Sauvegarder
    PasswordResetCode.objects.create(
        user=user,
        code=code
    )
    # Envoyer email
    send_mail(
        subject="Code de réinitialisation",
        message=f"Votre code est : {code}",
        from_email="noreply@marche.com",
        recipient_list=[email],
        fail_silently=False,
    )
    return Response({
        "message": "Code envoyé avec succès"
    })
@api_view(["POST"])
def verify_reset_code(request):
    email = request.data.get("email")
    code = request.data.get("code")
    try:
        user = User.objects.get(email=email)
        reset = PasswordResetCode.objects.get(
            user=user,
            code=code
        )
        if reset.is_expired():
            reset.delete()
            return Response(
                {"error": "Code expiré"},
                status=400
            )
        return Response({
            "message": "Code valide"
        })
    except PasswordResetCode.DoesNotExist:
        return Response(
            {"error": "Code invalide"},
            status=400
        )
@api_view(["POST"])
def reset_password(request):
    email = request.data.get("email")
    code = request.data.get("code")
    new_password = request.data.get("new_password")
    try:
        user = User.objects.get(email=email)
        reset = PasswordResetCode.objects.get(
            user=user,
            code=code
        )
        if reset.is_expired():
            reset.delete()
            return Response(
                {"error": "Code expiré"},
                status=400
            )
        user.set_password(new_password)
        user.save()
        reset.delete()
        return Response({
            "message": "Mot de passe modifié"
        })
    except PasswordResetCode.DoesNotExist:
        return Response(
            {"error": "Code invalide"},
            status=400
        )
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
class UpdateMyProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        user = request.user
        # créer profil si absent
        profile, created = IndividualProfile.objects.get_or_create(
            user=user
        )
        serializer = IndividualProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )