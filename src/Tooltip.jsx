import React from 'react';

const metricLabels = {
  satisfaction: { label: 'Satisfaction', inverse: false },
  workload:     { label: 'Workload',    inverse: true },
  engagement:   { label: 'Engagement',  inverse: false },
  burnout:      { label: 'Burnout',     inverse: true },
  support:      { label: 'Support',     inverse: false },
};

function getBarColor(value, inverse) {
  const effective = inverse ? 100 - value : value;
  if (effective >= 65) return '#22863a';
  if (effective >= 45) return '#9ca3af';
  return '#cf222e';
}

export default function Tooltip({ dept, metrics, position }) {
  if (!dept || !metrics) return null;

  const composite = Math.round(
    (metrics.satisfaction + metrics.engagement + (100 - metrics.workload) + (100 - metrics.burnout) + metrics.support) / 5
  );

  const riskLevel = composite >= 65 ? 'Healthy' : composite >= 45 ? 'Moderate' : 'At risk';
  const riskColor = composite >= 65 ? '#22863a' : composite >= 45 ? '#d97706' : '#cf222e';

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x + 16,
        top: position.y - 8,
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        padding: '16px 20px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        zIndex: 1000,
        pointerEvents: 'none',
        minWidth: 240,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#003D7C' }}>{dept.abbr}</div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 1 }}>{dept.fullName}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: riskColor }}>{composite}</div>
          <div style={{ fontSize: 10, color: riskColor, fontWeight: 500 }}>{riskLevel}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Object.entries(metricLabels).map(([key, meta]) => (
          <div key={key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: '#6b7280' }}>{meta.label}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{metrics[key]}</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: '#f3f4f6' }}>
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  width: metrics[key] + '%',
                  background: getBarColor(metrics[key], meta.inverse),
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
