"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, CircleAlert, Clock3, ExternalLink, SlidersHorizontal } from "lucide-react";
import { PageHeader, DeadlineCountdown, formatDate, formatMoney, daysRemaining } from "@/components/ui";
import { useAppData } from "@/components/app-provider";

export default function DeadlinesPage() {
  const { data } = useAppData();
  const [showClosed, setShowClosed] = useState(false);
  const items = useMemo(() => data.scholarships.map((scholarship) => ({ scholarship, days: daysRemaining(scholarship.deadline) })).filter((item) => showClosed || item.days >= 0).sort((a, b) => new Date(a.scholarship.deadline).getTime() - new Date(b.scholarship.deadline).getTime()), [data.scholarships, showClosed]);
  const urgent = items.filter((item) => item.days >= 0 && item.days <= 30).length;
  return <>
    <PageHeader eyebrow="TIME TO MAKE ROOM" title="Deadline calendar" description="A chronological view of application dates, so you can choose where to spend your next hour." action={<button type="button" className={`button ${showClosed ? "button-soft" : "button-outline"} button-small`} onClick={() => setShowClosed((value) => !value)}><SlidersHorizontal size={14}/>{showClosed ? "Hide closed" : "Include closed dates"}</button>}/>
    <div className="grid-3" style={{ marginBottom: 16 }}><div className="stat-card"><div className="stat-top"><span className="panel-label">Upcoming dates</span><span className="stat-icon"><CalendarDays size={15}/></span></div><div className="stat-value">{items.filter((item) => item.days >= 0).length}</div><div className="stat-foot">Sorted by application deadline</div></div><div className="stat-card"><div className="stat-top"><span className="panel-label">Coming up soon</span><span className="stat-icon amber"><CircleAlert size={15}/></span></div><div className="stat-value">{urgent}</div><div className="stat-foot">Due within the next 30 days</div></div><div className="stat-card"><div className="stat-top"><span className="panel-label">Earliest deadline</span><span className="stat-icon blue"><Clock3 size={15}/></span></div><div className="stat-value" style={{ fontSize: 21 }}>{items[0] ? formatDate(items[0].scholarship.deadline, true) : "—"}</div><div className="stat-foot">Plan backwards from this date</div></div></div>
    <section className="panel"><div className="panel-pad" style={{ paddingBottom: 7 }}><div className="section-header" style={{ marginBottom: 7 }}><div><h2 className="section-title">All application dates</h2><div className="section-caption">Use the provider’s official portal to confirm the current deadline and timezone.</div></div></div></div>
      {items.map(({ scholarship, days }) => <article className="deadline-item" key={scholarship.id} style={{ gridTemplateColumns: "58px minmax(170px,1fr) minmax(100px,auto) 105px" }}><div className="deadline-date"><strong>{new Date(`${scholarship.deadline}T12:00:00`).getDate()}</strong><span>{new Date(`${scholarship.deadline}T12:00:00`).toLocaleDateString("en-US", { month: "short" })}</span></div><div><div className="deadline-name">{scholarship.title}</div><div className="deadline-meta">{scholarship.sponsor} · {scholarship.category}</div></div><div><div className="amount" style={{ fontSize: 14 }}>{formatMoney(scholarship.awardMin)}–{formatMoney(scholarship.awardMax)}</div><div className="amount-caption">award range</div></div><div style={{ display: "flex", justifyContent: "flex-end" }}><DeadlineCountdown date={scholarship.deadline}/></div></article>)}
      {items.length === 0 && <div className="empty-state"><CalendarDays size={22}/><div className="empty-title">No dates to show in this view.</div><div className="empty-copy">Try including closed dates or explore more scholarships.</div><Link className="button button-small" href="/matches">See matches</Link></div>}
    </section>
    <div className="alert-note" style={{ marginTop: 14 }}><CircleAlert size={15}/><span>Deadlines shown are fictional demo dates. Confirm the official deadline, time zone, and submission method with each real provider.</span></div>
  </>;
}
