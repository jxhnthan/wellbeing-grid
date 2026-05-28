import React from 'react';
import { categories } from './stateData';

export default function StateTile({ dept, isSelected, onHover, onLeave, onClick }) {
  const cat = categories[dept.category];

  // Compute a lighter version for the tile background
  const getBgColor = () => {
    const opacity = {
      faculty: 1,
      school: 0.85,
      stem: 0.7,
      humanities: 0.55,
      research: 0.4,
      admin: 0.28,
      campus: 0.18,
    };
    const o = opacity[dept.category] || 0.5;
    return `rgba(0, 61, 124, ${o})`;
  };

  const getTextColor = () => {
    const lightCategories = ['research', 'admin', 'campus'];
    return lightCategories.includes(dept.category) ? '#003D7C' : '#ffffff';
  };

  return (
    <div
      onMouseEnter={(e) => onHover(dept, e)}
      onMouseLeave={onLeave}
      onClick={() => onClick(dept)}
      style={{
        gridRow: dept.row + 1,
        gridColumn: dept.col + 1,
        background: getBgColor(),
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        border: isSelected ? '2px solid #EF7C00' : '2px solid transparent',
        boxShadow: isSelected
          ? '0 0 0 3px rgba(239, 124, 0, 0.15)'
          : '0 1px 3px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        minHeight: 0,
      }}
      onMouseOver={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 61, 124, 0.12)';
        }
      }}
      onMouseOut={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
        }
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: getTextColor(),
          letterSpacing: '0.02em',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          lineHeight: 1,
        }}
      >
        {dept.abbr}
      </span>
    </div>
  );
}
