from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from skills.models import Skill
from students.models import (
    StudentSkill,
    TeacherStudent,
)

from .models import (
    Role,
    Opportunity,
    OpportunitySkill,
)
from .serializers import (
    RoleSerializer,
    OpportunitySerializer,
)

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

class IndustryOpportunityListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "industry":
            return Response(
                {
                    "detail": (
                        "Only industry users can access "
                        "this endpoint."
                    )
                },
                status=403,
            )

        opportunities = (
            Opportunity.objects
            .filter(
                industry=request.user,
                is_active=True,
            )
            .prefetch_related(
                "opportunity_skills",
                "opportunity_skills__skill",
            )
            .order_by("-created_at")
        )

        return Response(
            OpportunitySerializer(
                opportunities,
                many=True,
            ).data
        )

    def post(self, request):

        if request.user.role != "industry":
            return Response(
                {
                    "detail": (
                        "Only industry users can create "
                        "opportunities."
                    )
                },
                status=403,
            )

        data = request.data

        if not data.get("title"):
            return Response(
                {"detail": "title is required."},
                status=400,
            )

        if not data.get("opportunity_type"):
            return Response(
                {"detail": "opportunity_type is required."},
                status=400,
            )

        opportunity = Opportunity.objects.create(
            industry=request.user,
            title=data["title"],
            description=data.get("description", ""),
            opportunity_type=data["opportunity_type"],
            location=data.get("location", ""),
            duration=data.get("duration", ""),
            application_deadline=data.get(
                "application_deadline"
            ),
            is_active=data.get("is_active", True),
        )

        skills = data.get("skills", [])

        for skill_data in skills:

            try:
                skill = Skill.objects.get(
                    id=skill_data["skill_id"]
                )
            except Skill.DoesNotExist:

                opportunity.delete()

                return Response(
                    {
                        "detail": (
                            f"Skill "
                            f"{skill_data.get('skill_id')} "
                            f"not found."
                        )
                    },
                    status=400,
                )

            OpportunitySkill.objects.create(
                opportunity=opportunity,
                skill=skill,
                importance=skill_data.get(
                    "importance",
                    "required",
                ),
                minimum_score=skill_data.get(
                    "minimum_score",
                    60,
                ),
            )

        return Response(
            OpportunitySerializer(
                opportunity
            ).data,
            status=201,
        )


class IndustryOpportunityDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, opportunity_id):

        if request.user.role != "industry":
            return Response(
                {
                    "detail": (
                        "Only industry users can access "
                        "this endpoint."
                    )
                },
                status=403,
            )

        try:
            opportunity = (
                Opportunity.objects
                .prefetch_related(
                    "opportunity_skills",
                    "opportunity_skills__skill",
                )
                .get(
                    id=opportunity_id,
                    industry=request.user,
                )
            )
        except Opportunity.DoesNotExist:

            return Response(
                {
                    "detail": "Opportunity not found."
                },
                status=404,
            )

        return Response(
            OpportunitySerializer(
                opportunity
            ).data
        )


class TeacherOpportunityListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "teacher":
            return Response(
                {
                    "detail": "Only teachers can access this endpoint."
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

class StudentOpportunityListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "student":
            return Response(
                {
                    "detail": "Only students can access this endpoint."
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
class TeacherOpportunityMatchesView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, opportunity_id):

        if request.user.role != "teacher":
            return Response(
                {
                    "detail": (
                        "Only teachers can access "
                        "this endpoint."
                    )
                },
                status=403,
            )

        # ---------------------------------------------
        # Get opportunity
        # ---------------------------------------------

        try:
            opportunity = (
                Opportunity.objects
                .prefetch_related(
                    "opportunity_skills__skill",
                )
                .get(
                    id=opportunity_id,
                    is_active=True,
                )
            )

        except Opportunity.DoesNotExist:

            return Response(
                {
                    "detail": "Opportunity not found."
                },
                status=404,
            )

        requirements = list(
            opportunity.opportunity_skills.all()
        )

        # ---------------------------------------------
        # Get students assigned to this teacher
        # ---------------------------------------------

        assignments = (
            TeacherStudent.objects
            .filter(
                teacher=request.user,
            )
            .select_related("student")
        )

        matches = []

        for assignment in assignments:

            student = assignment.student

            student_skills = {
                student_skill.skill_id: student_skill
                for student_skill in (
                    StudentSkill.objects
                    .filter(student=student)
                    .select_related("skill")
                )
            }

            skill_results = []

            total_weight = 0
            achieved_weight = 0

            required_total = 0
            required_met = 0

            preferred_total = 0
            preferred_met = 0

            for requirement in requirements:

                skill = requirement.skill

                if requirement.importance == "required":
                    weight = 2.0
                    required_total += 1
                else:
                    weight = 1.0
                    preferred_total += 1

                total_weight += weight

                student_skill = student_skills.get(
                    skill.id
                )

                if student_skill:

                    score = student_skill.score

                    meets = (
                        score
                        >= requirement.minimum_score
                    )

                    contribution = min(
                        score / 100,
                        1,
                    ) * weight

                    achieved_weight += contribution

                    if (
                        requirement.importance
                        == "required"
                        and meets
                    ):
                        required_met += 1

                    if (
                        requirement.importance
                        == "preferred"
                        and meets
                    ):
                        preferred_met += 1

                    skill_results.append(
                        {
                            "skill_id": skill.id,
                            "skill": skill.name,
                            "importance":
                                requirement.importance,
                            "required_score":
                                requirement.minimum_score,
                            "student_score": score,
                            "confidence":
                                student_skill.confidence,
                            "level":
                                student_skill.level,
                            "meets_requirement":
                                meets,
                            "gap": (
                                round(
                                    max(
                                        requirement.minimum_score
                                        - score,
                                        0,
                                    ),
                                    2,
                                )
                                if not meets
                                else 0
                            ),
                        }
                    )

                else:

                    skill_results.append(
                        {
                            "skill_id": skill.id,
                            "skill": skill.name,
                            "importance":
                                requirement.importance,
                            "required_score":
                                requirement.minimum_score,
                            "student_score": None,
                            "confidence": 0,
                            "level": None,
                            "meets_requirement":
                                False,
                            "gap":
                                requirement.minimum_score,
                        }
                    )

            # -----------------------------------------
            # Calculate match score
            # -----------------------------------------

            if total_weight > 0:

                match_score = (
                    achieved_weight
                    / total_weight
                    * 100
                )

            else:

                match_score = 0

            match_score = round(
                match_score,
                2,
            )

            # -----------------------------------------
            # Match level
            # -----------------------------------------

            if (
                required_total > 0
                and required_met == required_total
            ):

                if match_score >= 85:
                    level = "excellent"

                elif match_score >= 70:
                    level = "strong"

                else:
                    level = "eligible"

            elif match_score >= 70:

                level = "partial"

            elif match_score >= 50:

                level = "developing"

            else:

                level = "low"

            matches.append(
                {
                    "student": {
                        "id": student.id,
                        "username": student.username,
                        "name": (
                            f"{student.first_name} "
                            f"{student.last_name}"
                        ).strip(),
                    },
                    "match_score": match_score,
                    "level": level,
                    "required_skills": {
                        "met": required_met,
                        "total": required_total,
                    },
                    "preferred_skills": {
                        "met": preferred_met,
                        "total": preferred_total,
                    },
                    "skills": skill_results,
                }
            )

        # Highest match first
        matches.sort(
            key=lambda item: item["match_score"],
            reverse=True,
        )

        return Response(
            {
                "opportunity": {
                    "id": opportunity.id,
                    "title": opportunity.title,
                    "opportunity_type":
                        opportunity.opportunity_type,
                    "location":
                        opportunity.location,
                },
                "student_count": len(matches),
                "matches": matches,
            }
        )