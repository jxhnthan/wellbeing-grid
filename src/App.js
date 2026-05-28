import React, { useState } from "react";
import TileGridMap from "./TileGridMap";
import Legend from "./Legend";
import Tooltip from "./Tooltip";
import DetailPanel from "./DetailPanel";
import DataOrchestrator from "./DataOrchestrator";
import DataFlow from "./DataFlow";
import PredictiveInsights from "./PredictiveInsights";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "sources", label: "Data Sources" },
  { id: "flow", label: "Data Flow" },
  { id: "insights", label: "Insights" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(null);

  const handleHover = (dept, e) => {
    setHovered(dept);
    setMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (hovered) setMouse({ x: e.clientX, y: e.clientY });
  };

  return (
    <div style={{ minHeight: "100vh", padding: "48px 32px" }} onMouseMove={handleMouseMove}>
      {/* Header */}
      <div style={{ maxWidth: 800, margin: "0 auto 32px" }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#003D7C" }}>Wellbeing Grid</div>
        <div style={{ fontSize: 14, color: "#9ca3af", marginTop: 4 }}>
          NUS live predictive wellbeing workflow
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "inline-flex",
            marginTop: 20,
            background: "#f3f4f6",
            borderRadius: 8,
            padding: 3,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelected(null);
                setHovered(null);
              }}
              style={{
                padding: "7px 18px",
                fontSize: 13,
                fontWeight: activeTab === tab.id ? 600 : 500,
                color: activeTab === tab.id ? "#003D7C" : "#6b7280",
                background: activeTab === tab.id ? "#fff" : "transparent",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.15s ease",
                boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "dashboard" && (
        <div>
          <TileGridMap
            selected={selected}
            onHover={handleHover}
            onLeave={() => setHovered(null)}
            onClick={(abbr) => setSelected(selected === abbr ? null : abbr)}
          />
          <Legend />
          <Tooltip dept={hovered} x={mouse.x} y={mouse.y} />
          <DetailPanel abbr={selected} onClose={() => setSelected(null)} />
        </div>
      )}

      {activeTab === "sources" && <DataOrchestrator />}
      {activeTab === "flow" && <DataFlow />}
      {activeTab === "insights" && <PredictiveInsights />}
    </div>
  );
}
