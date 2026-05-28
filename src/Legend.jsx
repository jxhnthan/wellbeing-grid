import React from 'react';
import { categories } from './stateData';

export default function Legend() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        marginTop: 24,
        flexWrap: 'wrap',
      }}
    >
      {Object.values(categories).map((cat) => (
        <div key={cat.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: cat.color,
            }}
          />
          <span style={{ fontSize: 11, color: '#6b7280' }}>{cat.label}</span>
        </div>
      ))}
    </div>
  );
}
