from django.http import JsonResponse
from django.urls import path

from accounts.views import LoginView, MeView
from assessments.views import (
    SkillTestListView,
    SkillTestDetailView,
    SkillTestStartView,
    SkillTestSubmitView,
)
from students.views import SkillTwinView
from opportunities.views import (
    RoleListView,
    RoleDetailView,
    RoleRecommendationView,
)
def health_check(request):
    return JsonResponse({
        "status": "ok",
        "service": "skillbridge-backend",
    })


urlpatterns = [
    path("health/", health_check, name="health"),

    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/me/", MeView.as_view(), name="me"),
    path(
    "skill-tests/",
    SkillTestListView.as_view(),
    name="skill-test-list",
    ),

    path(
        "skill-tests/<int:test_id>/",
        SkillTestDetailView.as_view(),
        name="skill-test-detail",
    ),

    path(
        "skill-tests/<int:test_id>/start/",
        SkillTestStartView.as_view(),
        name="skill-test-start",
    ),

    path(
        "skill-tests/attempts/<int:attempt_id>/submit/",
        SkillTestSubmitView.as_view(),
        name="skill-test-submit",
    ),
    path(
        "skill-twin/",
        SkillTwinView.as_view(),
        name="skill-twin",
    ),
    path(
        "roles/",
        RoleListView.as_view(),
        name="role-list",
    ),

    path(
        "roles/recommendations/",
        RoleRecommendationView.as_view(),
        name="role-recommendations",
    ),
    
    path(
        "roles/<int:role_id>/",
        RoleDetailView.as_view(),
        name="role-detail",
    ),
]

