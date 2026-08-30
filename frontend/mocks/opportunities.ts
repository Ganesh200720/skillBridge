/**
 * MOCK DATA: Student Opportunities (Internships & Placements)
 *
 * NOTE: This is isolated presentation data for the /student/opportunities UI.
 */

export interface DetailedOpportunity {
  id: string;
  title: string;
  companyName: string;
  opportunityType: "internship" | "placement" | "project";
  location: string;
  locationType: "Remote" | "On-site" | "Hybrid";
  stipendOrCtc: string;
  duration?: string;
  applicationDeadline: string;
  description: string;
  requiredSkills: { skillName: string; minimumScore: number }[];
  matchScore: number;
  applicantsCount: number;
  isApplied: boolean;
  status: "Open" | "Closing Soon" | "Applied";
}

export const MOCK_OPPORTUNITIES: DetailedOpportunity[] = [
  {
    id: "opp-101",
    title: "Backend Engineering Intern",
    companyName: "Nimbus Systems",
    opportunityType: "internship",
    location: "Remote",
    locationType: "Remote",
    stipendOrCtc: "₹22,000/mo",
    duration: "6 months",
    applicationDeadline: "Dec 31, 2026",
    description:
      "Join our core backend infrastructure team building REST APIs and real-time processing pipelines. You will collaborate with senior architects to optimize database queries and service performance.",
    requiredSkills: [
      { skillName: "Python", minimumScore: 80 },
      { skillName: "SQL", minimumScore: 75 },
      { skillName: "Django", minimumScore: 65 },
    ],
    matchScore: 88,
    applicantsCount: 14,
    isApplied: false,
    status: "Open",
  },
  {
    id: "opp-102",
    title: "Frontend Developer Intern",
    companyName: "Coral Retail Tech",
    opportunityType: "internship",
    location: "Bengaluru",
    locationType: "On-site",
    stipendOrCtc: "₹18,000/mo",
    duration: "3 months",
    applicationDeadline: "Nov 15, 2026",
    description:
      "Build high-performance React component interfaces for our live e-commerce dashboard platform. Work directly with UX designers and frontend leads.",
    requiredSkills: [
      { skillName: "JavaScript", minimumScore: 80 },
      { skillName: "React", minimumScore: 75 },
    ],
    matchScore: 85,
    applicantsCount: 22,
    isApplied: true,
    status: "Applied",
  },
  {
    id: "opp-103",
    title: "Junior Software Engineer",
    companyName: "Meridian Cloud",
    opportunityType: "placement",
    location: "Hyderabad",
    locationType: "Hybrid",
    stipendOrCtc: "₹8.5 LPA",
    applicationDeadline: "Jan 15, 2027",
    description:
      "Full-time entry-level engineering position building cloud microservices, automated CI/CD deployment pipelines, and client API services.",
    requiredSkills: [
      { skillName: "Python", minimumScore: 80 },
      { skillName: "SQL", minimumScore: 75 },
      { skillName: "AWS Cloud", minimumScore: 65 },
    ],
    matchScore: 76,
    applicantsCount: 45,
    isApplied: false,
    status: "Open",
  },
  {
    id: "opp-104",
    title: "Full Stack Engineering Intern",
    companyName: "Zenith Fintech Solutions",
    opportunityType: "internship",
    location: "Mumbai",
    locationType: "Hybrid",
    stipendOrCtc: "₹25,000/mo",
    duration: "6 months",
    applicationDeadline: "Dec 10, 2026",
    description:
      "Assist in building scalable payment processing dashboards and user account services using React, Node.js, and PostgreSQL.",
    requiredSkills: [
      { skillName: "JavaScript", minimumScore: 80 },
      { skillName: "React", minimumScore: 75 },
      { skillName: "SQL", minimumScore: 70 },
    ],
    matchScore: 82,
    applicantsCount: 19,
    isApplied: false,
    status: "Closing Soon",
  },
];