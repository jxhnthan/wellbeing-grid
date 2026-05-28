import React from 'react';

export default function Legend() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '16px auto 0',
        display: 'flex',
        justifyContent: 'center',
        gap: 24,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#003D7C' }} />
        <span style={{ fontSize: 11, color: '#9ca3af' }}>Selected</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: 2, background: '#ffffff', border: '1px solid #e2e2de' }} />
        <span style={{ fontSize: 11, color: '#9ca3af' }}>Department</span>
      </div>
      <div style={{ fontSize: 11, color: '#c8c8c4' }}>
        Hover for metrics · Click for details
      </div>
    </div>
  );
}
