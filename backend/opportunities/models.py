from django.db import models

from skills.models import Skill


class Role(models.Model):
    title = models.CharField(
        max_length=150,
        unique=True,
    )

    description = models.TextField(
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    def __str__(self):
        return self.title


class RoleSkill(models.Model):

    class Importance(models.TextChoices):
        REQUIRED = "required", "Required"
        PREFERRED = "preferred", "Preferred"

    role = models.ForeignKey(
        Role,
        on_delete=models.CASCADE,
        related_name="role_skills",
    )

    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name="role_requirements",
    )

    importance = models.CharField(
        max_length=20,
        choices=Importance.choices,
        default=Importance.REQUIRED,
    )

    weight = models.FloatField(
        default=1.0,
    )

    minimum_score = models.FloatField(
        default=60,
    )

    class Meta:
        unique_together = ("role", "skill")

    def __str__(self):
        return (
            f"{self.role.title} - "
            f"{self.skill.name}"
        )