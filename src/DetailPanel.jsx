import React from "react";
import { metricConfig, hrConfig } from "./stateData";

function getBarColor(value, inverse) {
  const effective = inverse ? 100 - value : value;
  if (effective >= 65) return "#22863a";
  if (effective >= 45) return "#9ca3af";
  return "#cf222e";
}

function getStatusLabel(value, inverse) {
  const effective = inverse ? 100 - value : value;
  if (effective >= 65) return "Good";
  if (effective >= 45) return "Moderate";
  return "Needs attention";
}

export default function DetailPanel({ dept, onClose }) {
  const m = dept.metrics;
  const composite = Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );
  const compositeColor =
    composite >= 65 ? "#22863a" : composite >= 45 ? "#9ca3af" : "#cf222e";

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "24px auto 0",
        background: "#ffffff",
        border: "1px solid #e2e2de",
        borderRadius: 12,
        padding: "24px 28px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        position: "relative",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          right: 18,
          background: "none",
          border: "none",
          fontSize: 18,
          color: "#9ca3af",
          cursor: "pointer",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f3f4f6";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "none";
        }}
      >
        x
      </button>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
          {dept.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: compositeColor, letterSpacing: "-0.03em" }}>
            {composite}
          </span>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>composite wellbeing score</span>
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Wellbeing metrics */}
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12,
              paddingBottom: 8,
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            Wellbeing metrics
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {metricConfig.map((mc) => {
              const val = m[mc.key];
              const barColor = getBarColor(val, mc.inverse);
              const status = getStatusLabel(val, mc.inverse);
              return (
                <div key={mc.key}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{mc.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>{status}</span>
                      <span style={{ fontSize: 12, fontWeight: 650, color: barColor }}>{val}</span>
                    </div>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: "#f3f4f6" }}>
                    <div
                      style={{
                        height: 4,
                        borderRadius: 2,
                        width: val + "%",
                        background: barColor,
                        transition: "width 0.3s",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HR data */}
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12,
              paddingBottom: 8,
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            HR data
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {hrConfig.map((hc) => (
              <div
                key={hc.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #fafaf8",
                }}
              >
                <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{hc.label}</span>
                <span style={{ fontSize: 13, fontWeight: 650, color: "#1a1a1a" }}>
                  {dept.hr[hc.key]}{hc.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
