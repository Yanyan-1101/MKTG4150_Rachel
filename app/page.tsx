import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, BookOpenCheck, CalendarDays, Check, CircleDollarSign, FileCheck2, Fingerprint, LockKeyhole, SearchCheck, ShieldCheck, Sparkles, Target, UserRoundCheck } from "lucide-react";

const features = [
  { icon: SearchCheck, title: "Find a better-fit list", body: "See opportunities that make sense for your field, your goals, and where you are in college." },
  { icon: Target, title: "Know what qualifies", body: "Read the rule behind every match—and spot missing details before they become roadblocks." },
  { icon: FileCheck2, title: "Keep your pieces together", body: "Organize evidence and application steps once, then bring them to the scholarships you choose." },
];

export default function HomePage() {
  return <main className="landing-page">
    <section className="landing-hero">
      <div className="hero-copy"><div className="hero-eyebrow"><span className="hero-eyebrow-dot"/> SCHOLARSHIP PREP, WITH A CLEARER PLAN</div>
        <h1 className="hero-title">Make your next<br/>opportunity <em>count.</em></h1>
        <p className="hero-description">A calmer way to find scholarships that fit, understand what they ask for, and get ready to apply—one thoughtful step at a time.</p>
        <div className="hero-actions"><Link href="/signup" className="button">Build my scholarship plan <ArrowRight size={16}/></Link><Link href="/dashboard" className="button button-outline">Explore the demo <ArrowUpRight size={15}/></Link></div>
        <div className="hero-proof"><div className="proof-avatars" aria-hidden="true"><span>JM</span><span>AP</span><span>SK</span></div><span><span className="proof-strong">Made for real student life.</span> Your pace. Your priorities.</span></div>
      </div>
      <div className="hero-visual" aria-label="Preview of the ScholarReady scholarship workspace">
        <div className="hero-orbit" aria-hidden="true"/><div className="visual-float visual-float-right"><div className="float-check"><Check size={12}/> Materials organized</div><div className="float-caption">Ready before the rush</div></div>
        <div className="visual-card"><div className="visual-top"><span className="visual-kicker">YOUR SCHOLARSHIP MATCHES</span><span className="visual-tag"><Sparkles size={10}/> Fall plan</span></div>
          <div className="visual-profile"><span className="visual-profile-icon"><UserRoundCheck size={18}/></span><span><span className="visual-profile-name">A plan that fits you</span><span className="visual-profile-sub">Environmental science · Year 2</span></span><span className="visual-fit"><strong>82</strong><span>% ready</span></span></div>
          <div className="visual-bar"><span/></div>
          <div className="visual-scholarship"><span className="visual-scholarship-icon"><LeafIcon/></span><span className="visual-scholarship-copy"><strong>Future of Science Award</strong><span>Environmental science · Nov 18</span></span><span className="visual-award">$5k</span></div>
          <div className="visual-scholarship"><span className="visual-scholarship-icon" style={{ background: "#edf2f8", color: "#57769a" }}><BookOpenCheck size={15}/></span><span className="visual-scholarship-copy"><strong>First in the Family Grant</strong><span>First-generation · Dec 2</span></span><span className="visual-award">$3.5k</span></div>
          <div className="visual-status"><span><ShieldCheck size={12}/> Reasons, not guesswork</span><span><CalendarDays size={12}/> Deadlines in view</span></div>
        </div>
        <div className="visual-float visual-float-left"><div className="float-title">NEXT DEADLINE</div><div className="float-value">18 days</div><div className="float-caption">Make room to polish</div></div>
      </div>
    </section>
    <div className="trust-strip"><div className="trust-strip-inner"><span className="trust-item"><ShieldCheck size={15}/> Your details stay in this browser</span><span className="trust-divider"/><span className="trust-item"><BadgeCheck size={15}/> Clear eligibility explanations</span><span className="trust-divider"/><span className="trust-item"><CircleDollarSign size={15}/> Free plan to get started</span><span className="trust-divider"/><span className="trust-item"><Fingerprint size={15}/> You stay in control</span></div></div>
    <section className="section-wrap" id="how-it-works"><div className="section-kicker">LESS SEARCHING. MORE PREPARING.</div><h2 className="section-title-large">Scholarship prep,<br/>without the guesswork.</h2><p className="section-copy">The best next step is easier to see when the requirements, materials, and deadlines live together.</p>
      <div className="feature-grid">{features.map(({ icon: Icon, title, body }) => <article className="feature-card" key={title}><span className="feature-icon"><Icon size={18}/></span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>
    <section className="steps-section"><div className="section-wrap"><div className="section-kicker">A LITTLE CLARITY GOES A LONG WAY</div><h2 className="section-title-large">From “where do I start?”<br/>to ready when it counts.</h2><div className="steps-row"><article className="step-card"><span className="step-num">01 / SET YOUR PROFILE</span><h3>Start with what makes you, you.</h3><p>Add the study, background, and experience details that help surface more relevant opportunities.</p></article><article className="step-card"><span className="step-num">02 / EXPLORE YOUR FIT</span><h3>Understand the reason behind every match.</h3><p>See what you already meet, what needs a second look, and which details are still missing.</p></article><article className="step-card"><span className="step-num">03 / GET APPLICATION-READY</span><h3>Bring the work into focus.</h3><p>Keep your evidence organized and the next deadline visible—so you can make progress at your pace.</p></article></div>
      <div className="privacy-callout"><span className="privacy-icon"><LockKeyhole size={18}/></span><div><strong>PICS privacy promise: Privacy, Information, Control, Security.</strong><p>This demo keeps your workspace details in this browser. Your evidence files are not uploaded. Browser storage is convenient, not an encrypted vault—avoid adding sensitive documents, and clear this device’s data whenever you want.</p></div></div>
    </div></section>
    <section className="section-wrap" style={{ paddingTop: 58, paddingBottom: 58 }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}><div><div className="section-kicker">YOUR NEXT STEP IS YOURS</div><h2 className="section-title-large" style={{ fontSize: 29 }}>A good application starts<br/>with a plan that feels possible.</h2></div><Link href="/signup" className="button">Start your plan <ArrowRight size={15}/></Link></div><p className="text-small text-muted" style={{ marginTop: 19 }}>ScholarReady is a preparation tool, not an award provider. Demo opportunities are fictional examples, not official scholarships or eligibility decisions.</p></section>
    <footer className="public-footer"><div className="public-footer-inner"><span className="wordmark wordmark-light"><span className="brand-mark"><BookOpenCheck size={18}/></span><span>scholar<span className="wordmark-accent">ready</span></span></span><span className="public-footer-note">A little more ready, one application at a time.</span><div className="public-footer-links"><Link href="/pricing">Plans</Link><Link href="/login">Log in</Link><Link href="/signup">Create workspace</Link></div></div></footer>
  </main>;
}

function LeafIcon() {
  return <span aria-hidden="true" style={{ fontSize: 15, lineHeight: 1 }}>✳</span>;
}
