import React, { useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Layers, 
  Zap, 
  ChevronRight,
  MessageSquare,
  FileCheck2,
  Server
} from 'lucide-react';

export default function App() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('council');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (waitlistEmail.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/15 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Navigation Header */}
      <nav className="relative z-20 border-b border-white/[0.06] backdrop-blur-xl bg-[#090a0f]/80 sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/Sai-logo-transparent.webp" 
              alt="S.A.I." 
              className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]"
            />
            <span className="font-semibold tracking-wider text-sm text-slate-400 border border-white/10 px-2 py-0.5 rounded-full uppercase">
              Senior Artificial Intelligence
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#pedagogy" className="hover:text-white transition-colors">Pedagogy</a>
            <a href="#council" className="hover:text-white transition-colors">Placement Council</a>
            <a href="#architecture" className="hover:text-white transition-colors">Deterministic Sandbox</a>
            <a href="#tpo" className="hover:text-white transition-colors">Institutional Index</a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#waitlist" 
              className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-8">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>The Next-Generation Placement Diagnostic Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Engineered for <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">real-world placement breakthroughs</span>.
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          <strong className="text-slate-200">S.A.I.</strong> bridges the brutal gap between academic college curriculums and high-stakes tech hiring assessments through a deterministic, Socratic multi-agent learning engine.
        </p>

        {/* Hero CTA & Waitlist */}
        <div id="waitlist" className="max-w-md mx-auto mb-16">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md">
              <input 
                type="email" 
                required 
                placeholder="Enter your student or institutional email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-md transition-all whitespace-nowrap flex items-center justify-center gap-2"
              >
                <span>Request Access</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium">Access requested. You're in priority queue!</span>
            </div>
          )}
          <p className="text-xs text-slate-500 mt-3">Zero spam. Verified campus and individual alpha rollout.</p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-6 border-t border-white/[0.08]">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <Cpu className="w-6 h-6 text-indigo-400 mb-3" />
            <h3 className="font-semibold text-white text-sm mb-1">Deterministic Sandbox</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Zero LLM guesswork. Real WebAssembly compiler sandboxes evaluate time and space complexity.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <MessageSquare className="w-6 h-6 text-sky-400 mb-3" />
            <h3 className="font-semibold text-white text-sm mb-1">5-Stage Socratic Gating</h3>
            <p className="text-xs text-slate-400 leading-relaxed">No solution spoilers. Step-by-step intuition, dry runs, edge-case hunts, and pseudocode verification.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <GraduationCap className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-semibold text-white text-sm mb-1">Predictive Readiness Index</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Real-time placement preparedness diagnostics for TPOs, departments, and hiring partners.</p>
          </div>
        </div>
      </section>

      {/* Interactive Mock Experience Preview */}
      <section id="council" className="py-20 px-6 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">The Multi-Agent Placement Council</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            A cohesive specialized council of mentors designed around student psychological retention.
          </p>
        </div>

        {/* WhatsApp-style Interface Box */}
        <div className="rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl overflow-hidden max-w-3xl mx-auto">
          {/* Mock Top bar */}
          <div className="px-5 py-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center font-bold text-white text-sm shadow">
                S.A.I.
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>Placement Council Workspace</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </h4>
                <p className="text-xs text-slate-400">Multi-Agent Socratic Dispatcher</p>
              </div>
            </div>
            <div className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded text-slate-400">
              WebAssembly Sandbox: ACTIVE
            </div>
          </div>

          {/* Mock Chat Body */}
          <div className="p-6 space-y-5 text-sm bg-gradient-to-b from-[#0d1117] to-[#080b10]">
            {/* Student Message */}
            <div className="flex justify-end">
              <div className="bg-indigo-600/30 border border-indigo-500/40 text-slate-100 px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p className="text-xs text-indigo-300 font-semibold mb-1">Student Candidate</p>
                <p>Target: Tier-1 Tech Placement (SDE-1). Two Pointers logic implement chesthunte edge cases miss avuthundi.</p>
              </div>
            </div>

            {/* Lead Mentor Sai */}
            <div className="flex justify-start">
              <div className="bg-white/[0.04] border border-white/10 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                <p className="text-xs text-amber-400 font-semibold mb-1">S.A.I. (Lead Orchestrator)</p>
                <p>Direct code jump cheyaku. Mundu intuition fix cheddam. Consider two pointers like pedestrians walking across a single-lane bridge.</p>
                <div className="mt-2.5 p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-sky-300 flex items-center justify-between">
                  <span>Visual Trace: [L = 0] &lt;---&gt; [R = N-1]</span>
                  <span className="text-[11px] text-slate-400">Step 2 / 5</span>
                </div>
              </div>
            </div>

            {/* Algorithmic Specialist */}
            <div className="flex justify-start">
              <div className="bg-white/[0.04] border border-white/10 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                <p className="text-xs text-sky-400 font-semibold mb-1">Core DSA Specialist</p>
                <p>Array lo duplicate integers or negative sum unte nee condition break avuthunda? Edge case verify chey:</p>
                <div className="mt-2 font-mono text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded">
                  Test Case probe: nums = [-4, -1, 0, 3, 10], Target = 0
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Stage Socratic Pipeline */}
      <section id="pedagogy" className="py-20 px-6 max-w-5xl mx-auto border-t border-white/[0.08] relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">The 5-Stage Socratic Architecture</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Traditional AI chatbots hallucinate Big-O complexities and spoon-feed code. S.A.I. enforces strict pedagogical checkpoints before code sandbox execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Visceral Intuition', desc: 'Real-world physical mental models before touching mathematical definitions.' },
            { step: '02', title: 'Rough-Paper Trace', desc: 'Lightweight SVG memory traces and pointer walk-throughs.' },
            { step: '03', title: 'Edge-Case Hunt', desc: 'Student actively uncovers boundaries (null, overflow, duplicates).' },
            { step: '04', title: 'Pseudocode Gate', desc: 'Syntactical logic verification before opening the code editor.' },
            { step: '05', title: 'Sandbox Execute', desc: 'Deterministic WebAssembly / Pyodide test suite benchmark.' },
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-indigo-500/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400 mb-2 block">{item.step}</span>
                <h4 className="text-sm font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[11px] text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 mr-1.5" />
                <span>Gated Pass</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional B2B Overview */}
      <section id="tpo" className="py-20 px-6 max-w-5xl mx-auto border-t border-white/[0.08] relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-black p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-2 block">
              Institutional Intelligence
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Predictive Placement Readiness Index (PRI)
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Enable engineering colleges, departments, and Training & Placement Officers (TPOs) to track real student algorithmic competency 12 months before hiring drives arrive.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 mb-8">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Early Warning Alert for 5th/6th Sem unplaceable students</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Deterministic assessment scoring without LLM subjectivity</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Target-company benchmark matching (Amazon, TCS Prime, Cognizant)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated 1-Click Revision PDF Cheat Sheets</span>
              </div>
            </div>
            <a 
              href="#waitlist" 
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-slate-200 transition-all shadow-lg"
            >
              <span>Schedule Institutional Pilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.06] text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/Sai-logo-transparent.webp" alt="S.A.I." className="h-6 w-auto" />
            <span className="font-semibold text-slate-400">S.A.I.</span>
            <span>— Senior Artificial Intelligence</span>
          </div>
          <p>© {new Date().getFullYear()} S.A.I. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
