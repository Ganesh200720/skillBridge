"use client";
/**
 * SkillBridge — Authentication Context (with Dev Demo Mode support)
 *
 * Provides:
 *   - current user (real JWT user or Demo user)
 *   - login / logout helpers
 *   - isDemoMode flag & enableDemoMode/disableDemoMode helpers
 *   - loading state
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { User, LoginRequest, BackendRole } from "@/types";
import { authApi } from "@/lib/api";
import { getAccessToken, clearTokens } from "@/lib/api";

const DEMO_USERS: Record<BackendRole, User> = {
  student: {
    id: 101,
    username: "rahul_student",
    email: "rahul.kumar@student.edu",
    first_name: "Rahul",
    last_name: "Kumar",
    role: "student",
  },
  teacher: {
    id: 102,
    username: "dr_arisudan",
    email: "arisudan@college.edu",
    first_name: "Dr. Arisudan",
    last_name: "Faculty",
    role: "teacher",
  },
  industry: {
    id: 103,
    username: "nimbus_recruiter",
    email: "hr@nimbussystems.com",
    first_name: "Nimbus",
    last_name: "Systems",
    role: "industry",
  },
  institution: {
    id: 104,
    username: "vit_admin",
    email: "placements@vit.edu",
    first_name: "VIT",
    last_name: "Institution",
    role: "institution",
  },
};

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isDemoMode: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  enableDemoMode: (role?: BackendRole) => void;
  disableDemoMode: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  /** On mount: check token or demo mode */
  useEffect(() => {
    const token = getAccessToken();
    const demoStorage = typeof window !== "undefined" ? localStorage.getItem("sb_demo_mode") : null;
    const isEnvDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

    if (token) {
      // Real JWT token takes priority
      authApi
        .getCurrentUser()
        .then((u) => {
          setUser(u);
          setIsDemoMode(false);
        })
        .catch(() => {
          clearTokens();
          // Fallback to demo mode if configured
          if (isEnvDemo || demoStorage === "true") {
            setIsDemoMode(true);
            setUser(DEMO_USERS.student);
          }
        })
        .finally(() => setIsLoading(false));
    } else if (isEnvDemo || demoStorage === "true") {
      setIsDemoMode(true);
      const role = (localStorage.getItem("sb_demo_role") as BackendRole) || "student";
      setUser(DEMO_USERS[role] || DEMO_USERS.student);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    const res = await authApi.login(credentials);
    setUser(res.user);
    setIsDemoMode(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("sb_demo_mode");
    }
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
    setIsDemoMode(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("sb_demo_mode");
    }
  }, []);

  const enableDemoMode = useCallback((role: BackendRole = "student") => {
    setIsDemoMode(true);
    setUser(DEMO_USERS[role] || DEMO_USERS.student);
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_demo_mode", "true");
      localStorage.setItem("sb_demo_role", role);
    }
  }, []);

  const disableDemoMode = useCallback(() => {
    setIsDemoMode(false);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("sb_demo_mode");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isDemoMode,
        login,
        logout,
        enableDemoMode,
        disableDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}