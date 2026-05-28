import React, { useState } from 'react';

const sources = [
  {
    id: 'engagement',
    name: 'Employee Engagement Surveys',
    description: 'Pulse surveys, annual engagement scores, eNPS',
    endpoint: '/api/v1/engagement',
    metrics: ['satisfaction', 'engagement', 'support'],
    lastSync: '2 min ago',
    records: '12,847',
  },
  {
    id: 'hr',
    name: 'HR & Organisational Data',
    description: 'Performance ratings, medical leave, salary bands, turnover',
    endpoint: '/api/v1/hr-data',
    metrics: ['performance', 'leave', 'salary', 'turnover'],
    lastSync: '5 min ago',
    records: '8,234',
  },
  {
    id: 'operational',
    name: 'Operational & Behavioural Data',
    description: 'System usage, meeting load, after-hours activity',
    endpoint: '/api/v1/operational',
    metrics: ['workload', 'burnout', 'engagement'],
    lastSync: '1 min ago',
    records: '45,120',
  },
];

export default function DataOrchestrator() {
  const [syncing, setSyncing] = useState({});

  const handleSync = (id) => {
    setSyncing((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setSyncing((prev) => ({ ...prev, [id]: false })), 2000);
  };

  const handleSyncAll = () => {
    sources.forEach((s, i) => {
      setTimeout(() => handleSync(s.id), i * 400);
    });
  };

  const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  return (
    <div
      style={{
        maxWidth: 820,
        margin: '0 auto',
        background: '#ffffff',
        border: '1px solid #e8e8e4',
        borderRadius: 14,
        padding: '28px 32px',
        fontFamily: font,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 650, color: '#003D7C', letterSpacing: '-0.01em' }}>
            Data Sources
          </div>
          <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>
            Live data pipeline — pulling from {sources.length} institutional sources
          </div>
        </div>
        <button
          onClick={handleSyncAll}
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: '1px solid #EF7C00',
            background: 'transparent',
            color: '#EF7C00',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: font,
            transition: 'all 0.15s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#EF7C00';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#EF7C00';
          }}
        >
          Sync all
        </button>
      </div>

      {/* Table */}
      <div style={{ borderTop: '1px solid #f3f3ef' }}>
        {sources.map((source, idx) => {
          const isSyncing = syncing[source.id];
          return (
            <div
              key={source.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                gap: 24,
                alignItems: 'center',
                padding: '20px 0',
                borderBottom: idx < sources.length - 1 ? '1px solid #f3f3ef' : 'none',
              }}
            >
              {/* Source info */}
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 3 }}>
                  {source.name}
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>{source.description}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <code
                    style={{
                      fontSize: 11,
                      color: '#6b7280',
                      background: '#f7f7f5',
                      padding: '2px 8px',
                      borderRadius: 4,
                    }}
                  >
                    {source.endpoint}
                  </code>
                  <span style={{ fontSize: 11, color: '#b0b0b0' }}>{source.lastSync}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  {source.metrics.map((m) => (
                    <span
                      key={m}
                      style={{
                        fontSize: 11,
                        color: '#6b7280',
                        background: '#f7f7f5',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontWeight: 500,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: isSyncing ? '#EF7C00' : '#22863a',
                    transition: 'background 0.3s',
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: isSyncing ? '#EF7C00' : '#22863a',
                    transition: 'color 0.3s',
                  }}
                >
                  {isSyncing ? 'Syncing' : 'Connected'}
                </span>
              </div>

              {/* Sync button */}
              <button
                onClick={() => handleSync(source.id)}
                disabled={isSyncing}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: '1px solid #e8e8e4',
                  background: '#ffffff',
                  color: isSyncing ? '#9ca3af' : '#003D7C',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: isSyncing ? 'default' : 'pointer',
                  fontFamily: font,
                  transition: 'all 0.15s',
                  opacity: isSyncing ? 0.6 : 1,
                }}
              >
                {isSyncing ? 'Syncing...' : 'Sync now'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          marginTop: 20,
          paddingTop: 20,
          borderTop: '1px solid #f3f3ef',
        }}
      >
        {[
          { label: 'Total records', value: '66,201' },
          { label: 'Active sources', value: '3 / 3' },
          { label: 'Metrics tracked', value: '10' },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{ fontSize: 11, color: '#b0b0b0', fontWeight: 500, marginBottom: 2 }}>{stat.label}</div>
            <div style={{ fontSize: 16, fontWeight: 650, color: '#1a1a1a' }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
