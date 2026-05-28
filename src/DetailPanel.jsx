import React from 'react';
import { departments, wellbeingMetrics, hrMetrics } from './stateData';

const wellbeingLabels = {
  satisfaction: 'Satisfaction',
  engagement: 'Engagement',
  workload: 'Workload',
  burnout: 'Burnout risk',
  support: 'Support access',
};

const hrLabels = {
  performanceRating: { label: 'Performance rating', suffix: ' / 5.0' },
  medicalLeaveDays: { label: 'Avg medical leave', suffix: ' days' },
  salaryBand: { label: 'Salary band', suffix: '' },
  turnoverRate: { label: 'Turnover rate', suffix: '%' },
  headcount: { label: 'Headcount', suffix: '' },
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

function statusLabel(key, value) {
  const inv = isInverse[key];
  if (inv) {
    if (value >= 60) return 'High';
    if (value >= 40) return 'Moderate';
    return 'Low';
  }
  if (value >= 70) return 'Good';
  if (value >= 45) return 'Moderate';
  return 'Low';
}

export default function DetailPanel({ abbr, onClose }) {
  if (!abbr) return null;

  const dept = departments.find((d) => d.abbr === abbr);
  const wm = wellbeingMetrics[abbr];
  const hr = hrMetrics[abbr];
  if (!dept || !wm || !hr) return null;

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '32px auto 0',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '28px 32px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#003D7C' }}>
            {dept.fullName}
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
            {dept.abbr} — {dept.category.charAt(0).toUpperCase() + dept.category.slice(1)}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 18,
            color: '#9ca3af',
            cursor: 'pointer',
            padding: '0 4px',
            lineHeight: 1,
          }}
        >
          x
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {/* Wellbeing column */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 16,
            }}
          >
            Wellbeing metrics
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {Object.keys(wellbeingLabels).map((key) => (
              <div key={key}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 13, color: '#374151' }}>
                    {wellbeingLabels[key]}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                      {wm[key]}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: barColor(key, wm[key]),
                        fontWeight: 500,
                      }}
                    >
                      {statusLabel(key, wm[key])}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 6,
                    backgroundColor: '#f3f4f6',
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: wm[key] + '%',
                      backgroundColor: barColor(key, wm[key]),
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HR column */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 16,
            }}
          >
            HR data
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {Object.keys(hrLabels).map((key) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: 12,
                  borderBottom: '1px solid #f3f4f6',
                }}
              >
                <span style={{ fontSize: 13, color: '#374151' }}>
                  {hrLabels[key].label}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>
                  {hr[key]}{hrLabels[key].suffix}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
