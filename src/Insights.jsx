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
  high:   { dot: '#cf222e', label: 'High risk',  bg: '#fef2f2' },
  medium: { dot: '#d97706', label: 'Moderate',   bg: '#fffbeb' },
  low:    { dot: '#22863a', label: 'Positive',   bg: '#f0fdf4' },
};

export default function Insights() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#003D7C', marginBottom: 4 }}>
        Insights
      </div>
      <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 28 }}>
        Risk signals and trends based on cross-source analysis
      </div>

      {/* Summary bar — single card, 3 sections inline */}
      <div style={{
        display: 'flex',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        marginBottom: 28,
        overflow: 'hidden',
      }}>
        {[
          { label: 'Needs attention', count: highRisk.length, color: '#cf222e' },
          { label: 'Moderate', count: moderate.length, color: '#d97706' },
          { label: 'Healthy', count: healthy.length, color: '#22863a' },
        ].map((item, idx) => (
          <div
            key={item.label}
            style={{
              flex: 1,
              padding: '18px 24px',
              borderRight: idx < 2 ? '1px solid #f3f4f6' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: item.color,
              flexShrink: 0,
            }} />
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: item.color }}>{item.count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column: ranking table + signals */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Left — Department ranking as a table */}
        <div style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '28px 50px 1fr 60px',
            padding: '10px 18px',
            borderBottom: '1px solid #f3f4f6',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>#</span>
            <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Dept</span>
            <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Wellbeing</span>
            <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Score</span>
          </div>

          {/* Rows */}
          {ranked.slice(0, 10).map((dept, idx) => {
            const barColor = dept.composite < 45 ? '#cf222e' : dept.composite < 65 ? '#d97706' : '#22863a';
            return (
              <div
                key={dept.abbr}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '28px 50px 1fr 60px',
                  padding: '10px 18px',
                  borderBottom: idx < 9 ? '1px solid #f9f9f7' : 'none',
                  alignItems: 'center',
                  transition: 'background 0.15s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fafaf8'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
              >
                <span style={{ fontSize: 11, color: '#b0b0b0', fontWeight: 600 }}>{idx + 1}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{dept.abbr}</span>
                <div style={{ paddingRight: 16 }}>
                  <div style={{ height: 4, borderRadius: 2, background: '#f3f4f6' }}>
                    <div style={{
                      height: 4,
                      borderRadius: 2,
                      width: dept.composite + '%',
                      background: barColor,
                    }} />
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: barColor, textAlign: 'right' }}>
                  {dept.composite}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right — Prediction signals */}
        <div>
          <div style={{
            fontSize: 10,
            fontWeight: 600,
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 12,
            padding: '0 2px',
          }}>
            Signals
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {predictions.map((pred, idx) => {
              const s = severityConfig[pred.severity];
              const isExpanded = expandedIdx === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                  style={{
                    background: '#fff',
                    border: '1px solid ' + (isExpanded ? '#d1d5db' : '#e5e7eb'),
                    borderRadius: 10,
                    padding: '16px 18px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: isExpanded ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                  }}
                >
                  {/* Signal header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1 }}>
                      <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: s.dot,
                        marginTop: 5,
                        flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4 }}>
                          {pred.title}
                        </div>
                        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4, lineHeight: 1.5 }}>
                          {pred.description}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginLeft: 12 }}>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: s.dot,
                        background: s.bg,
                        padding: '3px 8px',
                        borderRadius: 4,
                        whiteSpace: 'nowrap',
                      }}>
                        {s.label}
                      </span>
                      <span style={{
                        fontSize: 14,
                        color: '#b0b0b0',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                        display: 'inline-block',
                      }}>
                        &#8964;
                      </span>
                    </div>
                  </div>

                  {/* Expanded action */}
                  {isExpanded && (
                    <div style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: '1px solid #f3f4f6',
                      marginLeft: 18,
                    }}>
                      <div style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: 6,
                      }}>
                        Recommended action
                      </div>
                      <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
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
    </div>
  );
}
