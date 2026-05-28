import React from 'react';
import { categories } from './stateData';

export default function StateTile({ dept, isSelected, onHover, onLeave, onClick }) {
  const cat = categories[dept.category];
  const isLight = ['arts', 'research', 'admin'].includes(dept.category);

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        gridRow: dept.row + 1,
        gridColumn: dept.col + 1,
        width: '100%',
        aspectRatio: '1',
        backgroundColor: cat.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.02em',
        color: isLight ? '#1a1a1a' : 'rgba(255,255,255,0.95)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        border: isSelected ? '2px solid #EF7C00' : '1px solid transparent',
        userSelect: 'none',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {dept.abbr}
    </div>
  );
}
