import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function CouncilSection() {
  const [activeBrother, setActiveBrother] = useState('sai');

  const brothers = [
    {
      id: 'sai',
      name: 'Sai Anna',
      role: 'Lead Brother & Orchestrator',
      tier: '100% FREE TIER',
      tagline: 'Conceptual intuition, tough-love accountability, and 24/7 syllabus guidance.',
      avatarColor: 'from-blue-600 to-indigo-600',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      focus: 'Foundations • Two Pointers • Trees • Daily Habits',
      dialogue: {
        speaker: 'Sai Anna',
        text: 'Direct code jump cheyaku ra. Two Pointers ante bridge walk analogy gurthundha? First L=0 and R=N-1 tho boundaries fix cheddam. Logic clear ayyaka compiler open chey.',
        action: 'Curates intuition & dispatches specialized seniors',
        audioTime: '0:38 voice note'
      }
    },
    {
      id: 'ravi',
      name: 'Ravi Anna',
      role: 'Placement Strategy & Roadmaps',
      tier: 'PRO SENIOR',
      tagline: 'Company hiring reverse-engineering, streak audits, and 1-click revision PDF cheat sheets.',
      avatarColor: 'from-amber-500 to-orange-600',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      focus: 'Amazon SDE-1 • TCS Prime • 12-Week Roadmaps • Daily Streaks',
      dialogue: {
        speaker: 'Ravi Anna',
        text: 'Nee target Amazon aithe ee week Arrays & Sliding Window complete cheyali ra. 2 days streak skip chesav — ila chesthe hiring drive lo filter aipothav. Idho 1-click 12-Week roadmap PDF theesko.',
        action: 'Generates client-side PDF revision sheets & streak audits',
        audioTime: '1-Click PDF Notes Available'
      }
    },
    {
      id: 'kiran',
      name: 'Kiran Anna',
      role: 'Core DSA & Hard Sandboxes',
      tier: 'PRO SENIOR',
      tagline: 'Live rough-paper whiteboard mock rounds, edge-case deep-dives, and WebAssembly execution.',
      avatarColor: 'from-emerald-500 to-teal-700',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      focus: 'Hard DSA • LeetCode 75 • Edge-Case Hunting • WebAssembly Sandbox',
      dialogue: {
        speaker: 'Kiran Anna',
        text: 'Array lo duplicate integers or negative sum unte nee condition break avuthundha? Edge case verify chey: [-4, -1, 0, 3, 10], Target=0. Break cheyyi, appudu sandbox execute cheddam.',
        action: 'Deterministic compiler sandbox & edge-case discovery',
        audioTime: 'Real WebAssembly Testing'
      }
    },
    {
      id: 'venkat',
      name: 'Venkat Anna',
      role: 'Architecture & System Design',
      tier: 'PRO SENIOR',
      tagline: 'Resume-ready full-stack projects, real API architectures, and live GitHub repository audits.',
      avatarColor: 'from-purple-600 to-indigo-800',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      focus: 'System Design • Real APIs • Full-Stack Portfolios • GitHub Audits',
      dialogue: {
        speaker: 'Venkat Anna',
        text: 'Resume lo "To-Do App" pettukoni Amazon interview ki velthe first round lone thosestharu. Real-time WebRTC audio architecture or Distributed Cache project build cheddam. GitHub commit history audit chestha chudu.',
        action: 'Live code review & production architecture guidance',
        audioTime: 'Production System Design'
      }
    }
  ];

  const current = brothers.find(b => b.id === activeBrother);

  return (
    <section id="council" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
            <span>The Multi-Agent Placement Council</span>
            <span className="text-blue-300">•</span>
            <span>by The SurfBoard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            One lonely chatbot can't get you hired.{' '}
            <span className="text-blue-600">A squad of elder brothers will.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Instead of a single overwhelming AI trying to answer everything, a smart intent router dispatches your questions to specialized seniors who understand student psychology and corporate hiring bars.
          </p>
        </div>

        {/* 4 Brothers Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {brothers.map((brother) => (
            <button
              key={brother.id}
              onClick={() => setActiveBrother(brother.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                activeBrother === brother.id
                  ? 'bg-white border-slate-950 shadow-md ring-1 ring-slate-950/5'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900">{brother.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${brother.badgeColor}`}>
                  {brother.tier}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium line-clamp-1">{brother.role}</p>
            </button>
          ))}
        </div>

        {/* Active Brother Interactive Showcase Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left detail card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${current.badgeColor}`}>
                  {current.tier}
                </span>
                <span className="text-xs font-mono text-slate-400">Persona Profile</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                {current.name}
              </h3>
              <p className="text-sm font-semibold text-blue-600">
                {current.role}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {current.tagline}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
                Primary Specialty
              </span>
              <p className="text-xs font-semibold text-slate-900">
                {current.focus}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Grounded in The SurfBoard's 6-year pedagogical research</span>
            </div>
          </div>

          {/* Right WhatsApp interaction preview */}
          <div className="lg:col-span-7 bg-[#efeae2] rounded-2xl p-4 sm:p-6 border border-slate-200 relative overflow-hidden bg-whatsapp-pattern">
            
            {/* Header banner */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/5">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${current.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
                  {current.name.substring(0, 2)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{current.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </h4>
                  <p className="text-[10px] text-slate-500">{current.role}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-white/80 px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                {current.dialogue.audioTime}
              </span>
            </div>

            {/* Bubble dialogue */}
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl rounded-tl-none border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-900">{current.name}</span>
                  <span className="text-[9px] text-slate-400 font-mono">Just now</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-normal">
                  "{current.dialogue.text}"
                </p>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-blue-600 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {current.dialogue.action}
                  </span>
                  <span className="text-slate-400">WhatsApp Verified</span>
                </div>
              </div>

              {/* Student Response Mockup */}
              <div className="flex justify-end">
                <div className="bg-[#d9fdd3] text-slate-900 p-2.5 rounded-xl rounded-tr-none max-w-[80%] shadow-2xs border border-emerald-100 text-xs">
                  <p className="text-[11.5px] leading-snug">
                    Understood Anna! Let's verify with edge case [-4, -1, 0, 3, 10] before writing code.
                  </p>
                  <span className="text-[9px] text-slate-500 block text-right mt-1">11:45 AM ✓✓</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
