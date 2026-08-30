from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from opportunities.models import Role
from students.models import StudentSkill
from assessments.models import SkillTest


class NextSkillView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "student":
            return Response(
                {
                    "detail": "Only students can get learning recommendations."
                },
                status=403,
            )

        # Skills already assessed by this student
        assessed_skill_ids = set(
            StudentSkill.objects
            .filter(student=request.user)
            .values_list("skill_id", flat=True)
        )

        # Collect information about unassessed skills
        skill_data = {}

        roles = (
            Role.objects
            .filter(is_active=True)
            .prefetch_related(
                "role_skills",
                "role_skills__skill",
            )
        )

        for role in roles:

            for requirement in role.role_skills.all():

                skill = requirement.skill

                # Already assessed → not a next assessment
                if skill.id in assessed_skill_ids:
                    continue

                if skill.id not in skill_data:
                    skill_data[skill.id] = {
                        "skill": skill,
                        "roles": [],
                        "role_count": 0,
                        "required_count": 0,
                        "total_weight": 0,
                    }

                data = skill_data[skill.id]

                if role.title not in data["roles"]:
                    data["roles"].append(role.title)
                    data["role_count"] += 1

                data["total_weight"] += (
                    requirement.weight
                )

                if (
                    requirement.importance
                    == "required"
                ):
                    data["required_count"] += 1

        # No unassessed skills
        if not skill_data:
            return Response(
                {
                    "recommended_skill": None,
                    "message":
                        "All currently relevant skills have been assessed.",
                }
            )

        # ------------------------------------------------
        # Calculate recommendation score
        # ------------------------------------------------

        recommendations = []

        for data in skill_data.values():

            # Required skills are more important.
            recommendation_score = (
                data["role_count"] * 30
                + data["required_count"] * 40
                + data["total_weight"] * 10
            )

            test = (
                SkillTest.objects
                .filter(
                    skill_id=data["skill"].id,
                    is_active=True,
                )
                .first()
            )

            recommendations.append(
                {
                    "skill": data["skill"].name,
                    "skill_id": data["skill"].id,
                    "roles": data["roles"],
                    "role_count": data["role_count"],
                    "required_by": data["required_count"],
                    "recommendation_score":
                        round(
                            recommendation_score,
                            2,
                        ),
                    "test": (
                        {
                            "test_id": test.id,
                            "title": test.title,
                            "duration_minutes":
                                test.duration_minutes,
                        }
                        if test
                        else None
                    ),
                }
            )

        recommendations.sort(
            key=lambda item:
                item["recommendation_score"],
            reverse=True,
        )

        best = recommendations[0]
        recommended_test = (
            SkillTest.objects
            .filter(
                skill_id=best["skill_id"],
                is_active=True,
            )
            .first()
        )

        return Response(
            {
                "recommended_skill": {
                    "skill": best["skill"],
                    "skill_id": best["skill_id"],
                    "reason": (
                        f"{best['skill']} is relevant "
                        f"to {best['role_count']} "
                        f"target roles and is required "
                        f"by {best['required_by']} "
                        f"of them."
                    ),
                    "roles": best["roles"],
                    "recommendation_score":
                        best["recommendation_score"],
                    "test": best["test"],
                },

                "alternatives":
                    recommendations[1:],
            }
        )