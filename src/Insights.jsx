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
    description: 'Workload and after-hours activity signals in ECE, BME, and MSE suggest rising burnout risk over the next 8 weeks.',
    severity: 'high',
    action: 'Review workload distribution and consider temporary resource allocation.',
  },
  {
    title: 'Engagement decline in administrative units',
    description: 'Survey response rates dropped 18% across FIN, REG, and LEG. Engagement scores trending downward for 3 consecutive months.',
    severity: 'medium',
    action: 'Schedule targeted pulse survey and team retrospectives.',
  },
  {
    title: 'Positive trend in Faculty of Science',
    description: 'Satisfaction and support scores improved 12% since last quarter. Turnover rate decreased to 4.2%.',
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

  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: font }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: 2 }}>
        Predictive Insights
      </div>
      <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 28 }}>
        Risk signals based on cross-source analysis
      </div>

      {/* Summary bar */}
      <div
        style={{
          display: 'flex',
          background: '#fff',
          border: '1px solid #e2e2de',
          borderRadius: 10,
          marginBottom: 24,
          overflow: 'hidden',
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
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              borderRight: idx < 2 ? '1px solid #f3f4f6' : 'none',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>{item.count}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* Left — Department ranking */}
        <div style={{ background: '#fff', border: '1px solid #e2e2de', borderRadius: 10, overflow: 'hidden' }}>
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '28px 1fr 100px 40px',
              padding: '10px 16px',
              borderBottom: '1px solid #f3f4f6',
              background: '#fafaf8',
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>#</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Department</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Wellbeing</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Score</span>
          </div>

          {/* Rows */}
          {ranked.slice(0, 10).map((dept, idx) => {
            const barColor = dept.composite < 45 ? '#cf222e' : dept.composite < 65 ? '#d97706' : '#22863a';
            return (
              <div
                key={dept.abbr}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '28px 1fr 100px 40px',
                  padding: '10px 16px',
                  alignItems: 'center',
                  borderBottom: idx < 9 ? '1px solid #f9f9f7' : 'none',
                  transition: 'background 0.15s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fafaf8'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
              >
                <span style={{ fontSize: 11, color: '#c8c8c4', fontWeight: 600 }}>{idx + 1}</span>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>{dept.abbr}</span>
                  <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 8 }}>{dept.fullName}</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: '#f3f4f6' }}>
                  <div style={{ height: 4, borderRadius: 2, width: dept.composite + '%', background: barColor }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: barColor, textAlign: 'right' }}>{dept.composite}</span>
              </div>
            );
          })}
        </div>

        {/* Right — Prediction signals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
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
                  background: '#fff',
                  border: '1px solid ' + (isExpanded ? '#003D7C' : '#e2e2de'),
                  borderRadius: 10,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: s.dot,
                      background: s.bg,
                      padding: '2px 8px',
                      borderRadius: 4,
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: '#9ca3af',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      display: 'inline-block',
                    }}
                  >
                    ▾
                  </span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4, marginBottom: 4 }}>
                  {pred.title}
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>
                  {pred.description}
                </div>

                {isExpanded && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      Recommended action
                    </div>
                    <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>{pred.action}</div>
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
