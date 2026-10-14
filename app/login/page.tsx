"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useAppData } from "@/components/app-provider";

export default function LoginPage() {
  const router = useRouter();
  const { data, signIn } = useAppData();
  const [email, setEmail] = useState("maya.chen@example.edu");
  const [error, setError] = useState("");
  const openDemo = () => { signIn("maya.chen@example.edu"); router.push("/dashboard"); };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const existing = data.users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());
    if (!existing) { setError("No local workspace uses that email yet. Try the demo workspace or create a new local profile."); return; }
    setError(""); signIn(email); router.push("/dashboard");
  };
  return <main className="auth-page"><section className="auth-story"><div className="section-kicker">YOUR SCHOLARSHIP SEASON, ORGANIZED</div><h1>Pick up where your next opportunity begins.</h1><p>Your profile, evidence, and application steps—together in one workspace that stays on this device.</p><div className="auth-benefit"><Check size={15}/> Eligibility, explained clearly</div><div className="auth-benefit"><Check size={15}/> Your evidence and deadlines in one place</div><div className="auth-benefit"><Check size={15}/> No document uploads in this demo</div></section>
    <section className="auth-form-side"><div className="auth-card"><h2>Log in to your workspace</h2><p>Use the local demo profile saved in this browser.</p><form onSubmit={submit}><div className="auth-fields"><label className="form-field"><span className="field-label">Email address</span><input className="input" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)}/></label><button className="button" type="submit">Continue <ArrowRight size={15}/></button>{error && <div className="error-message" role="alert">{error}</div>}</div></form><button className="button button-outline" onClick={openDemo} style={{ width: "100%", marginTop: 9 }} type="button">Open Maya’s demo workspace</button><div className="auth-note"><ShieldCheck size={13} style={{ verticalAlign: "-2px", marginRight: 4 }}/> This is a local demo session—not production identity verification. No password is stored.</div><div className="auth-bottom">New to ScholarReady? <Link href="/signup">Create a workspace</Link></div><div className="auth-bottom" style={{ marginTop: 10 }}><Link href="/">← Back to home</Link></div></div></section></main>;
}
