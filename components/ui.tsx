import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, CircleHelp, XCircle } from "lucide-react";
import type { EligibilityStatus } from "@/types";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h1 className="page-title">{title}</h1>{description && <p className="page-subtitle">{description}</p>}</div>{action && <div className="heading-actions">{action}</div>}</div>;
}

export function EligibilityBadge({ status }: { status: EligibilityStatus }) {
  const content = status === "qualified" ? { label: "Qualified", className: "status-qualified", Icon: CheckCircle2 } : status === "needs-info" ? { label: "Needs info", className: "status-needs", Icon: CircleHelp } : { label: "Not eligible", className: "status-not", Icon: XCircle };
  const { label, className, Icon } = content;
  return <span className={`status-pill ${className}`}><Icon size={12}/>{label}</span>;
}

export function EvidenceBadge({ status }: { status: "ready" | "in-progress" | "needs-renewal" }) {
  const content = status === "ready" ? { label: "Ready", className: "status-qualified", Icon: CheckCircle2 } : status === "in-progress" ? { label: "In progress", className: "status-needs", Icon: CircleHelp } : { label: "Refresh needed", className: "status-not", Icon: AlertCircle };
  const { label, className, Icon } = content;
  return <span className={`status-pill ${className}`}><Icon size={12}/>{label}</span>;
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function formatDate(value: string, includeYear = false) {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", ...(includeYear ? { year: "numeric" } : {}) }).format(date);
}

export function daysRemaining(value: string) {
  const target = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function DeadlineCountdown({ date }: { date: string }) {
  const days = daysRemaining(date);
  const label = days < 0 ? "Closed" : days === 0 ? "Due today" : `${days} days left`;
  const className = days < 0 ? "status-neutral" : days <= 14 ? "status-needs" : "status-neutral";
  return <span className={`status-pill ${className}`}>{days >= 0 && <span className="status-dot"/>}{label}</span>;
}
