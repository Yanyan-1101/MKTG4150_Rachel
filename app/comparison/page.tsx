"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, CircleHelp, FileCheck2, Scale, X } from "lucide-react";
import { PageHeader, EligibilityBadge, formatDate, formatMoney, DeadlineCountdown } from "@/components/ui";
import { useAppData } from "@/components/app-provider";
import { matchScholarship } from "@/lib/eligibility";

export default function ComparisonPage() {
  const { data, activeUser, profile, toggleComparison } = useAppData();
  const scholarships = useMemo(() => data.comparisonIds.map((id) => data.scholarships.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)).slice(0, 4), [data.comparisonIds, data.scholarships]);
  const rows = [
    { label: "Eligibility", icon: CircleHelp, render: (s: (typeof scholarships)[number]) => <EligibilityBadge status={profile ? matchScholarship(s, profile).status : "needs-info"}/> },
    { label: "Award range", icon: Scale, render: (s: (typeof scholarships)[number]) => <span className="amount">{formatMoney(s.awardMin)}–{formatMoney(s.awardMax)}</span> },
    { label: "Deadline", icon: CalendarDays, render: (s: (typeof scholarships)[number]) => <span style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-start" }}><span>{formatDate(s.deadline, true)}</span><DeadlineCountdown date={s.deadline}/></span> },
    { label: "Field of study", icon: Scale, render: (s: (typeof scholarships)[number]) => <div className="tag-row">{s.fieldOfStudy.map((field) => <span className="chip" key={field}>{field}</span>)}</div> },
    { label: "Eligibility rules", icon: CircleHelp, render: (s: (typeof scholarships)[number]) => <div style={{ display: "grid", gap: 6 }}>{profile ? matchScholarship(s, profile).results.map((result) => <span className="text-small" style={{ color: result.status === "pass" ? "#367255" : result.status === "missing" ? "#9b611f" : "#934346" }} key={result.rule.id}>{result.status === "pass" ? "✓" : result.status === "missing" ? "?" : "×"} {result.rule.label}</span>) : s.eligibilityRules.map((rule) => <span className="text-small text-muted" key={rule.id}>{rule.label}</span>)}</div> },
    { label: "Application requirements", icon: FileCheck2, render: (s: (typeof scholarships)[number]) => <div style={{ display: "grid", gap: 6 }}>{s.requirements.map((item) => { const evidence = data.evidence.find((record) => record.userId === activeUser?.id && record.requirementIds.includes(item.id)); return <span className="text-small" style={{ color: evidence?.status === "ready" ? "#367255" : "#596a61" }} key={item.id}>{evidence?.status === "ready" ? "✓" : "○"} {item.title}</span>; })}</div> },
    { label: "Time to prepare", icon: CalendarDays, render: (s: (typeof scholarships)[number]) => <span>{s.effortHours} hours <span className="text-muted">· {s.renewal}</span></span> },
  ];
  return <>
    <PageHeader eyebrow="MAKE AN INFORMED CHOICE" title="Compare opportunities" description="See award size, eligibility, requirements, and deadlines together before deciding where to focus." action={<Link href="/matches" className="button button-outline button-small"><ArrowLeft size={14}/> Find matches</Link>}/>
    {scholarships.length < 2 && <div className="alert-note" style={{ marginBottom: 14 }}><CircleHelp size={15}/><span>Add at least two scholarships from your <Link href="/matches" style={{ fontWeight: 700, textDecoration: "underline" }}>match list</Link> to compare opportunities side by side.</span></div>}
    {scholarships.length > 0 ? <div className="table-wrap"><table className="data-table" style={{ minWidth: 690 }}><thead><tr><th style={{ minWidth: 168 }}>Compare by</th>{scholarships.map((s) => <th key={s.id} style={{ minWidth: 220, verticalAlign: "top" }}><div className="scholarship-title" style={{ fontSize: 14, textTransform: "none", letterSpacing: 0 }}>{s.title}</div><div className="scholarship-sponsor" style={{ textTransform: "none", letterSpacing: 0 }}>{s.sponsor}</div><button type="button" className="button-quiet" style={{ paddingLeft: 0, fontSize: 9, marginTop: 4, color: "#9a5555" }} onClick={() => toggleComparison(s.id)}><X size={12}/> Remove</button></th>)}</tr></thead><tbody>{rows.map((row) => { const Icon = row.icon; return <tr key={row.label}><td className="table-primary"><span style={{ display: "flex", alignItems: "center", gap: 7 }}><Icon size={13} color="#718f79"/>{row.label}</span></td>{scholarships.map((s) => <td key={s.id}>{row.render(s)}</td>)}</tr>})}<tr><td className="table-primary">Quick action</td>{scholarships.map((s) => <td key={s.id}><Link href="/checklist" className="button button-outline button-small">Open checklist <ArrowUpRight size={12}/></Link></td>)}</tr></tbody></table></div> : <section className="panel empty-state"><Scale size={23}/><div className="empty-title">Your comparison is ready when you are.</div><div className="empty-copy">Choose a few options from your matches to see the details together.</div><Link href="/matches" className="button button-small">Browse scholarships</Link></section>}
    <p className="section-caption" style={{ marginTop: 12 }}>Eligibility and awards are illustrative only. Confirm each opportunity’s current terms with its official provider.</p>
  </>;
}
