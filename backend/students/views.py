from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

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

        return Response(
            {
                "student": {
                    "id": request.user.id,
                    "username": request.user.username,
                    "name": (
                        f"{request.user.first_name} "
                        f"{request.user.last_name}"
                    ).strip(),
                },
                "skills": StudentSkillSerializer(
                    student_skills,
                    many=True,
                ).data,
            }
        )