import React, { useState } from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

export default function RoughPaperEngine() {
  const [currentStep, setCurrentStep] = useState(0);

  const arrayData = [2, 7, 11, 15];

  const steps = [
    {
      stepNumber: 1,
      leftIdx: 0,
      rightIdx: 3,
      sum: 17,
      condition: '17 > 9 (Too Large)',
      action: 'Decrement Right Pointer (R--)',
      note: 'Left=2 + Right=15 = 17. Target 9 kante chala peddadi. Array already sorted kabatti, largest value ni drop chesi R pointer ni venakki laagali.',
      status: 'evaluating'
    },
    {
      stepNumber: 2,
      leftIdx: 0,
      rightIdx: 2,
      sum: 13,
      condition: '13 > 9 (Still Too Large)',
      action: 'Decrement Right Pointer (R--)',
      note: 'Left=2 + Right=11 = 13. Inka target kante ekkuva undhi. Inkosaari R pointer ni left ki move cheddam.',
      status: 'evaluating'
    },
    {
      stepNumber: 3,
      leftIdx: 0,
      rightIdx: 1,
      sum: 9,
      condition: '9 == 9 (Target Matched!)',
      action: 'Target Pair Found: Return [0, 1]',
      note: 'BINGO! Left=2 + Right=7 = 9. Exactly target match aindi. O(N) single pass lo problem solve aindi. Zero nested loops!',
      status: 'matched'
    }
  ];

  const current = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section id="rough-paper" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <span>Visual Pedagogy Engine</span>
            <span className="text-emerald-300">•</span>
            <span>by The SurfBoard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Why burn ₹300 on video AI?{' '}
            <span className="text-emerald-700">All you need is rough paper & a pen.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            AI avatar talking-head videos cost $0.30/minute and distract students. In real engineering mentorship, Sai Anna pulls out a sheet of white paper and walks through pointers with a pen. S.A.I. replicates this locally with &lt;10ms latency.
          </p>
        </div>

        {/* The Whiteboard Canvas Box */}
        <div className="bg-slate-900 rounded-3xl p-2 sm:p-4 shadow-xl border border-slate-800">
          
          {/* Top Bar / Diagnostics */}
          <div className="px-4 py-3 bg-slate-950 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs mb-3 border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-slate-300 font-semibold">RoughPaper Canvas v2.4</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Two Pointers Dynamic Memory Walk</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[11px] font-bold">
                Compute Cost: ₹0.00 (Client-side SVG)
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Latency: 6ms
              </span>
            </div>
          </div>

          {/* Graph Paper Area */}
          <div className="bg-graph-paper rounded-2xl p-6 sm:p-10 border border-slate-300 min-h-[380px] flex flex-col justify-between">
            
            {/* Whiteboard Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-mono tracking-wider font-bold text-slate-400 uppercase">
                  Interactive Problem Trace
                </span>
                <h4 className="text-lg font-extrabold text-slate-900 font-mono">
                  Two Sum II — nums = [2, 7, 11, 15], Target = 9
                </h4>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-500">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-700" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1}
                    className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                    aria-label="Next step"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-700" />
                  </button>
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Reset Trace"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Array Pointers Visualizer */}
            <div className="py-12 my-auto">
              <div className="max-w-2xl mx-auto">
                
                {/* Pointer indicator Row Top */}
                <div className="grid grid-cols-4 gap-4 mb-2 text-center font-mono font-bold text-xs">
                  {arrayData.map((_, idx) => (
                    <div key={`top-${idx}`} className="h-7 flex flex-col items-center justify-end">
                      {idx === current.leftIdx && (
                        <div className="text-blue-600 flex flex-col items-center animate-bounce">
                          <span className="text-[11px] font-extrabold">L (Left)</span>
                          <span className="text-xs">↓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Array Memory Blocks */}
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                  {arrayData.map((val, idx) => {
                    const isLeft = idx === current.leftIdx;
                    const isRight = idx === current.rightIdx;
                    const isTargetMatched = current.status === 'matched' && (isLeft || isRight);
                    const isDiscarded = idx > current.rightIdx;

                    return (
                      <div
                        key={idx}
                        className={`h-24 sm:h-28 rounded-2xl border-2 flex flex-col items-center justify-center p-2 relative transition-all duration-300 ${
                          isTargetMatched
                            ? 'bg-emerald-100/90 border-emerald-500 shadow-md scale-105'
                            : isLeft
                            ? 'bg-blue-50/90 border-blue-500 shadow-sm'
                            : isRight
                            ? 'bg-amber-50/90 border-amber-500 shadow-sm'
                            : isDiscarded
                            ? 'bg-slate-100/60 border-dashed border-slate-300 opacity-40'
                            : 'bg-white border-slate-300'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-slate-400 absolute top-2 left-3">
                          [{idx}]
                        </span>
                        <span className={`text-2xl sm:text-3xl font-extrabold font-mono ${
                          isDiscarded ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}>
                          {val}
                        </span>
                        {isDiscarded && (
                          <span className="text-[9px] font-mono text-rose-500 font-bold mt-1">
                            discarded
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pointer indicator Row Bottom */}
                <div className="grid grid-cols-4 gap-4 mt-2 text-center font-mono font-bold text-xs">
                  {arrayData.map((_, idx) => (
                    <div key={`bottom-${idx}`} className="h-7 flex flex-col items-center justify-start">
                      {idx === current.rightIdx && (
                        <div className="text-amber-600 flex flex-col items-center animate-bounce">
                          <span className="text-xs">↑</span>
                          <span className="text-[11px] font-extrabold">R (Right)</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Step Explanation Card */}
            <div className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono text-xs font-bold">
                    Sum = {current.sum}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    Condition: <strong className="text-slate-900">{current.condition}</strong>
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {current.action}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono">
                <strong className="text-slate-900">Sai Anna Note:</strong> {current.note}
              </p>
            </div>

          </div>

          {/* Bottom comparison footer */}
          <div className="p-4 bg-slate-950 rounded-2xl mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400 text-center">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Talking-Head Cognitive Distraction</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Works on low-speed 4G college networks</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free for students, ₹0 server cost for studio</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
