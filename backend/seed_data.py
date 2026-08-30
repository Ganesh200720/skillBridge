import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from accounts.models import User
from skills.models import Skill
from assessments.models import SkillTest, Question
from opportunities.models import Role, RoleSkill


# ============================================================
# SKILLS
# ============================================================

skills_data = {
    "Python": "Programming",
    "Django": "Backend",
    "SQL": "Database",
    "DBMS": "Database",
    "DSA": "Computer Science",
    "Docker": "DevOps",
    "JavaScript": "Programming",
    "Communication": "Soft Skills",
}

skills = {}

for name, category in skills_data.items():
    skill, _ = Skill.objects.get_or_create(
        name=name,
        defaults={"category": category},
    )
    skills[name] = skill


# ============================================================
# QUESTION DATA
# ============================================================

questions_data = {

    "Python": [
        (
            "Which keyword is used to define a function in Python?",
            "func",
            "def",
            "function",
            "define",
            "B",
            "Functions",
            "easy",
        ),
        (
            "Which data type stores key-value pairs?",
            "List",
            "Tuple",
            "Dictionary",
            "Set",
            "C",
            "Data Types",
            "easy",
        ),
        (
            "Which keyword is used to create a class?",
            "object",
            "class",
            "struct",
            "define",
            "B",
            "OOP",
            "easy",
        ),
        (
            "Which collection is ordered and mutable?",
            "Tuple",
            "Set",
            "List",
            "FrozenSet",
            "C",
            "Collections",
            "easy",
        ),
        (
            "What does len() return?",
            "Memory size",
            "Number of elements",
            "Data type",
            "Index",
            "B",
            "Built-in Functions",
            "easy",
        ),
    ],

    "Django": [
        (
            "Which file normally contains URL patterns?",
            "models.py",
            "views.py",
            "urls.py",
            "admin.py",
            "C",
            "URLs",
            "easy",
        ),
        (
            "What does ORM stand for?",
            "Object Relational Mapping",
            "Object Runtime Model",
            "Online Resource Manager",
            "Object Request Manager",
            "A",
            "ORM",
            "easy",
        ),
        (
            "Which command creates migrations?",
            "python manage.py migrate",
            "python manage.py makemigrations",
            "python manage.py create",
            "python manage.py models",
            "B",
            "Migrations",
            "easy",
        ),
        (
            "Which file defines database models?",
            "views.py",
            "urls.py",
            "models.py",
            "settings.py",
            "C",
            "Models",
            "easy",
        ),
        (
            "Which Django component handles incoming requests?",
            "Template",
            "View",
            "Model",
            "Migration",
            "B",
            "Views",
            "medium",
        ),
    ],

    "SQL": [
        (
            "Which SQL command retrieves data?",
            "GET",
            "SELECT",
            "FETCH",
            "READ",
            "B",
            "Queries",
            "easy",
        ),
        (
            "Which clause filters rows?",
            "ORDER BY",
            "GROUP BY",
            "WHERE",
            "FILTER",
            "C",
            "Filtering",
            "easy",
        ),
        (
            "Which keyword combines rows from two tables?",
            "JOIN",
            "MERGE",
            "CONNECT",
            "LINK",
            "A",
            "Joins",
            "medium",
        ),
        (
            "Which clause sorts query results?",
            "SORT BY",
            "ORDER BY",
            "GROUP BY",
            "ARRANGE",
            "B",
            "Sorting",
            "easy",
        ),
        (
            "Which command adds a new row?",
            "ADD",
            "INSERT",
            "UPDATE",
            "CREATE",
            "B",
            "Data Modification",
            "easy",
        ),
    ],

    "DBMS": [
        (
            "What does DBMS stand for?",
            "Database Management System",
            "Data Backup Management System",
            "Database Memory System",
            "Data Management Service",
            "A",
            "Fundamentals",
            "easy",
        ),
        (
            "Which structure is commonly used for database indexes?",
            "Stack",
            "B-tree",
            "Queue",
            "Linked List",
            "B",
            "Indexing",
            "medium",
        ),
        (
            "What is a primary key?",
            "A duplicate field",
            "A unique identifier for a row",
            "A password",
            "A table name",
            "B",
            "Keys",
            "easy",
        ),
        (
            "What does normalization reduce?",
            "Security",
            "Redundancy",
            "Queries",
            "Indexes",
            "B",
            "Normalization",
            "medium",
        ),
        (
            "Which property means a transaction is all-or-nothing?",
            "Consistency",
            "Isolation",
            "Atomicity",
            "Durability",
            "C",
            "Transactions",
            "medium",
        ),
    ],

    "DSA": [
        (
            "Which data structure follows FIFO?",
            "Stack",
            "Queue",
            "Tree",
            "Graph",
            "B",
            "Queues",
            "easy",
        ),
        (
            "Which data structure follows LIFO?",
            "Queue",
            "Array",
            "Stack",
            "Graph",
            "C",
            "Stacks",
            "easy",
        ),
        (
            "Which algorithm is commonly used for shortest paths?",
            "Dijkstra",
            "Binary Search",
            "Bubble Sort",
            "DFS only",
            "A",
            "Graphs",
            "medium",
        ),
        (
            "What is the average complexity of binary search?",
            "O(n)",
            "O(log n)",
            "O(n²)",
            "O(1)",
            "B",
            "Searching",
            "medium",
        ),
        (
            "Which structure is hierarchical?",
            "Queue",
            "Stack",
            "Tree",
            "Array",
            "C",
            "Trees",
            "easy",
        ),
    ],

    "Docker": [
        (
            "Docker is primarily used for?",
            "Containerization",
            "Image editing",
            "Database querying",
            "Code compilation",
            "A",
            "Containers",
            "easy",
        ),
        (
            "Which file commonly defines Docker image instructions?",
            "docker.txt",
            "Dockerfile",
            "docker.json",
            "container.py",
            "B",
            "Dockerfile",
            "easy",
        ),
        (
            "Which command lists running containers?",
            "docker list",
            "docker ps",
            "docker run",
            "docker show",
            "B",
            "CLI",
            "easy",
        ),
        (
            "What is a Docker image?",
            "A running process",
            "A template for containers",
            "A database",
            "A network",
            "B",
            "Images",
            "medium",
        ),
        (
            "Which tool can manage multi-container applications?",
            "Docker Compose",
            "Docker Paint",
            "Docker Editor",
            "Docker SQL",
            "A",
            "Compose",
            "medium",
        ),
    ],

    "JavaScript": [
        (
            "Which keyword declares a block-scoped variable?",
            "var",
            "let",
            "define",
            "variable",
            "B",
            "Variables",
            "easy",
        ),
        (
            "Which symbol is used for strict equality?",
            "==",
            "=",
            "===",
            "!=",
            "C",
            "Operators",
            "easy",
        ),
        (
            "Which method converts JSON text into an object?",
            "JSON.parse",
            "JSON.object",
            "JSON.convert",
            "JSON.load",
            "A",
            "JSON",
            "medium",
        ),
        (
            "Which keyword defines a function expression?",
            "function",
            "method",
            "def",
            "func",
            "A",
            "Functions",
            "easy",
        ),
        (
            "Which method adds an item to the end of an array?",
            "push",
            "add",
            "append",
            "insert",
            "A",
            "Arrays",
            "easy",
        ),
    ],

    "Communication": [
        (
            "What is important during a technical interview?",
            "Ignoring questions",
            "Explaining reasoning clearly",
            "Giving random answers",
            "Avoiding clarification",
            "B",
            "Interview Communication",
            "easy",
        ),
        (
            "What should you do when you do not understand a question?",
            "Guess immediately",
            "Ask for clarification",
            "Stay silent",
            "Change the topic",
            "B",
            "Communication",
            "easy",
        ),
        (
            "What makes an explanation effective?",
            "Clear structure",
            "Very long answers",
            "Technical jargon only",
            "Avoiding examples",
            "A",
            "Explanation",
            "easy",
        ),
        (
            "What is active listening?",
            "Waiting to speak",
            "Understanding before responding",
            "Ignoring details",
            "Changing subjects",
            "B",
            "Listening",
            "easy",
        ),
        (
            "What should a good technical answer include?",
            "Reasoning and examples",
            "Only a final word",
            "Unrelated details",
            "No explanation",
            "A",
            "Technical Communication",
            "medium",
        ),
    ],
}


