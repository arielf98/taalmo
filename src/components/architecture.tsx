"use client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  Position,
  type Node,
  type Edge,
} from "@xyflow/react";
import {
  CreditCard,
  Server,
  Database,
  BookOpen,
  Send,
  MousePointer2,
} from "lucide-react";
import type { PaymentState } from "@/lib/simulation/payment";
const definitions = [
  {
    id: "gateway",
    title: "Payment Gateway",
    subtitle: "Two callbacks · same payment",
    x: 0,
    y: 140,
    Icon: CreditCard,
  },
  {
    id: "api",
    title: "Backend API",
    subtitle: "POST /payments/callback",
    x: 255,
    y: 140,
    Icon: Server,
  },
  {
    id: "database",
    title: "PostgreSQL",
    subtitle: "Simulated database",
    x: 510,
    y: 140,
    Icon: Database,
  },
  {
    id: "ledger",
    title: "Ledger",
    subtitle: "Business effects",
    x: 765,
    y: 35,
    Icon: BookOpen,
  },
  {
    id: "outbox",
    title: "Transactional Outbox",
    subtitle: "Events to publish",
    x: 765,
    y: 245,
    Icon: Send,
  },
];
export const nodeDescriptions: Record<string, string> = {
  gateway:
    "Sends callback A and callback B for the same payment, pay_1042. Real gateways may retry after a timeout, even if the first callback already succeeded.",
  api: "Handles both callbacks concurrently. A processed flag alone leaves a gap between checking the payment and writing the ledger.",
  database:
    "A simplified database model. In protected mode, a unique key reserves the payment within a transaction. Conflicting inserts wait until commit or rollback.",
  ledger:
    "Records the financial effect of a payment. There should be exactly one committed entry for pay_1042, even if its callback arrives more than once.",
  outbox:
    "Stores the event alongside the ledger in the same transaction. A separate publisher would send it later with retries. Consumers must handle repeated deliveries.",
};
export function Architecture({
  state,
  active,
  selected,
  onSelect,
  compact = false,
}: {
  state: PaymentState;
  active?: string;
  selected?: string;
  onSelect?: (id: string) => void;
  compact?: boolean;
}) {
  const nodes: Node[] = definitions.map((n) => ({
    id: n.id,
    position: { x: n.x, y: n.y },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    draggable: false,
    selectable: !!onSelect,
    ariaLabel: `Inspect ${n.title}`,
    className: `system-node ${active === n.id ? "node-active" : ""} ${selected === n.id ? "node-selected" : ""}`,
    data: {
      label: (
        <div className="node-content">
          <div className={`node-icon node-icon-${n.id}`}>
            <n.Icon size={23} />
          </div>
          <strong>{n.title}</strong>
          <span>{n.subtitle}</span>
          {n.id === "ledger" && (
            <small>
              {state.ledger.length} committed{" "}
              {state.ledger.length === 1 ? "entry" : "entries"}
            </small>
          )}
          {n.id === "outbox" && (
            <small>
              {state.outbox.length} committed{" "}
              {state.outbox.length === 1 ? "event" : "events"}
            </small>
          )}
          {n.id === "database" && (
            <small>
              {state.lockOwner
                ? `Lock held by callback ${state.lockOwner}`
                : state.processed
                  ? "Payment processed"
                  : "Awaiting payment"}
            </small>
          )}
          {n.id === "api" && (
            <small>
              A: {state.callbacks.A.status} · B: {state.callbacks.B.status}
            </small>
          )}
          {n.id === "gateway" && <small>payment_id: pay_1042</small>}
        </div>
      ),
    },
  }));
  const pairs = [
    ["gateway", "api"],
    ["api", "database"],
    ["database", "ledger"],
    ["database", "outbox"],
  ];
  const edges: Edge[] = pairs.map(([source, target]) => ({
    id: `${source}-${target}`,
    source,
    target,
    type: "smoothstep",
    animated: active === target,
    style: {
      stroke: active === target ? "#5bc4a8" : "#637a7b",
      strokeWidth: 1.5,
    },
    label:
      source === "gateway"
        ? "A + B"
        : target === "database"
          ? "transaction"
          : undefined,
    labelStyle: { fill: "#a5b9b8", fontSize: 11 },
    labelBgStyle: { fill: "#172d35" },
  }));
  return (
    <div
      className={`architecture ${compact ? "architecture-compact" : ""}`}
      role="region"
      aria-label="Interactive payment system architecture"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        minZoom={0.3}
        maxZoom={1.4}
        panOnScroll
        zoomOnScroll={false}
        nodesConnectable={false}
        elementsSelectable={!!onSelect}
        onNodeClick={(_, node) => onSelect?.(node.id)}
        proOptions={{ hideAttribution: false }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#385359"
          gap={19}
          size={1}
        />
        {!compact && <Controls showInteractive={false} />}
      </ReactFlow>
      <div className="diagram-caption">
        <span className="status-dot" />
        SIMULATED ENVIRONMENT
        {!compact && (
          <span>
            <MousePointer2 size={11} /> Select a node to inspect
          </span>
        )}
      </div>
    </div>
  );
}
