import React, { useState } from 'react';
import { departments, wellbeingMetrics } from './stateData';

function compositeScore(metrics) {
  const w = { satisfaction: 0.25, engagement: 0.25, workload: -0.15, burnout: -0.2, support: 0.15 };
  let score = 0;
  Object.keys(w).forEach((k) => {
    score += w[k] > 0 ? w[k] * metrics[k] : w[k] * (100 - metrics[k]);
  });
  return Math.round(score + 40);
}

function riskTier(score) {
  if (score >= 70) return { label: 'Healthy', color: '#22c55e' };
  if (score >= 50) return { label: 'Moderate', color: '#eab308' };
  return { label: 'At risk', color: '#ef4444' };
}

const ranked = departments
  .map((d) => ({
    ...d,
    score: compositeScore(wellbeingMetrics[d.abbr]),
  }))
  .sort((a, b) => a.score - b.score);

const atRisk = ranked.filter((d) => d.score < 50).length;
const moderate = ranked.filter((d) => d.score >= 50 && d.score < 70).length;
const healthy = ranked.filter((d) => d.score >= 70).length;

const signals = [
  {
    id: 1,
    severity: 'high',
    title: 'Burnout risk elevated in 3 departments',
    description: 'Burnout indicators have risen 12% over the past quarter in departments with high workload and low support access scores.',
    action: 'Review workload distribution and consider targeted wellbeing interventions for flagged departments.',
  },
  {
    id: 2,
    severity: 'medium',
    title: 'Engagement declining in admin units',
    description: 'Administration and support units show a consistent downward trend in engagement over the past 6 months.',
    action: 'Schedule pulse check-ins with admin leadership and review recent organisational changes.',
  },
  {
    id: 3,
    severity: 'low',
    title: 'Strong satisfaction in research clusters',
    description: 'Research centres and programmes report the highest satisfaction and support access scores across all categories.',
    action: 'Document and share best practices from high-performing research units.',
  },
];

function severityStyle(sev) {
  if (sev === 'high') return { bg: '#fef2f2', color: '#ef4444', border: '#fecaca' };
  if (sev === 'medium') return { bg: '#fffbeb', color: '#eab308', border: '#fde68a' };
  return { bg: '#f0fdf4', color: '#22c55e', border: '#bbf7d0' };
}

export default function Insights() {
  const [expandedSignal, setExpandedSignal] = useState(null);

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Summary row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginBottom: 28,
        }}
      >
        {[
          { label: 'At risk', count: atRisk, color: '#ef4444' },
          { label: 'Moderate', count: moderate, color: '#eab308' },
          { label: 'Healthy', count: healthy, color: '#22c55e' },
        ].map((tier) => (
          <div
            key={tier.label}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 10,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a' }}>{tier.count}</div>
              <div
                style={{
                  fontSize: 11,
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginTop: 2,
                }}
              >
                departments
              </div>
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: tier.color,
                backgroundColor: tier.color + '14',
                padding: '4px 12px',
                borderRadius: 20,
              }}
            >
              {tier.label}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left — ranked list */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '24px 28px',
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#003D7C',
              marginBottom: 4,
            }}
          >
            Department rankings
          </div>
          <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 20 }}>
            Sorted by composite wellbeing score, lowest first
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {ranked.slice(0, 12).map((dept, i) => {
              const tier = riskTier(dept.score);
              return (
                <div
                  key={dept.abbr}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '20px 48px 1fr 40px',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 0',
                    borderBottom: i < 11 ? '1px solid #f9fafb' : 'none',
                  }}
                >
                  <span style={{ fontSize: 10, color: '#c0c0c0', fontWeight: 500 }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
                    {dept.abbr}
                  </span>
                  <div
                    style={{
                      height: 4,
                      backgroundColor: '#f3f4f6',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: dept.score + '%',
                        backgroundColor: tier.color,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: tier.color,
                      textAlign: 'right',
                    }}
                  >
                    {dept.score}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — signals */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '24px 28px',
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#003D7C',
              marginBottom: 4,
            }}
          >
            Predictive signals
          </div>
          <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 20 }}>
            AI-generated risk signals from aggregated data
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {signals.map((signal) => {
              const sty = severityStyle(signal.severity);
              const isExpanded = expandedSignal === signal.id;
              return (
                <div
                  key={signal.id}
                  onClick={() => setExpandedSignal(isExpanded ? null : signal.id)}
                  style={{
                    border: '1px solid ' + sty.border,
                    borderRadius: 8,
                    padding: '14px 16px',
                    cursor: 'pointer',
                    backgroundColor: isExpanded ? sty.bg : '#fff',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: sty.color,
                        backgroundColor: sty.bg,
                        padding: '2px 8px',
                        borderRadius: 4,
                      }}
                    >
                      {signal.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4 }}>
                    {signal.title}
                  </div>
                  {isExpanded && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, marginBottom: 10 }}>
                        {signal.description}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: '#003D7C',
                          fontWeight: 500,
                          backgroundColor: '#f0f4f8',
                          padding: '10px 14px',
                          borderRadius: 6,
                          lineHeight: 1.5,
                        }}
                      >
                        Recommended: {signal.action}
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
