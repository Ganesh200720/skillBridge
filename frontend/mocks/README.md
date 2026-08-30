# SkillBridge — Mock Data

This directory contains mock data used **only** when the real backend API contract
does not yet exist or is not fully connected for a feature.

## Rules

1. Mock files MUST be clearly named (e.g. `student-dashboard.ts`, `faculty.ts`, `industry.ts`, `institution.ts`)
2. Components that consume mock data MUST include a comment:
   `// MOCK: Replace with real API call when backend confirms endpoint`
3. Real API calls and mock data MUST NEVER be silently mixed.
4. When the real API is integrated, update or delete the corresponding mock file.

## Current mock files

| File | Feature | Backend status |
|------|---------|----------------|
| `student-dashboard.ts` | Student Dashboard UI (`/student`) | UI presentation mock; API integration ready |
| `skill-twin.ts` | Detailed Skill Twin Profile (`/student/skill-twin`) | UI presentation mock; awaiting schema confirmation |
| `assessments.ts` | Student Assessment List & History (`/student/assessments`) | UI presentation mock; awaiting schema confirmation |
| `assessment-quiz.ts` | Interactive Assessment-Taking Quiz (`/student/assessments/[id]`) | UI presentation mock engine |
| `roles.ts` | Recommended Roles & Role Detail (`/student/roles` & `[id]`) | UI presentation mock |
| `opportunities.ts` | Student Opportunities (`/student/opportunities`) | UI presentation mock |
| `preparation.ts` | Student Preparation & Learning Tracks (`/student/preparation`) | UI presentation mock |
| `faculty.ts` | Faculty Workspace UI (`/teacher/*`) | UI presentation mock for Student Management, Skills & Reports |
| `industry.ts` | Industry Workspace UI (`/industry/*`) | UI presentation mock for Candidates & Opportunities |
| `institution.ts` | Institution Workspace UI (`/institution/*`) | UI presentation mock for College Analytics & Placement Tracking |
