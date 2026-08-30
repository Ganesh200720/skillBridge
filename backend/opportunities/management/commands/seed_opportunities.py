from datetime import date

from django.core.management.base import BaseCommand
from accounts.models import User
from opportunities.models import Opportunity, OpportunitySkill
from skills.models import Skill


class Command(BaseCommand):
    help = "Seed demo industry opportunities"

    def handle(self, *args, **options):

        industry = User.objects.filter(role="industry").first()

        if not industry:
            self.stdout.write(
                self.style.ERROR(
                    "No industry user found."
                )
            )
            return

        opportunities = [
            {
                "title": "AI Research Internship",
                "description": (
                    "Research internship focused on "
                    "AI and data-driven applications."
                ),
                "opportunity_type": "research",
                "location": "Hyderabad",
                "duration": "6 weeks",
                "skills": {
                    "Python": ("required", 70),
                    "SQL": ("preferred", 60),
                    "Communication": ("preferred", 60),
                },
            },
            {
                "title": "Backend Developer Internship",
                "description": (
                    "Work on backend APIs and web applications."
                ),
                "opportunity_type": "internship",
                "location": "Remote",
                "duration": "3 months",
                "skills": {
                    "Python": ("required", 70),
                    "Django": ("required", 70),
                    "SQL": ("required", 65),
                    "Docker": ("preferred", 50),
                },
            },
            {
                "title": "Django Training Program",
                "description": (
                    "Hands-on training in Django and REST API development."
                ),
                "opportunity_type": "training",
                "location": "Hyderabad",
                "duration": "2 weeks",
                "skills": {
                    "Python": ("required", 60),
                    "Django": ("required", 60),
                },
            },
            {
                "title": "Data Analytics Workshop",
                "description": (
                    "Practical workshop covering SQL, DBMS and data analysis."
                ),
                "opportunity_type": "workshop",
                "location": "Online",
                "duration": "3 days",
                "skills": {
                    "Python": ("preferred", 60),
                    "SQL": ("required", 60),
                    "DBMS": ("required", 60),
                },
            },
            {
                "title": "Full Stack Development Project",
                "description": (
                    "Industry project involving frontend and backend development."
                ),
                "opportunity_type": "project",
                "location": "Remote",
                "duration": "8 weeks",
                "skills": {
                    "Python": ("required", 65),
                    "Django": ("required", 65),
                    "JavaScript": ("required", 65),
                    "SQL": ("preferred", 60),
                },
            },
        ]

        for data in opportunities:

            opportunity, created = Opportunity.objects.update_or_create(
                title=data["title"],
                defaults={
                    "industry": industry,
                    "description": data["description"],
                    "opportunity_type": data["opportunity_type"],
                    "location": data["location"],
                    "duration": data["duration"],
                    "application_deadline": date(2026, 12, 31),
                    "is_active": True,
                },
            )

            for skill_name, (importance, minimum_score) in data["skills"].items():

                skill = Skill.objects.get(name=skill_name)

                OpportunitySkill.objects.update_or_create(
                    opportunity=opportunity,
                    skill=skill,
                    defaults={
                        "importance": importance,
                        "minimum_score": minimum_score,
                    },
                )

            action = "Created" if created else "Updated"

            self.stdout.write(
                self.style.SUCCESS(
                    f"{action}: {opportunity.title}"
                )
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"\nTotal opportunities: "
                f"{Opportunity.objects.filter(is_active=True).count()}"
            )
        )