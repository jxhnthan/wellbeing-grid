import React, { useState } from 'react';

const sources = [
  {
    id: 'engagement',
    name: 'Employee Engagement Surveys',
    description: 'Pulse surveys, annual engagement scores, eNPS',
    endpoint: '/api/v1/engagement',
    metrics: ['satisfaction', 'engagement', 'support'],
    lastSync: '2 min ago',
  },
  {
    id: 'hr',
    name: 'HR & Organisational Data',
    description: 'Performance ratings, medical leave, salary, rank, tenure',
    endpoint: '/api/v1/hr-data',
    metrics: ['performance', 'leave', 'turnover', 'salary'],
    lastSync: '5 min ago',
  },
  {
    id: 'operational',
    name: 'Operational & Behavioural Data',
    description: 'System usage, meeting load, after-hours activity',
    endpoint: '/api/v1/operational',
    metrics: ['workload', 'burnout', 'engagement'],
    lastSync: '1 min ago',
  },
];

export default function DataOrchestrator() {
  const [syncing, setSyncing] = useState({});

  const handleSync = (id) => {
    setSyncing((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSyncing((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleSyncAll = () => {
    sources.forEach((s, i) => {
      setTimeout(() => handleSync(s.id), i * 400);
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#003D7C' }}>Data Sources</div>
          <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
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
            padding: '8px 18px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Sync all
        </button>
      </div>

      {/* Table */}
      <div style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr 100px 90px',
          padding: '12px 24px',
          borderBottom: '1px solid #f3f4f6',
          alignItems: 'center',
        }}>
          {['Source', 'Metrics', 'Status', ''].map((h) => (
            <div key={h} style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {sources.map((source, idx) => {
          const isSyncing = syncing[source.id];
          return (
            <div
              key={source.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.2fr 100px 90px',
                padding: '18px 24px',
                borderBottom: idx < sources.length - 1 ? '1px solid #f3f4f6' : 'none',
                alignItems: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fafaf8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
            >
              {/* Source info */}
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{source.name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{source.description}</div>
                <div style={{ fontSize: 11, color: '#b0b0b0', marginTop: 4 }}>
                  <span style={{ color: '#9ca3af' }}>Endpoint</span>{' '}
                  <span style={{ fontFamily: 'SFMono-Regular, Consolas, monospace', fontSize: 11 }}>
                    {source.endpoint}
                  </span>
                  <span style={{ marginLeft: 12, color: '#b0b0b0' }}>Last sync: {source.lastSync}</span>
                </div>
              </div>

              {/* Metric pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {source.metrics.map((m) => (
                  <span
                    key={m}
                    style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: '#f3f4f6',
                      color: '#6b7280',
                    }}
                  >
                    {m}
                  </span>
                ))}
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
                <span style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: isSyncing ? '#EF7C00' : '#22863a',
                  transition: 'color 0.3s',
                }}>
                  {isSyncing ? 'Syncing' : 'Connected'}
                </span>
              </div>

              {/* Sync button */}
              <button
                onClick={() => handleSync(source.id)}
                disabled={isSyncing}
                style={{
                  background: 'none',
                  border: '1px solid #EF7C00',
                  borderRadius: 6,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#EF7C00',
                  cursor: isSyncing ? 'default' : 'pointer',
                  opacity: isSyncing ? 0.5 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {isSyncing ? 'Syncing...' : 'Sync'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'flex',
        gap: 32,
        marginTop: 16,
        padding: '14px 0',
      }}>
        {[
          { label: 'Total records', value: '24,891' },
          { label: 'Active sources', value: '3 / 3' },
          { label: 'Metrics tracked', value: '11' },
        ].map((stat) => (
          <div key={stat.label}>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>{stat.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginLeft: 8 }}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
