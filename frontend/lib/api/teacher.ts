/**
 * SkillBridge — Teacher (Faculty) API calls
 * Backend role: "teacher"
 * UI label: "Faculty" / "Teacher"
 */

import { request } from "./client";
import type {
  TeacherStudentSummary,
  Opportunity,
  TeacherOpportunityMatch,
} from "@/types";

/** GET /api/v1/teacher/students/ */
export async function getStudents(): Promise<TeacherStudentSummary[]> {
  return request<TeacherStudentSummary[]>("/teacher/students/");
}

/** GET /api/v1/teacher/students/:id/ */
export async function getStudent(id: number): Promise<TeacherStudentSummary> {
  return request<TeacherStudentSummary>(`/teacher/students/${id}/`);
}

/** GET /api/v1/teacher/opportunities/ */
export async function getOpportunities(): Promise<Opportunity[]> {
  return request<Opportunity[]>("/teacher/opportunities/");
}

/** GET /api/v1/teacher/opportunities/:id/matches/ */
export async function getOpportunityMatches(
  opportunityId: number
): Promise<TeacherOpportunityMatch[]> {
  return request<TeacherOpportunityMatch[]>(
    `/teacher/opportunities/${opportunityId}/matches/`
  );
}
