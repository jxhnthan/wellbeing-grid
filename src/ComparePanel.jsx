import React from "react";
import { departments, metricConfig, hrConfig } from "./stateData";

function getBarColor(value, inverse) {
  const effective = inverse ? 100 - value : value;
  if (effective >= 65) return "#22863a";
  if (effective >= 45) return "#9ca3af";
  return "#cf222e";
}

function getComposite(m) {
  return Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );
}

function Dropdown({ value, onChange, label, accentColor }) {
  return (
    <div style={{ flex: 1 }}>
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
        {label}
      </div>
      <select
        value={value ? value.name : ""}
        onChange={(e) => {
          const dept = departments.find((d) => d.name === e.target.value);
          onChange(dept || null);
        }}
        style={{
          width: "100%",
          padding: "10px 14px",
          fontSize: 13,
          fontWeight: 500,
          color: value ? "#1a1a1a" : "#9ca3af",
          background: "#ffffff",
          border: value ? `1.5px solid ${accentColor}` : "1px solid #e2e2de",
          borderRadius: 8,
          outline: "none",
          cursor: "pointer",
          appearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          transition: "border-color 0.2s",
        }}
      >
        <option value="">Select department...</option>
        {departments.map((d) => (
          <option key={d.name} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function MetricRow({ label, valueA, valueB, inverse }) {
  const colorA = getBarColor(valueA, inverse);
  const colorB = getBarColor(valueB, inverse);
  const better =
    inverse
      ? valueA < valueB
        ? "A"
        : valueA > valueB
        ? "B"
        : null
      : valueA > valueB
      ? "A"
      : valueA < valueB
      ? "B"
      : null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "10px 0" }}>
      {/* Value A */}
      <div style={{ width: 48, textAlign: "right" }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 650,
            color: colorA,
            opacity: better === "B" ? 0.4 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {valueA}
        </span>
      </div>

      {/* Bar A (right-aligned, grows left) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 8px",
        }}
      >
        <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#f3f4f6", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              right: 0,
              height: 4,
              borderRadius: 2,
              width: valueA + "%",
              background: colorA,
              opacity: better === "B" ? 0.3 : 1,
              transition: "width 0.4s, opacity 0.2s",
            }}
          />
        </div>
      </div>

      {/* Label (center) */}
      <div
        style={{
          width: 120,
          textAlign: "center",
          fontSize: 11,
          fontWeight: 500,
          color: "#6b7280",
          flexShrink: 0,
        }}
      >
        {label}
      </div>

      {/* Bar B (left-aligned, grows right) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          padding: "0 8px",
        }}
      >
        <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#f3f4f6", position: "relative" }}>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              width: valueB + "%",
              background: colorB,
              opacity: better === "A" ? 0.3 : 1,
              transition: "width 0.4s, opacity 0.2s",
            }}
          />
        </div>
      </div>

      {/* Value B */}
      <div style={{ width: 48 }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 650,
            color: colorB,
            opacity: better === "A" ? 0.4 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {valueB}
        </span>
      </div>
    </div>
  );
}

export default function ComparePanel({ compareA, compareB, setCompareA, setCompareB }) {
  const hasComparison = compareA && compareB;

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
          Compare departments
        </div>
        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>
          Select two departments to compare wellbeing and HR metrics side by side
        </div>
      </div>

      {/* Dropdowns */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
        <Dropdown value={compareA} onChange={setCompareA} label="Department A" accentColor="#003D7C" />
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: 10,
            color: "#d1d5db",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          vs
        </div>
        <Dropdown value={compareB} onChange={setCompareB} label="Department B" accentColor="#EF7C00" />
      </div>

      {/* Comparison view */}
      {hasComparison && (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e2de",
            borderRadius: 12,
            padding: "24px 28px",
          }}
        >
          {/* Composite scores header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
              paddingBottom: 20,
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 11, color: "#003D7C", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {compareA.abbr}
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#003D7C", letterSpacing: "-0.03em" }}>
                {getComposite(compareA.metrics)}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{compareA.name}</div>
            </div>

            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#f7f7f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: "#9ca3af",
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              vs
            </div>

            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 11, color: "#EF7C00", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {compareB.abbr}
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#EF7C00", letterSpacing: "-0.03em" }}>
                {getComposite(compareB.metrics)}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{compareB.name}</div>
            </div>
          </div>

          {/* Wellbeing metrics — butterfly chart */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}
            >
              Wellbeing metrics
            </div>
            <div style={{ borderTop: "1px solid #f3f4f6" }}>
              {metricConfig.map((mc) => (
                <MetricRow
                  key={mc.key}
                  label={mc.label}
                  valueA={compareA.metrics[mc.key]}
                  valueB={compareB.metrics[mc.key]}
                  inverse={mc.inverse}
                />
              ))}
            </div>
          </div>

          {/* HR metrics — simple table */}
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}
            >
              HR data
            </div>
            <div style={{ borderTop: "1px solid #f3f4f6" }}>
              {hrConfig.map((hc) => (
                <div
                  key={hc.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #fafaf8",
                  }}
                >
                  <div style={{ width: 48, textAlign: "right", fontSize: 13, fontWeight: 600, color: "#003D7C" }}>
                    {compareA.hr[hc.key]}{hc.unit}
                  </div>
                  <div style={{ flex: 1 }} />
                  <div style={{ width: 120, textAlign: "center", fontSize: 11, fontWeight: 500, color: "#6b7280" }}>
                    {hc.label}
                  </div>
                  <div style={{ flex: 1 }} />
                  <div style={{ width: 48, fontSize: 13, fontWeight: 600, color: "#EF7C00" }}>
                    {compareB.hr[hc.key]}{hc.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasComparison && (
        <div
          style={{
            background: "#ffffff",
            border: "1px dashed #d1d5db",
            borderRadius: 12,
            padding: "60px 28px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>
            Select two departments above to compare, or click tiles on the grid
          </div>
          <div style={{ fontSize: 12, color: "#d1d5db", marginTop: 8 }}>
            First click sets Department A, second click sets Department B
          </div>
        </div>
      )}
    </div>
  );
}
