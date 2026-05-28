import React from "react";
import { metricConfig } from "./stateData";

function getBarColor(value, inverse) {
  const effective = inverse ? 100 - value : value;
  if (effective >= 65) return "#22863a";
  if (effective >= 45) return "#9ca3af";
  return "#cf222e";
}

export default function Tooltip({ dept, x, y }) {
  const m = dept.metrics;
  const composite = Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );

  const compositeColor =
    composite >= 65 ? "#22863a" : composite >= 45 ? "#9ca3af" : "#cf222e";

  return (
    <div
      style={{
        position: "absolute",
        left: Math.min(x + 16, 580),
        top: y - 10,
        background: "#ffffff",
        border: "1px solid #e2e2de",
        borderRadius: 12,
        padding: "16px 20px",
        width: 260,
        pointerEvents: "none",
        zIndex: 100,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 650, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
          {dept.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: compositeColor, letterSpacing: "-0.03em" }}>
            {composite}
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>
            composite score
          </div>
        </div>
        <div style={{ height: 3, borderRadius: 2, background: "#f3f4f6", marginTop: 6 }}>
          <div
            style={{
              height: 3,
              borderRadius: 2,
              width: composite + "%",
              background: compositeColor,
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {metricConfig.map((mc) => {
          const val = m[mc.key];
          const barColor = getBarColor(val, mc.inverse);
          return (
            <div key={mc.key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 3,
                }}
              >
                <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>
                  {mc.label}
                </span>
                <span style={{ fontSize: 11, fontWeight: 650, color: barColor }}>
                  {val}
                </span>
              </div>
              <div style={{ height: 3, borderRadius: 2, background: "#f3f4f6" }}>
                <div
                  style={{
                    height: 3,
                    borderRadius: 2,
                    width: val + "%",
                    background: barColor,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
