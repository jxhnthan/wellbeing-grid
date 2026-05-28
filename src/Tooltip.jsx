import React from 'react';
import { categories, metrics as allMetrics } from './stateData';

const metricConfig = [
  { key: 'satisfaction', label: 'Satisfaction', inverse: false },
  { key: 'engagement', label: 'Engagement', inverse: false },
  { key: 'workload', label: 'Workload', inverse: true },
  { key: 'burnout', label: 'Burnout risk', inverse: true },
  { key: 'support', label: 'Support access', inverse: false },
];

const getBarColor = (value, inverse) => {
  const effective = inverse ? 100 - value : value;
  if (effective >= 65) return '#22863a';
  if (effective >= 45) return '#9ca3af';
  return '#cf222e';
};

const getStatusLabel = (value, inverse) => {
  const effective = inverse ? 100 - value : value;
  if (effective >= 65) return 'Good';
  if (effective >= 45) return 'Fair';
  return 'Low';
};

export default function Tooltip({ dept, position }) {
  if (!dept) return null;

  const m = allMetrics[dept.abbr];
  const cat = categories[dept.category];
  const composite = Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );
  const compositeColor = composite >= 65 ? '#22863a' : composite >= 45 ? '#9ca3af' : '#cf222e';

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x + 16,
        top: position.y - 20,
        zIndex: 1000,
        pointerEvents: 'none',
        animation: 'fadeIn 0.15s ease-out',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e8e8e4',
          borderRadius: 12,
          padding: '18px 22px',
          minWidth: 260,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 650, color: '#1a1a1a', letterSpacing: '-0.01em' }}>
              {dept.abbr}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: cat.color,
                background: cat.color + '10',
                padding: '2px 8px',
                borderRadius: 4,
              }}
            >
              {cat.label}
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>{dept.fullName}</div>
        </div>

        {/* Composite score */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderTop: '1px solid #f3f3ef',
            borderBottom: '1px solid #f3f3ef',
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>Composite wellbeing</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 80, height: 4, borderRadius: 2, background: '#f3f4f6' }}>
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  width: composite + '%',
                  background: compositeColor,
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <span style={{ fontSize: 13, fontWeight: 650, color: compositeColor }}>{composite}</span>
          </div>
        </div>

        {/* Metric rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {metricConfig.map((mc) => {
            const val = m[mc.key];
            const color = getBarColor(val, mc.inverse);
            return (
              <div key={mc.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#6b7280', width: 100 }}>{mc.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
                  <div style={{ width: 64, height: 4, borderRadius: 2, background: '#f3f4f6' }}>
                    <div
                      style={{
                        height: 4,
                        borderRadius: 2,
                        width: val + '%',
                        background: color,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, width: 28, textAlign: 'right' }}>
                    {val}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
