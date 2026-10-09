import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function SocraticPipeline() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      number: '01',
      title: 'Intuition & Analogy',
      subtitle: 'Visceral real-world mental models before mathematical definitions',
      chatGptFail: 'Immediately drops 40 lines of pre-written C++ code with theoretical jargon. Student copies and forgets in 3 days.',
      saiMethod: 'Sai Anna gives a visceral SurfBoard analogy: "Two Pointers is like two friends crossing a narrow bridge from opposite sides." No code allowed yet.',
      deliverable: 'Visual mental model anchored to daily life',
      statusTag: 'Stage 1 Gate'
    },
    {
      number: '02',
      title: 'Rough-Paper Trace',
      subtitle: 'Lightweight SVG dry-runs and memory pointer walkthroughs',
      chatGptFail: 'Attempts text ASCII diagrams that break formatting on mobile screens and confuse memory indices.',
      saiMethod: 'Client-side hand-drawn graph paper canvas moves pointers L & R step-by-step with zero server lag and zero GPU cost.',
      deliverable: 'Visual memory allocation mapped in head',
      statusTag: 'Stage 2 Gate'
    },
    {
      number: '03',
      title: 'Edge-Case Hunt',
      subtitle: 'Student actively discovers inputs that break the logic',
      chatGptFail: 'Passively lists theoretical edge cases that students never internalize or remember during timed hiring rounds.',
      saiMethod: 'Kiran Anna pauses and challenges: "Array lo duplicate elements or empty input unte nee condition work avuthunda? Find the bug."',
      deliverable: 'Active candidate boundary discovery',
      statusTag: 'Stage 3 Gate'
    },
    {
      number: '04',
      title: 'Pseudocode Gate',
      subtitle: 'Verifying algorithmic logic invariants before touching syntax',
      chatGptFail: 'Allows students to blindly copy-paste solutions without ever understanding loop terminating conditions.',
      saiMethod: 'Strict schema check validates whether student can write structured pseudocode logic before opening the code editor.',
      deliverable: 'Logic correctness verified upfront',
      statusTag: 'Stage 4 Gate'
    },
    {
      number: '05',
      title: 'Deterministic Sandbox',
      subtitle: 'Zero LLM evaluation — real WebAssembly compiler benchmark',
      chatGptFail: 'Hallucinates code correctness and guesses time complexity bounds without actually executing unit tests.',
      saiMethod: 'Runs real isolated WebAssembly/Pyodide compiler test suites. Deterministic pass/fail with locked Big-O bounds.',
      deliverable: 'Mathematical & algorithmic accuracy guaranteed',
      statusTag: 'Stage 5 Final Sandbox'
    }
  ];

  const current = stages[activeStage];

  return (
    <section id="pedagogy" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
            <span>Deterministic Pedagogical Architecture</span>
            <span className="text-indigo-300">•</span>
            <span>by The SurfBoard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            The 5-Stage Socratic Gating System
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Generic chatbots spoiler-feed answers, creating the illusion of competence. S.A.I. halts students at strict pedagogical checkpoints. You cannot write code until you prove the logic.
          </p>
        </div>

        {/* 5 Stepper Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
          {stages.map((stage, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStage(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeStage === idx
                  ? 'bg-white border-slate-950 shadow-md ring-1 ring-slate-950/5'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono font-bold ${
                  activeStage === idx ? 'text-indigo-600' : 'text-slate-400'
                }`}>
                  STAGE {stage.number}
                </span>
                {idx <= activeStage && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </div>
              <p className="text-xs font-bold text-slate-900 line-clamp-1">{stage.title}</p>
            </button>
          ))}
        </div>

        {/* Detail Comparison Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  {current.statusTag}
                </span>
                <span className="text-xs text-slate-400 font-mono">Pedagogical Invariant</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950 mt-1">
                Stage {current.number}: {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {current.subtitle}
              </p>
            </div>

            <div className="p-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              Deliverable: <span className="text-slate-900 font-bold">{current.deliverable}</span>
            </div>
          </div>

          {/* Comparison Grid: ChatGPT vs S.A.I. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            
            {/* The ChatGPT Failure */}
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 text-xs font-bold">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>How Generic AI Tutors Fail Students (ChatGPT / Claude)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {current.chatGptFail}
              </p>
              <div className="pt-2 border-t border-rose-100 text-[11px] text-rose-700 font-medium">
                Result: Zero retention in campus technical interviews.
              </div>
            </div>

            {/* The S.A.I. Method */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>The S.A.I. Socratic Guardrail (By The SurfBoard)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {current.saiMethod}
              </p>
              <div className="pt-2 border-t border-emerald-100 text-[11px] text-emerald-800 font-medium flex items-center justify-between">
                <span>Deterministic Gating Check: ACTIVE</span>
                <span className="font-bold">Pass Required to Advance</span>
              </div>
            </div>

          </div>

          {/* Bottom Banner */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Anti-Hallucination Protocol: LLM never acts as compiler judge.</span>
            </div>
            <a 
              href="#rough-paper"
              className="text-slate-900 font-bold hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <span>See this running in the Visual Trace sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
