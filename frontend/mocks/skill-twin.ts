/**
 * MOCK DATA: Detailed Skill Twin Profile
 *
 * NOTE: This is isolated presentation data for the /student/skill-twin UI.
 * Person 4 (Skill Intelligence) owns the actual scoring & gap algorithms.
 * When the backend API response schema for GET /api/v1/skill-twin/ is fully confirmed,
 * this mock file will be replaced by the API client module.
 */

export interface DetailedSkill {
  id: string;
  name: string;
  category: "Programming Languages" | "Frameworks & Libraries" | "Databases" | "Cloud & DevOps";
  score: number; // 0-100
  proficiency: "Advanced" | "Intermediate" | "Beginner";
  evidenceCount: number;
  lastAssessed: string;
  icon: string;
}

export interface SkillTwinStrength {
  id: string;
  skillName: string;
  score: number;
  proficiency: string;
  percentile: string;
}

export interface SkillTwinGap {
  id: string;
  skillName: string;
  category: string;
  currentScore: number;
  targetScore: number;
  gap: number;
  targetRole: string;
  priority: "High" | "Medium" | "Low";
}

export interface SkillTwinProfile {
  overallReadiness: number;
  status: "Advanced" | "High Readiness" | "Developing" | "Early Stage";
  lastUpdated: string;
  totalSkillsAssessed: number;
  totalEvidenceCount: number;
  skills: DetailedSkill[];
  strengths: SkillTwinStrength[];
  gaps: SkillTwinGap[];
}

export const MOCK_SKILL_TWIN_PROFILE: SkillTwinProfile = {
  overallReadiness: 74,
  status: "Developing",
  lastUpdated: "Aug 28, 2026",
  totalSkillsAssessed: 6,
  totalEvidenceCount: 18,
  skills: [
    {
      id: "python",
      name: "Python",
      category: "Programming Languages",
      score: 92,
      proficiency: "Advanced",
      evidenceCount: 5,
      lastAssessed: "Aug 28, 2026",
      icon: "🐍",
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "Programming Languages",
      score: 88,
      proficiency: "Advanced",
      evidenceCount: 4,
      lastAssessed: "Aug 25, 2026",
      icon: "🟨",
    },
    {
      id: "react",
      name: "React",
      category: "Frameworks & Libraries",
      score: 84,
      proficiency: "Intermediate",
      evidenceCount: 3,
      lastAssessed: "Aug 20, 2026",
      icon: "⚛️",
    },
    {
      id: "sql",
      name: "SQL",
      category: "Databases",
      score: 81,
      proficiency: "Intermediate",
      evidenceCount: 3,
      lastAssessed: "Aug 15, 2026",
      icon: "🗄️",
    },
    {
      id: "django",
      name: "Django",
      category: "Frameworks & Libraries",
      score: 62,
      proficiency: "Beginner",
      evidenceCount: 2,
      lastAssessed: "Aug 10, 2026",
      icon: "🎯",
    },
    {
      id: "aws",
      name: "AWS Cloud",
      category: "Cloud & DevOps",
      score: 40,
      proficiency: "Beginner",
      evidenceCount: 1,
      lastAssessed: "Aug 02, 2026",
      icon: "☁️",
    },
  ],
  strengths: [
    {
      id: "str-python",
      skillName: "Python",
      score: 92,
      proficiency: "Advanced",
      percentile: "Top 5% among peers",
    },
    {
      id: "str-javascript",
      skillName: "JavaScript",
      score: 88,
      proficiency: "Advanced",
      percentile: "Top 10% among peers",
    },
    {
      id: "str-react",
      skillName: "React",
      score: 84,
      proficiency: "Intermediate",
      percentile: "Top 15% among peers",
    },
  ],
  gaps: [
    {
      id: "gap-django",
      skillName: "Django Framework",
      category: "Frameworks & Libraries",
      currentScore: 62,
      targetScore: 75,
      gap: 13,
      targetRole: "Backend Developer",
      priority: "High",
    },
    {
      id: "gap-aws",
      skillName: "AWS Cloud",
      category: "Cloud & DevOps",
      currentScore: 40,
      targetScore: 70,
      gap: 30,
      targetRole: "Full Stack Developer",
      priority: "High",
    },
    {
      id: "gap-sql",
      skillName: "Advanced SQL Optimization",
      category: "Databases",
      currentScore: 68,
      targetScore: 80,
      gap: 12,
      targetRole: "Data Analyst",
      priority: "Medium",
    },
  ],
};