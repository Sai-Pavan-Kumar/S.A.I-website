import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function SocraticPipeline() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      number: '01',
      title: 'Intuitive Mental Model',
      problemFaced: 'Students memorize formulas and abstract definitions without understanding what the problem actually represents in reality.',
      saiDifference: 'Sai Anna anchors the concept to everyday physical intuition before you touch mathematical definitions. You understand the "why" instantly.',
      stageOutcome: 'Permanent conceptual memory that sticks during high-pressure interviews'
    },
    {
      number: '02',
      title: 'Visual Memory Tracing',
      problemFaced: 'Writing code without visualizing memory pointers leads to endless index errors and confusion in timed rounds.',
      saiDifference: 'Step-by-step whiteboard dry runs map out pointer movements and variables before opening any code editor.',
      stageOutcome: 'Crystal-clear mental map of memory bounds and pointers'
    },
    {
      number: '03',
      title: 'Edge-Case Interrogation',
      problemFaced: 'Candidates pass initial sample test cases, then get rejected because their solution breaks on negative numbers, duplicates, or empty arrays.',
      saiDifference: 'Sai Anna actively challenges you: "What input will break this logic right now?" You discover the boundary bugs before the interviewer does.',
      stageOutcome: 'Bulletproof algorithmic logic that handles hidden recruiter test cases'
    },
    {
      number: '04',
      title: 'Structured Logic Verification',
      problemFaced: 'Jumping straight into syntax leads to syntax bugs, wasted interview minutes, and candidate panic.',
      saiDifference: 'You must articulate and verify the core loop logic and invariant conditions before you write a single line of language syntax.',
      stageOutcome: 'Zero hesitation or syntax panic when writing your final solution'
    },
    {
      number: '05',
      title: 'Sandbox Validation',
      problemFaced: 'Relying on generic AI graders that hallucinate correctness and give false confidence before campus drives.',
      saiDifference: 'Real isolated compiler execution tests your solution across exhaustive hidden suites with strict complexity limits.',
      stageOutcome: 'Guaranteed mathematical and Big-O certainty'
    }
  ];

  const current = stages[activeStage];

  return (
    <section id="pedagogy" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header: Clean, No text pill, Focus on WHY */}
        <div className="max-w-3xl mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Why 90% of students fail coding rounds,{' '}
            <span className="text-indigo-600">and how S.A.I. fixes it.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Memorizing solutions gives you the dangerous illusion of competence. When an interviewer alters one variable, memorized code falls apart. S.A.I. guides you through five cognitive checkpoints to build unbreakable problem-solving reflexes.
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
          
          <div className="pb-6 border-b border-slate-100">
            <span className="text-xs font-mono font-bold text-indigo-600">
              Stage {current.number}
            </span>
            <h3 className="text-2xl font-extrabold text-slate-950 mt-1">
              {current.title}
            </h3>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            
            {/* The Real Problem */}
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-rose-800 text-xs font-bold">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>The Common Student Trap</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {current.problemFaced}
              </p>
            </div>

            {/* The S.A.I. Transformation */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>How S.A.I. Transforms You</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {current.saiDifference}
              </p>
            </div>

          </div>

          {/* Outcome Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              Interview Advantage: <strong className="text-slate-900">{current.stageOutcome}</strong>
            </div>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Gated Progression
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
