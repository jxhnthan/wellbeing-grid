import React, { useState, useCallback } from 'react';
import TileGridMap from './TileGridMap';
import Legend from './Legend';
import Tooltip from './Tooltip';
import DetailPanel from './DetailPanel';
import DataOrchestrator from './DataOrchestrator';
import DataFlow from './DataFlow';
import Insights from './Insights';
import './App.css';

const tabs = [
  { id: 'grid', label: 'Wellbeing Grid' },
  { id: 'sources', label: 'Data Sources' },
  { id: 'flow', label: 'Data Flow' },
  { id: 'insights', label: 'Insights' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('grid');
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleHover = useCallback((abbr) => setHovered(abbr), []);
  const handleLeave = useCallback(() => setHovered(null), []);
  const handleClick = useCallback(
    (abbr) => setSelected((prev) => (prev === abbr ? null : abbr)),
    []
  );

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        padding: '48px 32px 64px',
        maxWidth: 960,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#003D7C',
            letterSpacing: '-0.02em',
            marginBottom: 4,
          }}
        >
          Wellbeing Grid
        </h1>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>
          Live predictive wellbeing workflow — National University of Singapore
        </p>
      </div>

      {/* Tab navigation */}
      <div
        style={{
          display: 'inline-flex',
          background: '#f3f4f6',
          borderRadius: 8,
          padding: 3,
          marginBottom: 32,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 18px',
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'all 0.15s',
              background: activeTab === tab.id ? '#fff' : 'transparent',
              color: activeTab === tab.id ? '#003D7C' : '#9ca3af',
              boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'grid' && (
        <div>
          <TileGridMap
            selected={selected}
            hovered={hovered}
            onHover={handleHover}
            onLeave={handleLeave}
            onClick={handleClick}
          />
          <Legend />
          <Tooltip abbr={hovered} mousePos={mousePos} />
          <DetailPanel abbr={selected} onClose={() => setSelected(null)} />
        </div>
      )}

      {activeTab === 'sources' && <DataOrchestrator />}
      {activeTab === 'flow' && <DataFlow />}
      {activeTab === 'insights' && <Insights />}
    </div>
  );
}
