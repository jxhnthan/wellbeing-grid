import React, { useState } from 'react';
import './App.css';
import TileGridMap from './TileGridMap';
import Tooltip from './Tooltip';
import DetailPanel from './DetailPanel';
import Legend from './Legend';
import DataOrchestrator from './DataOrchestrator';
import DataFlow from './DataFlow';
import Insights from './Insights';

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

  const handleHover = (dept) => setHovered(dept);
  const handleLeave = () => setHovered(null);
  const handleClick = (dept) => setSelected(selected?.abbr === dept.abbr ? null : dept);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ minHeight: '100vh', background: '#f7f7f5', fontFamily: font }}
    >
      {/* Header */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px 0' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#003D7C',
            margin: 0,
            letterSpacing: '-0.03em',
          }}>
            Wellbeing Grid
          </h1>
          <p style={{ fontSize: 13, color: '#9ca3af', margin: '4px 0 0', fontWeight: 400 }}>
            NUS department wellbeing — live predictive workflow
          </p>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: 'inline-flex',
            background: '#efefe9',
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
                padding: '7px 18px',
                fontSize: 12,
                fontWeight: activeTab === tab.id ? 600 : 500,
                color: activeTab === tab.id ? '#1a1a1a' : '#9ca3af',
                background: activeTab === tab.id ? '#ffffff' : 'transparent',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: font,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px 60px' }}>
        {activeTab === 'grid' && (
          <>
            <TileGridMap
              selected={selected}
              onHover={handleHover}
              onLeave={handleLeave}
              onClick={handleClick}
            />
            <Legend />
            <Tooltip dept={hovered} mousePos={mousePos} />
            <DetailPanel dept={selected} onClose={() => setSelected(null)} />
          </>
        )}
        {activeTab === 'sources' && <DataOrchestrator />}
        {activeTab === 'flow' && <DataFlow />}
        {activeTab === 'insights' && <Insights />}
      </div>
    </div>
  );
}
