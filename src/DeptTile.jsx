import React from "react";

const categoryColors = {
  faculty:    "#003D7C",
  school:     "#1a5a9a",
  department: "#3574b0",
  research:   "#6a9dc8",
  admin:      "#9bbdd9",
  support:    "#c4d8ea",
};

export default function DeptTile({ dept, isSelected, onHover, onLeave, onClick }) {
  const bg = categoryColors[dept.category] || "#9bbdd9";
  const isLight = ["admin", "support", "research"].includes(dept.category);
  const textColor = isLight ? "#003D7C" : "#ffffff";

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        gridRow: dept.row + 1,
        gridColumn: dept.col + 1,
        backgroundColor: bg,
        color: textColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        border: isSelected ? "2px solid #EF7C00" : "2px solid transparent",
        aspectRatio: "1",
        userSelect: "none",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {dept.abbr}
    </div>
  );
}
