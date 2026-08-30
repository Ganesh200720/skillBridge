from rest_framework import serializers

from .models import (
    SkillTest,
    Question,
    SkillResult,
    TopicResult,
)


class QuestionSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(
        source="test.skill.name",
        read_only=True,
    )

    class Meta:
        model = Question

        fields = [
            "id",
            "skill_name",
            "text",
            "option_a",
            "option_b",
            "option_c",
            "option_d",
            "difficulty",
            "topic",
            "weight",
        ]


class SkillTestSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(
        source="skill.name",
        read_only=True,
    )

    questions = QuestionSerializer(
        many=True,
        read_only=True,
    )

    question_count = serializers.SerializerMethodField()

    class Meta:
        model = SkillTest

        fields = [
            "id",
            "skill",
            "skill_name",
            "title",
            "description",
            "duration_minutes",
            "question_count",
            "questions",
        ]

    def get_question_count(self, obj):
        return obj.questions.count()


class AnswerSubmissionSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()

    selected_answer = serializers.ChoiceField(
        choices=["A", "B", "C", "D"]
    )


class SkillTestSubmitSerializer(serializers.Serializer):
    answers = AnswerSubmissionSerializer(
        many=True
    )

class TopicResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = TopicResult

        fields = [
            "topic",
            "score",
            "correct_answers",
            "total_questions",
        ]


class SkillResultSerializer(serializers.ModelSerializer):

    skill_name = serializers.CharField(
        source="skill.name",
        read_only=True,
    )

    topic_results = TopicResultSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = SkillResult

        fields = [
            "id",
            "skill",
            "skill_name",
            "score",
            "correct_answers",
            "total_questions",
            "confidence",
            "created_at",
            "topic_results",
        ]