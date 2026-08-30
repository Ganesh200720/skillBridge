from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from students.models import StudentSkill

from .models import Role
from .serializers import RoleSerializer


class RoleListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        roles = (
            Role.objects
            .filter(is_active=True)
            .prefetch_related(
                "role_skills",
                "role_skills__skill",
            )
        )

        return Response(
            RoleSerializer(
                roles,
                many=True,
            ).data
        )


class RoleDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, role_id):

        try:
            role = (
                Role.objects
                .prefetch_related(
                    "role_skills",
                    "role_skills__skill",
                )
                .get(
                    id=role_id,
                    is_active=True,
                )
            )

        except Role.DoesNotExist:
            return Response(
                {
                    "detail": "Role not found."
                },
                status=404,
            )

        # ------------------------------------------------
        # Get student's skill evidence
        # ------------------------------------------------

        student_skills = {
            student_skill.skill_id: student_skill
            for student_skill in (
                StudentSkill.objects
                .filter(student=request.user)
                .select_related("skill")
            )
        }

        skill_details = []

        total_weight = 0
        achieved_weight = 0

        gaps = []

        for requirement in role.role_skills.all():

            skill = requirement.skill

            student_skill = student_skills.get(
                skill.id
            )

            required_score = (
                requirement.minimum_score
            )

            weight = requirement.weight

            total_weight += weight

            # --------------------------------------------
            # Student has evidence
            # --------------------------------------------

            if student_skill:

                student_score = (
                    student_skill.score
                )

                # Cap contribution at 100%
                normalized_score = min(
                    student_score / 100,
                    1,
                )

                achieved_weight += (
                    normalized_score * weight
                )

                meets_requirement = (
                    student_score
                    >= required_score
                )

                if not meets_requirement:

                    gaps.append(
                        {
                            "skill": skill.name,
                            "current_score":
                                student_score,
                            "required_score":
                                required_score,
                            "gap":
                                round(
                                    required_score
                                    - student_score,
                                    2,
                                ),
                            "importance":
                                requirement.importance,
                        }
                    )

                skill_details.append(
                    {
                        "skill": skill.name,
                        "skill_id": skill.id,
                        "status":
                            "assessed",
                        "score":
                            student_score,
                        "confidence":
                            student_skill.confidence,
                        "level":
                            student_skill.level,
                        "evidence_count":
                            student_skill.evidence_count,
                        "required_score":
                            required_score,
                        "importance":
                            requirement.importance,
                        "meets_requirement":
                            meets_requirement,
                    }
                )

            # --------------------------------------------
            # Student has no evidence
            # --------------------------------------------

            else:

                gaps.append(
                    {
                        "skill": skill.name,
                        "current_score": None,
                        "required_score":
                            required_score,
                        "gap": required_score,
                        "importance":
                            requirement.importance,
                    }
                )

                skill_details.append(
                    {
                        "skill": skill.name,
                        "skill_id": skill.id,
                        "status":
                            "not_assessed",
                        "score": None,
                        "confidence": 0,
                        "level": None,
                        "evidence_count": 0,
                        "required_score":
                            required_score,
                        "importance":
                            requirement.importance,
                        "meets_requirement":
                            False,
                    }
                )

        # ------------------------------------------------
        # Overall readiness
        # ------------------------------------------------

        if total_weight > 0:

            readiness = (
                achieved_weight
                / total_weight
                * 100
            )

        else:

            readiness = 0

        readiness = round(
            readiness,
            2,
        )

        # ------------------------------------------------
        # Readiness label
        # ------------------------------------------------

        if readiness >= 85:
            readiness_level = "high"

        elif readiness >= 70:
            readiness_level = "good"

        elif readiness >= 50:
            readiness_level = "developing"

        else:
            readiness_level = "low"

        # ------------------------------------------------
        # Sort gaps
        # Required skills first
        # ------------------------------------------------

        gaps.sort(
            key=lambda gap: (
                gap["importance"] != "required",
                -(gap["gap"] or 0),
            )
        )

        return Response(
            {
                "role": {
                    "id": role.id,
                    "title": role.title,
                    "description":
                        role.description,
                },

                "readiness": {
                    "score":
                        readiness,
                    "level":
                        readiness_level,
                },

                "skills":
                    skill_details,

                "skill_gaps":
                    gaps,
            }
        )

class RoleRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "student":
            return Response(
                {
                    "detail": "Only students can get role recommendations."
                },
                status=403,
            )

        roles = (
            Role.objects
            .filter(is_active=True)
            .prefetch_related(
                "role_skills",
                "role_skills__skill",
            )
        )

        student_skills = {
            student_skill.skill_id: student_skill
            for student_skill in (
                StudentSkill.objects
                .filter(student=request.user)
                .select_related("skill")
            )
        }

        recommendations = []

        for role in roles:

            total_weight = 0
            achieved_weight = 0

            gaps = []

            assessed_count = 0

            for requirement in role.role_skills.all():

                skill = requirement.skill
                weight = requirement.weight

                total_weight += weight

                student_skill = student_skills.get(
                    skill.id
                )

                if student_skill:

                    assessed_count += 1

                    score = student_skill.score

                    achieved_weight += (
                        min(score / 100, 1)
                        * weight
                    )

                    if score < requirement.minimum_score:

                        gaps.append(
                            {
                                "skill": skill.name,
                                "current_score": score,
                                "required_score":
                                    requirement.minimum_score,
                                "gap": round(
                                    requirement.minimum_score
                                    - score,
                                    2,
                                ),
                                "importance":
                                    requirement.importance,
                            }
                        )

                else:

                    gaps.append(
                        {
                            "skill": skill.name,
                            "current_score": None,
                            "required_score":
                                requirement.minimum_score,
                            "gap":
                                requirement.minimum_score,
                            "importance":
                                requirement.importance,
                        }
                    )

            if total_weight > 0:

                readiness = (
                    achieved_weight
                    / total_weight
                    * 100
                )

            else:

                readiness = 0

            readiness = round(
                readiness,
                2,
            )

            if readiness >= 85:
                level = "high"

            elif readiness >= 70:
                level = "good"

            elif readiness >= 50:
                level = "developing"

            else:
                level = "low"

            # Required gaps first
            gaps.sort(
                key=lambda gap: (
                    gap["importance"] != "required",
                    -(gap["gap"] or 0),
                )
            )

            recommendations.append(
                {
                    "role_id": role.id,
                    "role": role.title,
                    "readiness": readiness,
                    "level": level,
                    "assessed_skills":
                        assessed_count,
                    "total_skills":
                        role.role_skills.count(),
                    "skill_gaps":
                        gaps[:3],
                }
            )

        # Highest readiness first
        recommendations.sort(
            key=lambda item: item["readiness"],
            reverse=True,
        )

        return Response(
            {
                "recommendations":
                    recommendations
            }
        )