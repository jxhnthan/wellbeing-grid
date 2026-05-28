import React, { useState } from 'react';

const sources = [
  {
    name: 'Employee Engagement Surveys',
    desc: 'Pulse surveys, annual engagement scores, eNPS',
    endpoint: '/api/v1/engagement',
    metrics: ['satisfaction', 'engagement', 'support'],
  },
  {
    name: 'HR & Organisational Data',
    desc: 'Performance ratings, medical leave, salary bands, turnover',
    endpoint: '/api/v1/hr-data',
    metrics: ['performance', 'medical leave', 'salary', 'turnover'],
  },
  {
    name: 'Operational & Behavioural Data',
    desc: 'System usage, meeting load, after-hours activity',
    endpoint: '/api/v1/operational',
    metrics: ['workload', 'burnout', 'engagement'],
  },
];

export default function DataOrchestrator() {
  const [syncing, setSyncing] = useState({});

  const handleSync = (idx) => {
    setSyncing((prev) => ({ ...prev, [idx]: true }));
    setTimeout(() => setSyncing((prev) => ({ ...prev, [idx]: false })), 2000);
  };

  const handleSyncAll = () => {
    sources.forEach((_, idx) => {
      setTimeout(() => handleSync(idx), idx * 400);
    });
  };

  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: font }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.02em' }}>
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
            fontFamily: font,
          }}
        >
          Sync all sources
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e2de', borderRadius: 10, overflow: 'hidden' }}>
        {/* Table header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 200px 100px 90px',
            padding: '10px 20px',
            borderBottom: '1px solid #f3f4f6',
            background: '#fafaf8',
          }}
        >
          {['Source', 'Metrics', 'Status', ''].map((h) => (
            <div key={h} style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {sources.map((source, idx) => {
          const isSyncing = syncing[idx];
          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 200px 100px 90px',
                padding: '16px 20px',
                alignItems: 'center',
                borderBottom: idx < sources.length - 1 ? '1px solid #f3f4f6' : 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fafaf8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
            >
              {/* Source */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 2 }}>
                  {source.name}
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{source.desc}</div>
                <div style={{ fontSize: 10, color: '#c8c8c4', marginTop: 4, fontFamily: 'monospace' }}>
                  {source.endpoint}
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
                      background: '#f3f4f6',
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
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: isSyncing ? '#EF7C00' : '#22863a',
                    transition: 'background 0.3s',
                  }}
                />
                <span style={{ fontSize: 11, color: isSyncing ? '#EF7C00' : '#22863a', fontWeight: 500 }}>
                  {isSyncing ? 'Syncing' : 'Connected'}
                </span>
              </div>

              {/* Sync button */}
              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={() => handleSync(idx)}
                  disabled={isSyncing}
                  style={{
                    background: 'none',
                    border: '1px solid ' + (isSyncing ? '#e2e2de' : '#EF7C00'),
                    borderRadius: 6,
                    padding: '5px 12px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: isSyncing ? '#9ca3af' : '#EF7C00',
                    cursor: isSyncing ? 'default' : 'pointer',
                    fontFamily: font,
                    transition: 'all 0.2s',
                  }}
                >
                  {isSyncing ? 'Syncing...' : 'Sync now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 32,
          marginTop: 16,
          padding: '12px 0',
        }}
      >
        {[
          { label: 'Records processed', value: '24,891' },
          { label: 'Active sources', value: '3' },
          { label: 'Metrics tracked', value: '8' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
