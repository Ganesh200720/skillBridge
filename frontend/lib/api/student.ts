/**
 * SkillBridge — Student API calls
 * Only confirmed endpoints are listed here.
 * Do NOT add endpoints that have not been confirmed by the backend team.
 */

import { request } from "./client";
import type {
  SkillTwin,
  Opportunity,
  RoleRecommendation,
  Role,
  SkillTest,
  AssessmentHistoryEntry,
  LearningItem,
} from "@/types";

/** GET /api/v1/skill-twin/ */
export async function getSkillTwin(): Promise<SkillTwin> {
  return request<SkillTwin>("/skill-twin/");
}

/** GET /api/v1/student/opportunities/ */
export async function getStudentOpportunities(): Promise<Opportunity[]> {
  return request<Opportunity[]>("/student/opportunities/");
}

/** GET /api/v1/roles/recommendations/ */
export async function getRoleRecommendations(): Promise<RoleRecommendation[]> {
  return request<RoleRecommendation[]>("/roles/recommendations/");
}

/** GET /api/v1/roles/:id/ */
export async function getRole(id: number): Promise<Role> {
  return request<Role>(`/roles/${id}/`);
}

/** GET /api/v1/skill-tests/ */
export async function getSkillTests(): Promise<SkillTest[]> {
  return request<SkillTest[]>("/skill-tests/");
}

/** GET /api/v1/assessment-history/ */
export async function getAssessmentHistory(): Promise<AssessmentHistoryEntry[]> {
  return request<AssessmentHistoryEntry[]>("/assessment-history/");
}

/** GET /api/v1/learning/next/ */
export async function getNextLearning(): Promise<LearningItem[]> {
  return request<LearningItem[]>("/learning/next/");
}
