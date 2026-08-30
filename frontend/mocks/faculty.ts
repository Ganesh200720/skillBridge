/**
 * MOCK DATA: Faculty (Teacher) Workspace
 * NOTE: Isolated presentation mock data for /teacher routes.
 */

export interface FacultyStudentSummary {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  year: string;
  readinessScore: number;
  assessmentStatus: "Up to date" | "Pending Test" | "Needs Attention";
  topSkill: string;
  majorGap: string;
  status: "Placement Ready" | "Developing" | "At Risk";
}

export interface FacultyAssessmentOverview {
  id: string;
  title: string;
  skillName: string;
  totalAssigned: number;
  completedCount: number;
  averageScore: number;
  pendingCount: number;
}

export const MOCK_FACULTY_STATS = {
  totalStudents: 120,
  activeStudents: 114,
  averageReadiness: 76,
  assessmentCompletionRate: 88,
  topDepartmentSkill: "Python & SQL",
  criticalGap: "AWS Cloud & DevOps",
};

export const MOCK_FACULTY_STUDENTS: FacultyStudentSummary[] = [
  {
    id: "std-1",
    name: "Rahul Kumar",
    rollNumber: "24MIS7285",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    readinessScore: 82,
    assessmentStatus: "Up to date",
    topSkill: "Python (92%)",
    majorGap: "Django (+13 pts)",
    status: "Placement Ready",
  },
  {
    id: "std-2",
    name: "Priya Sharma",
    rollNumber: "24MIS7290",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    readinessScore: 88,
    assessmentStatus: "Up to date",
    topSkill: "JavaScript (94%)",
    majorGap: "AWS Cloud (+10 pts)",
    status: "Placement Ready",
  },
  {
    id: "std-3",
    name: "Anand Verma",
    rollNumber: "24MIS7305",
    department: "Information Technology",
    year: "3rd Year",
    readinessScore: 64,
    assessmentStatus: "Pending Test",
    topSkill: "SQL (81%)",
    majorGap: "React (-22 pts)",
    status: "Developing",
  },
  {
    id: "std-4",
    name: "Sneha Patel",
    rollNumber: "24MIS7312",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    readinessScore: 52,
    assessmentStatus: "Needs Attention",
    topSkill: "Python (68%)",
    majorGap: "Data Structures (-30 pts)",
    status: "At Risk",
  },
];

export const MOCK_FACULTY_ASSESSMENTS: FacultyAssessmentOverview[] = [
  {
    id: "f-test-1",
    title: "Python OOP & Data Structures Test",
    skillName: "Python",
    totalAssigned: 120,
    completedCount: 112,
    averageScore: 84,
    pendingCount: 8,
  },
  {
    id: "f-test-2",
    title: "SQL Query Optimization & Database Design",
    skillName: "SQL",
    totalAssigned: 120,
    completedCount: 105,
    averageScore: 78,
    pendingCount: 15,
  },
  {
    id: "f-test-3",
    title: "React Component Architecture & State",
    skillName: "React",
    totalAssigned: 120,
    completedCount: 95,
    averageScore: 72,
    pendingCount: 25,
  },
];