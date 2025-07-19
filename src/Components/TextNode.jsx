import React from "react";
import { Handle, Position } from "reactflow";

function TextNode({ data }) {
  return (
    <div style={{ padding: 10, background: "#e0f7f4", borderRadius: 8 }}>
      <strong>Send Message</strong>
      <div>{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default TextNode;
