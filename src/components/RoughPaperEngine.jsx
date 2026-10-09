import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  Share2, 
  Hand, 
  PhoneOff, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Volume2
} from 'lucide-react';

export default function RoughPaperEngine({ onOpenWaitlist }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [pointerSubStep, setPointerSubStep] = useState(0); // 0, 1, 2 for dry run

  const stages = [
    {
      id: 'trap',
      title: '01. The Interview Trap',
      subtitle: 'Why 90% of candidates get rejected on sorted arrays',
      chalkColor: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      badge: 'TIME LIMIT EXCEEDED TRAP',
      dialogue: 'Rey tammudu, interview lo panic ayyi direct ga 2 nested loops rasestharu. 100,000 elements unte 10 Billion operations avuthayi — recruiter screen meeda TLE chusi ventane reject chesthadu!',
      audioTime: '0:34'
    },
    {
      id: 'analogy',
      title: '02. The Visceral Analogy',
      subtitle: 'The two-way bridge walk mental model',
      chalkColor: 'text-sky-400',
      borderColor: 'border-sky-500/30',
      badge: 'INTUITION ANCHOR',
      dialogue: 'Array already sorted ga undhi ra. Okaru bridge start lo (Left), inkokaru bridge end lo (Right) nunchi nadavandi. Sum thakkuva unte Left ni mundhuku jarpali, ekkuva unte Right ni venakki jarpali!',
      audioTime: '1:12'
    },
    {
      id: 'trace',
      title: '03. Live Chalk Dry Run',
      subtitle: 'Real-time pointer stepping on [2, 7, 11, 15] Target=18',
      chalkColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      badge: 'MEMORY POINTER TRACE',
      dialogue: 'Watch my chalk: Left pointer at index 0 (val 2), Right at index 3 (val 15). Sum = 17 < 18! Need a bigger sum? Move Left pointer forward. Look at the magic in 3 operations!',
      audioTime: '2:05'
    },
    {
      id: 'proof',
      title: '04. Mathematical Proof',
      subtitle: 'O(N) single-pass speed and zero auxiliary memory',
      chalkColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      badge: 'DETERMINISTIC SUCCESS',
      dialogue: 'Target 18 matched at indices [1, 2]! Time Complexity: O(N) linear time. Space: O(1) auxiliary. All edge cases (duplicates, negative pairs) passed. Interview round cleared!',
      audioTime: '3:20'
    }
  ];

  // Auto-play through stages
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
      setPointerSubStep(0);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  // Pointer sub-step timer during stage 2 (chalk dry run)
  useEffect(() => {
    if (currentStage !== 2) return;
    const subInterval = setInterval(() => {
      setPointerSubStep((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(subInterval);
  }, [currentStage]);

  const activeStageData = stages[currentStage];

  return (
    <section id="rough-paper" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header: Clean, No text pill, Focus on WHY */}
        <div className="max-w-3xl mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Real understanding happens on a live whiteboard,{' '}
            <span className="text-emerald-700">not pre-recorded lecture slides.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Just like an experienced senior pulling you into a 1-on-1 Google Meet call — sharing a live digital blackboard, sketching algorithmic intuition with hand-drawn chalk, and walking you through every edge case until the mental model clicks.
          </p>
        </div>

        {/* Google Meet Style Container */}
        <div className="bg-[#0b0f17] rounded-3xl p-3 sm:p-5 shadow-2xl border border-slate-800 relative overflow-hidden">
          
          {/* Google Meet Top Bar */}
          <div className="px-4 py-3 bg-[#131b26] rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs mb-3 border border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">
                  REC • 1-on-1 Mentorship
                </span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-semibold">
                  Sai Anna (Presenting Screen)
                </span>
                <span className="hidden sm:inline-block text-slate-400 text-[11px]">
                  Topic: Two Sum II (Sorted Array)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-slate-300 font-semibold">meet.thesurfboard.in/sai-live</span>
              </div>
            </div>
          </div>

          {/* Stages Navigation Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            {stages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => {
                  setCurrentStage(idx);
                  setPointerSubStep(0);
                  setIsPlaying(false);
                }}
                className={`px-3 py-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  currentStage === idx
                    ? 'bg-[#182333] border-slate-600 text-white shadow-sm'
                    : 'bg-[#101722]/80 border-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-[#141d2b]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold block truncate">
                    {stage.title}
                  </span>
                  {currentStage === idx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {stage.badge}
                </p>
              </button>
            ))}
          </div>

          {/* The Live Whiteboard Canvas Stage */}
          <div className="relative rounded-2xl overflow-hidden bg-[#0d1117] border border-slate-800 aspect-[16/9] min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-5 sm:p-7 bg-board-pattern">
            
            {/* Whiteboard Top Canvas Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-slate-900 border ${activeStageData.borderColor} ${activeStageData.chalkColor}`}>
                    {activeStageData.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
                    Candidate Problem: Given sorted array nums, return indices where sum = target (18)
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {activeStageData.subtitle}
                </h3>
              </div>

              {/* Play / Pause toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Pause Stream</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                      <span className="hidden sm:inline">Auto Play</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Stage-Specific SVG Chalk Diagram Render */}
            <div className="my-auto py-4">
              
              {/* STAGE 0: The Brute-Force Trap */}
              {currentStage === 0 && (
                <div className="max-w-2xl mx-auto space-y-6 text-center animate-in fade-in duration-300">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Classical Trap: O(N²) Nested Iteration</span>
                  </div>

                  {/* Chalk Code Diagram */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/20 max-w-lg mx-auto text-left shadow-lg">
                    <p className="text-slate-400 text-xs">// What 90% students write under interview stress:</p>
                    <p className="text-rose-400 font-semibold text-xs mt-1">for (int i = 0; i &lt; n; i++) &#123;</p>
                    <p className="text-rose-400 font-semibold text-xs pl-4">for (int j = i + 1; j &lt; n; j++) &#123;</p>
                    <p className="text-rose-300 text-xs pl-8">if (nums[i] + nums[j] == target) return &#123;i, j&#125;;</p>
                    <p className="text-rose-400 font-semibold text-xs pl-4">&#125;</p>
                    <p className="text-rose-400 font-semibold text-xs">&#125;</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
                    <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/60 text-left">
                      <span className="text-[10px] text-rose-300 uppercase font-bold tracking-wider">Input Size</span>
                      <p className="text-lg font-extrabold text-white">N = 100,000</p>
                      <p className="text-[11px] text-slate-400">10^10 operations required</p>
                    </div>

                    <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-left">
                      <span className="text-[10px] text-rose-300 uppercase font-bold tracking-wider">Execution Result</span>
                      <p className="text-lg font-extrabold text-rose-400">Time Limit Exceeded</p>
                      <p className="text-[11px] text-rose-200">Exceeds 2.0s limit (Rejected)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 1: Visceral Analogy (Bridge Walk) */}
              {currentStage === 1 && (
                <div className="max-w-3xl mx-auto space-y-6 text-center animate-in fade-in duration-300">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Sai Anna's Intuition: Two Friends on a Narrow Bridge</span>
                  </div>

                  {/* Bridge SVG Representation */}
                  <div className="relative p-6 rounded-2xl bg-slate-950/80 border border-sky-500/30">
                    <div className="flex items-center justify-between max-w-md mx-auto mb-4">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                          Friend A (Left = 0)
                        </span>
                        <span className="text-sm text-slate-300 mt-1">Smallest Values</span>
                      </div>
                      
                      <div className="text-center px-4">
                        <span className="text-xs font-extrabold text-white block">BRIDGE WALK</span>
                        <span className="text-[10px] text-slate-400">Walk towards center</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                          Friend B (Right = N-1)
                        </span>
                        <span className="text-sm text-slate-300 mt-1">Largest Values</span>
                      </div>
                    </div>

                    {/* Bridge Roadway */}
                    <div className="h-3 rounded-full bg-gradient-to-r from-sky-600 via-slate-700 to-amber-600 max-w-md mx-auto relative">
                      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 border-sky-500 animate-pulse"></div>
                      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 border-amber-500 animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-6 text-left text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-sky-400 font-bold block">If Current Sum &lt; Target:</span>
                        <span className="text-slate-300 text-[11px]">We need bigger numbers. Advance Left pointer rightward (L++).</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-amber-400 font-bold block">If Current Sum &gt; Target:</span>
                        <span className="text-slate-300 text-[11px]">We need smaller numbers. Pull Right pointer leftward (R--).</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2: Live Pointer Walk (Dry Run on Whiteboard) */}
              {currentStage === 2 && (
                <div className="max-w-3xl mx-auto space-y-6 text-center animate-in fade-in duration-300">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                    <span>Target = 18</span>
                    <span>•</span>
                    <span>Array: [ 2, 7, 11, 15 ]</span>
                  </div>

                  {/* Array Elements Visualizer */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
                    {[
                      { index: 0, val: 2 },
                      { index: 1, val: 7 },
                      { index: 2, val: 11 },
                      { index: 3, val: 15 }
                    ].map((item) => {
                      const isLeft = (pointerSubStep === 0 && item.index === 0) || 
                                     (pointerSubStep >= 1 && item.index === 1);
                      const isRight = (pointerSubStep <= 1 && item.index === 3) || 
                                      (pointerSubStep === 2 && item.index === 2);
                      const isMatch = pointerSubStep === 2 && (item.index === 1 || item.index === 2);

                      return (
                        <div key={item.index} className="flex flex-col items-center">
                          {/* Pointer Label Top */}
                          <div className="h-6 flex items-center justify-center mb-1">
                            {isLeft && (
                              <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-bold text-[10px] animate-bounce">
                                L ({item.index})
                              </span>
                            )}
                            {isRight && !isLeft && (
                              <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px] animate-bounce">
                                R ({item.index})
                              </span>
                            )}
                          </div>

                          {/* Memory Box */}
                          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-extrabold border-2 transition-all ${
                            isMatch
                              ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 scale-105 shadow-lg shadow-emerald-950/50'
                              : isLeft || isRight
                              ? 'bg-slate-800 border-sky-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}>
                            {item.val}
                          </div>

                          {/* Index Label Bottom */}
                          <span className="text-[10px] text-slate-400 font-semibold mt-1">
                            i = {item.index}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step State Explanation Card */}
                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 max-w-md mx-auto text-left">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400 font-semibold">Dry Run Step {pointerSubStep + 1} of 3</span>
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((s) => (
                          <button
                            key={s}
                            onClick={() => setPointerSubStep(s)}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                              pointerSubStep === s ? 'bg-amber-400 w-4' : 'bg-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {pointerSubStep === 0 && (
                      <p className="text-xs text-slate-200">
                        <strong className="text-sky-400">Check:</strong> 2 + 15 = <span className="text-amber-300 font-bold">17</span>. 
                        Target is 18. Since 17 &lt; 18, sum is too small. 
                        <strong className="text-emerald-400 ml-1">Action: Left++</strong>
                      </p>
                    )}

                    {pointerSubStep === 1 && (
                      <p className="text-xs text-slate-200">
                        <strong className="text-sky-400">Check:</strong> Left moved to index 1 (val 7). 7 + 15 = <span className="text-amber-300 font-bold">22</span>. 
                        Since 22 &gt; 18, sum is too large. 
                        <strong className="text-emerald-400 ml-1">Action: Right--</strong>
                      </p>
                    )}

                    {pointerSubStep === 2 && (
                      <p className="text-xs text-emerald-300 font-semibold">
                        ✓ <strong className="text-white">Target Found:</strong> Left at index 1 (7), Right at index 2 (11). 
                        7 + 11 = <span className="text-emerald-400 font-bold">18</span> == Target! 
                        Return indices [1, 2]. Finished in 3 operations!
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STAGE 3: Mathematical Proof */}
              {currentStage === 3 && (
                <div className="max-w-2xl mx-auto space-y-6 text-center animate-in fade-in duration-300">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Deterministic Benchmark: Amazon SDE-1 Criteria Passed</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/80 text-left">
                      <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">
                        Time Complexity
                      </span>
                      <p className="text-2xl font-extrabold text-white mt-1">O(N) Linear</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Each element inspected at most once. Max 100K ops (~1.2 ms).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/80 text-left">
                      <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">
                        Space Complexity
                      </span>
                      <p className="text-2xl font-extrabold text-white mt-1">O(1) Auxiliary</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Zero extra hash maps or memory allocated. Strict placement bar.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 max-w-lg mx-auto flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Hidden test suites (50/50 test cases passed)</span>
                    </div>
                    <span className="text-emerald-400 font-bold">100% Pass</span>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Live Audio Transcript Bar (Sai Anna Dialogue) */}
            <div className="bg-[#141d2b]/90 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                    SA
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900"></span>
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Sai Anna</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Volume2 className="w-3 h-3 animate-pulse" />
                    Speaking ({activeStageData.audioTime})
                  </span>
                </div>
              </div>

              {/* Transcript Speech text */}
              <div className="flex-1 text-left">
                <p className="text-xs sm:text-sm text-slate-200 italic font-medium leading-snug">
                  "{activeStageData.dialogue}"
                </p>
              </div>

              {/* Stage Step Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    setCurrentStage((prev) => (prev > 0 ? prev - 1 : stages.length - 1));
                    setPointerSubStep(0);
                    setIsPlaying(false);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentStage((prev) => (prev + 1) % stages.length);
                    setPointerSubStep(0);
                    setIsPlaying(false);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Next Step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Google Meet Bottom Call Controls Dock */}
          <div className="pt-4 pb-2 px-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-900 mt-3">
            <div className="text-xs text-slate-400 font-medium">
              Active Call: <strong className="text-white">Sai Anna Whiteboard Studio (1-on-1)</strong>
            </div>

            {/* Meet control buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                  isMuted ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
                title={isMuted ? "Unmute microphone" : "Mute microphone"}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <div 
                className="p-2.5 rounded-full bg-slate-800 text-white"
                title="Camera active"
              >
                <VideoIcon className="w-4 h-4" />
              </div>

              <div 
                className="p-2.5 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/40"
                title="Whiteboard Screen Sharing Active"
              >
                <Share2 className="w-4 h-4" />
              </div>

              <button 
                onClick={() => onOpenWaitlist('Live Whiteboard Question')}
                className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                title="Raise hand to ask doubt"
              >
                <Hand className="w-4 h-4" />
              </button>

              <button 
                onClick={() => onOpenWaitlist('Join Whiteboard Mentorship')}
                className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer ml-2"
                title="Book your 1-on-1 session"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>Join Alpha Call</span>
              </button>
            </div>
          </div>

        </div>

        {/* 3 Why-It-Works Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950">
              Raw Thought Process, Zero Slides
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              No generic PowerPoint bullet points or distracting AI video avatars. Sai Anna live-sketches every line, box, and model by hand so you see how an engineer actually thinks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950">
              Visceral Visual Anchors
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Green for optimal algorithmic branches, pink for subtle edge-case traps, and real-time pointer walks. Visual mental models you can recall under 45-minute interview pressure.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950">
              Natural Conversational Rhythm
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Explained with authentic elder-brother warmth in relatable Telugu-English dialogue. Stop when confused, explore boundary inputs, and resume with absolute conviction.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
