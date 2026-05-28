import React from "react";
import { metrics } from "./departmentData";

const metricLabels = {
  satisfaction: "Satisfaction",
  engagement: "Engagement",
  workload: "Workload",
  burnout: "Burnout risk",
  support: "Support access",
};

const getBarColor = (key, val) => {
  const inverse = key === "workload" || key === "burnout";
  const effective = inverse ? 100 - val : val;
  if (effective >= 70) return "#22863a";
  if (effective >= 45) return "#9ca3af";
  return "#cf222e";
};

export default function Tooltip({ dept, x, y }) {
  if (!dept) return null;
  const m = metrics[dept.abbr];
  const composite = Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );

  return (
    <div
      style={{
        position: "fixed",
        top: y + 16,
        left: x + 16,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: "16px 20px",
        width: 260,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: "#003D7C", marginBottom: 2 }}>
        {dept.fullName}
      </div>
      <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 14, textTransform: "capitalize" }}>
        {dept.category}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>Composite score</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#003D7C" }}>{composite}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Object.entries(metricLabels).map(([key, label]) => (
          <div key={key}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: "#6b7280" }}>{label}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#1a1a1a" }}>{m[key]}</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: "#f3f4f6" }}>
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  width: `${m[key]}%`,
                  background: getBarColor(key, m[key]),
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
