from django.http import JsonResponse
from django.urls import path

from accounts.views import LoginView, MeView


def health_check(request):
    return JsonResponse({
        "status": "ok",
        "service": "skillbridge-backend",
    })


urlpatterns = [
    path("health/", health_check, name="health"),

    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/me/", MeView.as_view(), name="me"),
]