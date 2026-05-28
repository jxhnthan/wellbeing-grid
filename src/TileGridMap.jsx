import React from 'react';
import { departments, GRID_COLS } from './stateData';
import StateTile from './StateTile';

const GRID_ROWS = Math.ceil(departments.length / GRID_COLS);

export default function TileGridMap({ selected, onHover, onLeave, onClick }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          gap: 6,
        }}
      >
        {departments.map((dept) => (
          <StateTile
            key={dept.abbr}
            dept={dept}
            isSelected={selected?.abbr === dept.abbr}
            onHover={onHover}
            onLeave={onLeave}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
