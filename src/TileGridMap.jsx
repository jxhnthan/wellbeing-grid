import React from 'react';
import { departments } from './stateData';
import StateTile from './StateTile';

export default function TileGridMap({ selected, onHover, onLeave, onClick }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
        gridTemplateRows: 'repeat(7, 1fr)',
        gap: 4,
        maxWidth: 580,
        margin: '0 auto',
      }}
    >
      {departments.map((dept) => (
        <StateTile
          key={dept.abbr}
          dept={dept}
          isSelected={selected === dept.abbr}
          onHover={() => onHover(dept)}
          onLeave={onLeave}
          onClick={() => onClick(dept.abbr)}
        />
      ))}
    </div>
  );
}
