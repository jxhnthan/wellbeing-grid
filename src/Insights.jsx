import React, { useState } from "react";
import { departments } from "./stateData";

const ranked = departments
  .map((d) => {
    const m = d.metrics;
    const composite = Math.round(
      (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
    );
    return { ...d, composite };
  })
  .sort((a, b) => a.composite - b.composite);

const highRisk = ranked.filter((d) => d.composite < 45);
const moderate = ranked.filter((d) => d.composite >= 45 && d.composite < 65);
const healthy = ranked.filter((d) => d.composite >= 65);

const predictions = [
  {
    title: "Burnout cluster forming in STEM departments",
    description:
      "Workload and after-hours activity signals in ECE, BME, and MSE suggest rising burnout risk over the next 8 weeks.",
    severity: "high",
    action: "Review workload distribution and consider temporary resource allocation.",
  },
  {
    title: "Engagement decline in administrative units",
    description:
      "Survey response rates dropped 18% across FIN, REG, and LEG. Engagement scores trending downward for 3 consecutive months.",
    severity: "medium",
    action: "Schedule targeted pulse survey and team retrospectives.",
  },
  {
    title: "Positive trend in Faculty of Science",
    description:
      "Satisfaction and support scores improved 12% since last quarter. Turnover rate decreased to 4.2%.",
    severity: "low",
    action: "Document and share practices that contributed to improvement.",
  },
];

const severityConfig = {
  high: { dot: "#cf222e", label: "High risk", bg: "#fef2f2" },
  medium: { dot: "#d97706", label: "Moderate", bg: "#fffbeb" },
  low: { dot: "#22863a", label: "Positive", bg: "#f0fdf4" },
};

export default function Insights() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#003D7C", letterSpacing: "-0.02em" }}>
          Predictive Insights
        </div>
        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>
          Risk signals based on cross-source analysis
        </div>
      </div>

      {/* Summary bar */}
      <div
        style={{
          display: "flex",
          background: "#ffffff",
          border: "1px solid #e2e2de",
          borderRadius: 10,
          marginBottom: 24,
          overflow: "hidden",
        }}
      >
        {[
          { label: "Needs attention", count: highRisk.length, color: "#cf222e" },
          { label: "Moderate", count: moderate.length, color: "#d97706" },
          { label: "Healthy", count: healthy.length, color: "#22863a" },
        ].map((item, idx) => (
          <div
            key={item.label}
            style={{
              flex: 1,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              borderRight: idx < 2 ? "1px solid #f3f4f6" : "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: item.color + "0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: item.color, letterSpacing: "-0.03em" }}>
                {item.count}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Left — Department ranking */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e2de",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px 12px",
              borderBottom: "1px solid #f3f4f6",
              fontSize: 10,
              fontWeight: 600,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Departments ranked by risk
          </div>
          {ranked.slice(0, 10).map((dept, idx) => {
            const barColor = dept.composite < 45 ? "#cf222e" : dept.composite < 65 ? "#d97706" : "#22863a";
            return (
              <div
                key={dept.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "24px 1fr 100px 40px",
                  alignItems: "center",
                  padding: "12px 20px",
                  gap: 10,
                  borderBottom: idx < 9 ? "1px solid #fafaf8" : "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fafaf8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 11, color: "#b0b0b0", fontWeight: 600 }}>{idx + 1}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>{dept.abbr}</div>
                  <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>{dept.name}</div>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: "#f3f4f6" }}>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 2,
                      width: dept.composite + "%",
                      background: barColor,
                    }}
                  />
                </div>
                <span style={{ fontSize: 12, fontWeight: 650, color: barColor, textAlign: "right" }}>
                  {dept.composite}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right — Prediction signals */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              padding: "4px 0",
            }}
          >
            Prediction signals
          </div>

          {predictions.map((pred, idx) => {
            const s = severityConfig[pred.severity];
            const isExpanded = expandedIdx === idx;

            return (
              <div
                key={idx}
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                style={{
                  background: "#ffffff",
                  border: "1px solid " + (isExpanded ? "#003D7C" : "#e2e2de"),
                  borderRadius: 12,
                  padding: "18px 20px",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flex: 1 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: s.dot,
                        marginTop: 5,
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.4 }}>
                        {pred.title}
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4, lineHeight: 1.5 }}>
                        {pred.description}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 12 }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: s.dot,
                        background: s.bg,
                        padding: "3px 8px",
                        borderRadius: 4,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: "#9ca3af",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                        display: "inline-block",
                      }}
                    >
                      v
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: "1px solid #f3f4f6",
                      marginLeft: 18,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: "#9ca3af",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 6,
                      }}
                    >
                      Recommended action
                    </div>
                    <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                      {pred.action}
                    </div>
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
