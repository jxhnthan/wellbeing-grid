import React from 'react';
import { metrics } from './departmentData';

const metricLabels = {
  satisfaction: 'Satisfaction',
  workload: 'Workload',
  engagement: 'Engagement',
  burnout: 'Burnout risk',
  support: 'Support access',
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
  if (!m) return null;

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
        border: '1px solid #e8e8e4',
        borderRadius: 12,
        padding: '18px 20px',
        minWidth: 240,
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        pointerEvents: 'none',
        zIndex: 1000,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#003D7C', letterSpacing: '-0.02em' }}>
          {dept.abbr}
        </div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
          {dept.fullName}
        </div>
      </div>

      {/* Composite score */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>Composite score</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: compositeColor }}>{composite}</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: '#f3f4f6' }}>
          <div style={{ height: 4, borderRadius: 2, width: composite + '%', background: compositeColor, transition: 'width 0.3s' }} />
        </div>
      </div>

      {/* Individual metrics */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                <div style={{ height: 3, borderRadius: 2, width: value + '%', background: barColor }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
