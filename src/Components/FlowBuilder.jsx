import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import { nanoid } from "nanoid";
import TextNode from "./TextNode";
import NodeSidebar from "./NodeSidebar";
import SettingsPanel from "./SettingsPanel";
import "reactflow/dist/style.css";

const nodeTypes = { textNode: TextNode };

function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => {
      const existingEdge = edges.find(
        (e) => e.source === params.source && e.sourceHandle === params.sourceHandle
      );
      if (existingEdge) return;
      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  const onNodeClick = (_, node) => setSelectedNode(node);

  const addTextNode = () => {
    const newNode = {
      id: nanoid(),
      type: "textNode",
      position: { x: 250, y: 100 + nodes.length * 100 },
      data: { label: "New message", onChange: handleNodeChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleNodeChange = (id, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: value } } : node
      )
    );
  };

  const handleSave = () => {
    const error = nodes.length > 1 && nodes.some((n) =>
      !edges.find((e) => e.source === n.id)
    );
    if (error) {
      alert("Each node must be connected to at least one other node.");
    } else {
      alert("Flow saved!");
    }
  };

  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100%" }}>
        <NodeSidebar onAdd={addTextNode} />
        <div style={{ flex: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <div style={{ width: 300,height:700, borderLeft: "1px solid #ddd", padding: 10 }}>
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onChange={(val) => handleNodeChange(selectedNode.id, val)}
            />
          ) : (
            <div>Select a node to edit</div>
          )}
          <button onClick={handleSave} style={{ marginTop: 20 }}>
            Save Changes
          </button>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default FlowBuilder;
