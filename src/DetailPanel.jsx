import React from 'react';
import { metrics, hrData } from './departmentData';

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

export default function DetailPanel({ dept, onClose }) {
  if (!dept) return null;

  const m = metrics[dept.abbr];
  const hr = hrData[dept.abbr];
  if (!m || !hr) return null;

  const composite = Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );
  const compositeColor = composite >= 65 ? '#22863a' : composite >= 45 ? '#9ca3af' : '#cf222e';

  const hrRows = [
    { label: 'Headcount', value: hr.headcount },
    { label: 'Performance rating', value: hr.performanceRating + ' / 5.0' },
    { label: 'Avg medical leave', value: hr.medicalLeaveDays + ' days' },
    { label: 'Salary band', value: 'Band ' + hr.salaryBand },
    { label: 'Turnover rate', value: hr.turnoverRate + '%' },
    { label: 'Typical rank', value: hr.rank },
  ];

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '24px auto 0',
        background: '#ffffff',
        border: '1px solid #e8e8e4',
        borderRadius: 12,
        padding: '24px 28px',
        position: 'relative',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'none',
          border: 'none',
          fontSize: 18,
          color: '#9ca3af',
          cursor: 'pointer',
          padding: '4px 8px',
          lineHeight: 1,
        }}
      >
        &times;
      </button>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#003D7C', letterSpacing: '-0.02em' }}>
          {dept.abbr}
        </div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          {dept.fullName}
        </div>
      </div>

      {/* Composite score bar */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>Composite wellbeing score</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: compositeColor }}>{composite}</span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: '#f3f4f6' }}>
          <div style={{ height: 6, borderRadius: 3, width: composite + '%', background: compositeColor }} />
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {/* Left — Wellbeing metrics */}
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 14,
            }}
          >
            Wellbeing metrics
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(metricLabels).map(([key, label]) => {
              const value = m[key];
              const barColor = getBarColor(key, value);
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{value}</span>
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
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 14,
            }}
          >
            HR & organisational data
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
                <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
