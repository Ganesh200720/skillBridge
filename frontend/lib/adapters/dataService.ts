/**
 * SkillBridge — Unified Data Access Layer Service
 * Dynamically switches between Demo Mode mock data and Live Backend REST APIs.
 */

import { getSkillTwin, getRoleRecommendations } from "@/lib/api/student";
import { normalizeSkillTwinFromApi, normalizeSkillTwinFromMock } from "./skillTwinAdapter";
import type { NormalizedSkillTwin } from "./types";

export class DataService {
  /**
   * Fetches Skill Twin model — dynamically uses API or Demo fallback
   */
  static async getSkillTwin(isDemoMode: boolean): Promise<NormalizedSkillTwin> {
    if (isDemoMode) {
      return normalizeSkillTwinFromMock();
    }

    try {
      const [apiSkillTwin, apiRoles] = await Promise.all([
        getSkillTwin(),
        getRoleRecommendations().catch(() => []),
      ]);
      return normalizeSkillTwinFromApi(apiSkillTwin, apiRoles);
    } catch (err) {
      console.warn("API request failed, falling back to Demo Mode data adapter", err);
      return normalizeSkillTwinFromMock();
    }
  }
}