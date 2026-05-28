import React, { useState } from "react";
import "./App.css";
import TileGridMap from "./TileGridMap";
import DetailPanel from "./DetailPanel";
import ComparePanel from "./ComparePanel";
import DataOrchestrator from "./DataOrchestrator";
import DataFlow from "./DataFlow";
import Insights from "./Insights";

const tabs = [
  { key: "grid", label: "Wellbeing Grid" },
  { key: "compare", label: "Compare" },
  { key: "sources", label: "Data Sources" },
  { key: "flow", label: "Data Flow" },
  { key: "insights", label: "Insights" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [compareA, setCompareA] = useState(null);
  const [compareB, setCompareB] = useState(null);
  const [compareMode, setCompareMode] = useState(false);

  const handleTileClick = (dept) => {
    if (activeTab === "compare" || compareMode) {
      if (!compareA) {
        setCompareA(dept);
      } else if (!compareB && dept.name !== compareA.name) {
        setCompareB(dept);
      } else {
        setCompareA(dept);
        setCompareB(null);
      }
    } else {
      setSelected(selected && selected.name === dept.name ? null : dept);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "compare") {
      setCompareMode(true);
    } else {
      setCompareMode(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f5" }}>
      {/* Header */}
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "40px 32px 0",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#003D7C",
            letterSpacing: "-0.03em",
          }}
        >
          Wellbeing Grid
        </div>
        <div
          style={{
            fontSize: 14,
            color: "#9ca3af",
            marginTop: 4,
            fontWeight: 400,
          }}
        >
          NUS Department Wellbeing Dashboard
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginTop: 24,
            marginBottom: 28,
            background: "#efefe9",
            borderRadius: 10,
            padding: 4,
            width: "fit-content",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              style={{
                padding: "8px 20px",
                fontSize: 13,
                fontWeight: activeTab === tab.key ? 600 : 500,
                color: activeTab === tab.key ? "#003D7C" : "#9ca3af",
                background: activeTab === tab.key ? "#ffffff" : "transparent",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                transition: "all 0.15s",
                boxShadow: activeTab === tab.key ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px 60px" }}>
        {activeTab === "grid" && (
          <>
            <TileGridMap
              selected={selected}
              compareA={null}
              compareB={null}
              onSelect={handleTileClick}
            />
            {selected && (
              <DetailPanel dept={selected} onClose={() => setSelected(null)} />
            )}
          </>
        )}

        {activeTab === "compare" && (
          <>
            <ComparePanel
              compareA={compareA}
              compareB={compareB}
              setCompareA={setCompareA}
              setCompareB={setCompareB}
            />
            <div style={{ marginTop: 32 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#9ca3af",
                  marginBottom: 12,
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                Or click tiles to select departments
              </div>
              <TileGridMap
                selected={null}
                compareA={compareA}
                compareB={compareB}
                onSelect={handleTileClick}
              />
            </div>
          </>
        )}

        {activeTab === "sources" && <DataOrchestrator />}
        {activeTab === "flow" && <DataFlow />}
        {activeTab === "insights" && <Insights />}
      </div>
    </div>
  );
}
