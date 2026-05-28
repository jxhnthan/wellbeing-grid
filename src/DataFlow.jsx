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

  const engineX = 60;
  const engineY = 130;
  const engineW = 160;
  const engineH = 80;
  const sourceX = 520;
  const sourceW = 260;
  const sourceH = 50;

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
        <div style={{ fontSize: 15, fontWeight: 700, color: '#003D7C' }}>Data Flow</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
          How data moves from institutional sources into the Wellbeing Engine
        </div>
      </div>

      <svg
        viewBox="0 0 860 360"
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Engine box */}
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
          fontSize={13}
          fontWeight={700}
          fontFamily="Inter, sans-serif"
        >
          Wellbeing Engine
        </text>
        <text
          x={engineX + engineW / 2}
          y={engineY + 52}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize={10}
          fontFamily="Inter, sans-serif"
        >
          NUS Platform
        </text>

        {/* Source cards and paths */}
        {sources.map((source, i) => {
          const sx = sourceX;
          const sy = source.y;
          const isActive = activeIndex === i;

          const engineEdgeX = engineX + engineW;
          const engineEdgeY = engineY + engineH / 2;
          const sourceEdgeX = sx;
          const sourceEdgeY = sy + sourceH / 2;
          const cp1x = sourceEdgeX - 100;
          const cp2x = engineEdgeX + 100;

          /* Path goes from SOURCE → ENGINE (right to left) */
          const pathD = 'M ' + sourceEdgeX + ' ' + sourceEdgeY +
            ' C ' + cp1x + ' ' + sourceEdgeY +
            ' ' + cp2x + ' ' + engineEdgeY +
            ' ' + engineEdgeX + ' ' + engineEdgeY;

          /* Visual line drawn from engine to source (for consistent curve shape) */
          const linePath = 'M ' + engineEdgeX + ' ' + engineEdgeY +
            ' C ' + cp2x + ' ' + engineEdgeY +
            ' ' + cp1x + ' ' + sourceEdgeY +
            ' ' + sourceEdgeX + ' ' + sourceEdgeY;

          return (
            <g key={source.id}>
              {/* Connection line (drawn left to right for visual consistency) */}
              <path
                d={linePath}
                fill="none"
                stroke={isActive ? '#EF7C00' : '#d1d5db'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? 'none' : '6 4'}
                style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
              />

              {/* Animated dot — follows path FROM source TO engine */}
              {isActive && (
                <circle r={4} fill="#EF7C00">
                  <animateMotion
                    dur="1.8s"
                    repeatCount="indefinite"
                    path={pathD}
                  />
                </circle>
              )}

              {/* Arrow head pointing at engine */}
              {isActive && (
                <polygon
                  points={
                    (engineEdgeX + 1) + ',' + (engineEdgeY) + ' ' +
                    (engineEdgeX + 10) + ',' + (engineEdgeY - 5) + ' ' +
                    (engineEdgeX + 10) + ',' + (engineEdgeY + 5)
                  }
                  fill="#EF7C00"
                />
              )}

              {/* Source card */}
              <rect
                x={sx}
                y={sy}
                width={sourceW}
                height={sourceH}
                rx={6}
                fill={isActive ? '#fff' : '#fafafa'}
                stroke={isActive ? '#003D7C' : '#e5e7eb'}
                strokeWidth={isActive ? 1.5 : 1}
                style={{ transition: 'all 0.3s' }}
              />
              <text
                x={sx + sourceW / 2}
                y={sy + sourceH / 2 + 4}
                textAnchor="middle"
                fill={isActive ? '#003D7C' : '#6b7280'}
                fontSize={12}
                fontWeight={isActive ? 600 : 500}
                fontFamily="Inter, sans-serif"
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
            <div style={{ fontSize: 10, color: '#EF7C00', fontWeight: 600, marginBottom: 4 }}>
              {step.num}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
              {step.title}
            </div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
