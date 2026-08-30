/**
 * SkillBridge — Skill Twin Normalization Adapter
 * Normalizes both Backend API JSON and Demo Mock datasets into NormalizedSkillTwin
 */

import type { SkillTwin as ApiSkillTwin, RoleRecommendation as ApiRoleRecommendation } from "@/types";
import { MOCK_SKILL_TWIN_PROFILE } from "@/mocks/skill-twin";
import type { NormalizedSkillTwin, NormalizedSkillNode, NormalizedCareerRole, NormalizedRoleSkillRequirement } from "./types";

export function normalizeSkillTwinFromMock(): NormalizedSkillTwin {
  const skills: NormalizedSkillNode[] = MOCK_SKILL_TWIN_PROFILE.skills.map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category,
    score: s.score,
    targetScore: s.score >= 80 ? 80 : 75,
    status: s.score >= 80 ? "Strong" : s.score >= 60 ? "Developing" : "Missing",
    evidenceCount: s.evidenceCount,
    level: s.proficiency as NormalizedSkillNode["level"],
    confidence: 90,
    lastAssessed: s.lastAssessed,
    trend: s.score >= 80 ? "up" : "stable",
    scoreChange: 5,
    attemptCount: 2,
    scoreHistory: [62, 68, 74, s.score],
    subskills: s.name === "Python" ? ["OOP", "Functions", "Iterators"] : ["Core Syntax"],
    prerequisites: s.name === "Django" ? ["Python Core & OOP"] : [],
    relatedRoles: ["Backend Developer", "Full Stack Engineer"],
  }));

  const careerBranches: NormalizedCareerRole[] = [
    {
      id: "role-1",
      title: "Backend Developer (Python/Django)",
      readinessScore: 82,
      description: "Build robust REST APIs, server-side business logic, and database schemas.",
      requirements: [
        { skillId: "python", skillName: "Python Core & OOP", currentStudentScore: 92, minimumScore: 80, gap: 0, importance: "required", status: "Requirement Met" },
        { skillId: "sql", skillName: "SQL Query Optimization", currentStudentScore: 81, minimumScore: 75, gap: 0, importance: "required", status: "Requirement Met" },
        { skillId: "django", skillName: "Django REST Framework", currentStudentScore: 62, minimumScore: 75, gap: -13, importance: "required", status: "Skill Gap" },
      ],
    },
    {
      id: "role-2",
      title: "Full Stack Engineer (React/Node)",
      readinessScore: 78,
      description: "Develop full-stack web applications connecting React frontends to backend APIs.",
      requirements: [
        { skillId: "js", skillName: "JavaScript Modern", currentStudentScore: 88, minimumScore: 80, gap: 0, importance: "required", status: "Requirement Met" },
        { skillId: "react", skillName: "React Architecture", currentStudentScore: 84, minimumScore: 75, gap: 0, importance: "required", status: "Requirement Met" },
        { skillId: "aws", skillName: "AWS Cloud Services", currentStudentScore: 40, minimumScore: 70, gap: -30, importance: "preferred", status: "Skill Gap" },
      ],
    },
  ];

  const strengths = MOCK_SKILL_TWIN_PROFILE.strengths.map((st) => ({
    id: st.id,
    name: st.skillName,
    score: st.score,
    percentile: st.percentile,
  }));

  return {
    studentId: "std-1",
    studentName: "Rahul Kumar",
    overallReadiness: MOCK_SKILL_TWIN_PROFILE.overallReadiness,
    statusLabel: MOCK_SKILL_TWIN_PROFILE.status,
    totalSkillsAssessed: MOCK_SKILL_TWIN_PROFILE.totalSkillsAssessed,
    totalEvidenceCount: MOCK_SKILL_TWIN_PROFILE.totalEvidenceCount,
    updatedAt: MOCK_SKILL_TWIN_PROFILE.lastUpdated,
    skills,
    careerBranches,
    strengths,
    gaps: MOCK_SKILL_TWIN_PROFILE.gaps,
    dataSource: "Demo Mode (Mock Data)",
  };
}

export function normalizeSkillTwinFromApi(
  apiData: any,
  rawRoles: any = []
): NormalizedSkillTwin {
  const rawSkillsList = Array.isArray(apiData) ? apiData : (apiData?.skills || []);
  const studentInfo = apiData?.student || {};

  const skills: NormalizedSkillNode[] = rawSkillsList.map((s: any, idx: number) => {
    const rawCategory = s.skill_category || s.category || "Technical Competencies";
    const rawScore = s.score || 0;

    return {
      id: `api-sk-${s.skill || idx}`,
      name: s.skill_name || `Skill ${s.skill}`,
      category: rawCategory,
      score: rawScore,
      targetScore: 75,
      status: rawScore >= 80 ? "Strong" : rawScore >= 60 ? "Developing" : "Missing",
      evidenceCount: s.evidence_count || 1,
      level: (s.level as NormalizedSkillNode["level"]) || (rawScore >= 80 ? "Advanced" : rawScore >= 60 ? "Intermediate" : "Beginner"),
      confidence: s.confidence,
      lastAssessed: s.last_assessed,
      trend: s.trend,
      scoreChange: s.score_change,
      attemptCount: s.attempt_count,
      scoreHistory: s.score_history || [],
      // Real API mode does NOT invent undocumented subskills or prerequisites
      subskills: [],
      prerequisites: [],
      relatedRoles: [],
    };
  });

  const rolesList = Array.isArray(rawRoles) ? rawRoles : (rawRoles?.recommendations || []);

  const careerBranches: NormalizedCareerRole[] = rolesList.map((r: any) => {
    const roleId = r.role_id || r.role;
    const roleTitle = r.role || r.role_title || `Role ${roleId}`;
    const readinessScore = r.readiness || r.readiness_score || 0;
    const gapsList = r.skill_gaps || r.top_gaps || [];

    const requirements: NormalizedRoleSkillRequirement[] = gapsList.map((g: any, gIdx: number) => {
      const skillName = g.skill || g.skill_name || `Skill ${gIdx}`;
      const currentScore = g.current_score !== undefined ? g.current_score : (g.student_score || 0);
      const minScore = g.required_score || 70;
      const gapVal = g.gap !== undefined ? g.gap : (minScore - (currentScore || 0));

      return {
        skillId: `sk-${gIdx}`,
        skillName,
        currentStudentScore: currentScore || 0,
        minimumScore: minScore,
        gap: -Math.abs(gapVal),
        importance: g.importance || "required",
        status: (currentScore || 0) >= minScore ? "Requirement Met" : "Skill Gap",
      };
    });

    return {
      id: `role-${roleId}`,
      title: roleTitle,
      readinessScore: Math.round(readinessScore),
      requirements,
    };
  });

  const readiness = apiData?.overall_readiness || (skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + s.score, 0) / skills.length) : 70);

  return {
    studentId: String(studentInfo.id || "1"),
    studentName: studentInfo.name || studentInfo.username || "Student User",
    overallReadiness: readiness,
    statusLabel: readiness >= 80 ? "Placement Ready" : "Developing",
    totalSkillsAssessed: skills.length,
    totalEvidenceCount: skills.reduce((acc, s) => acc + s.evidenceCount, 0),
    updatedAt: new Date().toISOString(),
    skills,
    careerBranches,
    strengths: [],
    gaps: [],
    dataSource: "API Mode (Live Backend)",
  };
}