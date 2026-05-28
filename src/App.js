import React, { useState } from 'react';
import './App.css';
import TileGridMap from './TileGridMap';
import Tooltip from './Tooltip';
import Legend from './Legend';
import DetailPanel from './DetailPanel';
import DataOrchestrator from './DataOrchestrator';
import DataFlow from './DataFlow';
import Insights from './Insights';

const tabs = [
  { id: 'grid', label: 'Dashboard' },
  { id: 'sources', label: 'Data Sources' },
  { id: 'flow', label: 'Data Flow' },
  { id: 'insights', label: 'Insights' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('grid');
  const [hoveredDept, setHoveredDept] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleHover = (dept) => setHoveredDept(dept);
  const handleLeave = () => setHoveredDept(null);
  const handleClick = (dept) => setSelectedDept(selectedDept?.abbr === dept.abbr ? null : dept);

  const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f5' }} onMouseMove={handleMouseMove}>
      {/* Header */}
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '40px 32px 0',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#003D7C',
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Wellbeing Grid
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af', margin: '4px 0 0', fontWeight: 400 }}>
            NUS department wellbeing at a glance
          </p>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: 'inline-flex',
            background: '#efefe9',
            borderRadius: 8,
            padding: 3,
            marginTop: 16,
            marginBottom: 28,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#fff' : 'transparent',
                border: 'none',
                borderRadius: 6,
                padding: '7px 16px',
                fontSize: 13,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? '#003D7C' : '#9ca3af',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 60px' }}>
        {activeTab === 'grid' && (
          <>
            <TileGridMap
              selectedDept={selectedDept}
              onHover={handleHover}
              onLeave={handleLeave}
              onClick={handleClick}
            />
            <Legend />
            <Tooltip dept={hoveredDept} mousePos={mousePos} />
            <DetailPanel dept={selectedDept} onClose={() => setSelectedDept(null)} />
          </>
        )}
        {activeTab === 'sources' && <DataOrchestrator />}
        {activeTab === 'flow' && <DataFlow />}
        {activeTab === 'insights' && <Insights />}
      </div>
    </div>
  );
}
