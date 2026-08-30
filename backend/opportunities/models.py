from django.conf import settings
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


class Opportunity(models.Model):

    class OpportunityType(models.TextChoices):
        INTERNSHIP = "internship", "Internship"
        RESEARCH = "research", "Research"
        TRAINING = "training", "Training"
        WORKSHOP = "workshop", "Workshop"
        PROJECT = "project", "Project"
        PLACEMENT = "placement", "Placement"

    industry = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posted_opportunities",
        limit_choices_to={"role": "industry"},
    )

    title = models.CharField(
        max_length=200,
    )

    description = models.TextField(
        blank=True,
    )

    opportunity_type = models.CharField(
        max_length=20,
        choices=OpportunityType.choices,
    )

    location = models.CharField(
        max_length=200,
        blank=True,
    )

    duration = models.CharField(
        max_length=100,
        blank=True,
    )

    application_deadline = models.DateField(
        null=True,
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return self.title


class OpportunitySkill(models.Model):

    class Importance(models.TextChoices):
        REQUIRED = "required", "Required"
        PREFERRED = "preferred", "Preferred"

    opportunity = models.ForeignKey(
        Opportunity,
        on_delete=models.CASCADE,
        related_name="opportunity_skills",
    )

    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name="opportunity_requirements",
    )

    importance = models.CharField(
        max_length=20,
        choices=Importance.choices,
        default=Importance.REQUIRED,
    )

    minimum_score = models.FloatField(
        default=60,
    )

    class Meta:
        unique_together = (
            "opportunity",
            "skill",
        )

    def __str__(self):
        return (
            f"{self.opportunity.title} - "
            f"{self.skill.name}"
        )