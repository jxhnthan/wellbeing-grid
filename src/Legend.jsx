import React from "react";

const items = [
  { label: "Faculty", color: "#003D7C" },
  { label: "School", color: "#1a5a9a" },
  { label: "Department", color: "#3574b0" },
  { label: "Research", color: "#6a9dc8" },
  { label: "Admin", color: "#9bbdd9" },
  { label: "Support", color: "#c4d8ea" },
];

export default function Legend() {
  return (
    <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 24 }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: item.color,
            }}
          />
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
