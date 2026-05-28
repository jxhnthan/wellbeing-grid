import React from 'react';
import { departments, wellbeingMetrics } from './stateData';

const metricLabels = {
  satisfaction: 'Satisfaction',
  engagement: 'Engagement',
  workload: 'Workload',
  burnout: 'Burnout risk',
  support: 'Support access',
};

const isInverse = { workload: true, burnout: true };

function barColor(key, value) {
  const inv = isInverse[key];
  if (inv) {
    if (value >= 60) return '#ef4444';
    if (value >= 40) return '#9ca3af';
    return '#22c55e';
  }
  if (value >= 70) return '#22c55e';
  if (value >= 45) return '#9ca3af';
  return '#ef4444';
}

function compositeScore(metrics) {
  const w = { satisfaction: 0.25, engagement: 0.25, workload: -0.15, burnout: -0.2, support: 0.15 };
  let score = 0;
  Object.keys(w).forEach((k) => {
    score += w[k] > 0 ? w[k] * metrics[k] : w[k] * (100 - metrics[k]);
  });
  return Math.round(score + 40);
}

export default function Tooltip({ abbr, mousePos }) {
  if (!abbr) return null;

  const dept = departments.find((d) => d.abbr === abbr);
  const metrics = wellbeingMetrics[abbr];
  if (!dept || !metrics) return null;

  const score = compositeScore(metrics);
  const riskLevel = score >= 70 ? 'Healthy' : score >= 50 ? 'Moderate' : 'At risk';
  const riskColor = score >= 70 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';

  return (
    <div
      style={{
        position: 'fixed',
        top: mousePos.y - 10,
        left: mousePos.x + 16,
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        padding: '16px 20px',
        width: 260,
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#003D7C' }}>
          {dept.fullName}
        </div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
          {dept.abbr}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
          paddingBottom: 12,
          borderBottom: '1px solid #f3f4f6',
        }}
      >
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{score}</div>
          <div style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Composite score
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: riskColor,
            backgroundColor: riskColor + '12',
            padding: '4px 10px',
            borderRadius: 20,
          }}
        >
          {riskLevel}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Object.keys(metricLabels).map((key) => (
          <div key={key}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                color: '#6b7280',
                marginBottom: 3,
              }}
            >
              <span>{metricLabels[key]}</span>
              <span style={{ fontWeight: 600, color: '#374151' }}>{metrics[key]}</span>
            </div>
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
                  width: metrics[key] + '%',
                  backgroundColor: barColor(key, metrics[key]),
                  borderRadius: 2,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
