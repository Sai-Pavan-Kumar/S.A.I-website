import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CouncilSection({ onOpenWaitlist }) {
  const [activeBrother, setActiveBrother] = useState('sai');

  const brothers = [
    {
      id: 'sai',
      name: 'Sai Anna',
      role: 'Lead Brother & Conceptual Guide',
      tier: 'FREE TIER',
      tagline: 'When you are confused or losing confidence, he breaks the problem down with visceral real-world intuition.',
      avatarColor: 'from-blue-600 to-indigo-600',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      whyNeeded: 'You stop memorizing code. You understand the foundational physical intuition before touching an editor.',
      dialogue: {
        text: 'Direct code jump cheyaku ra. Two Pointers ante bridge walk analogy gurthundha? First boundaries fix cheddam. Logic clear ayyaka compiler open chey.',
        audioTime: 'Voice note active'
      }
    },
    {
      id: 'ravi',
      name: 'Ravi Anna',
      role: 'Placement Strategy & Accountability',
      tier: 'PRO SENIOR',
      tagline: 'Reverse-engineers your target company hiring bar and gives you tough-love scoldings when you break streaks.',
      avatarColor: 'from-amber-500 to-orange-600',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      whyNeeded: 'No more generic studying. You follow a battle-tested timeline tailored to Amazon, TCS Prime, or Swiggy.',
      dialogue: {
        text: 'Nee target Amazon aithe ee week Arrays complete cheyali ra. 2 days streak skip chesav — ila chesthe hiring drive lo filter aipothav. Idho 12-Week roadmap PDF theesko.',
        audioTime: 'Roadmap & Streak Audit'
      }
    },
    {
      id: 'kiran',
      name: 'Kiran Anna',
      role: 'Hard DSA & Mock Coding Rounds',
      tier: 'PRO SENIOR',
      tagline: 'Challenges your assumptions with brutal edge cases until your algorithmic logic is impossible to break.',
      avatarColor: 'from-emerald-500 to-teal-700',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      whyNeeded: 'You develop the composure to handle unknown tricky problems in live 45-minute technical rounds.',
      dialogue: {
        text: 'Array lo duplicate integers or negative sum unte nee condition break avuthundha? Edge case verify chey: [-4, -1, 0, 3, 10], Target=0. Break cheyyi, appudu sandbox execute cheddam.',
        audioTime: 'Live Mock Round'
      }
    },
    {
      id: 'venkat',
      name: 'Venkat Anna',
      role: 'Architecture & Resume Audits',
      tier: 'PRO SENIOR',
      tagline: 'Eliminates toy tutorial projects from your resume and guides production-grade system architectures.',
      avatarColor: 'from-purple-600 to-indigo-800',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      whyNeeded: 'Your GitHub and resume command respect from hiring managers rather than getting filtered at round 1.',
      dialogue: {
        text: 'Resume lo "To-Do App" pettukoni interview ki velthe first round lone filter chestharu. Distributed cache or real-time WebRTC architecture build cheddam. Commits audit chestha chudu.',
        audioTime: 'GitHub Portfolio Audit'
      }
    }
  ];

  const current = brothers.find(b => b.id === activeBrother);

  return (
    <section id="council" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            A single chatbot gets confused.{' '}
            <span className="text-blue-600">A squad of elder brothers gets you hired.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Different interview rounds require different preparation mindsets. S.A.I. dispatches your doubts to specialized seniors who know what recruiters look for at each stage.
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
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className={`text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full border ${current.badgeColor}`}>
                {current.tier}
              </span>
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

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
                Why You Need Him
              </span>
              <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                {current.whyNeeded}
              </p>
            </div>

            <button
              onClick={() => onOpenWaitlist(`${current.name} Access`)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Connect with {current.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right messenger interaction preview */}
          <div className="lg:col-span-7 bg-[#efeae2] rounded-2xl p-5 sm:p-6 border border-slate-200 relative overflow-hidden bg-whatsapp-pattern">
            
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
              <span className="text-[11px] font-medium bg-white/80 px-2.5 py-0.5 rounded border border-slate-200 text-slate-600">
                {current.dialogue.audioTime}
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl rounded-tl-none border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-900 block mb-1">{current.name}</span>
                <p className="text-xs text-slate-800 leading-relaxed font-normal">
                  "{current.dialogue.text}"
                </p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Socratic Guidance</span>
                  <span>Verified S.A.I. Mentor</span>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-[#d9fdd3] text-slate-900 p-2.5 rounded-xl rounded-tr-none max-w-[80%] shadow-2xs border border-emerald-100 text-xs">
                  <p className="text-[11.5px] leading-snug">
                    Understood Anna! Let's test the negative target edge case before writing code.
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
