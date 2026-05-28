import React from 'react';

const items = [
  { label: 'Faculties', color: '#003D7C' },
  { label: 'Schools', color: '#1a5a9e' },
  { label: 'STEM Depts', color: '#3572b0' },
  { label: 'Humanities & Biz', color: '#5a8fc4' },
  { label: 'Research', color: '#89b0d6' },
  { label: 'Administration', color: '#b4cfe3' },
  { label: 'Campus Life', color: '#d6e4ef' },
];

export default function Legend() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        marginTop: 20,
        flexWrap: 'wrap',
      }}
    >
      {items.map((item) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: item.color,
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: '#6b7280',
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
