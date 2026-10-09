import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw,
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  Hand, 
  PhoneOff, 
  MoreVertical,
  Users,
  MessageSquare
} from 'lucide-react';

export default function RoughPaperEngine({ onOpenWaitlist }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  
  // Writing animation progress (1: base, 2: core diagram, 3: details & annotations)
  const [drawPhase, setDrawPhase] = useState(1);
  
  // Subtitle fade state for Zone 2
  const [subtitleOpacity, setSubtitleOpacity] = useState(1);
  const [activeDialogue, setActiveDialogue] = useState('');

  const stages = [
    {
      id: 'crash',
      title: '01. The Crash',
      dialogue: 'Rey tammudu, IPL match appudu 100,000 mandhi oke sari Swiggy open chesthe... Junior developers ventane DB meedhaki SELECT query kotti disk ni champestharu. Hard disk 100,000 times/sec spin avvadhu ra — server dead!',
      time: '0:32',
      penColor: '#f43f5e'
    },
    {
      id: 'analogy',
      title: '02. Biryani Counter',
      dialogue: 'Bawarchi hotel ki velli biryani adagagane, prathi customer kosam kitchen loki velli fresh ga rice vandaru ra! Front counter hot-box lo already 50 packets ready ga untayi — 2 seconds lo ichestharu. Idhe Caching!',
      time: '1:18',
      penColor: '#facc15'
    },
    {
      id: 'arch',
      title: '03. RAM vs Disk',
      dialogue: 'Computer science lo RAM speed nanoseconds lo untundhi, Hard Disk milliseconds. Redis anedhi RAM lo unde giant Key-Value map. First user vachinappude DB nunchi thestham — migatha 99,999 mandhiki 1ms lo Redis ichesthundhi!',
      time: '2:15',
      penColor: '#38bdf8'
    },
    {
      id: 'trap',
      title: '04. Stale Cache Trap',
      dialogue: 'Ikkade interviewer tricky question aduguthadu: "Biryani price ₹250 nunchi ₹290 ki marina, Redis lo old price eh untundhi kada?" ani. Ventane cheppali: "Anna, 5-min TTL expire avvali, lekapothe DB update ayyaka Redis key ni delete chestham"!',
      time: '3:04',
      penColor: '#fb923c'
    },
    {
      id: 'reality',
      title: '05. Engineering Reality',
      dialogue: 'Rey, deenitho repu poddunne direct ga offer vachesthadhi ani nenu fake promises cheppanu. Kaani reality enti ante: 90% candidates scale cheyadam theliyaka L1 lone filter avutharu. Ee memory trade-offs ila explain chesthe, recruiter knows you understand real systems!',
      time: '3:50',
      penColor: '#4ade80'
    }
  ];

  const currentStageData = stages[currentStage];

  // Stage change transition: Reset drawing and handle subtitle fade
  useEffect(() => {
    // 1. Fade out old subtitle
    const fadeTimer = setTimeout(() => {
      setSubtitleOpacity(0);
      setDrawPhase(1);
    }, 15);

    // 2. Change dialogue text and fade back in
    const subTimer = setTimeout(() => {
      setActiveDialogue(currentStageData.dialogue);
      setSubtitleOpacity(1);
    }, 280);

    // 3. Progressive real drawing sequence (paths trace stroke-by-stroke)
    const d1 = setTimeout(() => setDrawPhase(2), 1000);
    const d2 = setTimeout(() => setDrawPhase(3), 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(subTimer);
      clearTimeout(d1);
      clearTimeout(d2);
    };
  }, [currentStage, currentStageData.dialogue]);

  // Auto-play through stages
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    onOpenWaitlist('Ask Sai Anna about Redis & System Design');
  };

  const handleReplay = () => {
    setDrawPhase(1);
    const d1 = setTimeout(() => setDrawPhase(2), 900);
    const d2 = setTimeout(() => setDrawPhase(3), 2200);
    return () => {
      clearTimeout(d1);
      clearTimeout(d2);
    };
  };

  return (
    <section id="rough-paper" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-sans">
            Real understanding happens on a live whiteboard,{' '}
            <span className="text-emerald-700">not pre-recorded lecture slides.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed font-sans">
            Just like an experienced senior pulling you into a 1-on-1 Google Meet call — sharing a live digital blackboard, sketching real-world system architecture by hand with colored markers, and talking through every edge case until the mental model clicks.
          </p>
        </div>

        {/* ZONE 3: GOOGLE MEET UI WRAPPER */}
        <div className="bg-[#202124] rounded-3xl shadow-2xl border border-slate-800 overflow-hidden text-white font-sans">
          
          {/* Meet Browser Header */}
          <div className="px-4 py-3 bg-[#171717] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              {/* Red REC dot */}
              <div className="flex items-center gap-2 bg-[#2d1b1e] px-2.5 py-1 rounded-full border border-rose-900/60">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="text-rose-200 font-bold text-[11px] uppercase tracking-wider font-sans">
                  REC
                </span>
              </div>

              <span className="text-slate-600">|</span>

              {/* Presenting Screen Pill */}
              <div className="flex items-center gap-2 bg-blue-950/80 text-blue-300 border border-blue-800/80 px-3 py-1 rounded-full text-xs font-medium font-sans">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Sai Anna is presenting to everyone</span>
              </div>
            </div>

            {/* Meet Top Right Info */}
            <div className="flex items-center gap-4 text-slate-300 text-xs font-sans">
              <span className="hidden sm:inline-block font-semibold">meet.google.com/sai-mentorship-live</span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-xs">2</span>
              </div>
            </div>
          </div>

          {/* Whiteboard Stage Navigation Selector */}
          <div className="bg-[#1f1f1f] px-4 py-2 border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto font-sans">
            <div className="flex items-center gap-2">
              {stages.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => {
                    setCurrentStage(idx);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer font-sans ${
                    currentStage === idx
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {stage.title}
                </button>
              ))}
            </div>

            {/* Play/Pause & Re-write Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReplay}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer flex items-center gap-1 font-sans"
                title="Re-draw live marker animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Re-write</span>
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer font-sans"
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

          {/* ZONE 1: THE WRITING SPACE (BLACKBOARD — 100% PLAYPEN SANS, HAND-DRAWN ONLY, ZERO STRAIGHT SHAPES) */}
          <div className="relative bg-[#000000] w-full aspect-[16/9] min-h-[460px] sm:min-h-[520px] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden font-board">
            
            {/* Live Writing Pen Tip Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 pointer-events-none z-10">
              <span 
                className="w-2.5 h-2.5 rounded-full animate-pen-pulse"
                style={{ backgroundColor: currentStageData.penColor }}
              ></span>
              <span className="font-board text-base text-slate-300">
                Sai Anna writing...
              </span>
            </div>

            {/* SLIDE 1: The Crash (100K Users vs Postgres Disk) */}
            {currentStage === 0 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Stage Title */}
                <div>
                  <p className="font-board text-2xl sm:text-3xl text-white font-bold">
                    IPL Final: 100,000 Users Order at 8:00 PM
                  </p>
                  <p className="font-board text-xl text-rose-400 mt-1">
                    Direct SQL query to database disk:
                  </p>
                </div>

                {/* Hand-Drawn Wobbly Diagram */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                    
                    {/* Hand-drawn Wobbly User Crowd */}
                    <div className="flex flex-col items-center">
                      <svg className="w-36 h-12 draw-stroke-1" viewBox="0 0 150 45" fill="none">
                        <circle cx="20" cy="12" r="7" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="45" cy="10" r="7" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="70" cy="13" r="7" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="95" cy="11" r="7" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="120" cy="14" r="7" stroke="#ffffff" strokeWidth="2.5" />
                        <path d="M 10 35 C 18 26, 24 24, 30 35 M 35 33 C 43 24, 48 24, 55 33 M 60 36 C 68 25, 74 27, 80 36 M 85 34 C 93 23, 98 25, 105 34 M 110 37 C 118 26, 124 28, 130 37" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                      <span className="font-board text-xl text-yellow-300 font-bold mt-1">
                        100K Users
                      </span>
                      <span className="font-board text-base text-slate-300">
                        Hitting Swiggy App
                      </span>
                    </div>

                    {/* Wobbly Pink Arrow (Hand-drawn stroke tracing) */}
                    {drawPhase >= 2 && (
                      <div className="flex flex-col items-center">
                        <svg className="w-36 h-10 draw-stroke-1" viewBox="0 0 120 30" fill="none">
                          <path d="M 6 16 C 35 13, 70 19, 108 15" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                          <path d="M 96 8 C 103 12, 107 14, 112 15 C 106 18, 101 22, 97 25" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <span className="font-board text-lg text-rose-400 font-bold">
                          SELECT * FROM menu
                        </span>
                      </div>
                    )}

                    {/* Wobbly Hand-Drawn Postgres DB Cylinder */}
                    {drawPhase >= 2 && (
                      <div className="flex flex-col items-center">
                        <svg className="w-32 h-32 draw-stroke-2" viewBox="0 0 90 90" fill="none">
                          {/* Wobbly Top Ellipse */}
                          <path d="M 12 20 C 13 10, 77 10, 78 20 C 78 29, 11 29, 12 20" stroke="#f43f5e" strokeWidth="3" />
                          {/* Wobbly Body */}
                          <path d="M 12 20 C 10 40, 14 60, 12 75 C 25 86, 65 85, 78 75 C 76 60, 80 40, 78 20" stroke="#f43f5e" strokeWidth="3" fill="#150508" />
                          {/* Wobbly Rib */}
                          <path d="M 13 48 C 28 56, 62 56, 77 48" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 3" />
                          {/* Wobbly Cross ✗ */}
                          {drawPhase >= 3 && (
                            <path d="M 22 26 C 36 40, 50 56, 68 70 M 68 26 C 52 42, 38 56, 22 70" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" className="draw-stroke-3" />
                          )}
                        </svg>
                        <span className="font-board text-xl text-rose-300 font-bold">
                          Postgres (Disk)
                        </span>
                        <span className="font-board text-base text-rose-400">
                          100% Disk I/O Crash!
                        </span>
                      </div>
                    )}

                  </div>

                  {/* Hand-drawn Wobbly Crash Box */}
                  {drawPhase >= 3 && (
                    <div className="mt-4 max-w-md mx-auto text-center">
                      <div className="relative p-3">
                        <svg className="absolute inset-0 w-full h-full draw-stroke-3 pointer-events-none" viewBox="0 0 400 80" fill="none">
                          <path d="M 8 10 C 120 7, 280 12, 392 9 C 395 32, 391 58, 393 72 C 275 75, 125 71, 7 74 C 9 52, 6 30, 8 10 Z" stroke="#f43f5e" strokeWidth="2.5" />
                        </svg>
                        <p className="font-board text-xl text-rose-400 font-bold">
                          ✗ 504 Gateway Timeout: Hard Disk Crash!
                        </p>
                        <p className="font-board text-base text-slate-200">
                          Disk limit ~1,000 IOPS. 100K queries choke the disk in 2 seconds.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Hand-drawn Bottom Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-board text-lg text-slate-300">
                    Rule 1: Never let 100K users hit hard disk directly
                  </span>
                  <span className="font-board text-lg text-rose-400">
                    Direct SQL = Dead Server ✗
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 2: Biryani Counter Analogy */}
            {currentStage === 1 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Title */}
                <div>
                  <p className="font-board text-2xl sm:text-3xl text-white font-bold">
                    The Bawarchi Biryani Analogy
                  </p>
                  <p className="font-board text-xl text-yellow-300 mt-1">
                    Kitchen Chef vs Front Hot-Box Counter:
                  </p>
                </div>

                {/* Hand-drawn Comparison */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                    
                    {/* Wobbly Kitchen Box */}
                    <div className="relative p-4">
                      <svg className="absolute inset-0 w-full h-full draw-stroke-1 pointer-events-none" viewBox="0 0 260 120" fill="none">
                        <path d="M 8 12 C 85 8, 175 14, 252 10 C 255 45, 251 85, 253 110 C 170 114, 85 108, 6 112 C 9 78, 6 42, 8 12 Z" stroke="#f43f5e" strokeWidth="2.5" />
                      </svg>
                      <p className="font-board text-2xl text-rose-400 font-bold">
                        Kitchen (Postgres DB)
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-1">
                        • Cooks raw rice & meat from scratch
                      </p>
                      <p className="font-board text-lg text-slate-200">
                        • 20 - 30 minutes per order
                      </p>
                      <p className="font-board text-base text-rose-300 mt-1">
                        ✗ 1,000 customers in kitchen = Chef dies!
                      </p>
                    </div>

                    {/* Wobbly Front Counter Box */}
                    {drawPhase >= 2 && (
                      <div className="relative p-4">
                        <svg className="absolute inset-0 w-full h-full draw-stroke-2 pointer-events-none" viewBox="0 0 260 120" fill="none">
                          <path d="M 10 10 C 90 14, 170 8, 250 12 C 253 48, 249 82, 252 110 C 172 107, 92 113, 8 109 C 11 75, 7 40, 10 10 Z" stroke="#4ade80" strokeWidth="2.5" />
                        </svg>
                        <p className="font-board text-2xl text-emerald-400 font-bold">
                          Front Counter (Redis)
                        </p>
                        <p className="font-board text-lg text-slate-200 mt-1">
                          • 50 biryani packets pre-packed
                        </p>
                        <p className="font-board text-lg text-slate-200">
                          • 2 seconds to hand to customer!
                        </p>
                        <p className="font-board text-base text-emerald-300 mt-1">
                          ✓ Chef in kitchen is never disturbed!
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Wobbly Yellow Curly Bracket */}
                  {drawPhase >= 3 && (
                    <div className="mt-6 text-center">
                      <svg className="w-full max-w-md mx-auto h-8 draw-stroke-3" viewBox="0 0 350 25" fill="none">
                        <path 
                          d="M 12 18 C 80 17, 160 19, 170 19 C 174 19, 175 10, 175 6 C 175 10, 177 19, 180 19 C 190 19, 270 17, 338 18" 
                          stroke="#facc15" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                        />
                      </svg>
                      <p className="font-board text-2xl text-yellow-300 font-bold">
                        {`{ 2 Seconds at Counter vs 20 Minutes in Kitchen }`}
                      </p>
                    </div>
                  )}

                </div>

                {/* Bottom Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-board text-lg text-slate-300">
                    Intuition: Keep hot frequently-ordered items ready on the front counter!
                  </span>
                  <span className="font-board text-lg text-emerald-400">
                    100x Faster Handover ✓
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 3: RAM vs Disk */}
            {currentStage === 2 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Title */}
                <div>
                  <p className="font-board text-2xl sm:text-3xl text-white font-bold">
                    In-Memory RAM (Redis) Architecture
                  </p>
                  <p className="font-board text-xl text-sky-400 mt-1">
                    RAM (Nanoseconds) vs Hard Disk (Milliseconds)
                  </p>
                </div>

                {/* Hand-drawn Architecture Diagram */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Wobbly User Box */}
                    <div className="relative p-3 flex flex-col items-center">
                      <svg className="w-24 h-20 draw-stroke-1" viewBox="0 0 90 70" fill="none">
                        <path d="M 6 8 C 30 6, 60 9, 84 7 C 86 28, 83 48, 85 64 C 60 62, 30 65, 5 63 C 7 42, 5 22, 6 8 Z" stroke="#ffffff" strokeWidth="2.5" />
                      </svg>
                      <span className="font-board text-lg text-white font-bold mt-1">App User</span>
                      <span className="font-board text-xs text-slate-400">GET /menu/101</span>
                    </div>

                    {/* Wobbly Cyan Arrow */}
                    {drawPhase >= 2 && (
                      <div className="flex flex-col items-center">
                        <span className="font-board text-base text-sky-400 font-bold">1. Check RAM</span>
                        <svg className="w-24 h-6 draw-stroke-1" viewBox="0 0 90 20" fill="none">
                          <path d="M 6 11 C 32 8, 58 13, 80 10" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                          <path d="M 70 5 C 75 8, 78 9, 82 10 C 78 12, 75 14, 71 17" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}

                    {/* Wobbly Redis Box */}
                    {drawPhase >= 2 && (
                      <div className="relative p-3 flex flex-col items-center">
                        <svg className="w-28 h-26 draw-stroke-2" viewBox="0 0 100 85" fill="none">
                          <path d="M 8 10 C 38 6, 68 12, 92 8 C 95 32, 91 58, 93 76 C 65 79, 35 74, 7 77 C 9 52, 6 30, 8 10 Z" stroke="#4ade80" strokeWidth="3" fill="#04200f" />
                        </svg>
                        <span className="font-board text-2xl text-emerald-300 font-bold leading-none mt-1">REDIS</span>
                        <span className="font-board text-base text-yellow-300 leading-none">In-Memory RAM</span>
                        <span className="font-board text-sm text-emerald-400 font-bold mt-1">1.2ms latency</span>
                      </div>
                    )}

                    {/* Wobbly Amber Arrow */}
                    {drawPhase >= 3 && (
                      <div className="flex flex-col items-center">
                        <span className="font-board text-xs text-amber-400">2. If Miss</span>
                        <svg className="w-20 h-6 draw-stroke-2" viewBox="0 0 80 20" fill="none">
                          <path d="M 6 10 C 28 8, 50 12, 72 10" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
                          <path d="M 64 5 C 68 7, 70 9, 74 10 C 70 12, 68 13, 64 16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}

                    {/* Wobbly Postgres Box */}
                    {drawPhase >= 3 && (
                      <div className="relative p-3 flex flex-col items-center">
                        <svg className="w-24 h-20 draw-stroke-3" viewBox="0 0 90 70" fill="none">
                          <path d="M 7 9 C 32 6, 60 11, 83 8 C 85 28, 82 48, 84 63 C 60 61, 32 64, 6 62 C 8 42, 6 22, 7 9 Z" stroke="#64748b" strokeWidth="2.5" />
                        </svg>
                        <span className="font-board text-lg text-slate-300 font-bold mt-1">Postgres</span>
                        <span className="font-board text-xs text-slate-400">Hard Disk (45ms)</span>
                      </div>
                    )}

                  </div>

                  {/* Wobbly Handwritten Note */}
                  {drawPhase >= 3 && (
                    <div className="mt-4 text-center">
                      <p className="font-board text-xl text-yellow-300">
                        User 1 queries DB → saves in Redis (`SET menu:101 ... EX 3600`)
                      </p>
                      <p className="font-board text-xl text-emerald-400 font-bold">
                        Next 99,999 users get 1ms response from RAM! DB CPU stays at 4%!
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-board text-lg text-slate-300">
                    O(1) Hash Map: Instant lookup without paying heavy database server bills
                  </span>
                  <span className="font-board text-lg text-emerald-400">
                    Production Architecture ✓
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 4: Stale Cache Trap */}
            {currentStage === 3 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Title */}
                <div>
                  <p className="font-board text-2xl sm:text-3xl text-rose-400 font-bold">
                    The Trap: "Stale Cache" Invalidation
                  </p>
                  <p className="font-board text-xl text-yellow-300 mt-1">
                    Recruiter asks: "Biryani price changes from ₹250 to ₹290. What happens?"
                  </p>
                </div>

                {/* Hand-drawn Comparison */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                    
                    {/* Wobbly Bug Box */}
                    <div className="relative p-4">
                      <svg className="absolute inset-0 w-full h-full draw-stroke-1 pointer-events-none" viewBox="0 0 260 120" fill="none">
                        <path d="M 8 10 C 85 8, 175 12, 252 9 C 255 45, 251 85, 253 111 C 170 114, 85 109, 6 112 C 9 78, 6 42, 8 10 Z" stroke="#f43f5e" strokeWidth="2.5" />
                      </svg>
                      <p className="font-board text-2xl text-rose-400 font-bold">
                        The Stale Data Bug ✗
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-1">
                        • Postgres DB: price = ₹290
                      </p>
                      <p className="font-board text-lg text-slate-200">
                        • Redis RAM: price = ₹250 (Old!)
                      </p>
                      <p className="font-board text-base text-rose-300 mt-1">
                        Customer orders at ₹250! Restaurant loses ₹40 on every order!
                      </p>
                    </div>

                    {/* Wobbly Solution Box */}
                    {drawPhase >= 2 && (
                      <div className="relative p-4">
                        <svg className="absolute inset-0 w-full h-full draw-stroke-2 pointer-events-none" viewBox="0 0 260 120" fill="none">
                          <path d="M 10 9 C 90 13, 170 8, 250 11 C 253 48, 249 82, 252 110 C 172 108, 92 113, 8 109 C 11 75, 7 40, 10 9 Z" stroke="#4ade80" strokeWidth="2.5" />
                        </svg>
                        <p className="font-board text-2xl text-emerald-400 font-bold">
                          Senior Fix ✓
                        </p>
                        <p className="font-board text-lg text-slate-200 mt-1">
                          1. TTL: Auto-expires in 300 seconds
                        </p>
                        <p className="font-board text-lg text-slate-200">
                          2. Write-Through: On DB edit:
                        </p>
                        <p className="font-board text-lg text-emerald-300 font-bold mt-1">
                          redis.del("menu:101")
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Wobbly Hand-Drawn Quote */}
                  {drawPhase >= 3 && (
                    <div className="mt-4 text-center">
                      <p className="font-board text-xl text-yellow-300 font-bold">
                        "Two hard problems in Computer Science: Cache Invalidation and Naming Things."
                      </p>
                    </div>
                  )}

                </div>

                {/* Bottom Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-board text-lg text-slate-300">
                    Senior Reflex: Always state Invalidation Strategy before recruiter asks!
                  </span>
                  <span className="font-board text-lg text-emerald-400">
                    Trap Handled ✓
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 5: Engineering Reality (No Fake 18 LPA Hype) */}
            {currentStage === 4 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Title */}
                <div>
                  <p className="font-board text-2xl sm:text-3xl text-emerald-400 font-bold">
                    Placement Reality: Production Resilience
                  </p>
                  <p className="font-board text-xl text-slate-300 mt-1">
                    No fake guarantees. What technical recruiters actually evaluate:
                  </p>
                </div>

                {/* Hand-drawn Comparison */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    
                    {/* Wobbly Fresher Box */}
                    <div className="relative p-4">
                      <svg className="absolute inset-0 w-full h-full draw-stroke-1 pointer-events-none" viewBox="0 0 260 120" fill="none">
                        <path d="M 8 10 C 85 8, 175 12, 252 9 C 255 45, 251 85, 253 111 C 170 114, 85 109, 6 112 C 9 78, 6 42, 8 10 Z" stroke="#f43f5e" strokeWidth="2.5" />
                      </svg>
                      <p className="font-board text-2xl text-rose-400 font-bold">
                        Fresher Rejection Filter ✗
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-1">
                        • Memorizes syntax & tutorial code
                      </p>
                      <p className="font-board text-lg text-slate-200">
                        • Can't handle 100K traffic questions
                      </p>
                      <p className="font-board text-base text-rose-300 mt-1">
                        Filtered out in round 1 because system crashes!
                      </p>
                    </div>

                    {/* Wobbly Senior Reality Box */}
                    {drawPhase >= 2 && (
                      <div className="relative p-4">
                        <svg className="absolute inset-0 w-full h-full draw-stroke-2 pointer-events-none" viewBox="0 0 260 120" fill="none">
                          <path d="M 10 9 C 90 13, 170 8, 250 11 C 253 48, 249 82, 252 110 C 172 108, 92 113, 8 109 C 11 75, 7 40, 10 9 Z" stroke="#4ade80" strokeWidth="2.5" />
                        </svg>
                        <p className="font-board text-2xl text-emerald-400 font-bold">
                          Production Maturity ✓
                        </p>
                        <p className="font-board text-lg text-slate-200 mt-1">
                          • Understands RAM vs Disk bottlenecks
                        </p>
                        <p className="font-board text-lg text-slate-200">
                          • Solves Cache Invalidation & TTL
                        </p>
                        <p className="font-board text-base text-emerald-300 mt-1">
                          Recruiter sees you build systems that never crash!
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Wobbly Truth Callout */}
                  {drawPhase >= 3 && (
                    <div className="mt-6 text-center">
                      <p className="font-board text-xl text-yellow-300 font-bold">
                        "Placement prep is not memorizing syntax. It is understanding where systems fail."
                      </p>
                    </div>
                  )}

                </div>

                {/* Bottom Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-board text-lg text-slate-300">
                    Grounded Preparation: Zero Toy Tutorials • Zero Fake Guarantees
                  </span>
                  <span className="font-board text-lg text-emerald-400">
                    Production Composure ✓
                  </span>
                </div>

              </div>
            )}

            {/* Floating Candidate Video Tile (Zone 3 inside frame) */}
            <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 bg-[#202124]/90 backdrop-blur-md p-2 rounded-2xl border border-slate-700/80 shadow-2xl z-20 font-sans">
              
              {/* You Tile */}
              <div className="w-24 h-16 rounded-xl bg-slate-900 border border-slate-700 flex flex-col justify-between p-1.5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-300 font-sans">You</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-sans">Listening</span>
                </div>
              </div>

              {/* Sai Anna Tile */}
              <div className="w-24 h-16 rounded-xl bg-slate-900 border border-emerald-500/60 flex flex-col justify-between p-1.5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-emerald-400 font-sans">Sai Anna</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-emerald-300 font-semibold font-sans">Speaking</span>
                </div>
              </div>

            </div>

          </div>

          {/* ZONE 2: THE SUBTITLES (SPEAKING SPACE — PLUS JAKARTA SANS, FADE-IN / FADE-OUT ANIMATION) */}
          <div className="px-5 py-3.5 bg-[#171717] border-t border-slate-800 flex items-center gap-3 font-sans min-h-[56px]">
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shrink-0 font-sans">
              SA
            </div>
            
            {/* Subtitle text with clean opacity fade transition */}
            <div className="flex-1 min-w-0">
              <p 
                className="text-xs sm:text-sm text-slate-100 font-medium font-sans leading-snug transition-opacity duration-300"
                style={{ opacity: subtitleOpacity }}
              >
                "{activeDialogue || currentStageData.dialogue}"
              </p>
            </div>
            
            <span className="text-xs text-slate-400 whitespace-nowrap font-sans shrink-0">
              {currentStageData.time}
            </span>
          </div>

          {/* ZONE 3: GOOGLE MEET BOTTOM CONTROL BAR */}
          <div className="px-6 py-4 bg-[#202124] border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 font-sans">
            
            {/* Meeting Time & ID */}
            <div className="text-xs text-slate-300 font-medium font-sans">
              10:42 AM <span className="text-slate-600 mx-2">|</span> <span className="font-semibold text-white">sai-anna-live-call</span>
            </div>

            {/* Circular Meet Controls */}
            <div className="flex items-center gap-3">
              
              {/* Mic Toggle */}
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

              {/* Video Toggle */}
              <button
                className="w-10 h-10 rounded-full bg-[#3c4043] hover:bg-[#4a4e51] text-white flex items-center justify-center transition-all cursor-pointer"
                title="Camera active"
              >
                <VideoIcon className="w-4 h-4" />
              </button>

              {/* Raise Hand Toggle */}
              <button
                onClick={handleRaiseHand}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isHandRaised 
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold' 
                    : 'bg-[#3c4043] hover:bg-[#4a4e51] text-white'
                }`}
                title="Raise hand to ask a question"
              >
                <Hand className="w-4 h-4" />
              </button>

              {/* Present Screen Indicator */}
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

              {/* End Call / Schedule */}
              <button
                onClick={() => onOpenWaitlist('Book 1-on-1 Live Whiteboard Call')}
                className="px-5 h-10 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ml-2 shadow-sm font-sans"
                title="Schedule 1-on-1 Call"
              >
                <PhoneOff className="w-4 h-4" />
                <span className="hidden sm:inline">Join Next Alpha Call</span>
              </button>

            </div>

            {/* Right Status */}
            <div className="flex items-center gap-3 text-slate-400 text-xs font-sans">
              <button 
                onClick={() => onOpenWaitlist('Open Whiteboard Chat')}
                className="p-2 rounded-full hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer" 
                title="Open meeting chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-sans">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>HD 60 FPS</span>
              </div>
            </div>

          </div>

        </div>

        {/* 3 Real-World Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 font-sans">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950 font-sans">
              Raw Thought Process, Zero Slides
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal font-sans">
              No generic PowerPoint bullet points or distracting AI video avatars. Sai Anna live-sketches every line, bracket, and arrow by hand so you see how an engineer actually thinks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950 font-sans">
              Visceral Hand-Drawn Anchors
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal font-sans">
              Rough brackets, curly braces, and architectural flows. Physical visual markers you can effortlessly recreate and recall under 45-minute technical interview pressure.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950 font-sans">
              Zero Video Bills, 100% Client-Side
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal font-sans">
              Built as lightweight vector paths and authentic handwriting. Zero streaming bandwidth bills, zero external video hosting dependencies, and instant 60 FPS rendering.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
