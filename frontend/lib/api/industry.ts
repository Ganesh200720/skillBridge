/**
 * SkillBridge — Industry API calls
 * Backend role: "industry"
 * UI label: "Company" / "Recruiter"
 *
 * NOTE: Candidate discovery / search API is NOT yet confirmed.
 *       Do NOT add GET /industry/candidates/ here.
 */

import { request } from "./client";
import type { Opportunity, CreateOpportunityRequest } from "@/types";

/** GET /api/v1/industry/opportunities/ */
export async function getOpportunities(): Promise<Opportunity[]> {
  return request<Opportunity[]>("/industry/opportunities/");
}

/** POST /api/v1/industry/opportunities/ */
export async function createOpportunity(
  data: CreateOpportunityRequest
): Promise<Opportunity> {
  return request<Opportunity>("/industry/opportunities/", {
    method: "POST",
    body: data,
  });
}

/** GET /api/v1/industry/opportunities/:id/ */
export async function getOpportunity(id: number): Promise<Opportunity> {
  return request<Opportunity>(`/industry/opportunities/${id}/`);
}
