import React from 'react';
import { metrics } from './stateData';

const metricLabels = {
  satisfaction: 'Satisfaction',
  engagement: 'Engagement',
  workload: 'Workload',
  burnout: 'Burnout',
  support: 'Support',
};

const inverseMetrics = ['workload', 'burnout'];

function getBarColor(key, value) {
  const isInverse = inverseMetrics.includes(key);
  const effective = isInverse ? 100 - value : value;
  if (effective >= 65) return '#22863a';
  if (effective >= 45) return '#9ca3af';
  return '#cf222e';
}

export default function Tooltip({ dept, mousePos }) {
  if (!dept) return null;

  const m = metrics[dept.abbr];
  const composite = Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );

  const compositeColor = composite >= 65 ? '#22863a' : composite >= 45 ? '#9ca3af' : '#cf222e';

  return (
    <div
      style={{
        position: 'fixed',
        left: mousePos.x + 16,
        top: mousePos.y - 8,
        background: '#ffffff',
        border: '1px solid #e2e2de',
        borderRadius: 10,
        padding: '16px 18px',
        minWidth: 220,
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
        pointerEvents: 'none',
        zIndex: 1000,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>
          {dept.fullName}
        </div>
        <div style={{ fontSize: 11, color: '#9ca3af' }}>{dept.abbr}</div>
      </div>

      {/* Composite score */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>Composite score</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: compositeColor }}>{composite}</span>
        </div>
        <div style={{ height: 3, borderRadius: 2, background: '#f3f4f6' }}>
          <div style={{ height: 3, borderRadius: 2, width: composite + '%', background: compositeColor, transition: 'width 0.3s' }} />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#f3f4f6', marginBottom: 12 }} />

      {/* Metric rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Object.entries(metricLabels).map(([key, label]) => {
          const value = m[key];
          const barColor = getBarColor(key, value);
          return (
            <div key={key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 11, color: '#6b7280' }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{value}</span>
              </div>
              <div style={{ height: 3, borderRadius: 2, background: '#f3f4f6' }}>
                <div style={{ height: 3, borderRadius: 2, width: value + '%', background: barColor, transition: 'width 0.3s' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
