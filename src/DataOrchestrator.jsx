import React, { useState } from "react";

const sources = [
  {
    id: "engagement",
    name: "Employee Engagement Surveys",
    description: "Pulse surveys, annual engagement scores, eNPS",
    endpoint: "/api/v1/engagement",
    metrics: ["satisfaction", "engagement", "support"],
  },
  {
    id: "hr",
    name: "HR & Organisational Data",
    description: "Performance ratings, medical leave, salary bands, turnover",
    endpoint: "/api/v1/hr-data",
    metrics: ["performance", "leave", "salary", "turnover"],
  },
  {
    id: "operational",
    name: "Operational & Behavioural Data",
    description: "System usage, meeting load, after-hours activity",
    endpoint: "/api/v1/operational",
    metrics: ["workload", "burnout", "engagement"],
  },
];

export default function DataOrchestrator() {
  const [syncing, setSyncing] = useState({});

  const handleSync = (id) => {
    setSyncing((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setSyncing((prev) => ({ ...prev, [id]: false })), 2000);
  };

  const handleSyncAll = () => {
    sources.forEach((s, i) => {
      setTimeout(() => handleSync(s.id), i * 400);
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#003D7C" }}>Data Orchestrator</div>
          <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>
            Live data pipeline — pulling from {sources.length} institutional sources
          </div>
        </div>
        <button
          onClick={handleSyncAll}
          style={{
            background: "#EF7C00",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Sync all sources
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.2fr 100px 90px",
            padding: "10px 20px",
            borderBottom: "1px solid #e5e7eb",
            background: "#f9fafb",
          }}
        >
          {["Source", "Metrics", "Status", ""].map((h) => (
            <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {sources.map((source, idx) => (
          <div
            key={source.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 100px 90px",
              padding: "16px 20px",
              alignItems: "center",
              borderBottom: idx < sources.length - 1 ? "1px solid #f3f4f6" : "none",
            }}
          >
            {/* Source info */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{source.name}</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{source.description}</div>
              <div style={{ fontSize: 11, color: "#b0b0b0", marginTop: 4, fontFamily: "monospace" }}>
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
                    padding: "3px 8px",
                    borderRadius: 4,
                    background: "#f3f4f6",
                    color: "#6b7280",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: syncing[source.id] ? "#EF7C00" : "#22863a",
                  transition: "background 0.3s",
                }}
              />
              <span style={{ fontSize: 12, fontWeight: 500, color: syncing[source.id] ? "#EF7C00" : "#22863a" }}>
                {syncing[source.id] ? "Syncing" : "Connected"}
              </span>
            </div>

            {/* Sync button */}
            <button
              onClick={() => handleSync(source.id)}
              disabled={syncing[source.id]}
              style={{
                background: "none",
                border: "1px solid #EF7C00",
                color: "#EF7C00",
                borderRadius: 6,
                padding: "5px 14px",
                fontSize: 12,
                fontWeight: 600,
                cursor: syncing[source.id] ? "default" : "pointer",
                opacity: syncing[source.id] ? 0.5 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {syncing[source.id] ? "Syncing..." : "Sync now"}
            </button>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 16,
          padding: "12px 20px",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
        }}
      >
        {[
          { label: "Total records", value: "12,847" },
          { label: "Active sources", value: "3 / 3" },
          { label: "Metrics tracked", value: "10" },
          { label: "Last full sync", value: "2 min ago" },
        ].map((stat) => (
          <div key={stat.label} style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>{stat.label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#003D7C" }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
