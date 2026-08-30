from django.conf import settings
from django.db import models

from skills.models import Skill


class SkillTest(models.Model):
    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name="tests",
    )

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    duration_minutes = models.PositiveIntegerField(default=15)

    def __str__(self):
        return f"{self.skill.name} - {self.title}"


class Question(models.Model):
    test = models.ForeignKey(
        SkillTest,
        on_delete=models.CASCADE,
        related_name="questions",
    )

    text = models.TextField()

    option_a = models.CharField(max_length=300)
    option_b = models.CharField(max_length=300)
    option_c = models.CharField(max_length=300)
    option_d = models.CharField(max_length=300)

    correct_answer = models.CharField(
        max_length=1,
        choices=[
            ("A", "A"),
            ("B", "B"),
            ("C", "C"),
            ("D", "D"),
        ],
    )

    difficulty = models.CharField(
        max_length=20,
        choices=[
            ("easy", "Easy"),
            ("medium", "Medium"),
            ("hard", "Hard"),
        ],
        default="medium",
    )

    topic = models.CharField(
        max_length=100,
        blank=True,
    )

    weight = models.FloatField(default=1.0)

    def __str__(self):
        return f"{self.test.skill.name} - {self.text[:70]}"


class Attempt(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="skill_test_attempts",
        limit_choices_to={"role": "student"},
    )

    test = models.ForeignKey(
        SkillTest,
        on_delete=models.CASCADE,
        related_name="attempts",
    )

    score = models.FloatField(default=0)
    completed = models.BooleanField(default=False)

    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.student.username} - {self.test}"


class Answer(models.Model):
    attempt = models.ForeignKey(
        Attempt,
        on_delete=models.CASCADE,
        related_name="answers",
    )

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="answers",
    )

    selected_answer = models.CharField(max_length=1)

    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.attempt.student.username} - Q{self.question.id}"


class SkillResult(models.Model):
    attempt = models.OneToOneField(
        Attempt,
        on_delete=models.CASCADE,
        related_name="skill_result",
    )

    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name="test_results",
    )

    score = models.FloatField(default=0)
    correct_answers = models.PositiveIntegerField(default=0)
    total_questions = models.PositiveIntegerField(default=0)

    confidence = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True,
                        null=True,
                        blank=True,
                )

    def __str__(self):
        return (
            f"{self.attempt.student.username} - "
            f"{self.skill.name} - {self.score}%"
        )

class TopicResult(models.Model):
    skill_result = models.ForeignKey(
        SkillResult,
        on_delete=models.CASCADE,
        related_name="topic_results",
    )

    topic = models.CharField(
        max_length=100,
    )

    score = models.FloatField(
        default=0,
    )

    correct_answers = models.PositiveIntegerField(
        default=0,
    )

    total_questions = models.PositiveIntegerField(
        default=0,
    )

    def __str__(self):
        return (
            f"{self.skill_result.skill.name} - "
            f"{self.topic}: {self.score}%"
        )