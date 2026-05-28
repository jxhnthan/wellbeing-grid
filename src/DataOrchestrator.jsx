import React, { useState } from 'react';

const sources = [
  {
    name: 'Employee Engagement Surveys',
    description: 'Pulse surveys, annual engagement scores, eNPS',
    endpoint: '/api/v1/engagement',
    metrics: ['satisfaction', 'engagement', 'support'],
    lastSync: '2 min ago',
  },
  {
    name: 'HR & Organisational Data',
    description: 'Performance ratings, medical leave, salary bands, turnover',
    endpoint: '/api/v1/hr-data',
    metrics: ['performance', 'leave', 'salary', 'turnover'],
    lastSync: '5 min ago',
  },
  {
    name: 'Operational & Behavioural Data',
    description: 'System usage, meeting load, after-hours activity',
    endpoint: '/api/v1/operational',
    metrics: ['workload', 'burnout', 'engagement'],
    lastSync: '1 min ago',
  },
];

export default function DataOrchestrator() {
  const [syncingIdx, setSyncingIdx] = useState(null);

  const handleSync = (idx) => {
    setSyncingIdx(idx);
    setTimeout(() => setSyncingIdx(null), 2000);
  };

  const handleSyncAll = () => {
    setSyncingIdx(0);
    setTimeout(() => setSyncingIdx(1), 600);
    setTimeout(() => setSyncingIdx(2), 1200);
    setTimeout(() => setSyncingIdx(null), 2400);
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '0 auto',
        background: '#fff',
        border: '1px solid #e8e8e4',
        borderRadius: 12,
        padding: '28px 32px',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#003D7C', letterSpacing: '-0.02em' }}>
            Data Orchestrator
          </div>
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
            padding: '8px 16px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Sync all sources
        </button>
      </div>

      {/* Table */}
      <div style={{ borderTop: '1px solid #f0f0ec' }}>
        {/* Table header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.5fr 100px 90px',
            gap: 16,
            padding: '10px 0',
            borderBottom: '1px solid #f0f0ec',
          }}
        >
          {['Source', 'Metrics', 'Status', ''].map((h) => (
            <div
              key={h}
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: '#9ca3af',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Table rows */}
        {sources.map((source, idx) => {
          const isSyncing = syncingIdx === idx;
          return (
            <div
              key={source.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.5fr 100px 90px',
                gap: 16,
                padding: '16px 0',
                borderBottom: idx < sources.length - 1 ? '1px solid #f0f0ec' : 'none',
                alignItems: 'center',
              }}
            >
              {/* Source info */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{source.name}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{source.description}</div>
                <div style={{ fontSize: 11, color: '#b0b0b0', marginTop: 4 }}>
                  <span style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 10, color: '#6b7280', background: '#f7f7f5', padding: '2px 6px', borderRadius: 3 }}>
                    {source.endpoint}
                  </span>
                  <span style={{ marginLeft: 8 }}>Last sync: {source.lastSync}</span>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {source.metrics.map((m) => (
                  <span
                    key={m}
                    style={{
                      fontSize: 10,
                      color: '#6b7280',
                      background: '#f7f7f5',
                      border: '1px solid #e8e8e4',
                      padding: '2px 8px',
                      borderRadius: 4,
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
                <span style={{ fontSize: 11, fontWeight: 500, color: isSyncing ? '#EF7C00' : '#22863a' }}>
                  {isSyncing ? 'Syncing' : 'Connected'}
                </span>
              </div>

              {/* Sync button */}
              <button
                onClick={() => handleSync(idx)}
                style={{
                  background: 'none',
                  border: '1px solid #EF7C00',
                  color: '#EF7C00',
                  borderRadius: 6,
                  padding: '5px 12px',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
              >
                Sync now
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
          paddingTop: 16,
          borderTop: '1px solid #f0f0ec',
        }}
      >
        {[
          { label: 'Total records', value: '24,891' },
          { label: 'Active sources', value: '3 / 3' },
          { label: 'Metrics tracked', value: '10' },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500 }}>{stat.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#003D7C', marginTop: 2 }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
