import React from 'react';
import StateTile from './StateTile';
import { departments } from './stateData';

export default function TileGridMap({ selected, hovered, onHover, onLeave, onClick }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
        gridTemplateRows: 'repeat(7, 1fr)',
        gap: 6,
        maxWidth: 560,
        margin: '0 auto',
      }}
    >
      {departments.map((dept) => (
        <StateTile
          key={dept.abbr}
          dept={dept}
          isSelected={selected === dept.abbr || hovered === dept.abbr}
          onHover={onHover}
          onLeave={onLeave}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
