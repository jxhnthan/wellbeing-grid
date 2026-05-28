import React from "react";
import { departments } from "./departmentData";
import DeptTile from "./DeptTile";

export default function TileGridMap({ selected, onHover, onLeave, onClick }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(9, 1fr)",
        gridTemplateRows: "repeat(7, 1fr)",
        gap: 5,
        maxWidth: 640,
        margin: "0 auto",
      }}
    >
      {departments.map((dept) => (
        <DeptTile
          key={dept.abbr}
          dept={dept}
          isSelected={selected === dept.abbr}
          onHover={(e) => onHover(dept, e)}
          onLeave={onLeave}
          onClick={() => onClick(dept.abbr)}
        />
      ))}
    </div>
  );
}
