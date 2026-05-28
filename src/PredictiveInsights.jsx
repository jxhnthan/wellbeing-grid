import React, { useState } from "react";
import { departments, metrics } from "./departmentData";

// Compute composite scores and sort
const ranked = departments
  .map((d) => {
    const m = metrics[d.abbr];
    const composite = Math.round(
      (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
    );
    return { ...d, composite, metrics: m };
  })
  .sort((a, b) => a.composite - b.composite);

const highRisk = ranked.filter((d) => d.composite < 45);
const moderate = ranked.filter((d) => d.composite >= 45 && d.composite < 65);
const healthy = ranked.filter((d) => d.composite >= 65);

const predictions = [
  {
    title: "Burnout cluster forming in STEM departments",
    description: "Workload and after-hours activity signals in ECE, BME, and MSE suggest rising burnout risk over the next 8 weeks.",
    severity: "high",
    action: "Review workload distribution and consider temporary resource allocation.",
  },
  {
    title: "Engagement decline in administrative units",
    description: "Survey response rates dropped 18% across FIN, REG, and LEG. Engagement scores trending downward for 3 consecutive months.",
    severity: "medium",
    action: "Schedule targeted pulse survey and team retrospectives.",
  },
  {
    title: "Positive trend in Faculty of Science",
    description: "Satisfaction and support scores improved 12% since last quarter. Turnover rate decreased to 4.2%.",
    severity: "low",
    action: "Document and share practices that contributed to improvement.",
  },
];

const severityStyles = {
  high: { bg: "#fef2f2", border: "#fecaca", dot: "#cf222e", label: "High risk" },
  medium: { bg: "#fffbeb", border: "#fed7aa", dot: "#d97706", label: "Moderate" },
  low: { bg: "#f0fdf4", border: "#bbf7d0", dot: "#22863a", label: "Positive" },
};

export default function PredictiveInsights() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#003D7C", marginBottom: 4 }}>Predictive Insights</div>
      <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 28 }}>
        AI-generated risk signals based on cross-source analysis
      </div>

      {/* Summary row — 3 horizontal metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Needs attention", count: highRisk.length, color: "#cf222e", bg: "#fef2f2" },
          { label: "Moderate", count: moderate.length, color: "#d97706", bg: "#fffbeb" },
          { label: "Healthy", count: healthy.length, color: "#22863a", bg: "#f0fdf4" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: item.color }}>{item.count}</div>
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: item.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout: department ranking + predictions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Left — Department ranking */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: "20px",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
            Departments ranked by risk
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ranked.slice(0, 10).map((dept, idx) => {
              const barColor = dept.composite < 45 ? "#cf222e" : dept.composite < 65 ? "#d97706" : "#22863a";
              return (
                <div key={dept.abbr}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: "#b0b0b0", fontWeight: 600, width: 18 }}>{idx + 1}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{dept.abbr}</span>
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>{dept.fullName}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: barColor }}>{dept.composite}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: "#f3f4f6", marginLeft: 26 }}>
                    <div
                      style={{
                        height: 4,
                        borderRadius: 2,
                        width: `${dept.composite}%`,
                        background: barColor,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — Prediction signals */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Prediction signals
          </div>

          {predictions.map((pred, idx) => {
            const s = severityStyles[pred.severity];
            const isExpanded = expandedIdx === idx;

            return (
              <div
                key={idx}
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                style={{
                  background: "#fff",
                  border: `1px solid ${isExpanded ? s.border : "#e5e7eb"}`,
                  borderRadius: 10,
                  padding: "16px 18px",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, marginTop: 5, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.4 }}>{pred.title}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4, lineHeight: 1.5 }}>{pred.description}</div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: s.dot,
                      background: s.bg,
                      padding: "3px 8px",
                      borderRadius: 4,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Expanded action */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: "1px solid #f3f4f6",
                      marginLeft: 18,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                      Recommended action
                    </div>
                    <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{pred.action}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
