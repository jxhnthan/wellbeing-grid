import React from 'react';
import { departments } from './departmentData';
import StateTile from './StateTile';

const categoryLabels = {
  0: 'Faculties',
  1: 'Schools',
  2: 'STEM Depts',
  3: 'Humanities & Biz',
  4: 'Research',
  5: 'Administration',
  6: 'Campus Life',
};

export default function TileGridMap({ selectedDept, onHover, onLeave, onClick }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 0 }}>
        {/* Row labels */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 4,
            paddingBottom: 4,
            marginRight: 12,
            width: 90,
            flexShrink: 0,
          }}
        >
          {Object.entries(categoryLabels).map(([row, label]) => (
            <div
              key={row}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                fontSize: 10,
                fontWeight: 500,
                color: '#9ca3af',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(9, 1fr)',
            gridTemplateRows: 'repeat(7, 1fr)',
            gap: 5,
            flex: 1,
            aspectRatio: '9 / 7',
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
    </div>
  );
}
