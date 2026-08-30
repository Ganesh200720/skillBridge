/**
 * SkillBridge — Normalized Data Models & Adapters
 * Decouples UI components from both Backend JSON schemas and Mock data formats.
 */

export interface NormalizedSkillNode {
  id: string;
  name: string;
  category: string;
  score: number;
  targetScore: number;
  status: "Strong" | "Developing" | "Missing" | "Target Met";
  evidenceCount: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  confidence?: number;
  lastAssessed?: string;
  trend?: "up" | "down" | "stable";
  scoreChange?: number;
  attemptCount?: number;
  scoreHistory?: number[];
  subskills: string[];
  prerequisites: string[];
  relatedRoles: string[];
}

export interface NormalizedRoleSkillRequirement {
  skillId: string | number;
  skillName: string;
  currentStudentScore: number;
  minimumScore: number;
  gap: number;
  importance: "required" | "preferred" | "bonus";
  status: "Requirement Met" | "Skill Gap";
}

export interface NormalizedCareerRole {
  id: string | number;
  title: string;
  description?: string;
  readinessScore: number;
  requirements: NormalizedRoleSkillRequirement[];
}

export interface NormalizedSkillTwin {
  studentId: string;
  studentName: string;
  overallReadiness: number;
  statusLabel: string;
  totalSkillsAssessed: number;
  totalEvidenceCount: number;
  updatedAt: string;
  skills: NormalizedSkillNode[];
  careerBranches: NormalizedCareerRole[];
  strengths: { id: string; name: string; score: number; percentile: string }[];
  gaps: { id: string; skillName: string; currentScore: number; targetScore: number; targetRole: string }[];
  dataSource: "API Mode (Live Backend)" | "Demo Mode (Mock Data)";
}