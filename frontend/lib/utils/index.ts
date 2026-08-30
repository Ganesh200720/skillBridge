/**
 * SkillBridge — Shared utility functions
 */

/** Format an ISO date string to a readable local date */
export function formatDate(isoString: string): string {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Return a CSS-safe score colour class based on score 0–100 */
export function scoreColorClass(score: number): string {
  if (score >= 70) return "text-teal";
  if (score >= 40) return "text-brass";
  return "text-coral";
}

/** Truncate long strings with ellipsis */
export function truncate(str: string, maxLen = 80): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + "...";
}

/** Display name for a user: first + last, or username fallback */
export function displayName(user: {
  first_name?: string;
  last_name?: string;
  username: string;
}): string {
  const full = [user.first_name, user.last_name].filter(Boolean).join(" ");
  return full || user.username;
}

/**
 * UI label for a backend role.
 * Backend role "teacher" → UI label "Faculty"
 * Backend role "industry" → UI label "Company"
 */
export function roleLabel(role: string): string {
  const labels: Record<string, string> = {
    student: "Student",
    teacher: "Faculty",
    industry: "Company",
    institution: "Institution",
  };
  return labels[role] ?? role;
}
