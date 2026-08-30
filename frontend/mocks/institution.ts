/**
 * MOCK DATA: Institution / College Workspace
 * NOTE: Isolated presentation mock data for /institution routes.
 */

export interface InstitutionFacultyMember {
  id: string;
  name: string;
  title: string;
  department: string;
  studentsManaged: number;
  assessmentActivity: string;
  industryEngagement: "High" | "Moderate";
}

export interface InstitutionPlacementStat {
  id: string;
  companyName: string;
  drivesCompleted: number;
  offersMade: number;
  averagePackage: string;
  topSkillDemanded: string;
}

export const MOCK_INSTITUTION_STATS = {
  totalStudents: 1450,
  totalFaculty: 85,
  connectedCompanies: 42,
  averageReadinessScore: 78,
  activeInternships: 320,
  placementsCompleted: 185,
  overallPlacementRate: "84%",
};

export const MOCK_INSTITUTION_FACULTY: InstitutionFacultyMember[] = [
  {
    id: "fac-1",
    name: "Dr. Arisudan",
    title: "Professor & HOD",
    department: "Computer Science & Engineering",
    studentsManaged: 120,
    assessmentActivity: "Active (88% completion)",
    industryEngagement: "High",
  },
  {
    id: "fac-2",
    name: "Dr. Meenakshi Sundaram",
    title: "Associate Professor",
    department: "Information Technology",
    studentsManaged: 95,
    assessmentActivity: "Active (82% completion)",
    industryEngagement: "High",
  },
  {
    id: "fac-3",
    name: "Prof. Rajesh Varma",
    title: "Assistant Professor",
    department: "Electronics & Communication",
    studentsManaged: 85,
    assessmentActivity: "Moderate (74% completion)",
    industryEngagement: "Moderate",
  },
];

export const MOCK_INSTITUTION_PLACEMENTS: InstitutionPlacementStat[] = [
  {
    id: "plc-1",
    companyName: "Nimbus Systems",
    drivesCompleted: 2,
    offersMade: 18,
    averagePackage: "₹8.5 LPA",
    topSkillDemanded: "Python & Backend Systems",
  },
  {
    id: "plc-2",
    companyName: "Coral Retail Tech",
    drivesCompleted: 1,
    offersMade: 12,
    averagePackage: "₹7.2 LPA",
    topSkillDemanded: "React & Frontend Architecture",
  },
  {
    id: "plc-3",
    companyName: "Meridian Cloud",
    drivesCompleted: 3,
    offersMade: 25,
    averagePackage: "₹9.5 LPA",
    topSkillDemanded: "AWS & Cloud DevOps",
  },
];