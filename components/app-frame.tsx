"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpenCheck, CalendarDays, CheckSquare2, CircleHelp, Command, FileCheck2, FolderKanban, Gauge, GraduationCap, LogOut, Menu, Scale, Search, Settings2, ShieldCheck, Sparkles, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useAppData } from "@/components/app-provider";

const items = [
  { label: "Overview", href: "/dashboard", icon: Gauge },
  { label: "Find scholarships", href: "/matches", icon: Search, badge: "10" },
  { label: "My profile", href: "/profile", icon: UserRound },
  { label: "Compare", href: "/comparison", icon: Scale },
  { label: "My evidence", href: "/evidence", icon: FolderKanban },
  { label: "Applications", href: "/checklist", icon: CheckSquare2 },
  { label: "Deadlines", href: "/deadlines", icon: CalendarDays },
];
const titles: Record<string, string> = {
  "/dashboard": "Your workspace", "/matches": "Scholarship matches", "/profile": "Student profile", "/comparison": "Compare opportunities", "/evidence": "Evidence library", "/checklist": "Application checklist", "/deadlines": "Deadline calendar", "/pricing": "Plans for your next step",
};
const publicRoutes = new Set(["/", "/login", "/signup", "/pricing"]);

function Wordmark({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`wordmark ${light ? "wordmark-light" : ""}`} aria-label="ScholarReady home"><span className="brand-mark"><BookOpenCheck size={19} strokeWidth={2.1} /></span><span>scholar<span className="wordmark-accent">ready</span></span></Link>;
}

function PublicNav() {
  return <header className="public-header"><div className="public-header-inner"><Wordmark /><nav className="public-links" aria-label="Main navigation"><a href="/#how-it-works">How it works</a><Link href="/matches">Explore</Link><Link href="/pricing">Pricing</Link></nav><div className="public-actions"><Link href="/login" className="button-quiet">Log in</Link><Link href="/signup" className="button button-small">Build my plan <ArrowUpRight size={15}/></Link></div></div></header>;
}

function Sidebar({ close }: { close?: () => void }) {
  const pathname = usePathname();
  const { activeUser, signOut, storageWarning } = useAppData();
  return <aside className="sidebar"><div className="sidebar-brand"><Wordmark /><button className="mobile-close" onClick={close} aria-label="Close menu"><X size={19}/></button></div>
    <div className="workspace-tag"><span className="workspace-dot"/> STUDENT WORKSPACE</div>
    <nav className="side-nav" aria-label="Workspace navigation">
      <div className="nav-caption">YOUR WORKSPACE</div>
      {items.map(({ label, href, icon: Icon, badge }) => {
        const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
        return <Link key={href} href={href} onClick={close} className={`nav-item ${active ? "nav-item-active" : ""}`} aria-current={active ? "page" : undefined}><Icon size={18} strokeWidth={active ? 2.2 : 1.8}/><span>{label}</span>{badge && <span className="nav-badge">{badge}</span>}</Link>;
      })}
      <div className="nav-caption nav-caption-spaced">TOOLS & ACCOUNT</div>
      <Link href="/pricing" className={`nav-item ${pathname === "/pricing" ? "nav-item-active" : ""}`}><Sparkles size={18}/><span>Plans & benefits</span></Link>
      <Link href="/" className="nav-item"><CircleHelp size={18}/><span>Help & privacy</span></Link>
    </nav>
    <div className="sidebar-bottom">
      <div className={`storage-pill ${storageWarning ? "storage-pill-warning" : ""}`}><ShieldCheck size={15}/><span>{storageWarning ? "Storage unavailable" : "Local to this browser"}</span></div>
      <div className="sidebar-user"><div className="avatar">{activeUser?.displayName.split(" ").map((part) => part[0]).slice(0,2).join("") ?? "SR"}</div><div className="user-copy"><strong>{activeUser?.displayName ?? "Guest workspace"}</strong><span>{activeUser?.email ?? "Local demo"}</span></div><button title="Sign out" aria-label="Sign out" className="icon-button" onClick={signOut}><LogOut size={17}/></button></div>
    </div>
  </aside>;
}

function WorkspaceFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeUser } = useAppData();
  return <div className="workspace-frame"><Sidebar close={() => setMenuOpen(false)}/>{menuOpen && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)}/>}
    <div className="workspace-main"><header className="workspace-topbar"><div className="topbar-left"><button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu size={21}/></button><span className="topbar-kicker">SCHOLARREADY</span><span className="crumb-sep">/</span><span className="topbar-title">{titles[pathname] ?? "Workspace"}</span></div><div className="topbar-right"><span className="topbar-season">Fall · 2026</span><div className="topbar-user" aria-label={`Signed in as ${activeUser?.displayName ?? "guest"}`}><span className="online-dot"/><span>{activeUser?.displayName.split(" ")[0] ?? "Guest"}</span></div></div></header>
      <div className="workspace-content">{children}<footer className="workspace-footer"><span>ScholarReady <span className="footer-dot">·</span> Built for thoughtful applications</span><span><ShieldCheck size={13}/> Your information stays in this browser</span></footer></div>
    </div>
  </div>;
}

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (publicRoutes.has(pathname)) return <div className="public-shell"><PublicNav />{children}</div>;
  return <WorkspaceFrame>{children}</WorkspaceFrame>;
}
