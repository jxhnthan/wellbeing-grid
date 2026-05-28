import React from 'react';
import { metrics as allMetrics, hrMetrics as allHrMetrics, categories } from './stateData';

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

export default function DetailPanel({ dept, onClose }) {
  if (!dept) return null;

  const m = allMetrics[dept.abbr];
  const hr = allHrMetrics[dept.abbr];
  const cat = categories[dept.category];
  const composite = Math.round(
    (m.satisfaction + m.engagement + (100 - m.workload) + (100 - m.burnout) + m.support) / 5
  );
  const compositeColor = composite >= 65 ? '#22863a' : composite >= 45 ? '#d97706' : '#cf222e';
  const compositeLabel = composite >= 65 ? 'Healthy' : composite >= 45 ? 'Moderate' : 'Needs attention';

  return (
    <div
      style={{
        maxWidth: 820,
        margin: '24px auto 0',
        background: '#ffffff',
        border: '1px solid #e8e8e4',
        borderRadius: 14,
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 28px',
          borderBottom: '1px solid #f3f3ef',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 650, color: '#1a1a1a', letterSpacing: '-0.02em' }}>
              {dept.fullName}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#003D7C',
                background: 'rgba(0, 61, 124, 0.06)',
                padding: '3px 10px',
                borderRadius: 5,
              }}
            >
              {dept.abbr}
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{cat.label}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: compositeColor, lineHeight: 1 }}>{composite}</div>
            <div style={{ fontSize: 11, color: compositeColor, fontWeight: 500, marginTop: 2 }}>{compositeLabel}</div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #e8e8e4',
              borderRadius: 8,
              width: 32,
              height: 32,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              color: '#9ca3af',
              transition: 'all 0.15s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f7f7f5';
              e.currentTarget.style.color = '#1a1a1a';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#9ca3af';
            }}
          >
            \u00d7
          </button>
        </div>
      </div>

      {/* Body — two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {/* Left — Wellbeing metrics */}
        <div style={{ padding: '24px 28px', borderRight: '1px solid #f3f3ef' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 18,
            }}
          >
            Wellbeing metrics
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {metricConfig.map((mc) => {
              const val = m[mc.key];
              const color = getBarColor(val, mc.inverse);
              const status = getStatusLabel(val, mc.inverse);
              return (
                <div key={mc.key}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{mc.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, color: color, fontWeight: 500 }}>{status}</span>
                      <span style={{ fontSize: 13, fontWeight: 650, color: '#1a1a1a' }}>{val}</span>
                    </div>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: '#f3f4f6' }}>
                    <div
                      style={{
                        height: 5,
                        borderRadius: 3,
                        width: val + '%',
                        background: color,
                        transition: 'width 0.4s ease-out',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — HR data */}
        <div style={{ padding: '24px 28px' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 18,
            }}
          >
            Organisational data
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Performance rating', value: hr.performanceRating + ' / 5.0' },
              { label: 'Avg medical leave', value: hr.medicalLeave + ' days / yr' },
              { label: 'Salary band', value: hr.salaryBand },
              { label: 'Turnover rate', value: hr.turnoverRate + '%' },
              { label: 'Headcount', value: hr.headcount },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: 12,
                  borderBottom: '1px solid #f7f7f5',
                }}
              >
                <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 400 }}>{item.label}</span>
                <span style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
