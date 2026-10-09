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
  CheckCircle2, 
  MoreVertical,
  Users,
  MessageSquare
} from 'lucide-react';

export default function RoughPaperEngine({ onOpenWaitlist }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [drawStep, setDrawStep] = useState(3); // 1, 2, 3 for progressive handwriting reveal
  const [isHandRaised, setIsHandRaised] = useState(false);

  const stages = [
    {
      id: 'crash',
      title: '01. The Crash',
      subtitle: 'Why 100K users crash direct SQL queries',
      dialogue: 'Rey tammudu, IPL match appudu 100,000 mandhi oke sari Swiggy open chesthe... Junior developers ventane DB meedhaki SELECT query kotti disk ni champestharu. Hard disk 100,000 times/sec spin avvaledhu ra — server dead!',
      audioTime: '0:32',
      stageTag: 'THE SYSTEM MELTDOWN'
    },
    {
      id: 'analogy',
      title: '02. Biryani Counter',
      subtitle: 'The Kitchen Chef vs Front Hot-Box Counter',
      dialogue: 'Bawarchi hotel ki velli biryani adagagane, prathi customer kosam kitchen loki velli fresh ga rice vandaru ra! Front counter hot-box lo already 50 packets ready ga untayi — 2 seconds lo ichi pampistharu. Idhe Caching!',
      audioTime: '1:18',
      stageTag: 'THE VISCERAL ANALOGY'
    },
    {
      id: 'arch',
      title: '03. RAM vs Disk',
      subtitle: 'Redis In-Memory Architecture in 1ms',
      dialogue: 'Computer science lo RAM speed nanoseconds lo untundhi, Hard Disk milliseconds. Redis anedhi RAM lo unde giant Key-Value map. First user vachinappude DB nunchi thestham — migatha 99,999 mandhiki 1ms lo Redis ichesthundhi!',
      audioTime: '2:15',
      stageTag: 'PRODUCTION ARCHITECTURE'
    },
    {
      id: 'trap',
      title: '04. The Trap: Stale Data',
      subtitle: 'Cache Invalidation & TTL (Time-To-Live)',
      dialogue: 'Ikkade interviewer tricky question aduguthadu: "Biryani price ₹250 nunchi ₹290 ki marina, Redis lo old price eh untundhi kada?" ani. Ventane cheppali: "Anna, 5-min TTL expire avvali, lekapothe DB update ayyaka Redis key ni delete chestham"!',
      audioTime: '3:04',
      stageTag: 'INTERVIEWER TRAP & FIX'
    },
    {
      id: 'offer',
      title: '05. The Offer',
      subtitle: '100K RPS served with DB at 4% CPU',
      dialogue: 'Chusava? Database CPU 100% nunchi 4% ki padipoyindhi. 100,000 orders smoothly served, zero crash. Interviewer ki idhi sketch geesi explain chesthe, vaadu ninnu fresher la chudadu — senior engineer la chusi offer letter isthadu!',
      audioTime: '3:50',
      stageTag: 'OFFER SECURED ✓'
    }
  ];

  // Progressive handwriting reveal timer on stage change
  useEffect(() => {
    const t0 = setTimeout(() => setDrawStep(1), 30);
    const t1 = setTimeout(() => setDrawStep(2), 650);
    const t2 = setTimeout(() => setDrawStep(3), 1400);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentStage]);

  // Auto-play through the 5 stages
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  const activeStageData = stages[currentStage];

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    onOpenWaitlist('Ask Sai Anna about Redis & System Design');
  };

  const handleReplay = () => {
    setDrawStep(1);
    setTimeout(() => setDrawStep(2), 500);
    setTimeout(() => setDrawStep(3), 1200);
  };

  return (
    <section id="rough-paper" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header: Focused on WHY */}
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
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                title="Replay marker sketch animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
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

          {/* THE PURE BLACK SCREEN-SHARED WHITEBOARD (Matches Image 1, 2, 3) */}
          <div className="relative bg-[#000000] w-full aspect-[16/9] min-h-[440px] sm:min-h-[520px] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden">
            
            {/* SLIDE 1: The Crash (100K Users hitting Postgres Disk Direct) */}
            {currentStage === 0 && (
              <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                
                {/* Top: Topic and Scenario sketched in white and yellow chalk */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-marker text-2xl sm:text-3xl text-white">
                      Problem: IPL Final — 100,000 Users Order Biryani at 8:00 PM
                    </span>
                  </div>
                  <p className="font-marker text-xl text-rose-400">
                    Junior Developer Approach: Send all 100K requests directly to Postgres SQL Database!
                  </p>
                </div>

                {/* Center: Hand-drawn Architecture Diagram of the Crash */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                    
                    {/* 100K Users Crowd (Image 2 style) */}
                    <div className="flex flex-col items-center">
                      <svg className="w-36 h-12" viewBox="0 0 150 45" fill="none">
                        <circle cx="20" cy="12" r="7" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="45" cy="10" r="7" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="70" cy="13" r="7" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="95" cy="11" r="7" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="120" cy="14" r="7" stroke="#ffffff" strokeWidth="2" />
                        <path d="M 10 35 Q 20 25 30 35 M 35 33 Q 45 23 55 33 M 60 36 Q 70 26 80 36 M 85 34 Q 95 24 105 34 M 110 37 Q 120 27 130 37" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      <span className="font-marker text-2xl text-yellow-300 font-bold mt-1">
                        100,000 App Users
                      </span>
                      <span className="font-marker text-lg text-slate-400">
                        Hungry Biryani orders
                      </span>
                    </div>

                    {/* Hand-drawn pink arrows bombing the DB */}
                    <div className={`flex flex-col items-center transition-all duration-500 ${drawStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <svg className="w-28 h-10" viewBox="0 0 110 35" fill="none">
                        <path d="M 5 18 L 95 18" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
                        <path d="M 85 10 L 102 18 L 85 26" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-marker text-xl text-rose-400 font-bold">
                        100K queries/sec
                      </span>
                    </div>

                    {/* Hand-drawn Postgres Database Cylinder on Fire */}
                    <div className={`relative flex flex-col items-center transition-all duration-700 ${drawStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <svg className="w-28 h-32" viewBox="0 0 90 100" fill="none">
                        {/* Cylinder Top Oval */}
                        <ellipse cx="45" cy="20" rx="36" ry="12" stroke="#f43f5e" strokeWidth="2.5" />
                        {/* Cylinder Body */}
                        <path d="M 9 20 L 9 80 Q 45 94 81 80 L 81 20" stroke="#f43f5e" strokeWidth="2.5" fill="#1c070b" />
                        {/* Middle Disc Rib */}
                        <path d="M 9 50 Q 45 64 81 50" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                        {/* Bottom Disc Rib */}
                        <path d="M 9 80 Q 45 94 81 80" stroke="#f43f5e" strokeWidth="2.5" />
                        {/* Big Red Cross ✗ */}
                        <path d="M 22 25 L 68 75 M 68 25 L 22 75" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                      </svg>

                      <span className="font-marker text-2xl text-rose-300 font-bold mt-1">
                        Postgres DB (Disk)
                      </span>
                      <span className="font-marker text-lg text-rose-400">
                        100% Disk I/O Throttled!
                      </span>
                    </div>

                  </div>

                  {/* Crash Box (Image 3 hatched box style) */}
                  <div className={`mt-4 p-3 rounded-lg border border-rose-900 bg-rose-950/40 max-w-lg mx-auto text-center transition-all duration-700 ${drawStep >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <p className="font-marker text-2xl text-rose-400 font-bold">
                      ✗ 504 Gateway Timeout — Hard Disk Cannot Spin 100,000 Times a Second!
                    </p>
                    <p className="font-marker text-lg text-slate-300">
                      Mechanical & SSD disks have max ~1,000 IOPS. Database crashes in 3 seconds.
                    </p>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-marker text-xl text-slate-400">
                    Trap: Never query database directly for read-heavy traffic
                  </span>
                  <span className="font-marker text-xl text-rose-400">
                    Result: Interview Rejected ✗
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 2: The Biryani Counter Analogy (Kitchen vs Hot-Box) */}
            {currentStage === 1 && (
              <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-marker text-2xl sm:text-3xl text-white">
                      The Bawarchi Biryani Analogy
                    </span>
                    <span className="font-marker text-xl text-yellow-300">
                      (How Real Restaurants Handle 10,000 Orders)
                    </span>
                  </div>
                  <p className="font-marker text-xl text-slate-300">
                    Observe the difference between the Kitchen Chef and the Front Counter:
                  </p>
                </div>

                {/* Center: Hand-drawn Comparison between Kitchen & Hot-box (Image 1 & 2 Style) */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                    
                    {/* Left: The Kitchen Chef (Database) */}
                    <div className="relative pl-6">
                      <svg className="absolute left-0 top-0 h-full w-4" viewBox="0 0 16 110" fill="none">
                        <path d="M 12 2 Q 4 4 4 16 L 4 94 Q 4 106 12 108" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                      
                      <p className="font-marker text-2xl text-rose-400 font-bold">
                        The Kitchen (Postgres DB)
                      </p>
                      <p className="font-marker text-lg text-slate-300 mt-1">
                        • Cooks raw meat & rice from scratch
                      </p>
                      <p className="font-marker text-lg text-slate-300">
                        • Takes 20-30 minutes per biryani
                      </p>
                      <p className="font-marker text-lg text-rose-400 mt-1">
                        ✗ If 1,000 customers enter kitchen: Chef dies!
                      </p>
                    </div>

                    {/* Right: The Counter Hot-Box (Redis Cache) */}
                    <div className={`relative pl-6 transition-all duration-700 ${drawStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <svg className="absolute left-0 top-0 h-full w-4" viewBox="0 0 16 110" fill="none">
                        <path d="M 12 2 Q 4 4 4 16 L 4 94 Q 4 106 12 108" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                      
                      <p className="font-marker text-2xl text-emerald-400 font-bold">
                        The Counter Hot-Box (Redis)
                      </p>
                      <p className="font-marker text-lg text-slate-300 mt-1">
                        • 50 biryani packets already packed
                      </p>
                      <p className="font-marker text-lg text-slate-300">
                        • Takes 2 seconds to hand to customer!
                      </p>
                      <p className="font-marker text-lg text-emerald-400 mt-1">
                        ✓ Kitchen chef is never bothered!
                      </p>
                    </div>

                  </div>

                  {/* Yellow Curly Bracket across the span (Exact match to Image 1: { 7 months }) */}
                  <div className={`mt-6 text-center transition-all duration-700 ${drawStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <svg className="w-full max-w-md mx-auto h-8" viewBox="0 0 350 25" fill="none">
                      <path 
                        d="M 10 18 Q 80 18 160 18 Q 175 18 175 5 Q 175 18 190 18 Q 270 18 340 18" 
                        stroke="#facc15" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                      />
                    </svg>
                    <p className="font-marker text-2xl text-yellow-300 font-bold">
                      {`{ 2 Seconds at Counter vs 20 Minutes in Kitchen }`}
                    </p>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-marker text-xl text-slate-300">
                    The Rule: Never make the chef cook what is already ready on the counter!
                  </span>
                  <span className="font-marker text-xl text-emerald-400">
                    100x Faster Handover
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 3: The Architecture (RAM vs Hard Disk) */}
            {currentStage === 2 && (
              <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-marker text-2xl sm:text-3xl text-white">
                      The Architecture: In-Memory RAM (Redis)
                    </span>
                    <span className="font-marker text-xl text-sky-400">
                      O(1) Hash Map &lt; 1.5ms
                    </span>
                  </div>
                  <p className="font-marker text-xl text-slate-300">
                    Step-by-step request flow when user opens restaurant menu:
                  </p>
                </div>

                {/* Center: Hand-drawn Architecture Diagram */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* User App */}
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-2xl border-2 border-white flex flex-col items-center justify-center bg-slate-950">
                        <span className="font-marker text-xl text-white">App User</span>
                        <span className="text-[10px] text-slate-400">GET /menu/101</span>
                      </div>
                    </div>

                    {/* Arrow 1: Check Redis */}
                    <div className={`flex flex-col items-center transition-all duration-500 ${drawStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="font-marker text-xl text-sky-400 font-bold">1. Check RAM</span>
                      <svg className="w-20 h-6" viewBox="0 0 80 20" fill="none">
                        <path d="M 5 10 L 70 10" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 62 4 L 72 10 L 62 16" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* REDIS CACHE (RAM) */}
                    <div className={`flex flex-col items-center transition-all duration-700 ${drawStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-24 h-24 rounded-2xl border-2 border-emerald-400 bg-emerald-950/40 flex flex-col items-center justify-center p-2 text-center shadow-lg shadow-emerald-950/50">
                        <span className="font-marker text-2xl text-emerald-300 font-bold leading-none">REDIS</span>
                        <span className="font-marker text-lg text-yellow-300 leading-none mt-1">RAM Memory</span>
                        <span className="text-[10px] text-emerald-400 font-semibold mt-1">1.2ms latency</span>
                      </div>
                      <span className="font-marker text-xl text-emerald-400 font-bold mt-1">
                        CACHE HIT! (99.9%)
                      </span>
                    </div>

                    {/* Arrow 2: Only on Miss */}
                    <div className={`flex flex-col items-center transition-all duration-700 ${drawStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="font-marker text-lg text-amber-400">2. If Cache Miss</span>
                      <svg className="w-20 h-6" viewBox="0 0 80 20" fill="none">
                        <path d="M 5 10 L 70 10" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
                        <path d="M 62 4 L 72 10 L 62 16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* POSTGRES DB (HARD DISK) */}
                    <div className={`flex flex-col items-center transition-all duration-700 ${drawStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-20 h-20 rounded-2xl border-2 border-slate-600 bg-slate-900 flex flex-col items-center justify-center text-center p-1">
                        <span className="font-marker text-xl text-slate-300 font-bold">Postgres</span>
                        <span className="text-[10px] text-slate-500">Hard Disk</span>
                        <span className="text-[10px] text-slate-400">45ms latency</span>
                      </div>
                      <span className="font-marker text-base text-slate-400 mt-1">
                        Queried 1 time only!
                      </span>
                    </div>

                  </div>

                  {/* Math proof written in yellow marker */}
                  <div className={`mt-4 p-2.5 rounded-lg border border-slate-900 bg-slate-950/70 max-w-lg mx-auto text-center transition-all duration-700 ${drawStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="font-marker text-2xl text-yellow-300">
                      User 1 queries DB → saves in Redis (`SET menu:101 ... EX 3600`)
                      <br />
                      <span className="text-emerald-400">
                        Next 99,999 users get it from Redis in 1ms! DB CPU remains at 4%!
                      </span>
                    </p>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-marker text-xl text-slate-300">
                    Result: 100,000 requests served without buying extra database servers
                  </span>
                  <span className="font-marker text-xl text-emerald-400">
                    O(1) Instant Lookup ✓
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 4: The Interview Trap (Cache Invalidation & TTL) */}
            {currentStage === 3 && (
              <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-marker text-2xl sm:text-3xl text-rose-400">
                      The Trap: "Stale Cache" Invalidation
                    </span>
                    <span className="font-marker text-xl text-yellow-300">
                      (Where 90% Freshers Get Filtered)
                    </span>
                  </div>
                  <p className="font-marker text-xl text-slate-300">
                    Recruiter asks: "Biryani price changes from ₹250 to ₹290. What happens now?"
                  </p>
                </div>

                {/* Center: The Trap vs Senior Solution */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                    
                    {/* The Bug (Stale Data) */}
                    <div className="p-4 rounded-xl border border-rose-900 bg-rose-950/30 text-left">
                      <p className="font-marker text-2xl text-rose-400 font-bold">
                        The Stale Data Bug ✗
                      </p>
                      <p className="font-marker text-lg text-slate-300 mt-2">
                        • Postgres updated: <span className="text-white font-bold">price = ₹290</span>
                      </p>
                      <p className="font-marker text-lg text-slate-300">
                        • Redis still holds: <span className="text-rose-400 font-bold">price = ₹250</span>
                      </p>
                      <p className="font-marker text-lg text-rose-300 mt-1">
                        Customer orders at ₹250! Restaurant loses ₹40 on every biryani!
                      </p>
                    </div>

                    {/* The Senior Solution (TTL & Eviction) */}
                    <div className={`p-4 rounded-xl border border-emerald-800 bg-emerald-950/30 text-left transition-all duration-700 ${drawStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <p className="font-marker text-2xl text-emerald-400 font-bold">
                        Senior Engineer Solution ✓
                      </p>
                      <p className="font-marker text-lg text-slate-300 mt-2">
                        1. <strong className="text-yellow-300">TTL (Time-To-Live):</strong> Key auto-expires in 300s.
                      </p>
                      <p className="font-marker text-lg text-slate-300">
                        2. <strong className="text-emerald-400">Write-Through Invalidation:</strong> Whenever owner edits price in DB → Server calls:
                      </p>
                      <div className="mt-1 px-2.5 py-1 rounded bg-black border border-emerald-700 text-emerald-300 font-marker text-lg">
                        redis.del("menu:101")
                      </div>
                    </div>

                  </div>

                  {/* Yellow Marker Quote */}
                  <div className={`mt-4 text-center transition-all duration-700 ${drawStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="font-marker text-2xl text-yellow-300 font-bold">
                      "There are only two hard things in Computer Science: Cache Invalidation and Naming Things."
                    </p>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-marker text-xl text-slate-300">
                    Senior Reflex: Always specify Cache Invalidation strategy before interviewer asks!
                  </span>
                  <span className="font-marker text-xl text-emerald-400">
                    Trap Neutralized ✓
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 5: The Offer (100K RPS Cleared with DB at 4% CPU) */}
            {currentStage === 4 && (
              <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-marker text-3xl sm:text-4xl text-emerald-400 font-bold">
                      Swiggy / Amazon Backend System Design: CLEARED ✓
                    </span>
                  </div>
                  <p className="font-marker text-xl text-slate-300">
                    The concrete placement outcome — raw architectural conviction:
                  </p>
                </div>

                {/* Center: Before vs After Comparison */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    
                    {/* Before Box */}
                    <div className="p-4 rounded-xl border border-rose-900 bg-rose-950/30 text-left">
                      <span className="font-marker text-xl text-rose-400 font-bold uppercase block">
                        Without Redis (Fresher)
                      </span>
                      <p className="font-marker text-3xl text-rose-300 font-bold mt-1">
                        500 RPS Max
                      </p>
                      <p className="font-marker text-lg text-slate-400">
                        100% DB CPU overload. 504 Timeout on 5,000 users. $4,000 AWS bill.
                      </p>
                    </div>

                    {/* After Box */}
                    <div className={`p-4 rounded-xl border border-emerald-600 bg-emerald-950/40 text-left transition-all duration-700 ${drawStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="font-marker text-xl text-emerald-400 font-bold uppercase block">
                        With Redis + TTL (S.A.I. Senior)
                      </span>
                      <p className="font-marker text-3xl text-emerald-300 font-bold mt-1">
                        100,000+ RPS
                      </p>
                      <p className="font-marker text-lg text-slate-300">
                        1.2ms latency. Database CPU at 4%. Zero extra server costs.
                      </p>
                    </div>

                  </div>

                  {/* Crowd with Blue Arrow (Matching Image 3 Style!) */}
                  <div className={`mt-6 flex items-center justify-center gap-4 transition-all duration-700 ${drawStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="relative">
                      <svg className="w-36 h-10" viewBox="0 0 150 40" fill="none">
                        <circle cx="20" cy="12" r="6" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="45" cy="10" r="6" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="70" cy="13" r="6" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="95" cy="11" r="6" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="120" cy="14" r="6" stroke="#ffffff" strokeWidth="2" />
                        <path d="M 12 32 Q 20 22 28 32 M 37 30 Q 45 20 53 30 M 62 33 Q 70 23 78 33 M 87 31 Q 95 21 103 31 M 112 34 Q 120 24 128 34" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                        <ellipse cx="70" cy="22" rx="65" ry="16" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />
                      </svg>
                    </div>

                    <span className="font-marker text-2xl text-sky-400">
                      ↗ Tier-2 Engineer → ₹18 LPA Offer
                    </span>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-marker text-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Permanent Mental Model Locked</span>
                  </div>
                  <span className="font-marker text-xl text-yellow-300">
                    Zero Spoon-Fed Syntax
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
