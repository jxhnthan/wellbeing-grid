import React from 'react';

const categoryColors = {
  faculty:    { bg: '#003D7C', text: '#ffffff' },
  school:     { bg: '#1a5a9e', text: '#ffffff' },
  stem:       { bg: '#3572b0', text: '#ffffff' },
  humanities: { bg: '#5a8fc4', text: '#ffffff' },
  research:   { bg: '#89b0d6', text: '#1a1a1a' },
  admin:      { bg: '#b4cfe3', text: '#1a1a1a' },
  campus:     { bg: '#d6e4ef', text: '#1a1a1a' },
};

export default function StateTile({ dept, isSelected, onHover, onLeave, onClick }) {
  const colors = categoryColors[dept.category] || categoryColors.campus;

  return (
    <div
      onMouseEnter={() => onHover(dept)}
      onMouseLeave={onLeave}
      onClick={() => onClick(dept)}
      style={{
        gridRow: dept.row + 1,
        gridColumn: dept.col + 1,
        width: '100%',
        aspectRatio: '1',
        backgroundColor: colors.bg,
        color: colors.text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.04em',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease',
        border: isSelected ? '2px solid #EF7C00' : '2px solid transparent',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
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
