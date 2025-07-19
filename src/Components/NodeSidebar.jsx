import React from "react";

function NodeSidebar({ onAdd }) {
  return (
    <div style={{ width: 150, borderRight: "1px solid #ccc", padding: 10 }}>
      <button onClick={onAdd}>+ Message Node</button>
    </div>
  );
}

export default NodeSidebar;
