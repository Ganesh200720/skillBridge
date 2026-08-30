from django.contrib import admin

from .models import SkillTest, Question, Attempt, Answer, SkillResult


@admin.register(SkillTest)
class SkillTestAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "skill",
        "title",
        "duration_minutes",
        "is_active",
    )
    list_filter = ("skill", "is_active")


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "test",
        "difficulty",
        "topic",
        "text",
    )
    list_filter = (
        "test",
        "difficulty",
        "topic",
    )


@admin.register(Attempt)
class AttemptAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "student",
        "test",
        "score",
        "completed",
        "started_at",
    )
    list_filter = (
        "test",
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
    list_filter = (
        "is_correct",
    )


@admin.register(SkillResult)
class SkillResultAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "attempt",
        "skill",
        "score",
        "correct_answers",
        "total_questions",
        "confidence",
    )
    list_filter = (
        "skill",
    )