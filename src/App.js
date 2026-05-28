import React, { useState } from 'react';
import TileGridMap from './TileGridMap';
import Tooltip from './Tooltip';
import Legend from './Legend';
import DetailPanel from './DetailPanel';
import DataOrchestrator from './DataOrchestrator';
import DataFlow from './DataFlow';
import Insights from './Insights';
import { metrics } from './stateData';

const tabs = [
  { key: 'grid', label: 'Dashboard' },
  { key: 'sources', label: 'Data Sources' },
  { key: 'flow', label: 'Data Flow' },
  { key: 'insights', label: 'Insights' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('grid');
  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(null);

  const handleHover = (dept) => setHovered(dept);
  const handleLeave = () => setHovered(null);
  const handleClick = (abbr) => setSelected(selected === abbr ? null : abbr);

  return (
    <div
      style={{ minHeight: '100vh', padding: '48px 32px' }}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Header */}
      <div style={{ maxWidth: 800, margin: '0 auto 36px' }}>
        <div style={{
          fontSize: 24,
          fontWeight: 700,
          color: '#003D7C',
          letterSpacing: '-0.02em',
        }}>
          Wellbeing Grid
        </div>
        <div style={{ fontSize: 14, color: '#9ca3af', marginTop: 4 }}>
          NUS department wellbeing at a glance
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        maxWidth: 800,
        margin: '0 auto 32px',
        display: 'flex',
        gap: 4,
        background: '#eeeee9',
        borderRadius: 8,
        padding: 4,
        width: 'fit-content',
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '8px 20px',
              borderRadius: 6,
              border: 'none',
              fontSize: 13,
              fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? '#003D7C' : '#6b7280',
              background: activeTab === tab.key ? '#fff' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: activeTab === tab.key ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'grid' && (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <TileGridMap
            selected={selected}
            onHover={handleHover}
            onLeave={handleLeave}
            onClick={handleClick}
          />
          <Legend />
          {hovered && (
            <Tooltip
              dept={hovered}
              metrics={metrics[hovered.abbr]}
              position={mousePos}
            />
          )}
          {selected && (
            <DetailPanel
              abbr={selected}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      )}

      {activeTab === 'sources' && <DataOrchestrator />}
      {activeTab === 'flow' && <DataFlow />}
      {activeTab === 'insights' && <Insights />}
    </div>
  );
}
