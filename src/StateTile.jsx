import React, { useState } from "react";

export default function StateTile({ abbr, color, onClick }) {
  const [hovered, setHovered] = useState(false);

  // Determine text color based on background brightness
  const isLight = [4, 5].includes(color.tier);
  const textColor = isLight ? "#1a4a38" : "#ffffff";

  return (
    <div
      onClick={() => onClick?.(abbr)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: color.hex,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 700,
        color: textColor,
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        boxShadow: hovered
          ? "0 4px 12px rgba(0, 0, 0, 0.25)"
          : "none",
        userSelect: "none",
      }}
    >
      {abbr}
    </div>
  );
}
