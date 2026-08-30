/**
 * MOCK DATA: Recommended Career Roles & Role Details
 *
 * NOTE: This is isolated presentation data for the /student/roles UI.
 * Person 4 (Matching & Intelligence) owns the actual role readiness and matching algorithms.
 */

export interface RoleSkillRequirement {
  skillName: string;
  minimumScore: number;
  studentScore: number;
  importance: "required" | "preferred" | "bonus";
  met: boolean;
}

export interface DetailedRole {
  id: string;
  title: string;
  category: string;
  readinessScore: number; // 0-100
  status: "High Match" | "Moderate Match" | "Developing";
  description: string;
  industryDemand: number; // percentage
  averageSalary: string;
  requirements: RoleSkillRequirement[];
  topGaps: { skillName: string; gapPoints: number }[];
  suggestedPreparation: string;
  matchingOpportunitiesCount: number;
}

export const MOCK_ROLES: DetailedRole[] = [
  {
    id: "backend-dev",
    title: "Backend Developer (Python/Django)",
    category: "Software Engineering",
    readinessScore: 82,
    status: "High Match",
    description:
      "Designs, builds, and maintains server-side logic, REST APIs, and database integrations for scalable enterprise applications.",
    industryDemand: 92,
    averageSalary: "₹7.5 - ₹12 LPA",
    requirements: [
      { skillName: "Python", minimumScore: 80, studentScore: 92, importance: "required", met: true },
      { skillName: "SQL", minimumScore: 75, studentScore: 81, importance: "required", met: true },
      { skillName: "Django", minimumScore: 75, studentScore: 62, importance: "required", met: false },
      { skillName: "AWS Cloud", minimumScore: 60, studentScore: 40, importance: "preferred", met: false },
    ],
    topGaps: [
      { skillName: "Django", gapPoints: 13 },
      { skillName: "AWS Cloud", gapPoints: 20 },
    ],
    suggestedPreparation: "Complete Django REST Framework certification and work on asynchronous task queues with Celery.",
    matchingOpportunitiesCount: 4,
  },
  {
    id: "fullstack-dev",
    title: "Full Stack Developer",
    category: "Software Engineering",
    readinessScore: 78,
    status: "Moderate Match",
    description:
      "Handles end-to-end application development, bridging front-end React user interfaces with back-end APIs and database management.",
    industryDemand: 95,
    averageSalary: "₹8.0 - ₹14 LPA",
    requirements: [
      { skillName: "JavaScript", minimumScore: 80, studentScore: 88, importance: "required", met: true },
      { skillName: "React", minimumScore: 75, studentScore: 84, importance: "required", met: true },
      { skillName: "Python", minimumScore: 75, studentScore: 92, importance: "required", met: true },
      { skillName: "SQL", minimumScore: 70, studentScore: 81, importance: "required", met: true },
      { skillName: "AWS Cloud", minimumScore: 70, studentScore: 40, importance: "preferred", met: false },
    ],
    topGaps: [{ skillName: "AWS Cloud", gapPoints: 30 }],
    suggestedPreparation: "Practice deploying full-stack Docker containers to AWS ECS / Cloudfront.",
    matchingOpportunitiesCount: 6,
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data Science & Analytics",
    readinessScore: 65,
    status: "Developing",
    description:
      "Transforms raw structured data into actionable business intelligence through complex SQL queries, analytical Python models, and dashboard reporting.",
    industryDemand: 87,
    averageSalary: "₹6.5 - ₹10 LPA",
    requirements: [
      { skillName: "Python", minimumScore: 80, studentScore: 92, importance: "required", met: true },
      { skillName: "SQL", minimumScore: 80, studentScore: 81, importance: "required", met: true },
      { skillName: "Machine Learning", minimumScore: 70, studentScore: 45, importance: "required", met: false },
    ],
    topGaps: [
      { skillName: "Machine Learning", gapPoints: 25 },
      { skillName: "Advanced SQL", gapPoints: 12 },
    ],
    suggestedPreparation: "Study Pandas data manipulation and scikit-learn classification models.",
    matchingOpportunitiesCount: 2,
  },
];