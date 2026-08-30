from rest_framework import serializers

from .models import StudentSkill


class StudentSkillSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(
        source="skill.name",
        read_only=True,
    )

    skill_category = serializers.CharField(
        source="skill.category",
        read_only=True,
    )

    class Meta:
        model = StudentSkill

        fields = [
            "skill",
            "skill_name",
            "skill_category",
            "score",
            "confidence",
            "level",
            "evidence_count",
            "last_assessed",
        ]