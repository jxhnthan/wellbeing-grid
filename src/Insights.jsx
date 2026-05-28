import React, { useState } from 'react';
import { departments, metrics } from './stateData';

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
    title: 'Burnout cluster forming in STEM departments',
    description:
      'Workload and after-hours activity signals in ECE, BME, and MSE suggest rising burnout risk over the next 8 weeks.',
    severity: 'high',
    action: 'Review workload distribution and consider temporary resource allocation.',
  },
  {
    title: 'Engagement decline in administrative units',
    description:
      'Survey response rates dropped 18% across FIN, REG, and LEG. Engagement scores trending downward for 3 consecutive months.',
    severity: 'medium',
    action: 'Schedule targeted pulse survey and team retrospectives.',
  },
  {
    title: 'Positive trend in Faculty of Science',
    description:
      'Satisfaction and support scores improved 12% since last quarter. Turnover rate decreased to 4.2%.',
    severity: 'low',
    action: 'Document and share practices that contributed to improvement.',
  },
];

const severityConfig = {
  high: { dot: '#cf222e', label: 'High risk', bg: '#fef2f2' },
  medium: { dot: '#d97706', label: 'Moderate', bg: '#fffbeb' },
  low: { dot: '#22863a', label: 'Positive', bg: '#f0fdf4' },
};

export default function Insights() {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', fontFamily: font }}>
      <div style={{ fontSize: 16, fontWeight: 650, color: '#003D7C', letterSpacing: '-0.01em', marginBottom: 4 }}>
        Insights
      </div>
      <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 28 }}>
        Risk signals based on cross-source analysis
      </div>

      {/* Summary bar — single card, 3 sections */}
      <div
        style={{
          display: 'flex',
          background: '#ffffff',
          border: '1px solid #e8e8e4',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 24,
        }}
      >
        {[
          { label: 'Needs attention', count: highRisk.length, color: '#cf222e' },
          { label: 'Moderate', count: moderate.length, color: '#d97706' },
          { label: 'Healthy', count: healthy.length, color: '#22863a' },
        ].map((item, idx) => (
          <div
            key={item.label}
            style={{
              flex: 1,
              padding: '20px 24px',
              borderRight: idx < 2 ? '1px solid #f3f3ef' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 700, color: item.color, lineHeight: 1 }}>{item.count}</div>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: '#b0b0b0', marginTop: 1 }}>departments</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Left — Department ranking as a clean table */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e8e8e4',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '32px 56px 1fr 48px',
              padding: '14px 20px',
              borderBottom: '1px solid #f3f3ef',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 10, color: '#b0b0b0', fontWeight: 600, textTransform: 'uppercase' }}>#</span>
            <span style={{ fontSize: 10, color: '#b0b0b0', fontWeight: 600, textTransform: 'uppercase' }}>Dept</span>
            <span style={{ fontSize: 10, color: '#b0b0b0', fontWeight: 600, textTransform: 'uppercase' }}>
              Wellbeing
            </span>
            <span
              style={{
                fontSize: 10,
                color: '#b0b0b0',
                fontWeight: 600,
                textTransform: 'uppercase',
                textAlign: 'right',
              }}
            >
              Score
            </span>
          </div>

          {/* Table rows */}
          {ranked.slice(0, 10).map((dept, idx) => {
            const barColor = dept.composite < 45 ? '#cf222e' : dept.composite < 65 ? '#d97706' : '#22863a';
            return (
              <div
                key={dept.abbr}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '32px 56px 1fr 48px',
                  padding: '12px 20px',
                  alignItems: 'center',
                  borderBottom: idx < 9 ? '1px solid #fafaf8' : 'none',
                  transition: 'background 0.15s',
                  cursor: 'default',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#fafaf8';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: 11, color: '#b0b0b0', fontWeight: 600 }}>{idx + 1}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{dept.abbr}</span>
                <div style={{ paddingRight: 16 }}>
                  <div style={{ height: 5, borderRadius: 3, background: '#f3f4f6' }}>
                    <div
                      style={{
                        height: 5,
                        borderRadius: 3,
                        width: dept.composite + '%',
                        background: barColor,
                        transition: 'width 0.4s',
                      }}
                    />
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 650, color: barColor, textAlign: 'right' }}>
                  {dept.composite}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right — Prediction signals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '0 4px',
            }}
          >
            Signals
          </div>

          {predictions.map((pred, idx) => {
            const s = severityConfig[pred.severity];
            const isExpanded = expandedIdx === idx;

            return (
              <div
                key={idx}
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                style={{
                  background: '#ffffff',
                  border: '1px solid ' + (isExpanded ? '#d1d5db' : '#e8e8e4'),
                  borderRadius: 12,
                  padding: '18px 20px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: isExpanded ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, paddingRight: 12 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#1a1a1a',
                        lineHeight: 1.45,
                        marginBottom: 6,
                      }}
                    >
                      {pred.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.55 }}>{pred.description}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: s.dot,
                        background: s.bg,
                        padding: '3px 10px',
                        borderRadius: 5,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: '#b0b0b0',
                        transition: 'transform 0.2s',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        display: 'inline-block',
                      }}
                    >
                      \u25be
                    </span>
                  </div>
                </div>

                {/* Expanded */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 16,
                      borderTop: '1px solid #f3f3ef',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: 6,
                      }}
                    >
                      Recommended action
                    </div>
                    <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.55 }}>{pred.action}</div>
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
