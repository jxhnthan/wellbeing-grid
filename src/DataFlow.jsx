import React, { useState, useEffect } from "react";

const sources = [
  { id: "engagement", label: "Employee Engagement Surveys", y: 50 },
  { id: "hr", label: "HR & Organisational Data", y: 150 },
  { id: "operational", label: "Operational & Behavioural Data", y: 250 },
];

const steps = [
  { num: "01", label: "Ingest", sub: "Pull from APIs" },
  { num: "02", label: "Normalise", sub: "Clean and align" },
  { num: "03", label: "Analyse", sub: "Score and rank" },
  { num: "04", label: "Predict", sub: "Flag risk signals" },
];

export default function DataFlow() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const engineX = 40;
  const engineY = 120;
  const engineW = 160;
  const sourceX = 560;
  const sourceW = 260;
  const sourceH = 52;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#003D7C", marginBottom: 4 }}>Data Flow</div>
      <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 28 }}>
        How data moves from institutional sources into the Wellbeing Engine
      </div>

      {/* SVG Flow Diagram */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "32px 24px 24px",
        }}
      >
        <svg viewBox="0 0 860 310" width="100%" height="auto" style={{ display: "block" }}>
          <defs>
            <style>{`
              @keyframes flowDot {
                0% { offset-distance: 100%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { offset-distance: 0%; opacity: 0; }
              }
            `}</style>
          </defs>

          {/* Wellbeing Engine box */}
          <rect
            x={engineX}
            y={engineY - 35}
            width={engineW}
            height={70}
            rx={8}
            fill="#003D7C"
          />
          <text x={engineX + engineW / 2} y={engineY - 5} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
            Wellbeing Engine
          </text>
          <text x={engineX + engineW / 2} y={engineY + 16} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="Inter, sans-serif">
            NUS Platform
          </text>

          {/* Source boxes and connection lines */}
          {sources.map((source, idx) => {
            const sy = source.y + sourceH / 2;
            const ex = engineX + engineW;
            const ey = engineY;
            const sx = sourceX;

            const midX = (ex + sx) / 2;
            const cp1x = sx - 80;
            const cp2x = ex + 80;
            const path = `M ${sx} ${sy} C ${cp1x} ${sy}, ${cp2x} ${ey}, ${ex} ${ey}`;

            const isActive = idx === activeIdx;

            return (
              <g key={source.id}>
                {/* Connection line */}
                <path
                  d={path}
                  fill="none"
                  stroke={isActive ? "#EF7C00" : "#d1d5db"}
                  strokeWidth={isActive ? 2 : 1.5}
                  strokeDasharray={isActive ? "none" : "6 4"}
                  style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                />

                {/* Animated dot */}
                {isActive && (
                  <circle
                    r="5"
                    fill="#EF7C00"
                    style={{
                      offsetPath: `path('${path}')`,
                      animation: "flowDot 2.5s ease-in-out infinite",
                    }}
                  />
                )}

                {/* Source card */}
                <rect
                  x={sourceX}
                  y={source.y}
                  width={sourceW}
                  height={sourceH}
                  rx={8}
                  fill={isActive ? "#003D7C" : "#fff"}
                  stroke={isActive ? "#003D7C" : "#d1d5db"}
                  strokeWidth={1.5}
                  style={{ transition: "fill 0.4s, stroke 0.4s" }}
                />
                <text
                  x={sourceX + sourceW / 2}
                  y={source.y + sourceH / 2 + 5}
                  textAnchor="middle"
                  fill={isActive ? "#fff" : "#374151"}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                  style={{ transition: "fill 0.4s" }}
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
            marginTop: 24,
            paddingTop: 24,
            borderTop: "1px solid #f3f4f6",
          }}
        >
          {steps.map((step) => (
            <div key={step.num} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#EF7C00", marginBottom: 4 }}>{step.num}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#003D7C" }}>{step.label}</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{step.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
