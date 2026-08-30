/**
 * SkillBridge — Institution API calls
 */

import { request } from "./client";
import type { InstitutionStudent, Opportunity } from "@/types";

/** GET /api/v1/institution/students/ */
export async function getStudents(): Promise<InstitutionStudent[]> {
  return request<InstitutionStudent[]>("/institution/students/");
}

/** GET /api/v1/institution/opportunities/ */
export async function getOpportunities(): Promise<Opportunity[]> {
  return request<Opportunity[]>("/institution/opportunities/");
}
