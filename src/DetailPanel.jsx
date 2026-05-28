import React from 'react';
import { departments, metrics, hrData } from './stateData';

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

function getStatusLabel(value, inverse) {
  const effective = inverse ? 100 - value : value;
  if (effective >= 65) return 'Good';
  if (effective >= 45) return 'Moderate';
  return 'Needs attention';
}

export default function DetailPanel({ abbr, onClose }) {
  const dept = departments.find((d) => d.abbr === abbr);
  const m = metrics[abbr];
  const hr = hrData[abbr];
  if (!dept || !m || !hr) return null;

  const composite = Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '20px auto 0',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '28px 32px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#003D7C' }}>{dept.fullName}</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{dept.abbr} — Composite score: {composite}</div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            padding: '6px 14px',
            fontSize: 12,
            color: '#6b7280',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {/* Wellbeing metrics */}
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 16,
          }}>
            Wellbeing metrics
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {Object.entries(metricLabels).map(([key, meta]) => {
              const value = m[key];
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: '#374151' }}>{meta.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, color: '#9ca3af' }}>
                        {getStatusLabel(value, meta.inverse)}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{value}</span>
                    </div>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: '#f3f4f6' }}>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 3,
                        width: value + '%',
                        background: getBarColor(value, meta.inverse),
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HR data */}
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 16,
          }}>
            HR & organisational data
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Headcount', value: hr.headcount },
              { label: 'Performance rating', value: hr.performanceAvg + ' / 5.0' },
              { label: 'Avg medical leave', value: hr.medicalLeave + ' days / yr' },
              { label: 'Salary band', value: hr.salaryBand },
              { label: 'Turnover rate', value: hr.turnoverPct + '%' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #f3f4f6',
                }}
              >
                <span style={{ fontSize: 13, color: '#6b7280' }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
