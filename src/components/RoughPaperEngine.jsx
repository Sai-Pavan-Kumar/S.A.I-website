import React, { useState, useEffect, useRef } from 'react';
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
  const [writePhase, setWritePhase] = useState(1); // 1: initial, 2: middle, 3: detailed, 4: complete
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [typedDialogue, setTypedDialogue] = useState('');

  const stages = [
    {
      id: 'crash',
      title: '01. The Crash',
      subtitle: 'Why 100K Users Kill Direct SQL Queries',
      dialogue: 'Rey tammudu, IPL match appudu 100,000 mandhi oke sari Swiggy open chesthe... Junior developers ventane DB meedhaki SELECT query kotti disk ni champestharu. Hard disk 100,000 times/sec spin avvadhu ra — server dead!',
      audioTime: '0:32',
      penColor: '#f43f5e'
    },
    {
      id: 'analogy',
      title: '02. Biryani Counter',
      subtitle: 'Kitchen Chef vs Front Hot-Box Counter',
      dialogue: 'Bawarchi hotel ki velli biryani adagagane, prathi customer kosam kitchen loki velli fresh ga rice vandaru ra! Front counter hot-box lo already 50 packets ready ga untayi — 2 seconds lo ichestharu. Idhe Caching!',
      audioTime: '1:18',
      penColor: '#facc15'
    },
    {
      id: 'arch',
      title: '03. RAM vs Disk',
      subtitle: 'Redis In-Memory Architecture in 1ms',
      dialogue: 'Computer science lo RAM speed nanoseconds lo untundhi, Hard Disk milliseconds. Redis anedhi RAM lo unde giant Key-Value map. First user vachinappude DB nunchi thestham — migatha 99,999 mandhiki 1ms lo Redis ichesthundhi!',
      audioTime: '2:15',
      penColor: '#38bdf8'
    },
    {
      id: 'trap',
      title: '04. The Trap: Stale Data',
      subtitle: 'Cache Invalidation & TTL (Time-To-Live)',
      dialogue: 'Ikkade interviewer tricky question aduguthadu: "Biryani price ₹250 nunchi ₹290 ki marina, Redis lo old price eh untundhi kada?" ani. Ventane cheppali: "Anna, 5-min TTL expire avvali, lekapothe DB update ayyaka Redis key ni delete chestham"!',
      audioTime: '3:04',
      penColor: '#fb923c'
    },
    {
      id: 'reality',
      title: '05. Engineering Reality',
      subtitle: 'Production Scalability vs Fresher Rejection Filter',
      dialogue: 'Rey, deenitho repu poddunne direct ga offer vachesthadhi ani nenu fake promises cheppanu. Kaani reality enti ante: 90% candidates scale cheyadam theliyaka L1 lone filter avutharu. Ee memory trade-offs ila explain chesthe, recruiter knows you understand real systems!',
      audioTime: '3:50',
      penColor: '#4ade80'
    }
  ];

  const activeStageData = stages[currentStage];
  const typingTimerRef = useRef(null);

  // Progressive handwriting reveal timer for each stage
  useEffect(() => {
    const t0 = setTimeout(() => setWritePhase(1), 20);
    const t1 = setTimeout(() => setWritePhase(2), 900);
    const t2 = setTimeout(() => setWritePhase(3), 2100);
    const t3 = setTimeout(() => setWritePhase(4), 3400);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentStage]);

  // Live typewriter letter-by-letter handwriting effect for dialogue
  useEffect(() => {
    let charIndex = 0;
    const fullText = activeStageData.dialogue;

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    const startTimer = setTimeout(() => {
      setTypedDialogue('');
      typingTimerRef.current = setInterval(() => {
        charIndex += 1;
        setTypedDialogue(fullText.slice(0, charIndex));
        if (charIndex >= fullText.length) {
          clearInterval(typingTimerRef.current);
        }
      }, 22);
    }, 20);

    return () => {
      clearTimeout(startTimer);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [currentStage, activeStageData.dialogue]);

  // Auto-play through stages
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, 8500);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    onOpenWaitlist('Ask Sai Anna about Redis & System Design');
  };

  const handleReplay = () => {
    setWritePhase(1);
    setTimeout(() => setWritePhase(2), 800);
    setTimeout(() => setWritePhase(3), 1900);
    setTimeout(() => setWritePhase(4), 3100);
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
            Just like an experienced senior pulling you into a 1-on-1 Google Meet call — sharing a live digital blackboard, sketching real-world system architecture by hand with colored markers, and talking through every edge case until the mental model clicks.
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

            {/* Play/Pause & Replay Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReplay}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer flex items-center gap-1"
                title="Replay live marker writing animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Re-write</span>
              </button>

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

          {/* THE PURE BLACK SCREEN-SHARED WHITEBOARD (100% CAVEAT HANDWRITING FONT) */}
          <div className="relative bg-[#000000] w-full aspect-[16/9] min-h-[460px] sm:min-h-[540px] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden">
            
            {/* Live Writing Pen Tip Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 pointer-events-none z-10">
              <span 
                className="w-2.5 h-2.5 rounded-full animate-pen-pulse"
                style={{ backgroundColor: activeStageData.penColor }}
              ></span>
              <span className="font-marker text-lg text-slate-300">
                Sai Anna writing...
              </span>
            </div>

            {/* SLIDE 1: The Crash (100K Users vs Postgres Disk) */}
            {currentStage === 0 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Top Section */}
                <div className="space-y-1">
                  <p className="font-marker text-3xl sm:text-4xl text-white">
                    IPL Final: 100,000 Users Order Biryani at 8:00 PM
                  </p>
                  <p className={`font-marker text-2xl text-rose-400 transition-opacity duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    Fresher Approach: Direct SQL Query on Hard Disk Database
                  </p>
                </div>

                {/* Center Hand-Drawn Tracing Diagram */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                    
                    {/* Crowd of Users (Drawn by hand with SVG strokes) */}
                    <div className="flex flex-col items-center">
                      <svg className="w-40 h-14 draw-stroke-1" viewBox="0 0 150 45" fill="none">
                        <circle cx="20" cy="12" r="7" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="45" cy="10" r="7" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="70" cy="13" r="7" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="95" cy="11" r="7" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="120" cy="14" r="7" stroke="#ffffff" strokeWidth="2.5" />
                        <path d="M 10 35 Q 20 25 30 35 M 35 33 Q 45 23 55 33 M 60 36 Q 70 26 80 36 M 85 34 Q 95 24 105 34 M 110 37 Q 120 27 130 37" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                      <span className="font-marker text-2xl text-yellow-300 mt-1">
                        100,000 Hungry Users
                      </span>
                      <span className="font-marker text-xl text-slate-300">
                        Hitting Swiggy App
                      </span>
                    </div>

                    {/* Pink Arrow Traced in real time */}
                    <div className={`flex flex-col items-center transition-all duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <svg className="w-32 h-10 draw-stroke-2" viewBox="0 0 120 35" fill="none">
                        <path d="M 5 18 L 105 18" stroke="#f43f5e" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" />
                        <path d="M 95 10 L 112 18 L 95 26" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-marker text-2xl text-rose-400">
                        SELECT * FROM menu
                      </span>
                    </div>

                    {/* Postgres Cylinder Traced with big cross */}
                    <div className={`flex flex-col items-center transition-all duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <svg className="w-32 h-36 draw-stroke-2" viewBox="0 0 90 100" fill="none">
                        <ellipse cx="45" cy="20" rx="36" ry="12" stroke="#f43f5e" strokeWidth="3" />
                        <path d="M 9 20 L 9 80 Q 45 94 81 80 L 81 20" stroke="#f43f5e" strokeWidth="3" fill="#1c070b" />
                        <path d="M 9 50 Q 45 64 81 50" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 3" />
                        <path d="M 9 80 Q 45 94 81 80" stroke="#f43f5e" strokeWidth="3" />
                        {/* Red Cross ✗ */}
                        {writePhase >= 3 && (
                          <path d="M 20 22 L 70 78 M 70 22 L 20 78" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" className="draw-stroke-3" />
                        )}
                      </svg>
                      <span className="font-marker text-2xl text-rose-300">
                        Postgres DB (Hard Disk)
                      </span>
                      <span className="font-marker text-xl text-rose-400">
                        100% Disk I/O Overload!
                      </span>
                    </div>

                  </div>

                  {/* Crash Annotation */}
                  <div className={`mt-4 p-3 rounded-xl border border-rose-900 bg-rose-950/40 max-w-lg mx-auto text-center transition-all duration-700 ${writePhase >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <p className="font-marker text-3xl text-rose-400 font-bold">
                      ✗ 504 Gateway Timeout: Hard Disk Crash!
                    </p>
                    <p className="font-marker text-2xl text-slate-200">
                      Disk can only handle ~1,000 IOPS. 100K queries choke the queue in 2 seconds.
                    </p>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-marker text-2xl text-slate-300">
                    Rule 1: Never make the hard disk answer read-heavy traffic
                  </span>
                  <span className="font-marker text-2xl text-rose-400">
                    Fresher Filtered Out ✗
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 2: The Biryani Counter Analogy */}
            {currentStage === 1 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Top Section */}
                <div className="space-y-1">
                  <p className="font-marker text-3xl sm:text-4xl text-white">
                    The Bawarchi Biryani Analogy (Kitchen vs Counter)
                  </p>
                  <p className={`font-marker text-2xl text-yellow-300 transition-opacity duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    How real restaurants handle 10,000 customers without collapsing:
                  </p>
                </div>

                {/* Center Hand-Drawn Comparison */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                    
                    {/* The Kitchen Chef (Database) */}
                    <div className="relative pl-6">
                      <svg className="absolute left-0 top-0 h-full w-4 draw-stroke-1" viewBox="0 0 16 110" fill="none">
                        <path d="M 12 2 Q 4 4 4 16 L 4 94 Q 4 106 12 108" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      
                      <p className="font-marker text-3xl text-rose-400 font-bold">
                        The Kitchen (Postgres DB)
                      </p>
                      <p className="font-marker text-2xl text-slate-200 mt-1">
                        • Cooks raw meat & rice from scratch
                      </p>
                      <p className="font-marker text-2xl text-slate-200">
                        • Takes 20-30 minutes per handi
                      </p>
                      <p className="font-marker text-2xl text-rose-300 mt-1">
                        ✗ 1,000 people enter kitchen = Chef collapses!
                      </p>
                    </div>

                    {/* The Counter Hot-Box (Redis Cache) */}
                    <div className={`relative pl-6 transition-all duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <svg className="absolute left-0 top-0 h-full w-4 draw-stroke-2" viewBox="0 0 16 110" fill="none">
                        <path d="M 12 2 Q 4 4 4 16 L 4 94 Q 4 106 12 108" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      
                      <p className="font-marker text-3xl text-emerald-400 font-bold">
                        Front Hot-Box (Redis Cache)
                      </p>
                      <p className="font-marker text-2xl text-slate-200 mt-1">
                        • 50 biryani packets pre-packed & hot
                      </p>
                      <p className="font-marker text-2xl text-slate-200">
                        • Takes 2 seconds to hand to customer!
                      </p>
                      <p className="font-marker text-2xl text-emerald-300 mt-1">
                        ✓ Chef in kitchen is never disturbed!
                      </p>
                    </div>

                  </div>

                  {/* Yellow Curly Bracket across the span */}
                  <div className={`mt-6 text-center transition-all duration-700 ${writePhase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <svg className="w-full max-w-md mx-auto h-8 draw-stroke-3" viewBox="0 0 350 25" fill="none">
                      <path 
                        d="M 10 18 Q 80 18 160 18 Q 175 18 175 5 Q 175 18 190 18 Q 270 18 340 18" 
                        stroke="#facc15" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                      />
                    </svg>
                    <p className="font-marker text-3xl text-yellow-300 font-bold">
                      {`{ 2 Seconds at Counter vs 20 Minutes in Kitchen }`}
                    </p>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-marker text-2xl text-slate-300">
                    Core Rule: Keep hot frequently-requested items ready on the front counter
                  </span>
                  <span className="font-marker text-2xl text-emerald-400">
                    100x Faster Handover ✓
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 3: The Architecture (RAM vs Hard Disk) */}
            {currentStage === 2 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Top Section */}
                <div className="space-y-1">
                  <p className="font-marker text-3xl sm:text-4xl text-white">
                    Production Architecture: In-Memory RAM (Redis)
                  </p>
                  <p className={`font-marker text-2xl text-sky-400 transition-opacity duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    RAM Speed (Nanoseconds) vs Hard Disk (Milliseconds)
                  </p>
                </div>

                {/* Center Flow Diagram */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* User App */}
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-22 rounded-2xl border-2 border-white flex flex-col items-center justify-center bg-black p-2">
                        <span className="font-marker text-2xl text-white">App User</span>
                        <span className="font-marker text-lg text-slate-300">GET /menu/101</span>
                      </div>
                    </div>

                    {/* Step 1 Arrow: Check Redis */}
                    <div className={`flex flex-col items-center transition-all duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="font-marker text-2xl text-sky-400 font-bold">1. Check RAM</span>
                      <svg className="w-24 h-8 draw-stroke-2" viewBox="0 0 90 20" fill="none">
                        <path d="M 5 10 L 80 10" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                        <path d="M 72 4 L 82 10 L 72 16" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* REDIS CACHE (RAM) */}
                    <div className={`flex flex-col items-center transition-all duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-28 h-28 rounded-2xl border-2 border-emerald-400 bg-emerald-950/40 flex flex-col items-center justify-center p-2 text-center">
                        <span className="font-marker text-3xl text-emerald-300 font-bold leading-none">REDIS</span>
                        <span className="font-marker text-xl text-yellow-300 leading-none mt-1">In-Memory RAM</span>
                        <span className="font-marker text-lg text-emerald-400 mt-1">1.2ms lookup</span>
                      </div>
                      <span className="font-marker text-2xl text-emerald-400 font-bold mt-1">
                        CACHE HIT! (99.9%)
                      </span>
                    </div>

                    {/* Step 2 Arrow: Cache Miss Only */}
                    <div className={`flex flex-col items-center transition-all duration-700 ${writePhase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="font-marker text-xl text-amber-400">2. If Cache Miss</span>
                      <svg className="w-24 h-8 draw-stroke-3" viewBox="0 0 90 20" fill="none">
                        <path d="M 5 10 L 80 10" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" strokeLinecap="round" />
                        <path d="M 72 4 L 82 10 L 72 16" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* POSTGRES DB */}
                    <div className={`flex flex-col items-center transition-all duration-700 ${writePhase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-24 h-22 rounded-2xl border-2 border-slate-600 bg-black flex flex-col items-center justify-center text-center p-2">
                        <span className="font-marker text-2xl text-slate-300 font-bold">Postgres</span>
                        <span className="font-marker text-lg text-slate-400">Hard Disk</span>
                      </div>
                      <span className="font-marker text-lg text-slate-400 mt-1">
                        Queried 1 time only!
                      </span>
                    </div>

                  </div>

                  {/* Math explanation in yellow marker */}
                  <div className={`mt-4 p-2.5 rounded-xl border border-slate-900 bg-slate-950/80 max-w-lg mx-auto text-center transition-all duration-700 ${writePhase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="font-marker text-2xl text-yellow-300">
                      User 1 queries DB → stores in Redis (`SET menu:101 ... EX 3600`)
                      <br />
                      <span className="text-emerald-400">
                        Next 99,999 users get response from RAM in 1ms! DB CPU stays at 4%!
                      </span>
                    </p>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-marker text-2xl text-slate-300">
                    O(1) In-Memory Lookup: Instant response without paying massive DB server bills
                  </span>
                  <span className="font-marker text-2xl text-emerald-400">
                    Production Architecture ✓
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 4: The Interview Trap (Cache Invalidation & TTL) */}
            {currentStage === 3 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Top Section */}
                <div className="space-y-1">
                  <p className="font-marker text-3xl sm:text-4xl text-rose-400">
                    The Interview Trap: "Stale Cache" Invalidation
                  </p>
                  <p className={`font-marker text-2xl text-yellow-300 transition-opacity duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    Recruiter asks: "Restaurant owner changes Biryani price from ₹250 to ₹290. What happens?"
                  </p>
                </div>

                {/* Center Trap vs Senior Solution */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                    
                    {/* The Stale Data Bug */}
                    <div className="p-4 rounded-2xl border border-rose-900 bg-rose-950/30 text-left">
                      <p className="font-marker text-3xl text-rose-400 font-bold">
                        The Stale Data Bug ✗
                      </p>
                      <p className="font-marker text-2xl text-slate-200 mt-2">
                        • Postgres updated: <span className="text-white font-bold">price = ₹290</span>
                      </p>
                      <p className="font-marker text-2xl text-slate-200">
                        • Redis still holds: <span className="text-rose-400 font-bold">price = ₹250</span>
                      </p>
                      <p className="font-marker text-2xl text-rose-300 mt-1">
                        Customer orders at ₹250! Restaurant loses ₹40 on every single order!
                      </p>
                    </div>

                    {/* Senior Solution */}
                    <div className={`p-4 rounded-2xl border border-emerald-800 bg-emerald-950/30 text-left transition-all duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <p className="font-marker text-3xl text-emerald-400 font-bold">
                        Senior Engineer Solution ✓
                      </p>
                      <p className="font-marker text-2xl text-slate-200 mt-2">
                        1. <strong className="text-yellow-300">TTL (Time-To-Live):</strong> Key expires automatically in 300s.
                      </p>
                      <p className="font-marker text-2xl text-slate-200">
                        2. <strong className="text-emerald-400">Write-Through Invalidation:</strong> Whenever owner updates DB → Server calls:
                      </p>
                      <div className="mt-1 px-3 py-1 rounded bg-black border border-emerald-700 text-emerald-300 font-marker text-xl inline-block">
                        redis.del("menu:101")
                      </div>
                    </div>

                  </div>

                  {/* Yellow Marker Quote */}
                  <div className={`mt-4 text-center transition-all duration-700 ${writePhase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="font-marker text-3xl text-yellow-300 font-bold">
                      "There are only two hard problems in Computer Science: Cache Invalidation and Naming Things."
                    </p>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-marker text-2xl text-slate-300">
                    Senior Reflex: Always state your Invalidation Strategy before the recruiter has to ask!
                  </span>
                  <span className="font-marker text-2xl text-emerald-400">
                    Trap Handled ✓
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 5: The Engineering Reality (Brutal Truth, No Fake Hype) */}
            {currentStage === 4 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Top Section */}
                <div className="space-y-1">
                  <p className="font-marker text-3xl sm:text-4xl text-emerald-400 font-bold">
                    The Placement Reality: System Resilience & Scalability
                  </p>
                  <p className={`font-marker text-2xl text-slate-300 transition-opacity duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    No fake promises. Here is what real recruiters actually test:
                  </p>
                </div>

                {/* Center Comparison: Fresher vs Senior */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    
                    {/* Fresher Blind Spot */}
                    <div className="p-4 rounded-2xl border border-rose-900 bg-rose-950/30 text-left">
                      <span className="font-marker text-2xl text-rose-400 font-bold block">
                        Fresher Blind Spot ✗
                      </span>
                      <p className="font-marker text-2xl text-slate-200 mt-2">
                        • Memorizes syntax & tutorial code
                      </p>
                      <p className="font-marker text-2xl text-slate-200">
                        • Can't explain what happens under 100K traffic
                      </p>
                      <p className="font-marker text-2xl text-rose-300 mt-1">
                        Filtered out in round 1 screening because system crashes on basic traffic!
                      </p>
                    </div>

                    {/* S.A.I. Senior Mentorship Reality */}
                    <div className={`p-4 rounded-2xl border border-emerald-600 bg-emerald-950/40 text-left transition-all duration-700 ${writePhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="font-marker text-2xl text-emerald-400 font-bold block">
                        Senior Engineering Reality ✓
                      </span>
                      <p className="font-marker text-2xl text-slate-200 mt-2">
                        • You understand RAM vs Hard Disk bottlenecks
                      </p>
                      <p className="font-marker text-2xl text-slate-200">
                        • You handle Cache Invalidation & Edge Cases
                      </p>
                      <p className="font-marker text-2xl text-emerald-300 mt-1">
                        Recruiter sees production composure: you build systems that never go down!
                      </p>
                    </div>

                  </div>

                  {/* Grounded Truth Callout */}
                  <div className={`mt-6 text-center transition-all duration-700 ${writePhase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="font-marker text-3xl text-yellow-300 font-bold">
                      "Real placement prep is not about memorizing syntax. It is about understanding where systems fail."
                    </p>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-marker text-2xl text-slate-300">
                    Grounded Preparation: Zero Toy Projects • Zero Fake Guarantees
                  </span>
                  <span className="font-marker text-2xl text-emerald-400">
                    Production Composure ✓
                  </span>
                </div>

              </div>
            )}

            {/* FLOATING GOOGLE MEET CANDIDATE PIP (Bottom Right Corner) */}
            <div className="absolute bottom-5 right-5 hidden sm:flex items-center gap-2 bg-[#202124]/90 backdrop-blur-md p-2 rounded-2xl border border-slate-700/80 shadow-2xl z-20">
              
              {/* You (Candidate) Video Tile */}
              <div className="w-24 h-16 rounded-xl bg-slate-900 border border-slate-700 flex flex-col justify-between p-1.5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-300 font-sans">You</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-sans">Listening</span>
                </div>
              </div>

              {/* Sai Anna Video Tile with active audio rings */}
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

          {/* Real-time Typewriter Dialogue Subtitle Bar */}
          <div className="px-5 py-3 bg-[#171717] border-t border-slate-800 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shrink-0 font-sans">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 font-marker text-xl sm:text-2xl truncate">
                "{typedDialogue}"
                <span className="inline-block w-1.5 h-4 ml-1 bg-emerald-400 animate-pulse"></span>
              </p>
            </div>
            <span className="text-xs text-slate-400 whitespace-nowrap font-sans">
              {activeStageData.audioTime}
            </span>
          </div>

          {/* REALISTIC GOOGLE MEET BOTTOM CONTROL BAR */}
          <div className="px-6 py-4 bg-[#202124] border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Left: Meeting Time & Code */}
            <div className="text-xs text-slate-300 font-medium font-sans">
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
                className="px-5 h-10 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ml-2 shadow-sm font-sans"
                title="Schedule 1-on-1 Call"
              >
                <PhoneOff className="w-4 h-4" />
                <span className="hidden sm:inline">Join Next Alpha Call</span>
              </button>

            </div>

            {/* Right: Meeting Info Shortcuts */}
            <div className="flex items-center gap-3 text-slate-400 text-xs font-sans">
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
              Rough brackets, curly braces, and architectural flows. Physical visual markers you can effortlessly recreate and recall under 45-minute technical interview pressure.
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
