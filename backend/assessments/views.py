from django.db import transaction
from django.utils import timezone

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from students.models import StudentSkill

from .models import (
    SkillTest,
    Attempt,
    Answer,
    SkillResult,
    TopicResult,
)

from .serializers import (
    SkillTestSerializer,
    SkillTestSubmitSerializer,
    SkillResultSerializer,
)


class SkillTestListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tests = (
            SkillTest.objects
            .filter(is_active=True)
            .select_related("skill")
        )

        return Response(
            SkillTestSerializer(
                tests,
                many=True,
            ).data
        )


class SkillTestDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, test_id):

        try:
            test = (
                SkillTest.objects
                .select_related("skill")
                .prefetch_related("questions")
                .get(
                    id=test_id,
                    is_active=True,
                )
            )

        except SkillTest.DoesNotExist:
            return Response(
                {"detail": "Skill test not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            SkillTestSerializer(test).data
        )


class SkillTestStartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, test_id):

        if request.user.role != "student":
            return Response(
                {
                    "detail":
                    "Only students can take skill tests."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            test = SkillTest.objects.get(
                id=test_id,
                is_active=True,
            )

        except SkillTest.DoesNotExist:
            return Response(
                {"detail": "Skill test not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Prevent multiple unfinished attempts
        existing_attempt = (
            Attempt.objects
            .filter(
                student=request.user,
                test=test,
                completed=False,
            )
            .order_by("-started_at")
            .first()
        )

        if existing_attempt:
            return Response(
                {
                    "attempt_id": existing_attempt.id,
                    "test_id": test.id,
                    "skill": test.skill.name,
                    "started_at":
                        existing_attempt.started_at,
                    "resumed": True,
                },
                status=status.HTTP_200_OK,
            )

        attempt = Attempt.objects.create(
            student=request.user,
            test=test,
        )

        return Response(
            {
                "attempt_id": attempt.id,
                "test_id": test.id,
                "skill": test.skill.name,
                "started_at": attempt.started_at,
                "resumed": False,
            },
            status=status.HTTP_201_CREATED,
        )


class SkillTestSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, attempt_id):

        if request.user.role != "student":
            return Response(
                {
                    "detail": "Only students can submit skill tests."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            attempt = (
                Attempt.objects
                .select_related(
                    "student",
                    "test",
                    "test__skill",
                )
                .get(
                    id=attempt_id,
                    student=request.user,
                )
            )

        except Attempt.DoesNotExist:
            return Response(
                {"detail": "Attempt not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if attempt.completed:
            return Response(
                {
                    "detail": "This attempt has already been submitted."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = SkillTestSubmitSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        submitted_answers = (
            serializer.validated_data["answers"]
        )

        questions = {
            question.id: question
            for question in attempt.test.questions.all()
        }

        if not questions:
            return Response(
                {
                    "detail": "This test has no questions."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        seen_questions = set()

        weighted_score = 0
        total_weight = 0
        correct_count = 0

        # topic -> statistics
        topic_stats = {}

        for item in submitted_answers:

            question_id = item["question_id"]

            selected_answer = item["selected_answer"]

            # Prevent duplicate answers
            if question_id in seen_questions:
                continue

            seen_questions.add(question_id)

            question = questions.get(question_id)

            # Ignore question IDs that don't belong
            # to this test.
            if not question:
                continue

            is_correct = (
                selected_answer
                == question.correct_answer
            )

            Answer.objects.create(
                attempt=attempt,
                question=question,
                selected_answer=selected_answer,
                is_correct=is_correct,
            )

            weight = question.weight

            total_weight += weight

            if is_correct:
                correct_count += 1
                weighted_score += weight

            # -----------------------------------------
            # Topic statistics
            # -----------------------------------------

            topic = question.topic or "General"

            if topic not in topic_stats:
                topic_stats[topic] = {
                    "correct": 0,
                    "total": 0,
                }

            topic_stats[topic]["total"] += 1

            if is_correct:
                topic_stats[topic]["correct"] += 1

        # ------------------------------------------------
        # Require every question to be answered
        # ------------------------------------------------

        if len(seen_questions) != len(questions):
            return Response(
                {
                    "detail":
                        "Please answer all questions before submitting.",

                    "answered_questions":
                        len(seen_questions),

                    "total_questions":
                        len(questions),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if total_weight == 0:
            return Response(
                {
                    "detail":
                        "No valid answers were submitted."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ------------------------------------------------
        # Overall score
        # ------------------------------------------------

        score = (
            weighted_score
            / total_weight
            * 100
        )

        total_questions = len(questions)

        answered_count = len(seen_questions)

        completion_ratio = (
            answered_count
            / total_questions
        )

        # ------------------------------------------------
        # Confidence
        # ------------------------------------------------

        confidence = (
            score * 0.7
            + completion_ratio * 100 * 0.3
        )

        # ------------------------------------------------
        # Skill level
        # ------------------------------------------------

        if score >= 85:
            level = "advanced"

        elif score >= 70:
            level = "intermediate"

        else:
            level = "beginner"

        # ------------------------------------------------
        # Create Skill Result
        # ------------------------------------------------

        result = SkillResult.objects.create(
            attempt=attempt,
            skill=attempt.test.skill,
            score=round(score, 2),
            correct_answers=correct_count,
            total_questions=total_questions,
            confidence=round(
                confidence,
                2,
            ),
        )

        # ------------------------------------------------
        # Create Topic Results
        # ------------------------------------------------

        for topic, stats in topic_stats.items():

            topic_score = (
                stats["correct"]
                / stats["total"]
                * 100
            )

            TopicResult.objects.create(
                skill_result=result,
                topic=topic,
                score=round(
                    topic_score,
                    2,
                ),
                correct_answers=stats["correct"],
                total_questions=stats["total"],
            )

        # ------------------------------------------------
        # Update Student Skill
        # ------------------------------------------------

        student_skill, _ = (
            StudentSkill.objects.get_or_create(
                student=request.user,
                skill=attempt.test.skill,
            )
        )

        old_score = student_skill.score

        old_evidence = (
            student_skill.evidence_count
        )

        if old_evidence > 0:

            new_score = (
                old_score * 0.4
                + score * 0.6
            )

        else:
            new_score = score

        student_skill.score = round(
            new_score,
            2,
        )

        student_skill.confidence = round(
            confidence,
            2,
        )

        student_skill.evidence_count += 1

        student_skill.level = level

        student_skill.last_assessed = (
            timezone.now()
        )

        student_skill.save()

        # ------------------------------------------------
        # Complete Attempt
        # ------------------------------------------------

        attempt.score = round(
            score,
            2,
        )

        attempt.completed = True

        attempt.completed_at = timezone.now()

        attempt.save()

        # ------------------------------------------------
        # Response
        # ------------------------------------------------

        return Response(
            {
                "message":
                    "Skill test submitted successfully.",

                "attempt_id":
                    attempt.id,

                "skill":
                    attempt.test.skill.name,

                "score":
                    round(score, 2),

                "correct_answers":
                    correct_count,

                "answered_questions":
                    answered_count,

                "total_questions":
                    total_questions,

                "confidence":
                    round(confidence, 2),

                "level":
                    level,

                "skill_result":
                    SkillResultSerializer(
                        result
                    ).data,

                "skill_twin": {
                    "score":
                        student_skill.score,

                    "confidence":
                        student_skill.confidence,

                    "level":
                        student_skill.level,

                    "evidence_count":
                        student_skill.evidence_count,

                    "last_assessed":
                        student_skill.last_assessed,
                },
            },
            status=status.HTTP_201_CREATED,
        )