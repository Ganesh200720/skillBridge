from django.conf import settings
from django.db import models

from skills.models import Skill


class StudentSkill(models.Model):

    class Level(models.TextChoices):
        BEGINNER = "beginner", "Beginner"
        INTERMEDIATE = "intermediate", "Intermediate"
        ADVANCED = "advanced", "Advanced"
        EXPERT = "expert", "Expert"

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="student_skills",
        limit_choices_to={"role": "student"},
    )

    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name="student_skills",
    )

    score = models.FloatField(default=0)

    confidence = models.FloatField(default=0)

    evidence_count = models.PositiveIntegerField(default=0)

    level = models.CharField(
        max_length=20,
        choices=Level.choices,
        default=Level.BEGINNER,
    )

    last_assessed = models.DateTimeField(
        null=True,
        blank=True,
    )

    class Meta:
        unique_together = ("student", "skill")

    def __str__(self):
        return (
            f"{self.student.username} - "
            f"{self.skill.name}: {self.score}"
        )