import React from 'react';
import { categories } from './stateData';

const categoryOrder = ['faculty', 'school', 'stem', 'humanities', 'research', 'admin', 'campus'];

export default function Legend() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 20,
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 28,
        paddingTop: 20,
        borderTop: '1px solid #eeeee9',
      }}
    >
      {categoryOrder.map((catKey) => {
        const cat = categories[catKey];
        const opacity = {
          faculty: 1,
          school: 0.85,
          stem: 0.7,
          humanities: 0.55,
          research: 0.4,
          admin: 0.28,
          campus: 0.18,
        };
        return (
          <div key={catKey} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: `rgba(0, 61, 124, ${opacity[catKey]})`,
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: '#9ca3af',
                fontWeight: 500,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              {cat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
