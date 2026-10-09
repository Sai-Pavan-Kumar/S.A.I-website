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

// Real-time letter-by-letter handwriting component in Playpen Sans
function HandwrittenText({ text, startDelay = 0, speed = 25, className = '', showCursor = true }) {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timer = null;
    let charIndex = 0;

    const delayTimer = setTimeout(() => {
      setIsTyping(true);
      timer = setInterval(() => {
        charIndex += 1;
        setDisplayed(text.slice(0, charIndex));
        if (charIndex >= text.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, startDelay, speed]);

  return (
    <span className={`inline-block ${className}`}>
      {displayed}
      {isTyping && showCursor && (
        <span className="inline-block w-2 h-2 ml-1 rounded-full bg-yellow-400 animate-pulse align-middle" />
      )}
    </span>
  );
}

export default function RoughPaperEngine({ onOpenWaitlist }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  // Subtitle fade state for Zone 2
  const [subtitleOpacity, setSubtitleOpacity] = useState(1);
  const [activeDialogue, setActiveDialogue] = useState('');

  const stages = [
    {
      id: 'crash',
      title: '01. The Crash',
      dialogue: 'IPL match appudu 100,000 mandhi oke sari Swiggy open chesthe... Junior developers ventane DB meedhaki SELECT query kotti disk ni champestharu ra. Hard disk 100,000 times/sec spin avvadhu — server dead!',
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
      dialogue: 'RAM speed nanoseconds lo untundhi, Hard Disk milliseconds ra. Redis anedhi RAM lo unde giant Key-Value map. First user vachinappude DB nunchi thestham — migatha 99,999 mandhiki 1ms lo Redis ichesthundhi!',
      time: '2:15',
      penColor: '#38bdf8'
    },
    {
      id: 'trap',
      title: '04. Stale Cache Trap',
      dialogue: 'Ikkade interviewer tricky question aduguthadu: "Biryani price ₹250 nunchi ₹290 ki marina, Redis lo old price eh untundhi kada?" ani. Ventane cheppali: "5-min TTL expire avvali, lekapothe DB update ayyaka Redis key ni delete chestham ra"!',
      time: '3:04',
      penColor: '#fb923c'
    },
    {
      id: 'reality',
      title: '05. Engineering Reality',
      dialogue: 'Deenitho repu poddunne direct ga offer vachesthadhi ani nenu fake promises cheppanu ra. Kaani reality enti ante: 90% freshers scale cheyadam theliyaka L1 lone filter avutharu. Ee memory trade-offs ila explain chesthe, recruiter knows you understand real systems!',
      time: '3:50',
      penColor: '#4ade80'
    }
  ];

  const currentStageData = stages[currentStage];

  // Stage change transition: Handle subtitle fade
  useEffect(() => {
    // 1. Fade out old subtitle
    const fadeTimer = setTimeout(() => {
      setSubtitleOpacity(0);
    }, 15);

    // 2. Change dialogue text and fade back in
    const subTimer = setTimeout(() => {
      setActiveDialogue(currentStageData.dialogue);
      setSubtitleOpacity(1);
    }, 280);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(subTimer);
    };
  }, [currentStage, currentStageData.dialogue, replayKey]);

  // Auto-play through stages (realistic duration: ~15s per stage so students can watch complete writing)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    onOpenWaitlist('Ask Sai Anna about Redis & System Design');
  };

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
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
            Connect 1-on-1 with Sai Anna in a live Google Meet call. He shares his digital screen and writes live sketches with colored markers — breaking down real-world system architecture by hand so you understand where systems fail under traffic.
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

          {/* ZONE 1: THE WRITING SPACE (BLACKBOARD — 100% PLAYPEN SANS, TRUE LETTER-BY-LETTER WRITING, ZERO COLLIDING BOXES) */}
          <div 
            key={`${currentStage}-${replayKey}`}
            className="relative bg-[#000000] w-full aspect-[16/9] min-h-[480px] sm:min-h-[540px] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden font-board"
          >
            
            {/* Live Writing Pen Tip Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 pointer-events-none z-10 font-board">
              <span 
                className="w-2.5 h-2.5 rounded-full animate-pen-pulse"
                style={{ backgroundColor: currentStageData.penColor }}
              ></span>
              <span className="text-base text-slate-300 font-board">
                Sai Anna writing...
              </span>
            </div>

            {/* SLIDE 1: The Crash (100K Users vs Postgres Disk) */}
            {currentStage === 0 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Stage Title */}
                <div>
                  <p className="font-board text-2xl sm:text-3xl text-white font-bold">
                    <HandwrittenText text="IPL Final: 100,000 Users Order at 8:00 PM" startDelay={100} speed={25} />
                  </p>
                  <p className="font-board text-xl text-rose-400 mt-1">
                    <HandwrittenText text="Direct SQL query to database disk:" startDelay={1400} speed={25} />
                  </p>
                </div>

                {/* Hand-Drawn Wobbly Diagram */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                    
                    {/* Wobbly User Crowd */}
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
                        <HandwrittenText text="100K Users" startDelay={2400} speed={30} />
                      </span>
                      <span className="font-board text-base text-slate-300">
                        <HandwrittenText text="Hitting Swiggy App" startDelay={3000} speed={25} />
                      </span>
                    </div>

                    {/* Wobbly Pink Arrow */}
                    <div className="flex flex-col items-center">
                      <svg className="w-36 h-10 draw-stroke-2" viewBox="0 0 120 30" fill="none">
                        <path d="M 6 16 C 35 13, 70 19, 108 15" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                        <path d="M 96 8 C 103 12, 107 14, 112 15 C 106 18, 101 22, 97 25" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      <span className="font-board text-lg text-rose-400 font-bold">
                        <HandwrittenText text="SELECT * FROM menu" startDelay={4200} speed={25} />
                      </span>
                    </div>

                    {/* Wobbly Hand-Drawn Postgres DB Cylinder */}
                    <div className="flex flex-col items-center">
                      <svg className="w-32 h-32 draw-stroke-2" viewBox="0 0 90 90" fill="none">
                        <path d="M 12 20 C 13 10, 77 10, 78 20 C 78 29, 11 29, 12 20" stroke="#f43f5e" strokeWidth="3" />
                        <path d="M 12 20 C 10 40, 14 60, 12 75 C 25 86, 65 85, 78 75 C 76 60, 80 40, 78 20" stroke="#f43f5e" strokeWidth="3" fill="#150508" />
                        <path d="M 13 48 C 28 56, 62 56, 77 48" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 3" />
                        <path d="M 22 26 C 36 40, 50 56, 68 70 M 68 26 C 52 42, 38 56, 22 70" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" className="draw-stroke-3" />
                      </svg>
                      <span className="font-board text-xl text-rose-300 font-bold">
                        <HandwrittenText text="Postgres (Disk)" startDelay={5600} speed={30} />
                      </span>
                      <span className="font-board text-base text-rose-400">
                        <HandwrittenText text="100% Disk I/O Crash!" startDelay={6200} speed={25} />
                      </span>
                    </div>

                  </div>

                  {/* Crash Callout (Generously padded wobbly border — NEVER cutting text!) */}
                  <div className="mt-5 max-w-lg mx-auto text-center p-4 border-2 border-rose-500/70 rounded-[20px_16px_22px_14px] bg-rose-950/20">
                    <p className="font-board text-xl text-rose-400 font-bold">
                      <HandwrittenText text="✗ 504 Gateway Timeout: Hard Disk Crash!" startDelay={7200} speed={25} />
                    </p>
                    <p className="font-board text-base text-slate-200 mt-1">
                      <HandwrittenText text="Disk limit ~1,000 IOPS. 100K queries choke the disk in 2 seconds." startDelay={8600} speed={20} />
                    </p>
                  </div>

                </div>

                {/* Hand-drawn Bottom Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-board text-lg text-slate-300">
                    <HandwrittenText text="Rule 1: Never let 100K users hit hard disk directly" startDelay={9800} speed={20} showCursor={false} />
                  </span>
                  <span className="font-board text-lg text-rose-400">
                    <HandwrittenText text="Direct SQL = Dead Server ✗" startDelay={10800} speed={20} showCursor={false} />
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
                    <HandwrittenText text="The Bawarchi Biryani Analogy" startDelay={100} speed={25} />
                  </p>
                  <p className="font-board text-xl text-yellow-300 mt-1">
                    <HandwrittenText text="Kitchen Chef vs Front Hot-Box Counter:" startDelay={1200} speed={25} />
                  </p>
                </div>

                {/* Hand-drawn Comparison Columns (Open wobbly brackets with ample breathing room) */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                    
                    {/* Kitchen Column (Generous padding, wobbly left bracket) */}
                    <div className="relative pl-6 py-2 border-l-4 border-rose-500/80 rounded-l-md">
                      <p className="font-board text-2xl text-rose-400 font-bold">
                        <HandwrittenText text="Kitchen (Postgres DB)" startDelay={2200} speed={25} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-2">
                        <HandwrittenText text="• Cooks raw rice & meat from scratch" startDelay={3000} speed={20} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-1">
                        <HandwrittenText text="• 20 - 30 minutes per order" startDelay={4200} speed={20} />
                      </p>
                      <p className="font-board text-base text-rose-300 mt-2">
                        <HandwrittenText text="✗ 1,000 customers in kitchen = Chef dies!" startDelay={5200} speed={20} />
                      </p>
                    </div>

                    {/* Front Counter Column (Generous padding, wobbly left bracket) */}
                    <div className="relative pl-6 py-2 border-l-4 border-emerald-500/80 rounded-l-md">
                      <p className="font-board text-2xl text-emerald-400 font-bold">
                        <HandwrittenText text="Front Counter (Redis)" startDelay={6200} speed={25} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-2">
                        <HandwrittenText text="• 50 biryani packets pre-packed" startDelay={7000} speed={20} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-1">
                        <HandwrittenText text="• 2 seconds to hand to customer!" startDelay={8000} speed={20} />
                      </p>
                      <p className="font-board text-base text-emerald-300 mt-2">
                        <HandwrittenText text="✓ Chef in kitchen is never disturbed!" startDelay={9000} speed={20} />
                      </p>
                    </div>

                  </div>

                  {/* Wobbly Yellow Curly Bracket */}
                  <div className="mt-5 text-center">
                    <svg className="w-full max-w-md mx-auto h-8 draw-stroke-3" viewBox="0 0 350 25" fill="none">
                      <path 
                        d="M 12 18 C 80 17, 160 19, 170 19 C 174 19, 175 10, 175 6 C 175 10, 177 19, 180 19 C 190 19, 270 17, 338 18" 
                        stroke="#facc15" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                      />
                    </svg>
                    <p className="font-board text-2xl text-yellow-300 font-bold">
                      <HandwrittenText text="{ 2 Seconds at Counter vs 20 Minutes in Kitchen }" startDelay={9800} speed={25} />
                    </p>
                  </div>

                </div>

                {/* Bottom Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-board text-lg text-slate-300">
                    <HandwrittenText text="Intuition: Keep hot frequently-ordered items ready on the front counter!" startDelay={11000} speed={20} showCursor={false} />
                  </span>
                  <span className="font-board text-lg text-emerald-400">
                    <HandwrittenText text="100x Faster Handover ✓" startDelay={12000} speed={20} showCursor={false} />
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
                    <HandwrittenText text="In-Memory RAM (Redis) Architecture" startDelay={100} speed={25} />
                  </p>
                  <p className="font-board text-xl text-sky-400 mt-1">
                    <HandwrittenText text="RAM (Nanoseconds) vs Hard Disk (Milliseconds)" startDelay={1200} speed={25} />
                  </p>
                </div>

                {/* Hand-drawn Architecture Diagram */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Wobbly User Box */}
                    <div className="p-3 flex flex-col items-center border-2 border-white/80 rounded-[18px_14px_20px_16px] min-w-[100px]">
                      <span className="font-board text-lg text-white font-bold">
                        <HandwrittenText text="App User" startDelay={2200} speed={30} />
                      </span>
                      <span className="font-board text-xs text-slate-400 mt-0.5">
                        <HandwrittenText text="GET /menu/101" startDelay={2800} speed={25} />
                      </span>
                    </div>

                    {/* Wobbly Cyan Arrow */}
                    <div className="flex flex-col items-center">
                      <span className="font-board text-base text-sky-400 font-bold">
                        <HandwrittenText text="1. Check RAM" startDelay={3600} speed={25} />
                      </span>
                      <svg className="w-24 h-6 draw-stroke-1" viewBox="0 0 90 20" fill="none">
                        <path d="M 6 11 C 32 8, 58 13, 80 10" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 70 5 C 75 8, 78 9, 82 10 C 78 12, 75 14, 71 17" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* Wobbly Redis Box */}
                    <div className="p-3 flex flex-col items-center border-2 border-emerald-400/90 rounded-[20px_16px_22px_14px] bg-emerald-950/20 min-w-[120px]">
                      <span className="font-board text-2xl text-emerald-300 font-bold leading-none">
                        <HandwrittenText text="REDIS" startDelay={4800} speed={30} />
                      </span>
                      <span className="font-board text-base text-yellow-300 leading-none mt-1">
                        <HandwrittenText text="In-Memory RAM" startDelay={5400} speed={25} />
                      </span>
                      <span className="font-board text-sm text-emerald-400 font-bold mt-1">
                        <HandwrittenText text="1.2ms latency" startDelay={6200} speed={25} />
                      </span>
                    </div>

                    {/* Wobbly Amber Arrow */}
                    <div className="flex flex-col items-center">
                      <span className="font-board text-xs text-amber-400">
                        <HandwrittenText text="2. If Miss" startDelay={7200} speed={25} />
                      </span>
                      <svg className="w-20 h-6 draw-stroke-2" viewBox="0 0 80 20" fill="none">
                        <path d="M 6 10 C 28 8, 50 12, 72 10" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
                        <path d="M 64 5 C 68 7, 70 9, 74 10 C 70 12, 68 13, 64 16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* Wobbly Postgres Box */}
                    <div className="p-3 flex flex-col items-center border-2 border-slate-600/80 rounded-[18px_14px_20px_16px] min-w-[100px]">
                      <span className="font-board text-lg text-slate-300 font-bold">
                        <HandwrittenText text="Postgres" startDelay={8000} speed={30} />
                      </span>
                      <span className="font-board text-xs text-slate-400 mt-0.5">
                        <HandwrittenText text="Disk (45ms)" startDelay={8600} speed={25} />
                      </span>
                    </div>

                  </div>

                  {/* Wobbly Handwritten Note */}
                  <div className="mt-5 text-center max-w-lg mx-auto">
                    <p className="font-board text-xl text-yellow-300">
                      <HandwrittenText text="User 1 queries DB → saves in Redis (`SET menu:101 ... EX 3600`)" startDelay={9400} speed={20} />
                    </p>
                    <p className="font-board text-xl text-emerald-400 font-bold mt-1">
                      <HandwrittenText text="Next 99,999 users get 1ms response from RAM! DB CPU stays at 4%!" startDelay={10800} speed={20} />
                    </p>
                  </div>
                </div>

                {/* Bottom Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-board text-lg text-slate-300">
                    <HandwrittenText text="O(1) Hash Map: Instant lookup without paying heavy database server bills" startDelay={11800} speed={20} showCursor={false} />
                  </span>
                  <span className="font-board text-lg text-emerald-400">
                    <HandwrittenText text="Production Architecture ✓" startDelay={12600} speed={20} showCursor={false} />
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
                    <HandwrittenText text="The Trap: 'Stale Cache' Invalidation" startDelay={100} speed={25} />
                  </p>
                  <p className="font-board text-xl text-yellow-300 mt-1">
                    <HandwrittenText text="Recruiter asks: 'Biryani price changes from ₹250 to ₹290. What happens?'" startDelay={1200} speed={25} />
                  </p>
                </div>

                {/* Hand-drawn Comparison Columns (Left borders with generous padding) */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                    
                    {/* The Stale Data Bug */}
                    <div className="relative pl-6 py-2 border-l-4 border-rose-500/80 rounded-l-md">
                      <p className="font-board text-2xl text-rose-400 font-bold">
                        <HandwrittenText text="The Stale Data Bug ✗" startDelay={2200} speed={25} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-2">
                        <HandwrittenText text="• Postgres DB: price = ₹290" startDelay={3000} speed={20} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-1">
                        <HandwrittenText text="• Redis RAM: price = ₹250 (Old!)" startDelay={4000} speed={20} />
                      </p>
                      <p className="font-board text-base text-rose-300 mt-2">
                        <HandwrittenText text="Customer orders at ₹250! Restaurant loses ₹40 on every order!" startDelay={5000} speed={20} />
                      </p>
                    </div>

                    {/* Senior Fix */}
                    <div className="relative pl-6 py-2 border-l-4 border-emerald-500/80 rounded-l-md">
                      <p className="font-board text-2xl text-emerald-400 font-bold">
                        <HandwrittenText text="Senior Fix ✓" startDelay={6200} speed={25} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-2">
                        <HandwrittenText text="1. TTL: Auto-expires in 300 seconds" startDelay={7000} speed={20} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-1">
                        <HandwrittenText text="2. Write-Through: On DB edit →" startDelay={8000} speed={20} />
                      </p>
                      <p className="font-board text-lg text-emerald-300 font-bold mt-1">
                        <HandwrittenText text="redis.del('menu:101')" startDelay={9000} speed={25} />
                      </p>
                    </div>

                  </div>

                  {/* Wobbly Hand-Drawn Quote */}
                  <div className="mt-5 text-center">
                    <p className="font-board text-xl text-yellow-300 font-bold">
                      <HandwrittenText text="'Two hard problems in Computer Science: Cache Invalidation and Naming Things.'" startDelay={9800} speed={22} />
                    </p>
                  </div>

                </div>

                {/* Bottom Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-board text-lg text-slate-300">
                    <HandwrittenText text="Senior Reflex: Always state Invalidation Strategy before recruiter asks!" startDelay={11000} speed={20} showCursor={false} />
                  </span>
                  <span className="font-board text-lg text-emerald-400">
                    <HandwrittenText text="Trap Handled ✓" startDelay={12000} speed={20} showCursor={false} />
                  </span>
                </div>

              </div>
            )}

            {/* SLIDE 5: Engineering Reality (No Fake Hype) */}
            {currentStage === 4 && (
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* Title */}
                <div>
                  <p className="font-board text-2xl sm:text-3xl text-emerald-400 font-bold">
                    <HandwrittenText text="Placement Reality: Production Resilience" startDelay={100} speed={25} />
                  </p>
                  <p className="font-board text-xl text-slate-300 mt-1">
                    <HandwrittenText text="No fake guarantees. What technical recruiters actually evaluate:" startDelay={1200} speed={25} />
                  </p>
                </div>

                {/* Hand-drawn Comparison Columns (Left borders with generous padding) */}
                <div className="my-auto py-2">
                  <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                    
                    {/* Fresher Blind Spot */}
                    <div className="relative pl-6 py-2 border-l-4 border-rose-500/80 rounded-l-md">
                      <p className="font-board text-2xl text-rose-400 font-bold">
                        <HandwrittenText text="Fresher Rejection Filter ✗" startDelay={2200} speed={25} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-2">
                        <HandwrittenText text="• Memorizes syntax & tutorial code" startDelay={3000} speed={20} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-1">
                        <HandwrittenText text="• Can't handle 100K traffic questions" startDelay={4000} speed={20} />
                      </p>
                      <p className="font-board text-base text-rose-300 mt-2">
                        <HandwrittenText text="Filtered out in round 1 because system crashes!" startDelay={5000} speed={20} />
                      </p>
                    </div>

                    {/* Production Maturity */}
                    <div className="relative pl-6 py-2 border-l-4 border-emerald-500/80 rounded-l-md">
                      <p className="font-board text-2xl text-emerald-400 font-bold">
                        <HandwrittenText text="Production Maturity ✓" startDelay={6200} speed={25} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-2">
                        <HandwrittenText text="• Understands RAM vs Disk bottlenecks" startDelay={7000} speed={20} />
                      </p>
                      <p className="font-board text-lg text-slate-200 mt-1">
                        <HandwrittenText text="• Solves Cache Invalidation & TTL" startDelay={8000} speed={20} />
                      </p>
                      <p className="font-board text-base text-emerald-300 mt-2">
                        <HandwrittenText text="Recruiter sees you build systems that never crash!" startDelay={9000} speed={20} />
                      </p>
                    </div>

                  </div>

                  {/* Wobbly Truth Callout */}
                  <div className="mt-5 text-center">
                    <p className="font-board text-xl text-yellow-300 font-bold">
                      <HandwrittenText text="'Placement prep is not memorizing syntax. It is understanding where systems fail.'" startDelay={9800} speed={22} />
                    </p>
                  </div>

                </div>

                {/* Bottom Annotation */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-board text-lg text-slate-300">
                    <HandwrittenText text="Grounded Preparation: Zero Toy Tutorials • Zero Fake Guarantees" startDelay={11000} speed={20} showCursor={false} />
                  </span>
                  <span className="font-board text-lg text-emerald-400">
                    <HandwrittenText text="Production Composure ✓" startDelay={12000} speed={20} showCursor={false} />
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
