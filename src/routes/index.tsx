import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Bot,
  BriefcaseBusiness,
  Check,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anant Awasthi — AI Product Orchestrator & GTM Strategist" },
      { name: "description", content: "Anant Awasthi builds AI-assisted GTM systems, automated outreach workflows, and content-led growth engines for early-stage teams." },
      { property: "og:title", content: "Anant Awasthi — AI Product Orchestrator & GTM Strategist" },
      { property: "og:description", content: "AI-assisted GTM systems, automated outreach, and content-led growth for teams scaling from zero to one." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const projects = [
  { title: "Zero-to-One GTM Outreach Architect", code: "01", tags: ["Python", "AI Agents"], description: "Multi-agent B2B outreach pipeline built for signal-led research and hyper-personalized messaging.", impact: "~15 hours saved / week", githubUrl: "https://github.com/Anant-Awasthi" },
  { title: "StoryForge AI", code: "02", tags: ["IBM watsonx", "Prompting"], description: "Enterprise campaign co-pilot with strict zero-hallucination guardrails and multimodal execution.", impact: "80% faster content cycles", githubUrl: "https://github.com/Anant-Awasthi", demoUrl: "https://github.com/Anant-Awasthi" },
  { title: "AstroSense", code: "03", tags: ["NASA API", "Streamlit"], description: "Production-ready space weather predictor processing raw telemetry with deterministic fallbacks.", impact: "Raw data → clear signals", githubUrl: "https://github.com/Anant-Awasthi", demoUrl: "https://github.com/Anant-Awasthi" },
  { title: "VibeMotion", code: "04", tags: ["LLMs", "FFmpeg"], description: "Automated multi-scene video generation suite for repeatable editing and stitching workflows.", impact: "~70% less manual editing", githubUrl: "https://github.com/Anant-Awasthi", demoUrl: "https://github.com/Anant-Awasthi" },
  { title: "REC ABN Alumni Portal", code: "05", tags: ["Firebase", "Serverless"], description: "Serverless directory replacing fragmented spreadsheets with one searchable alumni system.", impact: "1,000+ records digitized", githubUrl: "https://github.com/Anant-Awasthi", demoUrl: "https://github.com/Anant-Awasthi" },
  { title: "Kisan Setu", code: "06", tags: ["Conversational AI", "Voice UX"], description: "Zero-friction public service concept using voice-to-action AI for rural communities.", impact: "Built for low-tech adoption", githubUrl: "https://github.com/Anant-Awasthi" },
] as const;

type ChatMessage = { role: "assistant" | "user"; text: string };

const experiences = [
  { role: "Growth Marketing & Community", org: "Fenlo", time: "2026 — Present", text: "Supporting early GTM execution for an AI-powered enterprise knowledge platform—turning prospect research and engagement signals into sharper positioning, content angles, and structured outreach.", metric: "ICP-led execution" },
  { role: "Co-Founder & Marketing Lead", org: "UseMyBio", time: "2026", text: "Architected the initial GTM setup and creator onboarding for an X influencer marketplace, then structured pilot campaigns to reduce friction in brand–creator matching.", metric: "0 → 1 GTM" },
  { role: "Technical Content Creator", org: "AI & Startup GTM", time: "2025 — Present", text: "Built an organic technical community by documenting real AI workflows, startup execution, and practical GTM teardowns with a human-first point of view.", metric: "21.7K audience" },
];

const services = [
  { icon: Zap, number: "01", title: "Automated B2B Outreach", text: "Custom agent workflows, signal-based research, and scalable business development pipelines." },
  { icon: Target, number: "02", title: "GTM Strategy & Positioning", text: "Precise ICP mapping, market research, and competitive narratives for early-stage products." },
  { icon: Linkedin, number: "03", title: "Content-Led Growth", text: "Organic LinkedIn growth, value-first technical content, and founder personal branding." },
];

function SectionHead({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return <div className="mb-10 max-w-3xl"><div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase text-primary"><span className="h-px w-8 bg-primary" />{label}</div><h2 className="font-display text-3xl font-semibold text-foreground sm:text-5xl">{title}</h2>{intro && <p className="mt-4 text-base leading-7 text-muted-foreground">{intro}</p>}</div>;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{ role: "assistant", text: "Hi — I’m Anant’s portfolio assistant. Ask about his GTM work, AI builds, or how he can help your team." }]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const chatButtonRef = useRef<HTMLButtonElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!chatOpen) return;
    chatInputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setChatOpen(false);
        chatButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [chatOpen]);

  const copy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1600);
  };
  const submitChat = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = chatInput.trim();
    if (!message || chatLoading) return;

    setChatInput("");
    setChatError(null);
    setChatMessages((messages) => [...messages, { role: "user", text: message }]);
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = (await response.json()) as { response?: string };
      if (!response.ok || !data.response) throw new Error("Unable to get a response.");
      setChatMessages((messages) => [...messages, { role: "assistant", text: data.response }]);
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "Unable to get a response. Please try again.");
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="font-display text-sm font-semibold"><span className="text-primary">A/</span> ANANT AWASTHI</a>
          <nav className="hidden items-center gap-7 text-xs font-medium text-muted-foreground md:flex">
            {[['Approach','approach'],['Experience','experience'],['Work','work'],['Services','services']].map(([label,id]) => <a key={id} href={`#${id}`} className="transition-colors hover:text-foreground">{label}</a>)}
          </nav>
          <div className="hidden md:block"><Button asChild size="default"><a href="#contact">Let's talk <ArrowUpRight size={15} /></a></Button></div>
          <Button size="icon" variant="ghost" className="md:hidden" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</Button>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-4 md:hidden">{[['Approach','approach'],['Experience','experience'],['Work','work'],['Services','services'],['Contact','contact']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block py-3 text-sm text-muted-foreground">{label}</a>)}</nav>}
      </header>

      <section id="top" className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-14 px-5 pb-14 pt-28 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-success shadow-status" />Available for remote engagements</div>
          <p className="mb-4 font-display text-sm font-semibold uppercase text-primary">AI Product Orchestrator · GTM Strategist</p>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.03] sm:text-7xl lg:text-8xl">From market signal to <span className="text-gradient">AI-driven execution.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">I build automated GTM pipelines, contextual AI workflows, and data-backed outreach systems that help founders move from scattered information to repeatable growth.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild><a href="https://www.linkedin.com/in/anant-awasthi" target="_blank" rel="noreferrer">Book a consultation <ArrowUpRight size={16} /></a></Button><Button asChild variant="outline"><a href="#work">View my work <ArrowDown size={16} /></a></Button></div>
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={15} className="text-primary" />Kanpur, India <span className="text-border">/</span> Working worldwide</div>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
          <div className="portrait-grid absolute -inset-8 opacity-50" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-panel">
            <img src="/profile.jpg" alt="Anant Awasthi" className="h-full w-full rounded-[1.4rem] object-cover object-center grayscale-[12%]" />
            <div className="absolute bottom-7 left-7 right-7 rounded-lg border border-border bg-background/80 p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">Location</span>
                <span className="text-foreground font-semibold">Kanpur, India</span>
              </div>
            </div>
            <div className="absolute -right-4 top-12 rounded-md border border-border bg-background/90 px-4 py-3 shadow-panel backdrop-blur">
              <p className="text-[10px] uppercase text-primary font-mono tracking-wider">Available for GTM & AI Work</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/40"><div className="mx-auto grid max-w-7xl divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">{[["21.7K+","Tech audience"],["6+","Workflows shipped"],["0 → 1","GTM execution"]].map(([value,label]) => <div key={label} className="py-7 text-center"><p className="font-display text-3xl font-semibold">{value}</p><p className="mt-1 text-xs uppercase text-muted-foreground">{label}</p></div>)}</div></section>

      <section id="approach" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><SectionHead label="01 / The approach" title="Strategy that ships." /><div className="grid gap-10 lg:grid-cols-[.65fr_1.2fr_.7fr] lg:items-center"><p className="font-display text-xl text-muted-foreground">The problem is rarely a shortage of ideas.</p><p className="text-2xl leading-relaxed sm:text-3xl">Early-stage teams struggle with <span className="text-primary">positioning, distribution, and consistent execution.</span> I work at that intersection—building GTM systems, content-led distribution, and AI-assisted workflows that turn scattered information into actionable progress.</p><div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-56 overflow-hidden rounded-full border border-primary/20 bg-primary/5 shadow-[0_0_70px_-24px_hsl(var(--primary))]"><div className="absolute inset-[18%] rounded-full bg-primary/25 blur-2xl animate-pulse" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,transparent_30%,hsl(var(--border))_31%,transparent_32%,transparent_53%,hsl(var(--primary)/0.3)_54%,transparent_55%)] opacity-70" /><div className="absolute inset-[36%] rounded-full border border-primary/50" /><div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_24px_hsl(var(--primary))]" /></div></div></section>

      <section id="experience" className="border-y border-border bg-surface/30"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><SectionHead label="02 / The execution" title="Work measured in movement." intro="A practical operating history across early GTM, creator marketplaces, and audience-led distribution." /><div className="border-t border-border">{experiences.map((item,index) => <article key={item.role} className="group grid gap-5 border-b border-border py-8 transition-colors hover:bg-accent/30 sm:grid-cols-[48px_1fr_2fr_auto] sm:px-4"><span className="font-mono text-xs text-primary">0{index+1}</span><div><h3 className="font-display text-lg font-semibold">{item.role}</h3><p className="mt-1 text-sm text-primary">@ {item.org}</p><p className="mt-3 text-xs text-muted-foreground">{item.time}</p></div><p className="text-sm leading-7 text-muted-foreground">{item.text}</p><span className="h-fit rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">{item.metric}</span></article>)}</div></div></section>

      <section id="work" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><SectionHead label="03 / Selected systems" title="Ideas turned functional." intro="Six builds spanning outreach automation, creative AI, public data, and useful digital infrastructure." /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{projects.map(project => <article key={project.title} className="group flex min-h-80 flex-col rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-panel"><div className="flex items-center justify-between"><span className="font-mono text-xs text-muted-foreground">PRJ / {project.code}</span><Code2 size={18} className="text-muted-foreground transition-colors group-hover:text-primary" /></div><h3 className="mt-8 font-display text-xl font-semibold">{project.title}</h3><div className="mt-4 flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-sm bg-accent px-2 py-1 text-[10px] text-muted-foreground">{tag}</span>)}</div><p className="mt-5 text-sm leading-6 text-muted-foreground">{project.description}</p><div className="mt-auto pt-6"><p className="border-l-2 border-primary pl-3 text-xs font-semibold text-primary">{project.impact}</p>{(project.githubUrl || project.demoUrl) && <div className="mt-5 flex gap-4 text-xs">{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-foreground hover:text-primary"><Github size={14} />GitHub</a>}{project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary"><ExternalLink size={14} />Live demo</a>}</div>}</div></article>)}</div></section>

      <section id="services" className="border-y border-border bg-surface/30"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><SectionHead label="04 / Work together" title="Built for the next inflection point." /><div className="grid gap-4 lg:grid-cols-3">{services.map(({icon:Icon,number,title,text}) => <article key={title} className="group rounded-lg border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/50"><div className="flex items-center justify-between"><div className="flex size-11 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary"><Icon size={20}/></div><span className="font-mono text-xs text-muted-foreground">{number}</span></div><h3 className="mt-8 font-display text-xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p><a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">Discuss a project <ArrowUpRight size={15}/></a></article>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><SectionHead label="05 / The arsenal" title="A hybrid operator’s toolkit." /><div className="grid gap-4 md:grid-cols-5"><div className="rounded-lg border border-border bg-card p-7 md:col-span-3"><Bot className="text-primary"/><h3 className="mt-12 font-display text-xl font-semibold">AI & Orchestration</h3><p className="mt-3 text-sm text-muted-foreground">IBM watsonx · Gemini · Cursor · v0 · Prompt systems</p></div><div className="rounded-lg border border-border bg-card p-7 md:col-span-2"><Code2 className="text-primary"/><h3 className="mt-12 font-display text-xl font-semibold">Logic & Cloud</h3><p className="mt-3 text-sm text-muted-foreground">Python · Firebase · Streamlit · Serverless</p></div><div className="rounded-lg border border-border bg-card p-7 md:col-span-2"><Target className="text-primary"/><h3 className="mt-12 font-display text-xl font-semibold">Growth Engine</h3><p className="mt-3 text-sm text-muted-foreground">ICP targeting · Market mapping · Strategic copy</p></div><div className="rounded-lg border border-border bg-primary p-7 text-primary-foreground md:col-span-3"><p className="font-display text-3xl font-semibold">Research deeply.<br/>Build practically.<br/>Distribute consistently.</p></div></div></section>

      <section className="border-y border-border bg-surface/30"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHead label="06 / Credentials" title="Learning with intent." /><div className="grid gap-4 md:grid-cols-2">{["McKinsey & Company Forward Program — Accepted","Google × Kaggle 5-Day AI Agents Intensive","eDC IIT Delhi Blueprint 6.0 — Top 8 Zonal Shortlist","B.Tech Electrical Engineering — REC Ambedkar Nagar"].map((item,i)=><div key={item} className="flex items-center gap-4 border-b border-border py-5"><div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-primary">{i===3?<BriefcaseBusiness size={16}/>:<Award size={16}/>}</div><p className="text-sm">{item}</p></div>)}</div><p className="mt-8 text-sm leading-7 text-muted-foreground">Campus leadership: Senior Alumni-Student Representative · Outreach Coordinator, E-Cell · Former Social Media Coordinator, Institution’s Innovation Council</p></div></section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><div className="border-y border-border py-14"><p className="text-xs font-semibold uppercase text-primary">Have a real problem to solve?</p><div className="mt-5 grid gap-10 lg:grid-cols-[1fr_.8fr]"><h2 className="font-display text-4xl font-semibold sm:text-6xl">Let’s build something functional.</h2><div><p className="max-w-lg text-sm leading-7 text-muted-foreground">If you’re navigating an early GTM challenge, building an AI-assisted workflow, or turning expertise into distribution, I’d like to hear about it.</p><div className="mt-6 flex flex-wrap gap-3"><Button onClick={()=>copy("hello.anantawasthi@gmail.com","email")} variant="outline">{copied==="email"?<Check size={16}/>:<Mail size={16}/>} Email</Button><Button onClick={()=>copy("+919695361734","phone")} variant="outline">{copied==="phone"?<Check size={16}/>:<Phone size={16}/>} Phone</Button></div></div></div></div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"><a href="https://www.linkedin.com/in/anant-awasthi" target="_blank" rel="noreferrer" className="contact-link border-primary/50 bg-primary/10 text-primary sm:col-span-2"><Linkedin size={19}/><span>LinkedIn</span><ArrowUpRight size={15} className="ml-auto"/></a><a href="https://github.com/Anant-Awasthi" target="_blank" rel="noreferrer" className="contact-link"><Github size={19}/><span>GitHub</span></a><button type="button" onClick={()=>copy("hello.anantawasthi@gmail.com","email")} className="contact-link text-left"><Mail size={19}/><span>{copied==="email" ? "Copied email" : "hello.anantawasthi@gmail.com"}</span></button><button type="button" onClick={()=>copy("+919695361734","phone")} className="contact-link text-left"><Phone size={19}/><span>{copied==="phone" ? "Copied phone" : "+91 96953 61734"}</span></button></div>
        <a href="https://x.com/anantawasthi_" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground/60 transition-colors hover:text-muted-foreground"><X size={13}/>X / Twitter</a>
      </section>

      <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><p>© 2026 Anant Awasthi</p><p>AI systems · GTM strategy · Content-led growth</p></div></footer>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {chatOpen && <div className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-lg border border-border bg-background/95 shadow-chat backdrop-blur-xl" role="dialog" aria-modal="false" id="ask-anant-chat" aria-label="Ask Anant AI"><div className="flex items-center justify-between border-b border-border p-4"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"><Bot size={18}/></div><div><p className="font-display text-sm font-semibold">Ask Anant AI</p><p className="text-[11px] text-success">Online</p></div></div><Button size="icon" variant="ghost" aria-label="Close assistant" onClick={()=>{setChatOpen(false);chatButtonRef.current?.focus();}}><X size={17}/></Button></div><div className="max-h-80 space-y-3 overflow-y-auto p-4">{chatMessages.map((chatMessage, index) => <div key={`${chatMessage.role}-${index}`} className={chatMessage.role === "assistant" ? "rounded-md border border-border bg-card p-3 text-sm leading-6 text-muted-foreground" : "ml-8 rounded-md bg-primary p-3 text-sm leading-6 text-primary-foreground"}>{chatMessage.text}</div>)}{chatLoading && <div className="rounded-md border border-border bg-card p-3 text-sm text-muted-foreground">Thinking…</div>}{chatError && <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs leading-5 text-destructive">{chatError}</p>}</div><form onSubmit={submitChat} className="flex gap-2 border-t border-border p-3"><label className="sr-only" htmlFor="chat-input">Ask Anant AI</label><input id="chat-input" ref={chatInputRef} value={chatInput} onChange={(event)=>setChatInput(event.target.value)} disabled={chatLoading} className="h-10 min-w-0 flex-1 rounded-md border border-input bg-card px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary disabled:opacity-60" placeholder="Ask about Anant’s work…"/><Button size="icon" aria-label="Send message" disabled={chatLoading || !chatInput.trim()}><Send size={16}/></Button></form></div>}
        <Button ref={chatButtonRef} className="h-12 rounded-full px-5" aria-expanded={chatOpen} aria-controls="ask-anant-chat" aria-haspopup="dialog" onClick={()=>setChatOpen(!chatOpen)}><MessageCircle size={18}/><span>Ask Anant AI</span></Button>
      </div>
    </main>
  );
}
