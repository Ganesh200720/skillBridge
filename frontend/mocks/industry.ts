/**
 * MOCK DATA: Industry (Company / Recruiter) Workspace
 * NOTE: Isolated presentation mock data for /industry routes.
 */

export interface IndustryCandidate {
  id: string;
  name: string;
  institution: string;
  degree: string;
  matchScore: number;
  readinessScore: number;
  verifiedSkills: string[];
  topGaps: string[];
  appliedOpportunity: string;
  applicationDate: string;
  status: "Shortlisted" | "Under Review" | "Interview Scheduled" | "Hired";
}

export const MOCK_INDUSTRY_STATS = {
  activeOpportunities: 4,
  totalApplicants: 84,
  shortlistedCandidates: 18,
  interviewsScheduled: 6,
  averageMatchScore: 84,
};

export const MOCK_INDUSTRY_CANDIDATES: IndustryCandidate[] = [
  {
    id: "cand-1",
    name: "Rahul Kumar",
    institution: "VIT Amaravati",
    degree: "B.Tech Computer Science",
    matchScore: 88,
    readinessScore: 82,
    verifiedSkills: ["Python (92%)", "SQL (81%)", "JavaScript (88%)"],
    topGaps: ["Django (+13 pts)"],
    appliedOpportunity: "Backend Engineering Intern",
    applicationDate: "Aug 26, 2026",
    status: "Shortlisted",
  },
  {
    id: "cand-2",
    name: "Priya Sharma",
    institution: "VIT Amaravati",
    degree: "B.Tech Computer Science",
    matchScore: 92,
    readinessScore: 88,
    verifiedSkills: ["JavaScript (94%)", "React (90%)", "Node.js (86%)"],
    topGaps: ["AWS Cloud (+10 pts)"],
    appliedOpportunity: "Frontend Developer Intern",
    applicationDate: "Aug 24, 2026",
    status: "Interview Scheduled",
  },
  {
    id: "cand-3",
    name: "Karan Mehta",
    institution: "IIT Hyderabad",
    degree: "B.Tech Computer Science",
    matchScore: 85,
    readinessScore: 84,
    verifiedSkills: ["Python (90%)", "Django (85%)", "SQL (84%)"],
    topGaps: ["Docker (+15 pts)"],
    appliedOpportunity: "Backend Engineering Intern",
    applicationDate: "Aug 25, 2026",
    status: "Under Review",
  },
];