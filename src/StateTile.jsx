import React from 'react';
import { categoryColors } from './stateData';

export default function StateTile({ dept, isSelected, onHover, onLeave, onClick }) {
  const bg = categoryColors[dept.category];

  return (
    <div
      onMouseEnter={() => onHover(dept.abbr)}
      onMouseLeave={onLeave}
      onClick={() => onClick(dept.abbr)}
      style={{
        gridRow: dept.row + 1,
        gridColumn: dept.col + 1,
        backgroundColor: bg,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.05em',
        color: '#fff',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        transform: isSelected ? 'translateY(-2px)' : 'none',
        boxShadow: isSelected
          ? '0 4px 12px rgba(0, 61, 124, 0.25)'
          : '0 1px 3px rgba(0, 0, 0, 0.06)',
        border: isSelected ? '2px solid #EF7C00' : '2px solid transparent',
        aspectRatio: '1',
        userSelect: 'none',
      }}
    >
      {dept.abbr}
    </div>
  );
}
