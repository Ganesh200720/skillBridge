from rest_framework import serializers

from .models import Role, RoleSkill


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