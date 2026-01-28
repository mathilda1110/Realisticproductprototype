import { useState } from 'react';
import { MessageSquare, GitBranch, Zap, Target, MoreVertical, Plus } from 'lucide-react';

interface WorkflowBuilderPrototypeProps {
  showIndicators: boolean;
  onElementClick: (element: 'condition' | 'llm' | 'extraction' | 'connection' | null) => void;
}

interface NodeData {
  id: string;
  type: 'condition' | 'llm' | 'extraction' | 'assignment';
  title: string;
  icon: any;
  color: string;
  position: { x: number; y: number };
  details?: string[];
}

export function WorkflowBuilderPrototype({ showIndicators, onElementClick }: WorkflowBuilderPrototypeProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes: NodeData[] = [
    {
      id: 'start',
      type: 'condition',
      title: 'IS FIRST MESSAGE?',
      icon: GitBranch,
      color: 'cyan',
      position: { x: 40, y: 120 },
      details: ['is_first_m... = 1']
    },
    {
      id: 'extract',
      type: 'extraction',
      title: 'EXTRACT PATIENT INFO',
      icon: Target,
      color: 'blue',
      position: { x: 200, y: 80 },
      details: ['gpt-4o', 'CHAT']
    },
    {
      id: 'assign',
      type: 'assignment',
      title: 'ASSIGN GENDER',
      icon: Zap,
      color: 'cyan',
      position: { x: 400, y: 40 },
      details: ['gender', 'symptom', 'age']
    },
    {
      id: 'question',
      type: 'llm',
      title: 'FURTHER QUESTION SOLVING',
      icon: MessageSquare,
      color: 'violet',
      position: { x: 200, y: 200 },
      details: ['gpt-4o', 'CHAT']
    },
    {
      id: 'reply',
      type: 'llm',
      title: 'REPLY',
      icon: MessageSquare,
      color: 'orange',
      position: { x: 400, y: 200 },
      details: ['Further ...', 'sympt...']
    }
  ];

  const connections = [
    { from: 'start', to: 'extract', label: 'IF' },
    { from: 'start', to: 'question', label: 'ELSE' },
    { from: 'extract', to: 'assign' },
    { from: 'question', to: 'reply' }
  ];

  const handleNodeClick = (node: NodeData) => {
    setSelectedNode(node.id);
    if (node.type === 'condition') {
      onElementClick('condition');
    } else if (node.type === 'llm') {
      onElementClick('llm');
    } else if (node.type === 'extraction') {
      onElementClick('extraction');
    }
  };

  const getNodeColor = (color: string) => {
    const colors: Record<string, { bg: string; border: string; indicator: string }> = {
      cyan: { bg: 'bg-cyan-50', border: 'border-cyan-400', indicator: 'bg-cyan-400' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-400', indicator: 'bg-blue-400' },
      violet: { bg: 'bg-violet-50', border: 'border-violet-400', indicator: 'bg-violet-400' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-400', indicator: 'bg-orange-400' }
    };
    return colors[color];
  };

  return (
    <div className="h-[667px] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 relative">
      {/* Status Bar */}
      <div className="h-11 bg-white flex items-center justify-between px-6 text-xs pt-2 border-b border-slate-200">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 border border-black rounded-sm relative">
            <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-black rounded-r" />
            <div className="absolute inset-0.5 bg-black rounded-sm" />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-900">Patient Triage Flow</h2>
        </div>
        <button className="w-7 h-7 rounded bg-violet-500 hover:bg-violet-600 flex items-center justify-center text-white transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas */}
      <div className="relative h-[calc(100%-7rem)] bg-slate-50 overflow-auto">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}>
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {connections.map((conn, idx) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const startX = fromNode.position.x + 70;
              const startY = fromNode.position.y + 35;
              const endX = toNode.position.x;
              const endY = toNode.position.y + 35;
              const midX = (startX + endX) / 2;

              return (
                <g key={idx}>
                  <path
                    d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    fill="none"
                    className="hover:stroke-violet-500 transition-colors cursor-pointer"
                    onClick={() => onElementClick('connection')}
                  />
                  <circle cx={endX} cy={endY} r="4" fill="#94a3b8" />
                  {conn.label && (
                    <text
                      x={midX}
                      y={(startY + endY) / 2 - 5}
                      fill="#64748b"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {conn.label}
                    </text>
                  )}
                  {showIndicators && (
                    <circle 
                      cx={midX} 
                      cy={(startY + endY) / 2 + 8} 
                      r="3" 
                      fill="#a855f7" 
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const colors = getNodeColor(node.color);
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;

            return (
              <div
                key={node.id}
                className={`absolute transition-all duration-200 cursor-pointer ${
                  isSelected ? 'ring-2 ring-violet-500 ring-offset-2' : ''
                }`}
                style={{
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                  zIndex: isHovered ? 10 : 2
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node)}
              >
                <div className={`relative bg-white rounded-lg border-2 ${colors.border} shadow-lg hover:shadow-xl transition-shadow min-w-[140px] p-3`}>
                  {/* Indicator */}
                  {showIndicators && ['condition', 'llm', 'extraction'].includes(node.type) && (
                    <div className="absolute -top-1.5 -right-1.5 z-20">
                      <div className={`w-3 h-3 rounded-full ${colors.indicator} ring-2 ring-white animate-pulse`} />
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start gap-2 mb-2">
                    <div className={`w-7 h-7 rounded ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <node.icon className={`w-4 h-4 text-${node.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[10px] font-bold text-slate-900 leading-tight uppercase">
                        {node.title}
                      </h3>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 flex-shrink-0">
                      <MoreVertical className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Details */}
                  {node.details && (
                    <div className="space-y-1">
                      {node.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                          <div className={`w-3 h-3 rounded ${colors.bg} flex items-center justify-center`}>
                            <div className="w-1 h-1 rounded-full bg-slate-400" />
                          </div>
                          <span className="truncate">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Connection points */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-300 rounded-full" />
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-300 rounded-full" />
                </div>
              </div>
            );
          })}

          {/* Add node hint */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg border-2 border-dashed border-slate-300 p-4 text-center hover:border-violet-400 hover:bg-violet-50 transition-colors cursor-pointer">
            <Plus className="w-6 h-6 text-slate-400 mx-auto mb-1" />
            <p className="text-xs text-slate-500">Click to add</p>
            <p className="text-xs text-slate-500">Drag to connect</p>
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">5 nodes • 4 connections</span>
          <div className="flex items-center gap-4">
            <button className="text-violet-600 hover:text-violet-700 font-medium">Run Test</button>
            <button className="text-slate-600 hover:text-slate-700">Save Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
}
