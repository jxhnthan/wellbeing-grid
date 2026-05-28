import React from 'react';
import { categoryColors, categoryLabels } from './stateData';

export default function Legend() {
  const categories = Object.keys(categoryColors);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 24,
        marginTop: 32,
        flexWrap: 'wrap',
      }}
    >
      {categories.map((cat) => (
        <div
          key={cat}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: categoryColors[cat],
            }}
          />
          <span style={{ fontSize: 12, color: '#6b7280' }}>
            {categoryLabels[cat]}
          </span>
        </div>
      ))}
    </div>
  );
}
