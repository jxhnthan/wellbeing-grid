import React from "react";

export default function StateTile({ dept, isSelected, isCompareA, isCompareB, onClick }) {
  const borderColor = isCompareA
    ? "#003D7C"
    : isCompareB
    ? "#EF7C00"
    : isSelected
    ? "#003D7C"
    : "transparent";

  const bg = isCompareA
    ? "#003D7C"
    : isCompareB
    ? "#EF7C00"
    : isSelected
    ? "#003D7C"
    : "#ffffff";

  const color = isCompareA || isCompareB || isSelected ? "#ffffff" : "#1a1a1a";

  return (
    <div
      onClick={() => onClick(dept)}
      style={{
        width: "100%",
        aspectRatio: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        border: `1.5px solid ${borderColor === "transparent" ? "#e2e2de" : borderColor}`,
        borderRadius: 10,
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !isCompareA && !isCompareB) {
          e.currentTarget.style.borderColor = "#003D7C";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 61, 124, 0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !isCompareA && !isCompareB) {
          e.currentTarget.style.borderColor = "#e2e2de";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 650,
          color: color,
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          textAlign: "center",
          padding: "0 4px",
        }}
      >
        {dept.abbr}
      </div>
      {isCompareA && (
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", marginTop: 2, fontWeight: 500 }}>A</div>
      )}
      {isCompareB && (
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", marginTop: 2, fontWeight: 500 }}>B</div>
      )}
    </div>
  );
}
