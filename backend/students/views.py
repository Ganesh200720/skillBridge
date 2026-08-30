from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from assessments.models import Attempt

from .models import StudentSkill
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