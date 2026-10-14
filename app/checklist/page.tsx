"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Check, CheckSquare2, CircleHelp, ClipboardCheck, FileText, Sparkles } from "lucide-react";
import { PageHeader, DeadlineCountdown, formatDate, formatMoney } from "@/components/ui";
import { useAppData } from "@/components/app-provider";

export default function ChecklistPage() {
  const { data, activeUser, toggleTask } = useAppData();
  const userChecklists = data.checklists.filter((checklist) => checklist.userId === activeUser?.id);
  const lists = userChecklists.map((checklist) => ({ checklist, scholarship: data.scholarships.find((item) => item.id === checklist.scholarshipId) })).filter((item) => item.scholarship).sort((a, b) => new Date(a.scholarship!.deadline).getTime() - new Date(b.scholarship!.deadline).getTime());
  const allTasks = userChecklists.flatMap((checklist) => checklist.tasks);
  const doneTotal = allTasks.filter((task) => task.done).length;
  return <>
    <PageHeader eyebrow="ONE STEP CLOSER" title="Application checklist" description="Every application has its own moving parts. Keep the next practical step close and mark it done as you go." action={<Link href="/matches" className="button button-outline button-small">Find another match <ArrowRight size={14}/></Link>}/>
    <div className="grid-3" style={{ marginBottom: 16 }}><div className="stat-card"><div className="stat-top"><span className="panel-label">Applications in progress</span><span className="stat-icon"><ClipboardCheck size={15}/></span></div><div className="stat-value">{lists.length}</div><div className="stat-foot">Started checklists</div></div><div className="stat-card"><div className="stat-top"><span className="panel-label">Steps complete</span><span className="stat-icon blue"><CheckSquare2 size={15}/></span></div><div className="stat-value">{doneTotal}<span style={{ fontSize: 14, color: "#596a61" }}>/{allTasks.length}</span></div><div className="stat-foot">Across your applications</div></div><div className="stat-card"><div className="stat-top"><span className="panel-label">Next deadline</span><span className="stat-icon amber"><CalendarDays size={15}/></span></div><div className="stat-value" style={{ fontSize: 21 }}>{lists[0]?.scholarship ? formatDate(lists[0].scholarship.deadline, true) : "—"}</div><div className="stat-foot">Make time for a final review</div></div></div>
    <div style={{ display: "grid", gap: 14 }}>{lists.map(({ checklist, scholarship }) => {
      if (!scholarship) return null;
      const complete = checklist.tasks.filter((task) => task.done).length;
      const percent = Math.round(complete / Math.max(checklist.tasks.length,1) * 100);
      return <section key={checklist.id} className="panel panel-pad"><div className="section-header" style={{ alignItems: "flex-start" }}><div style={{ display: "flex", alignItems: "flex-start", gap: 11 }}><span className="stat-icon" style={{ flex: "none" }}><Sparkles size={15}/></span><div><h2 className="scholarship-title" style={{ fontSize: 16 }}>{scholarship.title}</h2><div className="scholarship-sponsor">{scholarship.sponsor} · {formatMoney(scholarship.awardMin)}–{formatMoney(scholarship.awardMax)}</div></div></div><DeadlineCountdown date={scholarship.deadline}/></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0 6px" }}><span className="text-small" style={{ color: "#68796f" }}>Application progress</span><span className="text-small" style={{ color: "#34745a", fontWeight: 700 }}>{complete} of {checklist.tasks.length} complete · {percent}%</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }}/></div>
        <div style={{ marginTop: 8 }}>{checklist.tasks.map((task) => <div className="check-row" key={task.id}><button className="check-control" type="button" role="checkbox" aria-checked={task.done} aria-label={`${task.done ? "Mark incomplete" : "Mark complete"}: ${task.title}`} onClick={() => toggleTask(checklist.id, task.id)}>{task.done && <Check size={12}/>}</button><div style={{ flex: 1 }}><div className={`check-title ${task.done ? "check-completed" : ""}`}>{task.title}</div><div className="check-description">{task.description}</div></div>{task.dueDate && <span className="chip"><CalendarDays size={11}/>{formatDate(task.dueDate)}</span>}</div>)}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 13, borderTop: "1px solid #edf1ed", paddingTop: 12 }}><span className="section-caption">{scholarship.requirements.length} requirements · about {scholarship.effortHours} hours</span><Link href="/evidence" className="button-quiet" style={{ fontSize: 10 }}><FileText size={13}/> Check evidence <ArrowRight size={13}/></Link></div>
      </section>;
    })}</div>
    {lists.length === 0 && <section className="panel empty-state" style={{ marginTop: 14 }}><ClipboardCheck size={23}/><div className="empty-title">Start with one opportunity.</div><div className="empty-copy">Choose a scholarship and ScholarReady will make a requirement-by-requirement preparation list for you.</div><Link href="/matches" className="button button-small">Browse matches <ArrowRight size={14}/></Link></section>}
    <div className="alert-note" style={{ marginTop: 15 }}><CircleHelp size={15}/><span>These checklist tasks help you prepare; they do not submit an application. Use each scholarship provider’s official portal and instructions.</span></div>
  </>;
}
