/**
 * MOCK DATA: Student Assessments List & History
 *
 * NOTE: This is isolated presentation data for the /student/assessments UI.
 * Person 5 (Data & Questions) and Person 1 (Backend API) own assessment generation
 * and scoring. When response schemas for GET /api/v1/skill-tests/ and
 * GET /api/v1/assessment-history/ are fully confirmed, this mock file will be swapped.
 */

export interface AvailableAssessment {
  id: string;
  title: string;
  skillName: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questionCount: number;
  durationMinutes: number;
  status: "Available" | "Completed" | "In Progress";
  latestScore?: number;
  icon: string;
}

export interface AssessmentHistoryItem {
  id: string;
  assessmentTitle: string;
  skillName: string;
  score: number; // 0-100
  takenAt: string;
  attemptNumber: number;
  status: "Passed" | "Needs Review" | "Failed";
}

export interface AssessmentSummaryMetrics {
  totalAvailable: number;
  totalCompleted: number;
  averageScore: number;
  skillsAssessedCount: number;
}

export const MOCK_ASSESSMENT_METRICS: AssessmentSummaryMetrics = {
  totalAvailable: 6,
  totalCompleted: 3,
  averageScore: 87,
  skillsAssessedCount: 4,
};

export const MOCK_AVAILABLE_ASSESSMENTS: AvailableAssessment[] = [
  {
    id: "test-py-1",
    title: "Python OOP & Data Structures",
    skillName: "Python",
    category: "Programming Languages",
    difficulty: "Intermediate",
    questionCount: 15,
    durationMinutes: 20,
    status: "Completed",
    latestScore: 92,
    icon: "🐍",
  },
  {
    id: "test-js-1",
    title: "JavaScript ES6+ Essentials",
    skillName: "JavaScript",
    category: "Programming Languages",
    difficulty: "Intermediate",
    questionCount: 12,
    durationMinutes: 15,
    status: "Completed",
    latestScore: 88,
    icon: "🟨",
  },
  {
    id: "test-sql-1",
    title: "SQL Foundations & Queries",
    skillName: "SQL",
    category: "Databases",
    difficulty: "Beginner",
    questionCount: 10,
    durationMinutes: 15,
    status: "Completed",
    latestScore: 81,
    icon: "🗄️",
  },
  {
    id: "test-react-1",
    title: "React Component Architecture",
    skillName: "React",
    category: "Frameworks & Libraries",
    difficulty: "Intermediate",
    questionCount: 15,
    durationMinutes: 20,
    status: "Available",
    icon: "⚛️",
  },
  {
    id: "test-django-1",
    title: "Django REST Framework APIs",
    skillName: "Django",
    category: "Frameworks & Libraries",
    difficulty: "Advanced",
    questionCount: 20,
    durationMinutes: 30,
    status: "Available",
    icon: "🎯",
  },
  {
    id: "test-aws-1",
    title: "AWS Cloud Infrastructure Fundamentals",
    skillName: "AWS Cloud",
    category: "Cloud & DevOps",
    difficulty: "Beginner",
    questionCount: 15,
    durationMinutes: 25,
    status: "Available",
    icon: "☁️",
  },
];

export const MOCK_ASSESSMENT_HISTORY: AssessmentHistoryItem[] = [
  {
    id: "hist-1",
    assessmentTitle: "Python OOP & Data Structures",
    skillName: "Python",
    score: 92,
    takenAt: "Aug 28, 2026",
    attemptNumber: 1,
    status: "Passed",
  },
  {
    id: "hist-2",
    assessmentTitle: "JavaScript ES6+ Essentials",
    skillName: "JavaScript",
    score: 88,
    takenAt: "Aug 25, 2026",
    attemptNumber: 1,
    status: "Passed",
  },
  {
    id: "hist-3",
    assessmentTitle: "SQL Foundations & Queries",
    skillName: "SQL",
    score: 81,
    takenAt: "Aug 15, 2026",
    attemptNumber: 1,
    status: "Passed",
  },
];