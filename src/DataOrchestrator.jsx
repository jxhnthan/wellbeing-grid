import React, { useState } from 'react';

const sources = [
  {
    id: 'engagement',
    name: 'Employee Engagement Surveys',
    description: 'Pulse surveys, annual engagement scores, eNPS',
    endpoint: '/api/v1/engagement',
    metrics: ['satisfaction', 'engagement', 'support'],
  },
  {
    id: 'hr',
    name: 'HR & Organisational Data',
    description: 'Performance ratings, medical leave, salary, rank, turnover',
    endpoint: '/api/v1/hr-data',
    metrics: ['performance', 'medical leave', 'salary', 'turnover'],
  },
  {
    id: 'operational',
    name: 'Operational & Behavioural Data',
    description: 'System usage, meeting load, after-hours activity',
    endpoint: '/api/v1/operational',
    metrics: ['workload', 'burnout', 'engagement'],
  },
];

export default function DataOrchestrator() {
  const [syncing, setSyncing] = useState({});
  const [lastSync, setLastSync] = useState({
    engagement: '2 min ago',
    hr: '5 min ago',
    operational: '1 min ago',
  });

  function handleSync(id) {
    setSyncing((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSyncing((prev) => ({ ...prev, [id]: false }));
      setLastSync((prev) => ({ ...prev, [id]: 'Just now' }));
    }, 1800);
  }

  function handleSyncAll() {
    sources.forEach((s, i) => {
      setTimeout(() => handleSync(s.id), i * 400);
    });
  }

  return (
    <div
      style={{
        maxWidth: 760,
        margin: '0 auto',
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
          alignItems: 'center',
          marginBottom: 28,
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#003D7C' }}>
            Data Orchestrator
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
            Live data pipeline — pulling from {sources.length} institutional sources
          </div>
        </div>
        <button
          onClick={handleSyncAll}
          style={{
            background: '#EF7C00',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Sync all sources
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {sources.map((source, i) => {
          const isSyncing = syncing[source.id];
          return (
            <div
              key={source.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                alignItems: 'center',
                gap: 24,
                padding: '20px 0',
                borderTop: i === 0 ? '1px solid #f3f4f6' : 'none',
                borderBottom: '1px solid #f3f4f6',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                  {source.name}
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
                  {source.description}
                </div>
                <div style={{ fontSize: 11, color: '#b0b0b0', marginTop: 6, fontFamily: 'monospace' }}>
                  {source.endpoint}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  {source.metrics.map((m) => (
                    <span
                      key={m}
                      style={{
                        fontSize: 10,
                        color: '#6b7280',
                        border: '1px solid #e5e7eb',
                        borderRadius: 4,
                        padding: '2px 8px',
                        fontWeight: 500,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: isSyncing ? '#EF7C00' : '#22c55e',
                    transition: 'background-color 0.3s',
                  }}
                />
                <span style={{ fontSize: 11, color: isSyncing ? '#EF7C00' : '#22c55e', fontWeight: 600 }}>
                  {isSyncing ? 'Syncing' : 'Connected'}
                </span>
                <span style={{ fontSize: 10, color: '#c0c0c0', marginLeft: 4 }}>
                  {lastSync[source.id]}
                </span>
              </div>

              <button
                onClick={() => handleSync(source.id)}
                disabled={isSyncing}
                style={{
                  background: 'none',
                  border: '1px solid #EF7C00',
                  color: '#EF7C00',
                  borderRadius: 6,
                  padding: '6px 14px',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: isSyncing ? 'default' : 'pointer',
                  opacity: isSyncing ? 0.5 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {isSyncing ? 'Syncing...' : 'Sync now'}
              </button>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 32,
          marginTop: 20,
          paddingTop: 16,
        }}
      >
        {[
          { label: 'Total records', value: '48,291' },
          { label: 'Active sources', value: '3 / 3' },
          { label: 'Metrics tracked', value: '10' },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#003D7C' }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
