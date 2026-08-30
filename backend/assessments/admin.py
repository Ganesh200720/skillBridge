from django.contrib import admin

from .models import Assessment, Question, Attempt, Answer


@admin.register(Assessment)
class AssessmentAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "is_active")


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("id", "skill", "assessment", "text")
    list_filter = ("skill", "assessment")


@admin.register(Attempt)
class AttemptAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "student",
        "assessment",
        "score",
        "completed",
    )


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "attempt",
        "question",
        "selected_answer",
        "is_correct",
    )