# ============================================================
# CREATE SKILL TESTS + QUESTIONS
# ============================================================

for skill_name, questions in questions_data.items():

    skill = skills[skill_name]

    test, _ = SkillTest.objects.get_or_create(
        skill=skill,
        title=f"{skill_name} Skill Test",
        defaults={
            "description": (
                f"Assess your {skill_name} "
                "knowledge and capability."
            ),
            "duration_minutes": 10,
        },
    )

    for (
        text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct,
        topic,
        difficulty,
    ) in questions:

        Question.objects.get_or_create(
            test=test,
            text=text,
            defaults={
                "option_a": option_a,
                "option_b": option_b,
                "option_c": option_c,
                "option_d": option_d,
                "correct_answer": correct,
                "topic": topic,
                "difficulty": difficulty,
                "weight": 1.0,
            },
        )


# ============================================================
# ROLES
# ============================================================

roles_data = {
    "Backend Developer": {
        "description": "Build and maintain backend applications and APIs.",
        "skills": {
            "Python": ("required", 1.0, 70),
            "Django": ("required", 1.0, 70),
            "SQL": ("required", 1.0, 65),
            "DBMS": ("required", 1.0, 65),
            "DSA": ("preferred", 0.7, 55),
            "Docker": ("preferred", 0.7, 50),
        },
    },

    "Full Stack Developer": {
        "description": "Build complete web applications across frontend and backend.",
        "skills": {
            "Python": ("preferred", 0.8, 60),
            "Django": ("required", 1.0, 65),
            "JavaScript": ("required", 1.0, 70),
            "SQL": ("required", 0.9, 65),
            "Docker": ("preferred", 0.6, 50),
        },
    },

    "Data Analyst": {
        "description": "Analyze data and generate useful business insights.",
        "skills": {
            "Python": ("required", 0.9, 65),
            "SQL": ("required", 1.0, 70),
            "DBMS": ("required", 0.8, 60),
            "Communication": ("preferred", 0.6, 60),
        },
    },
}


