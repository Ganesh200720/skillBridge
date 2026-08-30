"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { authApi, ApiClientError } from "@/lib/api";
import { roleLabel } from "@/lib/utils";
import type { BackendRole, SignupRequest } from "@/types";

const ROLE_OPTIONS: { role: BackendRole; label: string; icon: string }[] = [
  { role: "student",     label: "Student",     icon: "🎓" },
  { role: "teacher",     label: "Faculty",     icon: "📚" },
  { role: "industry",    label: "Company",     icon: "🏭" },
  { role: "institution", label: "Institution", icon: "🏛️" },
];

type AuthTab = "login" | "demo" | "signup";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  border: "1.5px solid var(--line-strong)",
  borderRadius: "9px",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  background: "#FFFFFF",
  color: "var(--ink)",
  fontWeight: 500,
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11.5px",
  fontWeight: 700,
  color: "var(--ink)",
  marginBottom: "5px",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const fieldStyle: React.CSSProperties = { marginBottom: "14px" };

function AuthFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading, login, enableDemoMode } = useAuth();

  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  const queryRole = searchParams.get("role") as BackendRole | null;
  const [selectedRole, setSelectedRole] = useState<BackendRole>(
    queryRole && ROLE_OPTIONS.some((r) => r.role === queryRole) ? queryRole : "student"
  );

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  const [signupFields, setSignupFields] = useState<SignupRequest>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    role: "student",
  });
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  const [signupSubmitting, setSignupSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupSuccessUsername, setSignupSuccessUsername] = useState("");

  useEffect(() => {
    if (!isLoading && user && activeTab !== "signup") {
      router.replace(`/${user.role}`);
    }
  }, [user, isLoading, router, activeTab]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const u = loginUsername.trim();
    const p = loginPassword.trim();
    if (!u || !p) {
      setLoginError("Please enter both username and password.");
      return;
    }
    setLoginSubmitting(true);
    try {
      await login({ username: u, password: p });
    } catch (err: unknown) {
      setLoginSubmitting(false);
      if (err instanceof ApiClientError) {
        if (err.status === 401 || err.status === 400) {
          const detail =
            err.data && typeof err.data === "object" && "detail" in err.data
              ? (err.data as { detail?: string }).detail
              : null;
          setLoginError(detail || "Invalid username or password. Please try again.");
        } else {
          setLoginError(`Backend returned error ${err.status}. Please try again later.`);
        }
      } else if (err instanceof Error && err.name === "TypeError") {
        setLoginError(
          "Unable to connect to SkillBridge backend (http://127.0.0.1:8000). Use the Demo tab to preview the UI offline."
        );
      } else {
        setLoginError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleDemoClick = () => {
    enableDemoMode(selectedRole);
    router.push(`/${selectedRole}`);
  };

  const setSignupField = (field: keyof SignupRequest, value: string) => {
    setSignupFields((prev) => ({ ...prev, [field]: value }));
    if (signupErrors[field]) {
      setSignupErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateSignup = (): boolean => {
    const errs: Record<string, string> = {};
    if (!signupFields.username.trim()) errs.username = "Username is required.";
    if (!signupFields.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupFields.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!signupFields.first_name.trim()) errs.first_name = "First name is required.";
    if (!signupFields.last_name.trim()) errs.last_name = "Last name is required.";
    if (!signupFields.password) {
      errs.password = "Password is required.";
    } else if (signupFields.password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }
    if (!signupConfirmPassword) {
      errs.confirm_password = "Please confirm your password.";
    } else if (signupFields.password !== signupConfirmPassword) {
      errs.confirm_password = "Passwords do not match.";
    }
    setSignupErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupErrors({});
    if (!validateSignup()) return;
    setSignupSubmitting(true);
    try {
      await authApi.signup({ ...signupFields });
      setSignupSuccessUsername(signupFields.username);
      setSignupSuccess(true);
    } catch (err: unknown) {
      setSignupSubmitting(false);
      if (err instanceof ApiClientError) {
        if (err.data && typeof err.data === "object") {
          const backendErrors = err.data as Record<string, unknown>;
          const mapped: Record<string, string> = {};
          for (const [field, msgs] of Object.entries(backendErrors)) {
            if (Array.isArray(msgs)) {
              mapped[field] = msgs.join(" ");
            } else if (typeof msgs === "string") {
              mapped[field] = msgs;
            }
          }
          if (Object.keys(mapped).length > 0) {
            setSignupErrors(mapped);
          } else {
            setSignupErrors({ _general: `Signup failed (HTTP ${err.status}). Please try again.` });
          }
        } else {
          setSignupErrors({ _general: `Backend error ${err.status}. Please try again.` });
        }
      } else if (err instanceof Error && err.name === "TypeError") {
        setSignupErrors({
          _general: "Unable to connect to SkillBridge backend (http://127.0.0.1:8000). Make sure Django is running.",
        });
      } else {
        setSignupErrors({ _general: "An unexpected error occurred. Please try again." });
      }
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--ink)", fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 600 }}>
          Verifying session...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ background: "var(--ink)", color: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "#FFFFFF", textDecoration: "none" }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, var(--brass), var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 13, color: "#FFFFFF", fontWeight: 700 }}>SB</span>
            SkillBridge
          </Link>
          <Link href="/" style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 600, textDecoration: "none", backgroundColor: "rgba(255,255,255,0.12)", padding: "6px 14px", borderRadius: "8px" }}>
            ← Home
          </Link>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ background: "var(--card)", border: "1.5px solid var(--line-strong)", borderRadius: "var(--radius-lg)", padding: "36px 32px", maxWidth: activeTab === "signup" ? 560 : 460, width: "100%", boxShadow: "var(--shadow-md)" }}>

          {/* Role Selector */}
          <div style={{ display: "flex", gap: "4px", background: "var(--paper-dim)", borderRadius: "10px", padding: "4px", marginBottom: "24px", border: "1px solid var(--line)" }}>
            {ROLE_OPTIONS.map((r) => {
              const isSelected = selectedRole === r.role;
              return (
                <button key={r.role} type="button" onClick={() => setSelectedRole(r.role)}
                  style={{ flex: 1, background: isSelected ? "var(--ink)" : "transparent", color: isSelected ? "#FFFFFF" : "var(--ink)", border: "none", padding: "9px 4px", borderRadius: "8px", fontSize: "12px", fontWeight: isSelected ? 700 : 600, cursor: "pointer", transition: "all 0.15s ease" }}>
                  {r.icon} {r.label}
                </button>
              );
            })}
          </div>

          {/* Three-Tab Selector */}
          <div style={{ display: "flex", gap: 0, marginBottom: "28px", border: "1.5px solid var(--line-strong)", borderRadius: "10px", overflow: "hidden" }}>
            {(["login", "demo", "signup"] as AuthTab[]).map((tab, idx) => {
              const isActive = activeTab === tab;
              const labels: Record<AuthTab, string> = { login: "Log In", demo: "⚡ Demo", signup: "Sign Up" };
              return (
                <button key={tab} type="button"
                  onClick={() => { setActiveTab(tab); setLoginError(null); setSignupErrors({}); setSignupSuccess(false); }}
                  style={{ flex: 1, padding: "11px 8px", fontSize: "13.5px", fontWeight: 700, border: "none", borderRight: idx < 2 ? "1.5px solid var(--line-strong)" : "none", background: isActive ? (tab === "demo" ? "var(--brass)" : "var(--ink)") : "var(--paper-dim)", color: isActive ? (tab === "demo" ? "#221704" : "#FFFFFF") : "var(--ink-mid)", cursor: "pointer", transition: "all 0.15s ease" }}>
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {/* === LOGIN === */}
          {activeTab === "login" && (
            <>
              <div style={{ textAlign: "center", marginBottom: "22px" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--ink)", margin: "0 0 5px 0" }}>{roleLabel(selectedRole)} Login</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: 0 }}>Sign in with your assigned SkillBridge account.</p>
              </div>
              {loginError && (
                <div style={{ backgroundColor: "var(--coral-soft)", border: "1.5px solid var(--coral-border)", color: "var(--coral)", borderRadius: "10px", padding: "12px 14px", fontSize: "13px", fontWeight: 600, marginBottom: "20px" }}>
                  ⚠️ {loginError}
                </div>
              )}
              <form onSubmit={handleLoginSubmit}>
                <div style={fieldStyle}>
                  <label htmlFor="login-username" style={labelStyle}>Username</label>
                  <input id="login-username" type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} placeholder="e.g. student1" disabled={loginSubmitting} style={inputStyle} />
                </div>
                <div style={{ ...fieldStyle, marginBottom: "24px" }}>
                  <label htmlFor="login-password" style={labelStyle}>Password</label>
                  <input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" disabled={loginSubmitting} style={inputStyle} />
                </div>
                <button type="submit" disabled={loginSubmitting} style={{ width: "100%", backgroundColor: "var(--ink)", color: "#FFFFFF", border: "1.5px solid var(--ink)", borderRadius: "10px", padding: "13px 20px", fontWeight: 700, fontSize: "14.5px", cursor: loginSubmitting ? "wait" : "pointer", opacity: loginSubmitting ? 0.7 : 1, boxShadow: "0 2px 6px rgba(18,32,61,0.2)", transition: "all 0.15s ease" }}>
                  {loginSubmitting ? "Authenticating..." : "Log In"}
                </button>
              </form>
              <p style={{ marginTop: "20px", textAlign: "center", fontSize: "13px", color: "var(--text-secondary)" }}>
                New to SkillBridge?{" "}
                <button type="button" onClick={() => setActiveTab("signup")} style={{ background: "none", border: "none", color: "var(--teal)", fontWeight: 700, fontSize: "13px", cursor: "pointer", padding: 0, textDecoration: "underline" }}>
                  Create an account →
                </button>
              </p>
            </>
          )}

          {/* === DEMO === */}
          {activeTab === "demo" && (
            <>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--ink)", margin: "0 0 5px 0" }}>⚡ Demo Mode</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: 0 }}>Explore the full {roleLabel(selectedRole)} workspace with rich offline data. No backend required.</p>
              </div>
              <div style={{ backgroundColor: "var(--brass-soft)", border: "1.5px solid var(--brass-border)", borderRadius: "10px", padding: "16px", marginBottom: "22px", fontSize: "13px", color: "#4A320F", lineHeight: 1.5 }}>
                <strong>What Demo Mode includes:</strong>
                <ul style={{ margin: "8px 0 0 0", paddingLeft: "18px" }}>
                  <li>Pre-loaded student skill profile (Rahul Kumar)</li>
                  <li>Career target match tree &amp; skill twin visualization</li>
                  <li>Faculty, Industry &amp; Institution workspace previews</li>
                  <li>Offline — no Django backend needed</li>
                </ul>
              </div>
              <button type="button" onClick={handleDemoClick} style={{ width: "100%", backgroundColor: "var(--brass)", color: "#221704", border: "1.5px solid var(--brass)", borderRadius: "10px", padding: "13px 20px", fontWeight: 700, fontSize: "14.5px", cursor: "pointer", boxShadow: "0 2px 6px rgba(184,130,58,0.25)", transition: "all 0.15s ease" }}>
                ⚡ Explore {roleLabel(selectedRole)} MVP (Demo Mode)
              </button>
            </>
          )}

          {/* === SIGN UP === */}
          {activeTab === "signup" && (
            <>
              {signupSuccess ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--teal)", margin: "0 0 10px 0" }}>Account Created!</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "13.5px", marginBottom: "22px", lineHeight: 1.5 }}>
                    Your account <strong style={{ color: "var(--ink)" }}>@{signupSuccessUsername}</strong> has been created successfully. You can now log in with your credentials.
                  </p>
                  <button type="button" onClick={() => { setActiveTab("login"); setLoginUsername(signupSuccessUsername); setSignupSuccess(false); }}
                    style={{ width: "100%", backgroundColor: "var(--ink)", color: "#FFFFFF", border: "1.5px solid var(--ink)", borderRadius: "10px", padding: "13px 20px", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 2px 6px rgba(18,32,61,0.2)", transition: "all 0.15s ease" }}>
                    Go to Log In →
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ textAlign: "center", marginBottom: "22px" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--ink)", margin: "0 0 5px 0" }}>Create Account</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: 0 }}>Register a new SkillBridge account.</p>
                  </div>
                  {signupErrors._general && (
                    <div style={{ backgroundColor: "var(--coral-soft)", border: "1.5px solid var(--coral-border)", color: "var(--coral)", borderRadius: "10px", padding: "12px 14px", fontSize: "13px", fontWeight: 600, marginBottom: "18px" }}>
                      ⚠️ {signupErrors._general}
                    </div>
                  )}
                  <form onSubmit={handleSignupSubmit} noValidate>
                    {/* Name row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                      <div>
                        <label htmlFor="su-firstname" style={labelStyle}>First Name</label>
                        <input id="su-firstname" type="text" value={signupFields.first_name} onChange={(e) => setSignupField("first_name", e.target.value)} placeholder="Rahul" disabled={signupSubmitting}
                          style={{ ...inputStyle, borderColor: signupErrors.first_name ? "var(--coral)" : "var(--line-strong)" }} />
                        {signupErrors.first_name && <p style={{ color: "var(--coral)", fontSize: "11.5px", margin: "4px 0 0 0", fontWeight: 600 }}>{signupErrors.first_name}</p>}
                      </div>
                      <div>
                        <label htmlFor="su-lastname" style={labelStyle}>Last Name</label>
                        <input id="su-lastname" type="text" value={signupFields.last_name} onChange={(e) => setSignupField("last_name", e.target.value)} placeholder="Kumar" disabled={signupSubmitting}
                          style={{ ...inputStyle, borderColor: signupErrors.last_name ? "var(--coral)" : "var(--line-strong)" }} />
                        {signupErrors.last_name && <p style={{ color: "var(--coral)", fontSize: "11.5px", margin: "4px 0 0 0", fontWeight: 600 }}>{signupErrors.last_name}</p>}
                      </div>
                    </div>
                    {/* Username */}
                    <div style={fieldStyle}>
                      <label htmlFor="su-username" style={labelStyle}>Username</label>
                      <input id="su-username" type="text" value={signupFields.username} onChange={(e) => setSignupField("username", e.target.value)} placeholder="e.g. rahul_k" disabled={signupSubmitting}
                        style={{ ...inputStyle, borderColor: signupErrors.username ? "var(--coral)" : "var(--line-strong)" }} />
                      {signupErrors.username && <p style={{ color: "var(--coral)", fontSize: "11.5px", margin: "4px 0 0 0", fontWeight: 600 }}>{signupErrors.username}</p>}
                    </div>
                    {/* Email */}
                    <div style={fieldStyle}>
                      <label htmlFor="su-email" style={labelStyle}>Email</label>
                      <input id="su-email" type="email" value={signupFields.email} onChange={(e) => setSignupField("email", e.target.value)} placeholder="rahul@college.edu" disabled={signupSubmitting}
                        style={{ ...inputStyle, borderColor: signupErrors.email ? "var(--coral)" : "var(--line-strong)" }} />
                      {signupErrors.email && <p style={{ color: "var(--coral)", fontSize: "11.5px", margin: "4px 0 0 0", fontWeight: 600 }}>{signupErrors.email}</p>}
                    </div>
                    {/* Role */}
                    <div style={fieldStyle}>
                      <label htmlFor="su-role" style={labelStyle}>Role</label>
                      <select id="su-role" value={signupFields.role} onChange={(e) => setSignupField("role", e.target.value as BackendRole)} disabled={signupSubmitting}
                        style={{ ...inputStyle, appearance: "auto" } as React.CSSProperties}>
                        {ROLE_OPTIONS.map((r) => (
                          <option key={r.role} value={r.role}>{r.icon} {r.label}</option>
                        ))}
                      </select>
                    </div>
                    {/* Password row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "22px" }}>
                      <div>
                        <label htmlFor="su-password" style={labelStyle}>Password</label>
                        <input id="su-password" type="password" value={signupFields.password} onChange={(e) => setSignupField("password", e.target.value)} placeholder="Min. 8 chars" disabled={signupSubmitting}
                          style={{ ...inputStyle, borderColor: signupErrors.password ? "var(--coral)" : "var(--line-strong)" }} />
                        {signupErrors.password && <p style={{ color: "var(--coral)", fontSize: "11.5px", margin: "4px 0 0 0", fontWeight: 600 }}>{signupErrors.password}</p>}
                      </div>
                      <div>
                        <label htmlFor="su-confirm" style={labelStyle}>Confirm Password</label>
                        <input id="su-confirm" type="password" value={signupConfirmPassword}
                          onChange={(e) => { setSignupConfirmPassword(e.target.value); if (signupErrors.confirm_password) { setSignupErrors((prev) => { const next = { ...prev }; delete next.confirm_password; return next; }); } }}
                          placeholder="Repeat password" disabled={signupSubmitting}
                          style={{ ...inputStyle, borderColor: signupErrors.confirm_password ? "var(--coral)" : "var(--line-strong)" }} />
                        {signupErrors.confirm_password && <p style={{ color: "var(--coral)", fontSize: "11.5px", margin: "4px 0 0 0", fontWeight: 600 }}>{signupErrors.confirm_password}</p>}
                      </div>
                    </div>
                    <button type="submit" disabled={signupSubmitting} style={{ width: "100%", backgroundColor: "var(--teal)", color: "#FFFFFF", border: "1.5px solid var(--teal)", borderRadius: "10px", padding: "13px 20px", fontWeight: 700, fontSize: "14.5px", cursor: signupSubmitting ? "wait" : "pointer", opacity: signupSubmitting ? 0.7 : 1, boxShadow: "0 2px 6px rgba(36,104,90,0.2)", transition: "all 0.15s ease" }}>
                      {signupSubmitting ? "Creating Account..." : "Create Account →"}
                    </button>
                  </form>
                  <p style={{ marginTop: "16px", textAlign: "center", fontSize: "13px", color: "var(--text-secondary)" }}>
                    Already have an account?{" "}
                    <button type="button" onClick={() => setActiveTab("login")} style={{ background: "none", border: "none", color: "var(--teal)", fontWeight: 700, fontSize: "13px", cursor: "pointer", padding: 0, textDecoration: "underline" }}>
                      Log in →
                    </button>
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--line)", padding: "16px 24px", textAlign: "center", color: "var(--text-mute)", fontSize: 12 }}>
        SkillBridge — Academia·Industry Collaboration Portal · SIH26044
      </footer>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthFormContent />
    </Suspense>
  );
}