import React, { useEffect, useState } from "react";

const sources = [
  { id: "engagement", label: "Employee Engagement Surveys", y: 55 },
  { id: "hr", label: "HR & Organisational Data", y: 165 },
  { id: "operational", label: "Operational & Behavioural Data", y: 275 },
];

const steps = [
  { num: "01", title: "Ingest", desc: "Pull from APIs" },
  { num: "02", title: "Normalise", desc: "Clean and align" },
  { num: "03", title: "Analyse", desc: "Score and rank" },
  { num: "04", title: "Predict", desc: "Flag risk signals" },
];

export default function DataFlow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const sourceX = 40;
  const sourceW = 260;
  const sourceH = 50;

  const engineX = 640;
  const engineY = 125;
  const engineW = 170;
  const engineH = 80;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        background: "#fff",
        border: "1px solid #e2e2de",
        borderRadius: 12,
        padding: "28px 32px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#003D7C", letterSpacing: "-0.02em" }}>
          Data Flow
        </div>
        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>
          How data moves from institutional sources into the Wellbeing Engine
        </div>
      </div>

      <svg viewBox="0 0 860 360" style={{ width: "100%", height: "auto" }}>
        <defs>
          <marker
            id="arrowOrange"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L8,3 L0,6" fill="#EF7C00" />
          </marker>
          <marker
            id="arrowGrey"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L8,3 L0,6" fill="#d1d5db" />
          </marker>
        </defs>

        {/* Engine box — RIGHT side */}
        <rect
          x={engineX}
          y={engineY}
          width={engineW}
          height={engineH}
          rx={10}
          fill="#003D7C"
        />
        <text
          x={engineX + engineW / 2}
          y={engineY + 34}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          fontWeight={700}
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        >
          Wellbeing Engine
        </text>
        <text
          x={engineX + engineW / 2}
          y={engineY + 52}
          textAnchor="middle"
          fill="rgba(255,255,255,0.55)"
          fontSize={10}
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        >
          NUS Platform
        </text>

        {/* Source cards and paths */}
        {sources.map((source, i) => {
          const isActive = activeIndex === i;

          const startX = sourceX + sourceW;
          const startY = source.y + sourceH / 2;
          const endX = engineX;
          const endY = engineY + engineH / 2;
          const cp1x = startX + 100;
          const cp2x = endX - 100;

          const pathD =
            "M " + startX + " " + startY +
            " C " + cp1x + " " + startY +
            " " + cp2x + " " + endY +
            " " + endX + " " + endY;

          return (
            <g key={source.id}>
              {/* Connection line */}
              <path
                d={pathD}
                fill="none"
                stroke={isActive ? "#EF7C00" : "#d1d5db"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? "none" : "6 4"}
                markerEnd={isActive ? "url(#arrowOrange)" : "url(#arrowGrey)"}
                style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
              />

              {/* Animated dot — flows from source to engine */}
              {isActive && (
                <circle r={4} fill="#EF7C00">
                  <animateMotion
                    dur="1.8s"
                    repeatCount="indefinite"
                    path={pathD}
                  />
                </circle>
              )}

              {/* Source card — LEFT side */}
              <rect
                x={sourceX}
                y={source.y}
                width={sourceW}
                height={sourceH}
                rx={8}
                fill={isActive ? "#fff" : "#fafaf8"}
                stroke={isActive ? "#003D7C" : "#e2e2de"}
                strokeWidth={isActive ? 1.5 : 1}
                style={{ transition: "all 0.3s" }}
              />
              <text
                x={sourceX + sourceW / 2}
                y={source.y + sourceH / 2 + 4}
                textAnchor="middle"
                fill={isActive ? "#003D7C" : "#6b7280"}
                fontSize={12}
                fontWeight={isActive ? 600 : 500}
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              >
                {source.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Pipeline steps */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginTop: 8,
          borderTop: "1px solid #f3f4f6",
          paddingTop: 24,
        }}
      >
        {steps.map((step) => (
          <div key={step.num} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 10,
                color: "#EF7C00",
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              {step.num}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>
              {step.title}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
