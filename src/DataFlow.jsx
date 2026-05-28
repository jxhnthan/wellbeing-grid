import React, { useEffect, useState } from 'react';

const sources = [
  { id: 'engagement', label: 'Employee Engagement Surveys', y: 60 },
  { id: 'hr', label: 'HR & Organisational Data', y: 170 },
  { id: 'operational', label: 'Operational & Behavioural Data', y: 280 },
];

const steps = [
  { num: '01', title: 'Ingest', desc: 'Pull from APIs' },
  { num: '02', title: 'Normalise', desc: 'Clean and align' },
  { num: '03', title: 'Analyse', desc: 'Score and rank' },
  { num: '04', title: 'Predict', desc: 'Flag risk signals' },
];

export default function DataFlow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Sources on LEFT, engine on RIGHT
  const sourceX = 40;
  const sourceW = 260;
  const sourceH = 50;

  const engineX = 620;
  const engineY = 130;
  const engineW = 170;
  const engineH = 80;

  return (
    <div
      style={{
        maxWidth: 860,
        margin: '0 auto',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '28px 32px',
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#003D7C' }}>Data Flow</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          How data moves from institutional sources into the Wellbeing Engine
        </div>
      </div>

      <svg viewBox="0 0 860 360" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <marker
            id="arrowOrange"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#EF7C00" />
          </marker>
          <marker
            id="arrowGrey"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#d1d5db" />
          </marker>
        </defs>

        {/* Engine box — RIGHT side */}
        <rect
          x={engineX}
          y={engineY}
          width={engineW}
          height={engineH}
          rx={8}
          fill="#003D7C"
        />
        <text
          x={engineX + engineW / 2}
          y={engineY + 34}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          fontWeight={700}
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        >
          Wellbeing Engine
        </text>
        <text
          x={engineX + engineW / 2}
          y={engineY + 52}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize={11}
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        >
          NUS Platform
        </text>

        {/* Source cards and paths — LEFT side flowing RIGHT */}
        {sources.map((source, i) => {
          const isActive = activeIndex === i;
          const sy = source.y;

          // Path: source card right edge → engine left edge
          const startX = sourceX + sourceW;
          const startY = sy + sourceH / 2;
          const endX = engineX;
          const endY = engineY + engineH / 2;
          const cp1x = startX + 100;
          const cp2x = endX - 100;

          const pathD = 'M ' + startX + ' ' + startY +
            ' C ' + cp1x + ' ' + startY +
            ' ' + cp2x + ' ' + endY +
            ' ' + endX + ' ' + endY;

          // Reversed path for animateMotion (source → engine)
          // animateMotion follows the path as drawn, which is already source → engine

          return (
            <g key={source.id}>
              {/* Connection line */}
              <path
                d={pathD}
                fill="none"
                stroke={isActive ? '#EF7C00' : '#e5e7eb'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? 'none' : '6 4'}
                markerEnd={isActive ? 'url(#arrowOrange)' : 'url(#arrowGrey)'}
                style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
              />

              {/* Animated dot — flows source → engine */}
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
                y={sy}
                width={sourceW}
                height={sourceH}
                rx={6}
                fill={isActive ? '#fff' : '#fafaf8'}
                stroke={isActive ? '#003D7C' : '#e5e7eb'}
                strokeWidth={isActive ? 1.5 : 1}
                style={{ transition: 'all 0.3s' }}
              />
              <text
                x={sourceX + sourceW / 2}
                y={sy + sourceH / 2 + 4}
                textAnchor="middle"
                fill={isActive ? '#003D7C' : '#6b7280'}
                fontSize={13}
                fontWeight={isActive ? 600 : 400}
                fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
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
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginTop: 8,
          borderTop: '1px solid #f3f4f6',
          paddingTop: 24,
        }}
      >
        {steps.map((step) => (
          <div key={step.num} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 11,
              color: '#EF7C00',
              fontWeight: 600,
              marginBottom: 4,
              fontFamily: 'SFMono-Regular, Consolas, monospace',
            }}>
              {step.num}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>
              {step.title}
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
