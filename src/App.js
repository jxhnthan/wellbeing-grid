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
  { id: 'grid', label: 'Wellbeing Grid' },
  { id: 'sources', label: 'Data Sources' },
  { id: 'flow', label: 'Data Flow' },
  { id: 'insights', label: 'Insights' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('grid');
  const [hoveredDept, setHoveredDept] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedDept, setSelectedDept] = useState(null);

  const handleHover = (dept, e) => {
    setHoveredDept(dept);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (hoveredDept) {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '48px 32px' }} onMouseMove={handleMouseMove}>
      {/* Header */}
      <div style={{ maxWidth: 820, margin: '0 auto 36px' }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#003D7C',
            letterSpacing: '-0.03em',
            marginBottom: 4,
          }}
        >
          Wellbeing Grid
        </h1>
        <p style={{ fontSize: 14, color: '#9ca3af', fontWeight: 400 }}>
          Live predictive wellbeing workflow across NUS departments
        </p>
      </div>

      {/* Tab bar */}
      <div
        style={{
          maxWidth: 820,
          margin: '0 auto 32px',
          display: 'flex',
          gap: 4,
          background: '#efefe9',
          padding: 4,
          borderRadius: 10,
          width: 'fit-content',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedDept(null);
              setHoveredDept(null);
            }}
            style={{
              padding: '8px 18px',
              borderRadius: 7,
              border: 'none',
              background: activeTab === tab.id ? '#ffffff' : 'transparent',
              color: activeTab === tab.id ? '#003D7C' : '#9ca3af',
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'grid' && (
        <div>
          <TileGridMap
            selectedDept={selectedDept}
            onHover={handleHover}
            onLeave={() => setHoveredDept(null)}
            onClick={(dept) => setSelectedDept(selectedDept?.abbr === dept.abbr ? null : dept)}
          />
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <Legend />
          </div>
          <Tooltip dept={hoveredDept} position={tooltipPos} />
          <DetailPanel dept={selectedDept} onClose={() => setSelectedDept(null)} />
        </div>
      )}

      {activeTab === 'sources' && <DataOrchestrator />}
      {activeTab === 'flow' && <DataFlow />}
      {activeTab === 'insights' && <Insights />}
    </div>
  );
}
