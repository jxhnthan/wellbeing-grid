import React from 'react';
import { metrics, hrData } from './stateData';

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

function getStatusLabel(key, value) {
  const isInverse = inverseMetrics.includes(key);
  const effective = isInverse ? 100 - value : value;
  if (effective >= 65) return 'Good';
  if (effective >= 45) return 'Moderate';
  return 'Needs attention';
}

export default function DetailPanel({ dept, onClose }) {
  if (!dept) return null;

  const m = metrics[dept.abbr];
  const hr = hrData[dept.abbr];
  const composite = Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );
  const compositeColor = composite >= 65 ? '#22863a' : composite >= 45 ? '#9ca3af' : '#cf222e';

  const hrRows = [
    { label: 'Performance rating', value: hr.performance + ' / 5.0' },
    { label: 'Medical leave (avg days)', value: hr.medicalLeave },
    { label: 'Salary band', value: hr.salaryBand },
    { label: 'Turnover rate', value: hr.turnover + '%' },
    { label: 'Headcount', value: hr.headcount },
  ];

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '20px auto 0',
        background: '#ffffff',
        border: '1px solid #e2e2de',
        borderRadius: 12,
        padding: '24px 28px',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>
            {dept.fullName}
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>{dept.abbr}</div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: '1px solid #e2e2de',
            borderRadius: 6,
            width: 28,
            height: 28,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            color: '#9ca3af',
            fontFamily: 'inherit',
          }}
        >
          ×
        </button>
      </div>

      {/* Composite score bar */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>Composite wellbeing score</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: compositeColor }}>{composite}</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: '#f3f4f6' }}>
          <div style={{ height: 4, borderRadius: 2, width: composite + '%', background: compositeColor }} />
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {/* Left — Wellbeing metrics */}
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 14,
          }}>
            Wellbeing metrics
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(metricLabels).map(([key, label]) => {
              const value = m[key];
              const barColor = getBarColor(key, value);
              const status = getStatusLabel(key, value);
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: '#374151' }}>{label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 10, color: '#9ca3af' }}>{status}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{value}</span>
                    </div>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: '#f3f4f6' }}>
                    <div style={{ height: 4, borderRadius: 2, width: value + '%', background: barColor }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — HR data */}
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 14,
          }}>
            HR data
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {hrRows.map((row, idx) => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: idx < hrRows.length - 1 ? '1px solid #f3f4f6' : 'none',
                }}
              >
                <span style={{ fontSize: 12, color: '#6b7280' }}>{row.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
