import React, { useState } from "react";

const sources = [
  {
    name: "Employee Engagement Surveys",
    desc: "Pulse surveys, annual engagement scores, eNPS",
    endpoint: "/api/v1/engagement",
    metrics: ["satisfaction", "engagement", "support"],
  },
  {
    name: "HR & Organisational Data",
    desc: "Performance ratings, medical leave, salary bands, rank, turnover",
    endpoint: "/api/v1/hr-data",
    metrics: ["performance", "leave", "salary", "turnover"],
  },
  {
    name: "Operational & Behavioural Data",
    desc: "System usage, meeting load, after-hours activity",
    endpoint: "/api/v1/operational",
    metrics: ["workload", "burnout", "engagement"],
  },
];

export default function DataOrchestrator() {
  const [syncing, setSyncing] = useState({});

  const handleSync = (idx) => {
    setSyncing((prev) => ({ ...prev, [idx]: true }));
    setTimeout(() => {
      setSyncing((prev) => ({ ...prev, [idx]: false }));
    }, 2000);
  };

  const handleSyncAll = () => {
    sources.forEach((_, idx) => {
      setTimeout(() => handleSync(idx), idx * 400);
    });
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#003D7C", letterSpacing: "-0.02em" }}>
            Data Orchestrator
          </div>
          <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>
            Live data pipeline — pulling from {sources.length} institutional sources
          </div>
        </div>
        <button
          onClick={handleSyncAll}
          style={{
            padding: "8px 18px",
            fontSize: 12,
            fontWeight: 600,
            color: "#EF7C00",
            background: "transparent",
            border: "1.5px solid #EF7C00",
            borderRadius: 8,
            cursor: "pointer",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#EF7C00";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#EF7C00";
          }}
        >
          Sync all sources
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e2de",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 240px 100px 100px",
            padding: "12px 24px",
            borderBottom: "1px solid #f3f4f6",
            fontSize: 10,
            fontWeight: 600,
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          <div>Source</div>
          <div>Metrics</div>
          <div style={{ textAlign: "center" }}>Status</div>
          <div style={{ textAlign: "right" }}></div>
        </div>

        {/* Table rows */}
        {sources.map((source, idx) => {
          const isSyncing = syncing[idx];
          return (
            <div
              key={source.name}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 240px 100px 100px",
                padding: "18px 24px",
                alignItems: "center",
                borderBottom: idx < sources.length - 1 ? "1px solid #f7f7f5" : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fafaf8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Source info */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", marginBottom: 2 }}>
                  {source.name}
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{source.desc}</div>
                <div style={{ fontSize: 10, color: "#b0b0b0", marginTop: 4, fontFamily: "monospace" }}>
                  {source.endpoint}
                </div>
              </div>

              {/* Metrics pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {source.metrics.map((m) => (
                  <span
                    key={m}
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#6b7280",
                      background: "#f3f4f6",
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Status */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: isSyncing ? "#EF7C00" : "#22863a",
                    transition: "background 0.3s",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: isSyncing ? "#EF7C00" : "#22863a",
                    transition: "color 0.3s",
                  }}
                >
                  {isSyncing ? "Syncing" : "Connected"}
                </span>
              </div>

              {/* Sync button */}
              <div style={{ textAlign: "right" }}>
                <button
                  onClick={() => handleSync(idx)}
                  disabled={isSyncing}
                  style={{
                    padding: "6px 14px",
                    fontSize: 11,
                    fontWeight: 600,
                    color: isSyncing ? "#9ca3af" : "#EF7C00",
                    background: "transparent",
                    border: isSyncing ? "1px solid #e2e2de" : "1px solid #EF7C00",
                    borderRadius: 6,
                    cursor: isSyncing ? "default" : "pointer",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    transition: "all 0.15s",
                    opacity: isSyncing ? 0.5 : 1,
                  }}
                >
                  {isSyncing ? "Syncing..." : "Sync now"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 16,
          padding: "14px 0",
        }}
      >
        {[
          { label: "Total records", value: "24,847" },
          { label: "Active sources", value: "3 / 3" },
          { label: "Metrics tracked", value: "10" },
          { label: "Last full sync", value: "2 min ago" },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 500, marginBottom: 2 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 13, fontWeight: 650, color: "#1a1a1a" }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
