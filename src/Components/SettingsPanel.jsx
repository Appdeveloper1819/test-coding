import React from "react";

function SettingsPanel({ node, onChange }) {
  return (
    <div>
      <h4>Message</h4>
      <textarea
        value={node.data.label}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default SettingsPanel;
