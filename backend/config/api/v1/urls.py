from django.http import JsonResponse
from django.urls import path

from accounts.views import LoginView, MeView
from assessments.views import (
    SkillTestListView,
    SkillTestDetailView,
    SkillTestStartView,
    SkillTestSubmitView,
    AssessmentHistoryView,
)
from students.views import (
    TeacherStudentListView,
    SkillTwinView,
    TeacherStudentDetailView,
    InstitutionStudentListView,
    InstitutionOpportunityListView,
)

from opportunities.views import (
    RoleListView,
    RoleDetailView,
    RoleRecommendationView,
    IndustryOpportunityListView,
    IndustryOpportunityDetailView,
    TeacherOpportunityListView,
    TeacherOpportunityMatchesView,
    StudentOpportunityListView,
)

from learning.views import NextSkillView

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

    path(
        "learning/next/",
        NextSkillView.as_view(),
        name="next-skill",
    ),

    path(
        "assessment-history/",
        AssessmentHistoryView.as_view(),
        name="assessment-history",
    ),

    path(
        "industry/opportunities/",
        IndustryOpportunityListView.as_view(),
        name="industry-opportunity-list",
    ),

    path(
        "industry/opportunities/<int:opportunity_id>/",
        IndustryOpportunityDetailView.as_view(),
        name="industry-opportunity-detail",
    ),

    path(
        "teacher/students/",
        TeacherStudentListView.as_view(),
        name="teacher-students",
    ),

    path(
        "teacher/students/<int:student_id>/",
        TeacherStudentDetailView.as_view(),
        name="teacher-student-detail",
    ),

    path(
        "teacher/opportunities/",
        TeacherOpportunityListView.as_view(),
        name="teacher-opportunities",
    ),

    path(
        "teacher/opportunities/<int:opportunity_id>/matches/",
        TeacherOpportunityMatchesView.as_view(),
        name="teacher-opportunity-matches",
    ),

    path(
        "student/opportunities/",
        StudentOpportunityListView.as_view(),
    ),

    path(
        "institution/students/",
        InstitutionStudentListView.as_view(),
        name="institution-students",
    ),

    path(
        "institution/opportunities/",
        InstitutionOpportunityListView.as_view(),
        name="institution-opportunities",
    ),
]


