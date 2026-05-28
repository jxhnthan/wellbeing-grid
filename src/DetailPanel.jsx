import React from "react";
import { departments, metrics } from "./departmentData";

const wellbeingMetrics = [
  { key: "satisfaction", label: "Satisfaction" },
  { key: "engagement", label: "Engagement" },
  { key: "workload", label: "Workload" },
  { key: "burnout", label: "Burnout risk" },
  { key: "support", label: "Support access" },
];

const getBarColor = (key, val) => {
  const inverse = key === "workload" || key === "burnout";
  const effective = inverse ? 100 - val : val;
  if (effective >= 70) return "#22863a";
  if (effective >= 45) return "#9ca3af";
  return "#cf222e";
};

const getStatus = (key, val) => {
  const inverse = key === "workload" || key === "burnout";
  const effective = inverse ? 100 - val : val;
  if (effective >= 70) return { text: "Good", color: "#22863a" };
  if (effective >= 45) return { text: "Moderate", color: "#9ca3af" };
  return { text: "Attention", color: "#cf222e" };
};

export default function DetailPanel({ abbr, onClose }) {
  if (!abbr) return null;
  const dept = departments.find((d) => d.abbr === abbr);
  const m = metrics[abbr];
  if (!dept || !m) return null;

  const composite = Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "24px auto 0",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "28px 32px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#003D7C" }}>{dept.fullName}</div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2, textTransform: "capitalize" }}>
            {dept.category} — {m.headcount} staff
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: 18,
            color: "#9ca3af",
            cursor: "pointer",
            padding: "4px 8px",
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Left — Wellbeing */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            Wellbeing metrics
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {wellbeingMetrics.map(({ key, label }) => {
              const status = getStatus(key, m[key]);
              return (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: "#374151" }}>{label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{m[key]}</span>
                      <span style={{ fontSize: 10, color: status.color, fontWeight: 600 }}>{status.text}</span>
                    </div>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "#f3f4f6" }}>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 3,
                        width: `${m[key]}%`,
                        background: getBarColor(key, m[key]),
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — HR Data */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            HR data
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Performance rating", value: `${m.performanceRating} / 5.0` },
              { label: "Avg medical leave", value: `${m.medicalLeaveDays} days / yr` },
              { label: "Salary band", value: m.salaryBand },
              { label: "Turnover rate", value: `${m.turnoverRate}%` },
              { label: "Headcount", value: m.headcount },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, borderBottom: "1px solid #f3f4f6" }}
              >
                <span style={{ fontSize: 13, color: "#6b7280" }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Composite */}
      <div
        style={{
          marginTop: 24,
          padding: "14px 20px",
          background: "#f8f9fa",
          borderRadius: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>Composite wellbeing score</span>
        <span style={{ fontSize: 24, fontWeight: 700, color: "#003D7C" }}>{composite}</span>
      </div>
    </div>
  );
}
