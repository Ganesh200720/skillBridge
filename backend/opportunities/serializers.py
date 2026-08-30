from rest_framework import serializers
from .models import (
    Role,
    RoleSkill,
    Opportunity,
    OpportunitySkill,
)


class RoleSkillSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(
        source="skill.name",
        read_only=True,
    )

    class Meta:
        model = RoleSkill

        fields = [
            "skill",
            "skill_name",
            "importance",
            "weight",
            "minimum_score",
        ]


class RoleSerializer(serializers.ModelSerializer):
    skills = RoleSkillSerializer(
        source="role_skills",
        many=True,
        read_only=True,
    )

    class Meta:
        model = Role

        fields = [
            "id",
            "title",
            "description",
            "skills",
        ]

class OpportunitySkillSerializer(serializers.ModelSerializer):

    skill_name = serializers.CharField(
        source="skill.name",
        read_only=True,
    )

    class Meta:
        model = OpportunitySkill

        fields = [
            "skill",
            "skill_name",
            "importance",
            "minimum_score",
        ]


class OpportunitySerializer(serializers.ModelSerializer):

    industry_name = serializers.CharField(
        source="industry.username",
        read_only=True,
    )

    skills = OpportunitySkillSerializer(
        source="opportunity_skills",
        many=True,
        read_only=True,
    )

    class Meta:
        model = Opportunity

        fields = [
            "id",
            "title",
            "description",
            "opportunity_type",
            "location",
            "duration",
            "application_deadline",
            "is_active",
            "created_at",
            "industry_name",
            "skills",
        ]