import React, { useState, useRef } from "react";
import { departments, letters } from "./stateData";
import StateTile from "./StateTile";
import Tooltip from "./Tooltip";

const COLS = 10;

export default function TileGridMap({ selected, compareA, compareB, onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [activeLetter, setActiveLetter] = useState(null);

  // Group departments by first letter
  const grouped = {};
  departments.forEach((d) => {
    const letter = d.name[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(d);
  });

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const scrollToLetter = (letter) => {
    setActiveLetter(letter);
    const el = document.getElementById("letter-" + letter);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div style={{ display: "flex", gap: 0, maxWidth: 900, margin: "0 auto" }}>
      {/* Alphabet index — left side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingTop: 8,
          paddingRight: 16,
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
        }}
      >
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => scrollToLetter(letter)}
            style={{
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: activeLetter === letter ? 700 : 500,
              color: activeLetter === letter ? "#003D7C" : "#9ca3af",
              background: activeLetter === letter ? "rgba(0, 61, 124, 0.06)" : "transparent",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
            onMouseEnter={(e) => {
              if (activeLetter !== letter) {
                e.currentTarget.style.color = "#003D7C";
                e.currentTarget.style.background = "rgba(0, 61, 124, 0.04)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeLetter !== letter) {
                e.currentTarget.style.color = "#9ca3af";
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Grid area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{ flex: 1, position: "relative" }}
      >
        {letters.map((letter) => {
          const depts = grouped[letter] || [];
          return (
            <div key={letter} id={"letter-" + letter} style={{ marginBottom: 20 }}>
              {/* Letter header */}
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#003D7C",
                  marginBottom: 8,
                  paddingBottom: 6,
                  borderBottom: "1px solid #e8e8e4",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                {letter}
              </div>

              {/* Tiles grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                  gap: 6,
                }}
              >
                {depts.map((dept) => (
                  <div
                    key={dept.abbr + dept.name}
                    onMouseEnter={() => setHovered(dept)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <StateTile
                      dept={dept}
                      isSelected={selected && selected.name === dept.name}
                      isCompareA={compareA && compareA.name === dept.name}
                      isCompareB={compareB && compareB.name === dept.name}
                      onClick={onSelect}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Tooltip */}
        {hovered && (
          <Tooltip dept={hovered} x={mouse.x} y={mouse.y} />
        )}
      </div>
    </div>
  );
}
