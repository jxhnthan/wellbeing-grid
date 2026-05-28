import React from 'react';
import { departments, categories } from './stateData';
import StateTile from './StateTile';

const categoryOrder = ['faculty', 'school', 'stem', 'humanities', 'research', 'admin', 'campus'];

export default function TileGridMap({ selectedDept, onHover, onLeave, onClick }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 0,
        maxWidth: 820,
        margin: '0 auto',
      }}
    >
      {/* Category labels on the left */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(7, 64px)',
          gap: 6,
          paddingRight: 16,
          alignItems: 'center',
        }}
      >
        {categoryOrder.map((catKey) => (
          <div
            key={catKey}
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: '#9ca3af',
              textAlign: 'right',
              whiteSpace: 'nowrap',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}
          >
            {categories[catKey].label}
          </div>
        ))}
      </div>

      {/* Tile grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 64px)',
          gridTemplateRows: 'repeat(7, 64px)',
          gap: 6,
          flex: 1,
        }}
      >
        {departments.map((dept) => (
          <StateTile
            key={dept.abbr}
            dept={dept}
            isSelected={selectedDept?.abbr === dept.abbr}
            onHover={onHover}
            onLeave={onLeave}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
