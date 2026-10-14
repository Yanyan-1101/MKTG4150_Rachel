"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useAppData } from "@/components/app-provider";

export default function SignupPage() {
  const router = useRouter();
  const { data, signUp } = useAppData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (data.users.some((user) => user.email.toLowerCase() === email.trim().toLowerCase())) {
      setError("A local workspace already uses that email. Log in to continue."); return;
    }
    signUp(name, email); router.push("/dashboard");
  };
  return <main className="auth-page"><section className="auth-story"><div className="section-kicker">A CLEARER START, AT YOUR PACE</div><h1>Make a little room for the opportunities ahead.</h1><p>Build a profile once, then see what fits and what you’ll need to feel ready.</p><div className="auth-benefit"><Check size={15}/> Start with a working demo, not a blank page</div><div className="auth-benefit"><Check size={15}/> Keep your progress in this browser</div><div className="auth-benefit"><Check size={15}/> Change or clear your data when you choose</div></section>
    <section className="auth-form-side"><div className="auth-card"><h2>Create your workspace</h2><p>This creates a local demo profile on this device.</p><form onSubmit={submit}><div className="auth-fields"><label className="form-field"><span className="field-label">Your name</span><input className="input" autoComplete="name" required minLength={2} value={name} onChange={(event) => setName(event.target.value)} placeholder="Jordan Lee"/></label><label className="form-field"><span className="field-label">Email address</span><input className="input" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.edu"/></label><button className="button" type="submit">Create local workspace <ArrowRight size={15}/></button>{error && <div className="error-message" role="alert">{error}</div>}</div></form><div className="auth-note"><ShieldCheck size={13} style={{ verticalAlign: "-2px", marginRight: 4 }}/> This demo does not verify email, collect a password, or sync across devices. Avoid entering sensitive information.</div><div className="auth-bottom">Already have a local workspace? <Link href="/login">Log in</Link></div><div className="auth-bottom" style={{ marginTop: 10 }}><Link href="/">← Back to home</Link></div></div></section></main>;
}