for role_name, role_data in roles_data.items():

    role, _ = Role.objects.get_or_create(
        title=role_name,
        defaults={
            "description": role_data["description"],
        },
    )

    for skill_name, config in role_data["skills"].items():

        importance, weight, minimum_score = config

        RoleSkill.objects.update_or_create(
            role=role,
            skill=skills[skill_name],
            defaults={
                "importance": importance,
                "weight": weight,
                "minimum_score": minimum_score,
            },
        )


# ============================================================
# DEMO USERS
# ============================================================

users = [
    (
        "student1",
        "student@skillbridge.com",
        "student123",
        "Rahul",
        "Kumar",
        User.Role.STUDENT,
    ),
    (
        "industry1",
        "industry@skillbridge.com",
        "industry123",
        "Priya",
        "Sharma",
        User.Role.INDUSTRY,
    ),
    (
        "institution1",
        "institution@skillbridge.com",
        "institution123",
        "Anil",
        "Reddy",
        User.Role.INSTITUTION,
    ),
]


for (
    username,
    email,
    password,
    first_name,
    last_name,
    role,
) in users:

    user, created = User.objects.get_or_create(
        username=username,
        defaults={
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "role": role,
        },
    )

    user.email = email
    user.first_name = first_name
    user.last_name = last_name
    user.role = role
    user.set_password(password)
    user.save()


print("\n===================================")
print("SkillBridge seed completed!")
print("===================================")
print("Skills:", Skill.objects.count())
print("Skill Tests:", SkillTest.objects.count())
print("Questions:", Question.objects.count())
print("Roles:", Role.objects.count())
print("Users:", User.objects.count())
print("===================================\n")