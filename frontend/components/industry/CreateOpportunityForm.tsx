// MOCK: Presentation component for Industry Create Opportunity Form
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Badge } from "@/components/ui";

export const CreateOpportunityForm: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [oppType, setOppType] = useState("internship");
  const [location, setLocation] = useState("");
  const [stipend, setStipend] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Opportunity posted successfully! (Demo Form State)");
    router.push("/industry/opportunities");
  };

  return (
    <Card title="Post New Opportunity" subtitle="Define role criteria, required skill thresholds, and application deadlines">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--ink-mid)", marginBottom: "4px" }}>
            OPPORTUNITY TITLE
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Backend Engineering Intern"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--line)" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--ink-mid)", marginBottom: "4px" }}>
              TYPE
            </label>
            <select
              value={oppType}
              onChange={(e) => setOppType(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--line)", background: "#fff" }}
            >
              <option value="internship">Internship</option>
              <option value="placement">Placement (Full-time)</option>
              <option value="project">Industrial Project</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--ink-mid)", marginBottom: "4px" }}>
              LOCATION / MODE
            </label>
            <input
              type="text"
              placeholder="e.g. Remote / Bengaluru"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--line)" }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--ink-mid)", marginBottom: "4px" }}>
            STIPEND / CTC PACKAGE
          </label>
          <input
            type="text"
            placeholder="e.g. ₹25,000/mo or ₹8.5 LPA"
            value={stipend}
            onChange={(e) => setStipend(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--line)" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--ink-mid)", marginBottom: "4px" }}>
            ROLE DESCRIPTION & REQUIREMENTS
          </label>
          <textarea
            rows={4}
            placeholder="Describe role responsibilities, team environment, and target student skills..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--line)", fontFamily: "var(--font-body)" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
          <Button type="button" variant="outline" onClick={() => router.push("/industry/opportunities")}>
            Cancel
          </Button>
          <Button type="submit" variant="brass">
            Publish Opportunity (Demo)
          </Button>
        </div>
      </form>
    </Card>
  );
};