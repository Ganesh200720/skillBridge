/**
 * MOCK DATA: Student Preparation & Learning Recommendations
 *
 * NOTE: This is isolated presentation data for the /student/preparation UI.
 */

export interface LearningItemTrack {
  id: string;
  skillName: string;
  category: string;
  currentScore: number;
  targetScore: number;
  gapPoints: number;
  priority: "High" | "Medium" | "Low";
  targetRole: string;
  recommendedResource: {
    title: string;
    type: "Documentation" | "Practice Test" | "Video Track" | "Project Lab";
    durationEstimate: string;
    provider: string;
    url?: string;
  };
  progressPercentage: number;
  status: "In Progress" | "Not Started" | "Completed";
}

export const MOCK_PREPARATION_ITEMS: LearningItemTrack[] = [
  {
    id: "prep-django",
    skillName: "Django REST Framework APIs",
    category: "Frameworks & Libraries",
    currentScore: 62,
    targetScore: 75,
    gapPoints: 13,
    priority: "High",
    targetRole: "Backend Developer (Python/Django)",
    recommendedResource: {
      title: "Building Scalable REST APIs with Django & DRF",
      type: "Project Lab",
      durationEstimate: "4 hours",
      provider: "SkillBridge Prep Catalog",
    },
    progressPercentage: 45,
    status: "In Progress",
  },
  {
    id: "prep-aws",
    skillName: "AWS Cloud Fundamentals",
    category: "Cloud & DevOps",
    currentScore: 40,
    targetScore: 70,
    gapPoints: 30,
    priority: "High",
    targetRole: "Full Stack Developer",
    recommendedResource: {
      title: "AWS Core Services & EC2 / S3 Container Deployment",
      type: "Video Track",
      durationEstimate: "6 hours",
      provider: "AWS Academy",
    },
    progressPercentage: 10,
    status: "In Progress",
  },
  {
    id: "prep-sql",
    skillName: "Advanced SQL Optimization & Indexing",
    category: "Databases",
    currentScore: 68,
    targetScore: 80,
    gapPoints: 12,
    priority: "Medium",
    targetRole: "Data Analyst",
    recommendedResource: {
      title: "Query Optimization, Indexing & Window Functions",
      type: "Practice Test",
      durationEstimate: "2 hours",
      provider: "SkillBridge DB Lab",
    },
    progressPercentage: 0,
    status: "Not Started",
  },
];