import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  Hand, 
  PhoneOff, 
  CheckCircle2, 
  MoreVertical,
  Users,
  MessageSquare
} from 'lucide-react';

export default function RoughPaperEngine({ onOpenWaitlist }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [pointerSubStep, setPointerSubStep] = useState(0); // 0, 1, 2 for dry run
  const [isHandRaised, setIsHandRaised] = useState(false);

  const stages = [
    {
      id: 'trap',
      title: '01. The Trap',
      subtitle: 'Why 90% of candidates fail sorted array rounds',
      dialogue: 'Rey tammudu, interview tension lo direct ga 2 nested loops rasesi O(N²) chestharu. 100K inputs ki browser crash avuthundhi — recruiter screen meeda TLE chusi ventane reject chesthadu!',
      audioTime: '0:28'
    },
    {
      id: 'analogy',
      title: '02. Bridge Walk',
      subtitle: 'The two-pointer physical intuition',
      dialogue: 'Array already sorted undhi ra. Okaru bridge start lo (Left), inkokaru bridge end lo (Right) nunchi center ki nadavandi. Sum thakkuva unte Left++ mundhuku, ekkuva unte Right-- venakki!',
      audioTime: '1:14'
    },
    {
      id: 'trace',
      title: '03. Chalk Dry Run',
      subtitle: 'Live memory pointer walk on [ 2, 7, 11, 15 ] Target=18',
      dialogue: 'Watch my pen on the board: Left at index 0 (val 2), Right at index 3 (val 15). Sum = 17 < 18! Need a bigger sum? Move Left pointer rightward. Chusava, only 3 operations lo target reached!',
      audioTime: '2:05'
    },
    {
      id: 'proof',
      title: '04. Final Offer',
      subtitle: 'Amazon SDE-1 bar cleared with O(N) runtime',
      dialogue: 'Target 18 matched at indices [1, 2]! Time: O(N) linear pass. Space: O(1) auxiliary memory. All edge cases cleared. Recruiter impression locked!',
      audioTime: '3:18'
    }
  ];

  // Auto-cycle through the 4 stages when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
      setPointerSubStep(0);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  // Pointer sub-step timer during stage 2 (chalk dry run)
  useEffect(() => {
    if (currentStage !== 2) return;
    const subInterval = setInterval(() => {
      setPointerSubStep((prev) => (prev + 1) % 3);
    }, 2200);
    return () => clearInterval(subInterval);
  }, [currentStage]);

  const activeStageData = stages[currentStage];

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    onOpenWaitlist('Ask Sai Anna a Doubt in Google Meet');
  };

  return (
    <section id="rough-paper" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Real understanding happens on a live whiteboard,{' '}
            <span className="text-emerald-700">not pre-recorded lecture slides.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Connect 1-on-1 with Sai Anna in a live Google Meet call. He shares his digital screen and writes live sketches with colored markers — breaking down tricky algorithmic intuition by hand just like an elder brother.
          </p>
        </div>

        {/* Realistic Google Meet Call Container */}
        <div className="bg-[#202124] rounded-3xl shadow-2xl border border-slate-800 overflow-hidden text-white">
          
          {/* Google Meet Browser Tab / Header Bar */}
          <div className="px-4 py-3 bg-[#171717] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              {/* Red Recording Dot */}
              <div className="flex items-center gap-2 bg-[#2d1b1e] px-2.5 py-1 rounded-full border border-rose-900/60">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="text-rose-200 font-bold text-[11px] uppercase tracking-wider">
                  REC
                </span>
              </div>

              <span className="text-slate-600">|</span>

              {/* Presenting Screen Pill */}
              <div className="flex items-center gap-2 bg-blue-950/80 text-blue-300 border border-blue-800/80 px-3 py-1 rounded-full text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Sai Anna is presenting to everyone</span>
              </div>
            </div>

            {/* Meet Top Right Info */}
            <div className="flex items-center gap-4 text-slate-300 text-xs">
              <span className="hidden sm:inline-block font-semibold">meet.google.com/sai-mentorship-live</span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-xs">2</span>
              </div>
            </div>
          </div>

          {/* Whiteboard Stage Navigation Selector */}
          <div className="bg-[#1f1f1f] px-4 py-2 border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center gap-2">
              {stages.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => {
                    setCurrentStage(idx);
                    setPointerSubStep(0);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    currentStage === idx
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {stage.title}
                </button>
              ))}
            </div>

            {/* Play/Pause Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 text-amber-400" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* THE PURE BLACK SCREEN-SHARED WHITEBOARD (Matches Image 1, 2, 3) */}
          <div className="relative bg-[#000000] w-full aspect-[16/9] min-h-[420px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden">
            
            {/* STAGE 0: The Trap (Nested Loops & TLE) */}
            {currentStage === 0 && (
              <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                
                {/* Top Section: Problem & The Nested Loop Trap */}
                <div className="space-y-4">
                  {/* Topic written by hand */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-marker text-2xl sm:text-3xl text-white">
                      Problem: Two Sum II (Sorted Array)
                    </span>
                    <span className="font-marker text-xl sm:text-2xl text-yellow-300">
                      Target = 18
                    </span>
                  </div>

                  {/* Hand-drawn Brute Force Bracket with Red Cross */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="relative pl-6">
                      {/* Hand-drawn Left Bracket '[' in Pink */}
                      <svg className="absolute left-0 top-0 h-full w-4" viewBox="0 0 16 100" fill="none">
                        <path d="M 12 2 Q 4 4 4 16 L 4 84 Q 4 96 12 98" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                      
                      <p className="font-marker text-xl sm:text-2xl text-rose-400">
                        for i in 0..N:
                      </p>
                      <p className="font-marker text-xl sm:text-2xl text-rose-400 pl-6">
                        for j in (i+1)..N:
                      </p>
                      <p className="font-marker text-lg sm:text-xl text-rose-300 pl-12">
                        if nums[i] + nums[j] == 18: return [i, j]
                      </p>

                      {/* Big Hand-drawn Red Cross ✗ */}
                      <svg className="absolute -right-12 top-4 w-12 h-12" viewBox="0 0 40 40" fill="none">
                        <path d="M 6 6 L 34 34 M 34 6 L 6 34" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* Explanatory Callout in Pink Marker */}
                    <div className="sm:ml-12 space-y-1">
                      <p className="font-marker text-2xl text-rose-400 font-bold">
                        O(N²) Nested Loop Trap!
                      </p>
                      <p className="font-marker text-xl text-slate-300">
                        N = 100,000 → 10,000,000,000 operations
                      </p>
                      <div className="inline-block mt-1 px-3 py-0.5 rounded border border-rose-500 text-rose-400 font-marker text-lg">
                        Time Limit Exceeded (Rejected ✗)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Hand-drawn Crowd of 90% Rejected Candidates (Like Image 2 & 3) */}
                <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* SVG Crowd of People heads */}
                    <svg className="w-48 h-12" viewBox="0 0 200 45" fill="none">
                      {/* Row 1 heads */}
                      <circle cx="20" cy="12" r="7" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="45" cy="10" r="7" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="70" cy="13" r="7" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="95" cy="11" r="7" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="120" cy="14" r="7" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="145" cy="10" r="7" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="170" cy="12" r="7" stroke="#ffffff" strokeWidth="2" />

                      {/* Row 2 heads and shoulders */}
                      <path d="M 10 35 Q 20 25 30 35 M 35 33 Q 45 23 55 33 M 60 36 Q 70 26 80 36 M 85 34 Q 95 24 105 34 M 110 37 Q 120 27 130 37 M 135 33 Q 145 23 155 33 M 160 35 Q 170 25 180 35" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>

                    <div className="space-y-0.5">
                      <p className="font-marker text-xl text-slate-300">
                        90% candidates stuck in brute force loops
                      </p>
                      <p className="font-marker text-base text-rose-400">
                        Panic under 45-min interview pressure
                      </p>
                    </div>
                  </div>

                  {/* Yellow Strikethrough Arrow (Like Image 2) */}
                  <div className="flex items-center gap-2">
                    <svg className="w-24 h-8" viewBox="0 0 90 25" fill="none">
                      <path d="M 5 15 L 75 15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 68 8 L 80 15 L 68 22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M 35 4 L 45 22" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span className="font-marker text-xl text-yellow-300">
                      coding blindly ✗
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* STAGE 1: The Visceral Analogy (Bridge Walk, Like Image 1) */}
            {currentStage === 1 && (
              <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                
                {/* Top Section */}
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-marker text-2xl sm:text-3xl text-white">
                      The Bridge Walk Intuition
                    </span>
                    <span className="font-marker text-xl text-sky-400">
                      (Array is already SORTED!)
                    </span>
                  </div>
                  <p className="font-marker text-xl text-slate-300">
                    Two friends walking from opposite ends of a narrow bridge towards the middle:
                  </p>
                </div>

                {/* Center: The Hand-Drawn Timeline / Bridge (Directly matching Image 1!) */}
                <div className="py-6 my-auto">
                  <div className="relative max-w-2xl mx-auto">
                    
                    {/* Hand-drawn Bridge Horizontal Arrow (Image 1 Style) */}
                    <svg className="w-full h-24" viewBox="0 0 600 80" fill="none">
                      {/* Main horizontal axis line */}
                      <path d="M 30 40 Q 300 38 560 40" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                      
                      {/* Arrowhead at right */}
                      <path d="M 545 32 L 565 40 L 545 48" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Left Point: Blue hash mark & Circle */}
                      <path d="M 80 30 L 80 50" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="80" cy="40" r="6" stroke="#ffffff" strokeWidth="2.5" fill="#000000" />
                      
                      {/* Left downward arrow to label */}
                      <path d="M 80 52 L 80 72 M 75 66 L 80 72 L 85 66" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

                      {/* Right Point: Amber hash mark & Circle */}
                      <path d="M 480 30 L 480 50" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="480" cy="40" r="6" stroke="#ffffff" strokeWidth="2.5" fill="#000000" />

                      {/* Right downward arrow to label */}
                      <path d="M 480 52 L 480 72 M 475 66 L 480 72 L 485 66" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />

                      {/* Yellow Curly Bracket across the span (Exact match to Image 1: { 7 months }) */}
                      <path 
                        d="M 90 25 Q 180 25 270 25 Q 285 25 285 10 Q 285 25 300 25 Q 390 25 470 25" 
                        stroke="#facc15" 
                        strokeWidth="2.5" 
                        fill="none" 
                        strokeLinecap="round" 
                      />
                    </svg>

                    {/* Handwriting labels placed exactly around the drawing */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
                      <span className="font-marker text-2xl text-yellow-300 font-bold">
                        Walk Towards Center
                      </span>
                    </div>

                    <div className="flex justify-between px-6 pt-1">
                      <div className="text-left">
                        <p className="font-marker text-2xl text-sky-400 font-bold">
                          Left = 0 (Start)
                        </p>
                        <p className="font-marker text-lg text-slate-300">
                          Smallest Values
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-marker text-2xl text-amber-400 font-bold">
                          Right = N-1 (End)
                        </p>
                        <p className="font-marker text-lg text-slate-300">
                          Largest Values
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Invariant Rules written in casual marker handwriting */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-900">
                  <div className="flex items-start gap-2">
                    <span className="font-marker text-2xl text-sky-400">→</span>
                    <p className="font-marker text-xl text-slate-200">
                      <strong className="text-sky-300">If Current Sum &lt; Target:</strong> We need a bigger sum. Advance Left pointer forward: <span className="text-sky-400">L++</span>
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="font-marker text-2xl text-amber-400">←</span>
                    <p className="font-marker text-xl text-slate-200">
                      <strong className="text-amber-300">If Current Sum &gt; Target:</strong> We need a smaller sum. Pull Right pointer backward: <span className="text-amber-400">R--</span>
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* STAGE 2: Live Chalk Dry Run (Matching Image 2 & 3 Stylus Drawings) */}
            {currentStage === 2 && (
              <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                
                {/* Header */}
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="font-marker text-2xl sm:text-3xl text-white">
                      Live Marker Dry Run:
                    </span>
                    <span className="font-marker text-2xl text-yellow-300">
                      Target = 18
                    </span>
                  </div>

                  {/* Step Selector */}
                  <div className="flex items-center gap-2">
                    <span className="font-marker text-lg text-slate-400">Step:</span>
                    {[0, 1, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => setPointerSubStep(s)}
                        className={`w-6 h-6 rounded-full font-marker text-base flex items-center justify-center cursor-pointer transition-all ${
                          pointerSubStep === s
                            ? 'bg-yellow-400 text-black font-bold scale-110'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {s + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Center: Hand-drawn Array Boxes & Stylus Arrows */}
                <div className="my-auto py-4">
                  <div className="max-w-xl mx-auto">
                    
                    {/* SVG Array with Hand-drawn style boxes */}
                    <div className="flex items-center justify-center gap-4 sm:gap-8">
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
                        const isTarget = pointerSubStep === 2 && (item.index === 1 || item.index === 2);

                        return (
                          <div key={item.index} className="flex flex-col items-center">
                            
                            {/* Top Pointer Indicator */}
                            <div className="h-10 flex flex-col items-center justify-end">
                              {isLeft && (
                                <div className="flex flex-col items-center animate-bounce">
                                  <span className="font-marker text-2xl text-sky-400 font-bold">
                                    L={item.index}
                                  </span>
                                  <span className="text-sky-400 font-marker text-xl leading-none">↓</span>
                                </div>
                              )}
                            </div>

                            {/* Rough Hand-drawn Memory Box */}
                            <div className="relative">
                              <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 70 70" fill="none">
                                {/* Hand-drawn imperfect square */}
                                <path 
                                  d="M 6 8 Q 35 6 64 7 Q 63 35 64 63 Q 35 65 7 63 Q 6 35 6 8" 
                                  stroke={isTarget ? '#4ade80' : isLeft ? '#38bdf8' : isRight ? '#fbbf24' : '#ffffff'} 
                                  strokeWidth={isTarget ? '3.5' : '2'} 
                                  strokeLinecap="round"
                                  fill={isTarget ? '#052e16' : '#000000'}
                                />

                                {/* Target green lasso circle if matched */}
                                {isTarget && (
                                  <ellipse 
                                    cx="35" 
                                    cy="35" 
                                    rx="30" 
                                    ry="30" 
                                    stroke="#4ade80" 
                                    strokeWidth="2" 
                                    strokeDasharray="4 3" 
                                  />
                                )}
                              </svg>
                              
                              {/* Element Value inside */}
                              <span className={`absolute inset-0 flex items-center justify-center font-marker text-3xl sm:text-4xl font-bold ${
                                isTarget ? 'text-emerald-300' : isLeft ? 'text-sky-300' : isRight ? 'text-amber-300' : 'text-white'
                              }`}>
                                {item.val}
                              </span>
                            </div>

                            {/* Bottom Pointer Indicator or Index */}
                            <div className="h-10 flex flex-col items-center justify-start mt-1">
                              {isRight && (
                                <div className="flex flex-col items-center animate-bounce">
                                  <span className="text-amber-400 font-marker text-xl leading-none">↑</span>
                                  <span className="font-marker text-2xl text-amber-400 font-bold">
                                    R={item.index}
                                  </span>
                                </div>
                              )}
                              {!isRight && (
                                <span className="font-marker text-lg text-slate-500">
                                  i={item.index}
                                </span>
                              )}
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {/* Hand-drawn Curly Brace Math Calculation (Like Image 1) */}
                    <div className="mt-4 p-3 rounded-lg border border-slate-900 bg-slate-950/60 max-w-md mx-auto text-center">
                      {pointerSubStep === 0 && (
                        <p className="font-marker text-2xl text-yellow-300">
                          {`{ Sum: nums[0] + nums[3] = 2 + 15 = 17 }`}
                          <br />
                          <span className="text-sky-400 text-xl">
                            17 &lt; 18 → Sum is small → Advance Left: L++
                          </span>
                        </p>
                      )}

                      {pointerSubStep === 1 && (
                        <p className="font-marker text-2xl text-yellow-300">
                          {`{ Sum: nums[1] + nums[3] = 7 + 15 = 22 }`}
                          <br />
                          <span className="text-amber-400 text-xl">
                            22 &gt; 18 → Sum is big → Pull Right: R--
                          </span>
                        </p>
                      )}

                      {pointerSubStep === 2 && (
                        <p className="font-marker text-2xl text-emerald-400 font-bold">
                          {`{ Sum: nums[1] + nums[2] = 7 + 11 = 18 == Target! }`}
                          <br />
                          <span className="text-white text-xl">
                            ✓ MATCHED! Return indices [1, 2] in 3 operations!
                          </span>
                        </p>
                      )}
                    </div>

                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                  <p className="font-marker text-xl text-slate-300">
                    Marker Trace: Array bounds shrink inwards in single O(N) pass
                  </p>
                  <span className="font-marker text-xl text-emerald-400">
                    O(1) Auxiliary Memory
                  </span>
                </div>

              </div>
            )}

            {/* STAGE 3: Mathematical Proof & The Offer (Matching Image 2 & 3) */}
            {currentStage === 3 && (
              <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                
                {/* Top Section */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-marker text-3xl sm:text-4xl text-emerald-400 font-bold">
                      Amazon SDE-1 Placement Bar: PASSED ✓
                    </span>
                  </div>
                  <p className="font-marker text-xl text-slate-300">
                    Deterministic verification — zero guesswork, 50/50 test suites cleared:
                  </p>
                </div>

                {/* Center: Hand-drawn Comparison Brackets (Like Image 2 & 3) */}
                <div className="my-auto py-2 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
                  
                  {/* Left Column: Complexity Proof in Green Marker */}
                  <div className="relative pl-6">
                    <svg className="absolute left-0 top-0 h-full w-4" viewBox="0 0 16 90" fill="none">
                      <path d="M 12 2 Q 4 4 4 14 L 4 76 Q 4 86 12 88" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>

                    <p className="font-marker text-2xl text-emerald-400 font-bold">
                      Time Complexity: O(N)
                    </p>
                    <p className="font-marker text-lg text-slate-300">
                      Each element visited at most once.
                    </p>
                    <p className="font-marker text-xl text-yellow-300 mt-2">
                      Space Complexity: O(1)
                    </p>
                    <p className="font-marker text-lg text-slate-300">
                      Zero extra hash maps or memory arrays.
                    </p>
                  </div>

                  {/* Right Column: Hand-drawn Lasso around Placement Offer (Like Image 3) */}
                  <div className="relative border border-emerald-500/40 rounded-2xl p-4 bg-emerald-950/20 text-center flex flex-col justify-center">
                    <p className="font-marker text-3xl text-emerald-300 font-bold">
                      Top Offer Secured
                    </p>
                    <p className="font-marker text-xl text-white mt-1">
                      Tier-2 / Tier-3 → Amazon SDE-1
                    </p>
                    <div className="mt-2 inline-flex items-center justify-center gap-1.5 text-emerald-400 font-marker text-lg">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Edge cases covered (duplicates, negatives)</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Crowd with Blue Arrow Shooting to Offer (Exact Image 3 Style!) */}
                <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Lassoed crowd */}
                    <div className="relative">
                      <svg className="w-36 h-10" viewBox="0 0 150 40" fill="none">
                        <circle cx="20" cy="12" r="6" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="45" cy="10" r="6" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="70" cy="13" r="6" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="95" cy="11" r="6" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="120" cy="14" r="6" stroke="#ffffff" strokeWidth="2" />
                        <path d="M 12 32 Q 20 22 28 32 M 37 30 Q 45 20 53 30 M 62 33 Q 70 23 78 33 M 87 31 Q 95 21 103 31 M 112 34 Q 120 24 128 34" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                        
                        {/* Blue Hand-drawn Lasso Oval (Image 3 Style) */}
                        <ellipse cx="70" cy="22" rx="65" ry="16" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />
                      </svg>
                    </div>

                    {/* Arrow shooting from crowd */}
                    <span className="font-marker text-2xl text-sky-400">
                      ↗ unlock value
                    </span>
                  </div>

                  <span className="font-marker text-2xl text-yellow-300">
                    Permanent Mental Model
                  </span>
                </div>

              </div>
            )}

            {/* FLOATING GOOGLE MEET CANDIDATE PIP (Bottom Right Corner) */}
            <div className="absolute bottom-5 right-5 hidden sm:flex items-center gap-2 bg-[#202124]/90 backdrop-blur-md p-2 rounded-2xl border border-slate-700/80 shadow-2xl z-20">
              
              {/* You (Candidate) Video Tile */}
              <div className="w-24 h-16 rounded-xl bg-slate-900 border border-slate-700 flex flex-col justify-between p-1.5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-300">You</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500">Listening</span>
                </div>
              </div>

              {/* Sai Anna Video Tile with active audio rings */}
              <div className="w-24 h-16 rounded-xl bg-slate-900 border border-emerald-500/60 flex flex-col justify-between p-1.5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-emerald-400">Sai Anna</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-emerald-300 font-semibold">Speaking</span>
                </div>
              </div>

            </div>

          </div>

          {/* Real-time Telugu-English Dialogue Subtitle Bar */}
          <div className="px-5 py-3 bg-[#171717] border-t border-slate-800 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-slate-200 font-marker text-lg sm:text-xl truncate">
                "{activeStageData.dialogue}"
              </p>
            </div>
            <span className="text-[11px] text-slate-400 whitespace-nowrap">
              {activeStageData.audioTime}
            </span>
          </div>

          {/* REALISTIC GOOGLE MEET BOTTOM CONTROL BAR */}
          <div className="px-6 py-4 bg-[#202124] border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Left: Meeting Time & Code */}
            <div className="text-xs text-slate-300 font-medium">
              10:42 AM <span className="text-slate-600 mx-2">|</span> <span className="font-semibold text-white">sai-anna-live-call</span>
            </div>

            {/* Center: Google Meet Circular Control Pills */}
            <div className="flex items-center gap-3">
              
              {/* Mic Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isMuted 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                    : 'bg-[#3c4043] hover:bg-[#4a4e51] text-white'
                }`}
                title={isMuted ? "Unmute microphone" : "Mute microphone"}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Camera Button */}
              <button
                className="w-10 h-10 rounded-full bg-[#3c4043] hover:bg-[#4a4e51] text-white flex items-center justify-center transition-all cursor-pointer"
                title="Camera is active"
              >
                <VideoIcon className="w-4 h-4" />
              </button>

              {/* Raise Hand Button */}
              <button
                onClick={handleRaiseHand}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isHandRaised 
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold' 
                    : 'bg-[#3c4043] hover:bg-[#4a4e51] text-white'
                }`}
                title="Raise hand to ask Anna a question"
              >
                <Hand className="w-4 h-4" />
              </button>

              {/* Presenting Screen Badge */}
              <div 
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
                title="You are viewing Sai Anna's screen"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              </div>

              {/* More Options */}
              <button
                className="w-10 h-10 rounded-full bg-[#3c4043] hover:bg-[#4a4e51] text-white flex items-center justify-center transition-all cursor-pointer hidden sm:flex"
                title="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* End Call / Leave Button (Triggers 1-on-1 waitlist booking) */}
              <button
                onClick={() => onOpenWaitlist('Book 1-on-1 Live Whiteboard Call')}
                className="px-5 h-10 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ml-2 shadow-sm"
                title="End Call or Schedule 1-on-1 Call"
              >
                <PhoneOff className="w-4 h-4" />
                <span className="hidden sm:inline">Join Next Alpha Call</span>
              </button>

            </div>

            {/* Right: Meeting Info Shortcuts */}
            <div className="flex items-center gap-3 text-slate-400 text-xs">
              <button 
                onClick={() => onOpenWaitlist('Open Whiteboard Chat')}
                className="p-2 rounded-full hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer" 
                title="Open meeting chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>HD 60 FPS</span>
              </div>
            </div>

          </div>

        </div>

        {/* 3 Real-World Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950">
              Raw Thought Process, Zero Slides
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              No generic PowerPoint bullet points or distracting AI video avatars. Sai Anna live-sketches every line, bracket, and arrow by hand so you see how an engineer actually thinks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950">
              Visceral Hand-Drawn Anchors
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Rough brackets, curly braces, and crowd arrows. Physical visual markers you can effortlessly recreate and recall under 45-minute technical interview pressure.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950">
              Zero Video Bills, 100% Client-Side
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Built as lightweight vector paths and authentic handwriting. Zero streaming bandwidth bills, zero external video hosting dependencies, and instant 60 FPS rendering.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
