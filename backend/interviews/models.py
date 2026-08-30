from django.conf import settings
from django.db import models


class AIInterview(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="ai_interviews",
        limit_choices_to={"role": "student"},
    )

    ai_interview_id = models.PositiveIntegerField(
        unique=True,
    )

    subject = models.CharField(
        max_length=200,
    )

    status = models.CharField(
        max_length=30,
        default="in_progress",
    )

    score = models.IntegerField(
        null=True,
        blank=True,
    )

    feedback = models.TextField(
        blank=True,
    )

    areas_of_improvement = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return (
            f"{self.student.username} - "
            f"AI Interview #{self.ai_interview_id}"
        )