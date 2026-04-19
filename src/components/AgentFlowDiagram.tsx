import { Bot, FileSearch, Languages, ShieldCheck, BarChart3, AlertTriangle, Search, Brain, Wrench, FileText, Activity, Workflow, Database, Monitor, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface DiagramNode {
  label: string
  icon: LucideIcon
}

const diagrams: Record<string, DiagramNode[]> = {
  agent_pipeline: [
    { label: 'WatchDog Service', icon: Activity },
    { label: 'Graph Execution', icon: Workflow },
    { label: 'Checkpointer DB', icon: Database },
    { label: 'Streamlit UI', icon: Monitor },
    { label: 'Agentic RAG', icon: Brain },
    { label: 'MCP Server', icon: Server },
  ],
  multi_agent: [
    { label: 'Alert Ingestion', icon: AlertTriangle },
    { label: 'Context Aggregation', icon: Search },
    { label: 'Root Cause Analysis', icon: Brain },
    { label: 'Auto Remediation', icon: Wrench },
    { label: 'Postmortem Gen', icon: FileText },
  ],
}

interface AgentFlowDiagramProps {
  type: string
  compact?: boolean
}

export default function AgentFlowDiagram({ type, compact = false }: AgentFlowDiagramProps) {
  const nodes = diagrams[type]
  if (!nodes) return null

  const nodeSize = compact ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-20 h-20 sm:w-24 sm:h-24'
  const iconSize = compact ? 18 : 22
  const textSize = compact ? 'text-[8px] sm:text-[9px]' : 'text-[9px] sm:text-[10px]'

  return (
    <div className="w-full overflow-x-auto py-4" id={`diagram-${type}`}>
      <div className="flex items-center justify-center gap-0 min-w-[500px] px-4">
        {nodes.map((node, idx) => {
          const Icon = node.icon
          return (
            <div key={node.label} className="flex items-center">
              {/* Node */}
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className={`${nodeSize} rounded-xl border border-primary/30 bg-card/80 backdrop-blur-sm flex items-center justify-center relative
                    group-hover:border-primary/60 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-500`}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  {/* Glow dot */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary/60 animate-glow-pulse" />
                  <Icon size={iconSize} className="text-primary" />
                </div>
                <span className={`${textSize} font-mono text-muted-foreground text-center max-w-[80px] leading-tight group-hover:text-primary transition-colors`}>
                  {node.label}
                </span>
              </div>

              {/* Connector arrow */}
              {idx < nodes.length - 1 && (
                <div className="flex items-center mx-1 sm:mx-2 -mt-6">
                  <div className="w-6 sm:w-10 h-px border-t border-dashed border-primary/40 agent-flow-connector" />
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-primary/50" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
