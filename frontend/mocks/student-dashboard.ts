/**
 * MOCK DATA: Student Dashboard
 *
 * NOTE: This is isolated presentation data for UI development.
 * Backend scoring and gap calculation (Person 4) and taxonomy (Person 5)
 * will replace this data when backend API contracts are confirmed.
 *
 * Rule: Do NOT claim this is real student backend data.
 */

export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: string;
}

export interface DashboardSkill {
  id: string;
  name: string;
  score: number;
  level: "Advanced" | "Intermediate" | "Beginner";
  icon: string;
  lastAssessed: string;
}

export interface DashboardRoleReadiness {
  id: string;
  roleTitle: string;
  readinessScore: number; // 0-100
  matchingSkillsCount: number;
  totalRequiredSkillsCount: number;
  status: "High Match" | "Moderate Match" | "Developing";
}

export interface DashboardSkillGap {
  id: string;
  skillName: string;
  targetRole: string;
  currentScore: number;
  targetScore: number;
  gap: number;
}

export interface DashboardActivity {
  id: string;
  title: string;
  type: "assessment" | "score_update" | "opportunity_view" | "guidance";
  timestamp: string;
  detail: string;
  scoreDelta?: string;
}

export interface DashboardOpportunityPreview {
  id: string;
  title: string;
  companyName: string;
  opportunityType: "internship" | "placement" | "project";
  stipendOrCtc: string;
  location: string;
  duration?: string;
  requiredSkills: string[];
  matchScore: number; // 0-100
  deadline: string;
}

export const MOCK_STUDENT_STATS: DashboardStat[] = [
  {
    id: "overall-score",
    title: "Overall Skill Score",
    value: "74%",
    subtitle: "Across 5 verified skills",
    change: "+6% this month",
    trend: "up",
    icon: "⚡",
  },
  {
    id: "readiness",
    title: "Role Readiness",
    value: "82%",
    subtitle: "Backend Engineer target",
    change: "High Match",
    trend: "up",
    icon: "🎯",
  },
  {
    id: "skills-verified",
    title: "Skills Verified",
    value: "5",
    subtitle: "Out of 8 targeted",
    icon: "☕",
  },
  {
    id: "assessments",
    title: "Assessments Completed",
    value: "12",
    subtitle: "3 tests pending review",
    icon: "📝",
  },
];

export const MOCK_STUDENT_SKILLS: DashboardSkill[] = [
  { id: "python", name: "Python", score: 92, level: "Advanced", icon: "🐍", lastAssessed: "2 days ago" },
  { id: "js", name: "JavaScript", score: 88, level: "Advanced", icon: "🟨", lastAssessed: "5 days ago" },
  { id: "react", name: "React", score: 84, level: "Intermediate", icon: "⚛️", lastAssessed: "1 week ago" },
  { id: "sql", name: "SQL", score: 81, level: "Intermediate", icon: "🗄️", lastAssessed: "2 weeks ago" },
  { id: "django", name: "Django", score: 62, level: "Beginner", icon: "🎯", lastAssessed: "3 weeks ago" },
];

export const MOCK_ROLE_READINESS: DashboardRoleReadiness[] = [
  {
    id: "backend-dev",
    roleTitle: "Backend Developer (Python/Django)",
    readinessScore: 82,
    matchingSkillsCount: 3,
    totalRequiredSkillsCount: 4,
    status: "High Match",
  },
  {
    id: "fullstack-dev",
    roleTitle: "Full Stack Developer",
    readinessScore: 78,
    matchingSkillsCount: 4,
    totalRequiredSkillsCount: 5,
    status: "Moderate Match",
  },
  {
    id: "data-analyst",
    roleTitle: "Data Analyst",
    readinessScore: 65,
    matchingSkillsCount: 2,
    totalRequiredSkillsCount: 4,
    status: "Developing",
  },
];

export const MOCK_SKILL_GAPS: DashboardSkillGap[] = [
  {
    id: "gap-django",
    skillName: "Django",
    targetRole: "Backend Developer",
    currentScore: 62,
    targetScore: 75,
    gap: 13,
  },
  {
    id: "gap-aws",
    skillName: "AWS Cloud",
    targetRole: "Full Stack Developer",
    currentScore: 40,
    targetScore: 70,
    gap: 30,
  },
  {
    id: "gap-sql",
    skillName: "Advanced SQL",
    targetRole: "Data Analyst",
    currentScore: 68,
    targetScore: 80,
    gap: 12,
  },
];

export const MOCK_RECENT_ACTIVITIES: DashboardActivity[] = [
  {
    id: "act-1",
    title: "Python Skill Assessment",
    type: "assessment",
    timestamp: "Yesterday, 4:30 PM",
    detail: "Scored 92% on Python OOP & Data Structures test",
    scoreDelta: "+8%",
  },
  {
    id: "act-2",
    title: "Role Match Updated",
    type: "score_update",
    timestamp: "2 days ago",
    detail: "Backend Engineer readiness increased from 74% to 82%",
  },
  {
    id: "act-3",
    title: "Internship Invitation Received",
    type: "opportunity_view",
    timestamp: "3 days ago",
    detail: "Nimbus Systems requested profile for Backend Engineering Intern",
  },
];

export const MOCK_OPPORTUNITY_PREVIEWS: DashboardOpportunityPreview[] = [
  {
    id: "opp-1",
    title: "Backend Engineering Intern",
    companyName: "Nimbus Systems",
    opportunityType: "internship",
    stipendOrCtc: "₹22,000/mo",
    location: "Remote / Hybrid",
    duration: "6 months",
    requiredSkills: ["Python", "SQL", "Django"],
    matchScore: 88,
    deadline: "Dec 31, 2026",
  },
  {
    id: "opp-2",
    title: "Frontend Developer Intern",
    companyName: "Coral Retail Tech",
    opportunityType: "internship",
    stipendOrCtc: "₹18,000/mo",
    location: "Bengaluru",
    duration: "3 months",
    requiredSkills: ["JavaScript", "React"],
    matchScore: 85,
    deadline: "Nov 15, 2026",
  },
  {
    id: "opp-3",
    title: "Junior Software Engineer",
    companyName: "Meridian Cloud",
    opportunityType: "placement",
    stipendOrCtc: "₹8.5 LPA",
    location: "Hyderabad",
    requiredSkills: ["Python", "SQL", "AWS"],
    matchScore: 76,
    deadline: "Jan 15, 2027",
  },
];