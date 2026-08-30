import requests

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AIInterview


AI_BACKEND_URL = "http://127.0.0.1:5001"


class AIInterviewStartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "student":
            return Response(
                {
                    "detail": "Only students can start AI interviews."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        subject = request.data.get("subject")

        if not subject:
            return Response(
                {
                    "detail": "subject is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            ai_response = requests.post(
                f"{AI_BACKEND_URL}/start-interview",
                json={
                    "subject": subject,
                },
                timeout=30,
            )
        except requests.RequestException:
            return Response(
                {
                    "detail": "AI interview service is unavailable."
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        if not ai_response.ok:
            return Response(
                {
                    "detail": "AI interview service returned an error.",
                    "ai_response": ai_response.text,
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        data = ai_response.json()

        interview = AIInterview.objects.create(
            student=request.user,
            ai_interview_id=data["interview_id"],
            subject=subject,
            status=data.get("status", "in_progress"),
        )

        return Response(
            {
                "id": interview.id,
                "student": request.user.id,
                "interview_id": interview.ai_interview_id,
                "subject": interview.subject,
                "status": interview.status,
                "question": data.get("question"),
                "audio": data.get("audio"),
            },
            status=status.HTTP_201_CREATED,
        )