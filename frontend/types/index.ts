// =============================================================
// SkillBridge — Centralised TypeScript types
// All API response shapes live here.
// Components import from "@/types"
// =============================================================

// ------------------------------------------------------------------
// Auth / User
// ------------------------------------------------------------------

export type BackendRole = "student" | "teacher" | "industry" | "institution";

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: BackendRole;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse extends AuthTokens {
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: BackendRole;
}

// ------------------------------------------------------------------
// Skills
// ------------------------------------------------------------------

export interface Skill {
  id: number;
  name: string;
  description?: string;
  category?: string;
}

export interface StudentSkill {
  skill: number;
  skill_name: string;
  skill_category?: string;
  category?: string;
  score: number;
  confidence?: number;
  evidence_count?: number;
  level?: string;
  last_assessed?: string;
  trend?: "up" | "down" | "stable" | "new" | "improving" | "declining";
  score_change?: number;
  attempt_count?: number;
  score_history?: number[];
}

// ------------------------------------------------------------------
// Skill Twin
// ------------------------------------------------------------------

export interface SkillTwin {
  student: number | { id: number; username: string; name: string };
  skills: StudentSkill[];
  overall_readiness?: number;
  updated_at?: string;
}

// ------------------------------------------------------------------
// Assessments
// ------------------------------------------------------------------

export interface SkillTest {
  id: number;
  skill: number | { id: number; name: string; category?: string };
  skill_name?: string;
  title: string;
  description?: string;
  question_count?: number;
  duration_minutes?: number;
  time_limit_minutes?: number;
  passing_score?: number;
  is_active?: boolean;
}

export interface AssessmentHistoryEntry {
  id?: number;
  attempt_id?: number;
  test_id?: number;
  test_title?: string;
  skill?: number | { id: number; name: string };
  skill_name?: string;
  score: number;
  confidence?: number;
  correct_answers?: number;
  total_questions?: number;
  completed_at?: string;
  taken_at?: string;
  attempt_number?: number;
  topics?: { topic: string; score: number; correct_answers: number; total_questions: number }[];
}

// ------------------------------------------------------------------
// Roles & Readiness
// ------------------------------------------------------------------

export interface RoleRequirement {
  skill: number;
  skill_name: string;
  importance: "required" | "preferred" | "bonus";
  minimum_score: number;
  weight?: number;
}

export interface Role {
  id: number;
  title: string;
  description?: string;
  skills?: RoleRequirement[];
  requirements?: RoleRequirement[];
}

export interface SkillGap {
  skill: number | string;
  skill_name?: string;
  student_score?: number;
  current_score?: number;
  required_score: number;
  gap: number;
  importance?: "required" | "preferred" | "bonus";
}

export interface RoleReadiness {
  role: number | { id: number; title: string; description?: string };
  role_title?: string;
  readiness_score?: number;
  readiness?: number | { score: number; level: string };
  gaps?: SkillGap[];
  skill_gaps?: SkillGap[];
  meets_requirements?: boolean;
}

export interface RoleRecommendation {
  role_id?: number;
  role: number | string;
  role_title?: string;
  readiness_score?: number;
  readiness?: number;
  level?: string;
  assessed_skills?: number;
  total_skills?: number;
  top_gaps?: SkillGap[];
  skill_gaps?: SkillGap[];
}

// ------------------------------------------------------------------
// Learning
// ------------------------------------------------------------------

export interface LearningItem {
  skill: number;
  skill_name: string;
  resource_type?: string;
  title?: string;
  url?: string;
  reason?: string;
}

// ------------------------------------------------------------------
// Opportunities
// ------------------------------------------------------------------

export type OpportunityType = "internship" | "project" | "placement" | "fdp" | "research";

export interface OpportunitySkill {
  skill: number;
  skill_name: string;
  importance: "required" | "preferred" | "bonus";
  minimum_score: number;
}

export interface Opportunity {
  id: number;
  title: string;
  description?: string;
  opportunity_type: OpportunityType;
  location?: string;
  duration?: string;
  application_deadline?: string;
  is_active: boolean;
  created_at: string;
  industry_name: string;
  skills: OpportunitySkill[];
}

export interface CreateOpportunityRequest {
  title: string;
  description?: string;
  opportunity_type: OpportunityType;
  location?: string;
  duration?: string;
  application_deadline?: string;
  skills: Omit<OpportunitySkill, "skill_name">[];
}

// ------------------------------------------------------------------
// Teacher (Faculty) view
// ------------------------------------------------------------------

export interface TeacherStudentSummary {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  skill_count?: number;
  readiness_score?: number;
}

export interface TeacherOpportunityMatch {
  student: number;
  student_name: string;
  match_score: number;
  gaps: SkillGap[];
}

// ------------------------------------------------------------------
// Institution view
// ------------------------------------------------------------------

export interface InstitutionStudent {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  skill_count?: number;
  readiness_score?: number;
  skills?: StudentSkill[];
}

// ------------------------------------------------------------------
// API utility types
// ------------------------------------------------------------------

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail?: string;
  [field: string]: unknown;
}