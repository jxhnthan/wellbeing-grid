import React from 'react';

export default function StateTile({ dept, isSelected, onHover, onLeave, onClick }) {
  return (
    <div
      onMouseEnter={() => onHover(dept)}
      onMouseLeave={onLeave}
      onClick={() => onClick(dept)}
      style={{
        gridRow: dept.row + 1,
        gridColumn: dept.col + 1,
        background: isSelected ? '#003D7C' : '#ffffff',
        border: isSelected ? '1.5px solid #003D7C' : '1px solid #e2e2de',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        userSelect: 'none',
        aspectRatio: '1',
      }}
      onMouseOver={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#003D7C';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 61, 124, 0.08)';
        }
      }}
      onMouseOut={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#e2e2de';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: isSelected ? '#ffffff' : '#003D7C',
          letterSpacing: '0.02em',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {dept.abbr}
      </span>
    </div>
  );
}
