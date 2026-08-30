from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from opportunities.models import Opportunity
from opportunities.serializers import OpportunitySerializer

from assessments.models import Attempt
from .models import StudentSkill, InstitutionStudent, TeacherStudent
from .serializers import StudentSkillSerializer

class SkillTwinView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "student":
            return Response(
                {
                    "detail": "Only students have a Skill Twin."
                },
                status=403,
            )

        student_skills = (
            StudentSkill.objects
            .filter(student=request.user)
            .select_related("skill")
            .order_by("skill__name")
        )

        skills = []

        for student_skill in student_skills:

            attempts = list(
                Attempt.objects
                .filter(
                    student=request.user,
                    test__skill=student_skill.skill,
                    completed=True,
                )
                .order_by("completed_at")
                .values_list(
                    "score",
                    flat=True,
                )
            )

            # --------------------------------------------
            # Determine trend
            # --------------------------------------------

            if len(attempts) < 2:

                trend = "new"

                change = 0

            else:

                previous = attempts[-2]

                current = attempts[-1]

                change = round(
                    current - previous,
                    2,
                )

                if change >= 5:
                    trend = "improving"

                elif change <= -5:
                    trend = "declining"

                else:
                    trend = "stable"

            skill_data = (
                StudentSkillSerializer(
                    student_skill
                ).data
            )

            skill_data["trend"] = trend

            skill_data["score_change"] = change

            skill_data["attempt_count"] = len(
                attempts
            )

            skill_data["score_history"] = attempts

            skills.append(skill_data)

        return Response(
            {
                "student": {
                    "id": request.user.id,
                    "username":
                        request.user.username,
                    "name": (
                        f"{request.user.first_name} "
                        f"{request.user.last_name}"
                    ).strip(),
                },

                "skills": skills,
            }
        )

class TeacherStudentListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "teacher":
            return Response(
                {
                    "detail": "Only teachers can access this endpoint."
                },
                status=403,
            )

        assignments = (
            TeacherStudent.objects
            .filter(teacher=request.user)
            .select_related("student")
            .order_by("student__first_name")
        )

        students = []

        for assignment in assignments:

            student = assignment.student

            students.append({
                "id": student.id,
                "username": student.username,
                "name": (
                    f"{student.first_name} "
                    f"{student.last_name}"
                ).strip(),
                "email": student.email,
            })

        return Response({
            "teacher": {
                "id": request.user.id,
                "username": request.user.username,
                "name": (
                    f"{request.user.first_name} "
                    f"{request.user.last_name}"
                ).strip(),
            },
            "count": len(students),
            "students": students,
        })

class TeacherStudentDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, student_id):

        if request.user.role != "teacher":
            return Response(
                {
                    "detail": "Only teachers can access this endpoint."
                },
                status=403,
            )

        # Make sure this student is assigned
        # to the logged-in teacher.
        assignment_exists = TeacherStudent.objects.filter(
            teacher=request.user,
            student_id=student_id,
        ).exists()

        if not assignment_exists:
            return Response(
                {
                    "detail": "Student not found or not assigned to you."
                },
                status=404,
            )

        # Get student information
        assignment = (
            TeacherStudent.objects
            .select_related("student")
            .get(
                teacher=request.user,
                student_id=student_id,
            )
        )

        student = assignment.student

        # -----------------------------------------
        # Skill Twin
        # -----------------------------------------

        student_skills = (
            StudentSkill.objects
            .filter(student=student)
            .select_related("skill")
            .order_by("skill__name")
        )

        skills = []

        for student_skill in student_skills:

            attempts = list(
                Attempt.objects
                .filter(
                    student=student,
                    test__skill=student_skill.skill,
                    completed=True,
                )
                .order_by("completed_at")
                .values_list(
                    "score",
                    flat=True,
                )
            )

            if len(attempts) < 2:
                trend = "new"
                change = 0
            else:
                previous = attempts[-2]
                current = attempts[-1]

                change = round(
                    current - previous,
                    2,
                )

                if change >= 5:
                    trend = "improving"
                elif change <= -5:
                    trend = "declining"
                else:
                    trend = "stable"

            skill_data = StudentSkillSerializer(
                student_skill
            ).data

            skill_data["trend"] = trend
            skill_data["score_change"] = change
            skill_data["attempt_count"] = len(attempts)
            skill_data["score_history"] = attempts

            skills.append(skill_data)

        # -----------------------------------------
        # Assessment History
        # -----------------------------------------

        attempts = (
            Attempt.objects
            .filter(
                student=student,
                completed=True,
            )
            .select_related(
                "test",
                "test__skill",
            )
            .prefetch_related(
                "skill_result__topic_results",
            )
            .order_by("-completed_at")
        )

        history = []

        for attempt in attempts:

            try:
                result = attempt.skill_result
            except Exception:
                continue

            history.append({
                "attempt_id": attempt.id,
                "test_id": attempt.test.id,
                "test_title": attempt.test.title,
                "skill": {
                    "id": attempt.test.skill.id,
                    "name": attempt.test.skill.name,
                },
                "score": result.score,
                "confidence": result.confidence,
                "correct_answers": result.correct_answers,
                "total_questions": result.total_questions,
                "completed_at": attempt.completed_at,
                "topics": [
                    {
                        "topic": topic.topic,
                        "score": topic.score,
                        "correct_answers": topic.correct_answers,
                        "total_questions": topic.total_questions,
                    }
                    for topic in result.topic_results.all()
                ],
            })

        return Response({
            "student": {
                "id": student.id,
                "username": student.username,
                "name": (
                    f"{student.first_name} "
                    f"{student.last_name}"
                ).strip(),
                "email": student.email,
            },
            "skill_twin": skills,
            "assessment_history": {
                "count": len(history),
                "history": history,
            },
        })

class InstitutionStudentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "institution":
            return Response(
                {
                    "detail": (
                        "Only institutions can access "
                        "this endpoint."
                    )
                },
                status=403,
            )

        assignments = (
            InstitutionStudent.objects
            .filter(institution=request.user)
            .select_related("student")
            .order_by("student__first_name")
        )

        students = []

        for assignment in assignments:
            student = assignment.student

            student_skills = (
                StudentSkill.objects
                .filter(student=student)
                .select_related("skill")
                .order_by("skill__name")
            )

            skills = StudentSkillSerializer(
                student_skills,
                many=True,
            ).data

            students.append({
                "id": student.id,
                "username": student.username,
                "name": (
                    f"{student.first_name} "
                    f"{student.last_name}"
                ).strip(),
                "email": student.email,
                "skills": skills,
            })

        return Response({
            "institution": {
                "id": request.user.id,
                "username": request.user.username,
                "name": (
                    f"{request.user.first_name} "
                    f"{request.user.last_name}"
                ).strip(),
            },
            "count": len(students),
            "students": students,
        })

class InstitutionOpportunityListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "institution":
            return Response(
                {
                    "detail": (
                        "Only institutions can access "
                        "this endpoint."
                    )
                },
                status=403,
            )

        opportunities = (
            Opportunity.objects
            .filter(is_active=True)
            .select_related("industry")
            .prefetch_related(
                "opportunity_skills__skill"
            )
            .order_by("-created_at")
        )

        return Response(
            OpportunitySerializer(
                opportunities,
                many=True,
            ).data
        )