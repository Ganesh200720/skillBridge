/**
 * SkillBridge — API barrel export
 * Import from "@/lib/api" for convenience.
 */

export * as authApi from "./auth";
export * as studentApi from "./student";
export * as teacherApi from "./teacher";
export * as industryApi from "./industry";
export * as institutionApi from "./institution";
export { getAccessToken, clearTokens, ApiClientError } from "./client";
