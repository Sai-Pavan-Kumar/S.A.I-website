import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCcw,
  Eye,
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  Hand, 
  PhoneOff, 
  MoreVertical,
  Users,
  Volume2
} from 'lucide-react';

// Step-by-step sequential script representing ONE mentor drawing with ONE pen in real-time
const SCRIPT_STEPS = [
  // Beat 1: Surge & Context
  {
    id: 'header_main',
    type: 'text',
    text: 'IPL Final: 100,000 Traffic Surge (8:00 PM)',
    speed: 26,
    dialogue: 'Chudu ra, 8:00 PM IPL match final over... 100,000 mandhi oke sari Swiggy app open chestharu.'
  },
  {
    id: 'header_sub',
    type: 'text',
    text: 'Swiggy Order Rush & Database Crash Analysis',
    speed: 24,
    dialogue: 'Chudu ra, 8:00 PM IPL match final over... 100,000 mandhi oke sari Swiggy app open chestharu.'
  },
  {
    id: 'users_icon',
    type: 'shape',
    duration: 600,
    dialogue: 'Prathi user biryani kosam app lo search chesthadu.'
  },
  {
    id: 'users_label',
    type: 'text',
    text: '100,000 Users',
    speed: 26,
    dialogue: '100,000 concurrent requests client side nunchi trigger avthayi.'
  },
  {
    id: 'users_sub',
    type: 'text',
    text: 'Swiggy Mobile Apps',
    speed: 22,
    dialogue: '100,000 concurrent requests client side nunchi trigger avthayi.'
  },

  // Beat 2: Junior Mistake & Direct Query
  {
    id: 'arrow_db',
    type: 'shape',
    duration: 500,
    dialogue: 'Junior developers em chestharo thelusa? Direct ga Postgres meedhaki SELECT query kotti disk ni champestharu ra.'
  },
  {
    id: 'arrow_label',
    type: 'text',
    text: 'Direct SELECT * Query (Danger!)',
    speed: 24,
    dialogue: 'Prathi request direct ga database disk layer ki pampistharu.'
  },
  {
    id: 'db_cylinder',
    type: 'shape',
    duration: 600,
    dialogue: 'Database anedhi physical hard disk meedha run avthundhi.'
  },
  {
    id: 'db_label',
    type: 'text',
    text: 'Postgres DB (Hard Disk)',
    speed: 26,
    dialogue: 'Database anedhi physical hard disk meedha run avthundhi.'
  },

  // Beat 3: Physical Hardware Bottleneck & Crash
  {
    id: 'db_crash_x',
    type: 'shape',
    duration: 400,
    dialogue: 'Hard disk physical spin limit ~1,000 IOPS mathrame ra.'
  },
  {
    id: 'db_choke_label',
    type: 'text',
    text: 'Disk Choke: ~1,000 IOPS Limit',
    speed: 24,
    dialogue: '100K queries hit aithe disk 100% choke — 504 Gateway Timeout, server dead!'
  },
  {
    id: 'db_crash_alert',
    type: 'text',
    text: '✗ 504 Gateway Timeout: Server Crash!',
    speed: 22,
    dialogue: '100K queries hit aithe disk 100% choke — 504 Gateway Timeout, server dead!'
  },

  // Beat 4: Bawarchi Biryani Mental Model
  {
    id: 'model_title',
    type: 'text',
    text: 'Bawarchi Biryani Mental Model:',
    speed: 24,
    dialogue: 'Deeniki Bawarchi Biryani hotel analogy: prathi plate kosam kitchen loki velli fresh rice vandaru ra.'
  },
  {
    id: 'model_kitchen',
    type: 'text',
    text: '• Kitchen (DB): 25 mins fresh cooking per order',
    speed: 20,
    dialogue: 'Kitchen loki 1,000 customers unte chef chanipothadu.'
  },
  {
    id: 'model_counter',
    type: 'text',
    text: '• Front Hot-Box (Cache): 2 seconds delivery!',
    speed: 20,
    dialogue: 'Front counter hot-box lo already 50 packets ready ga untayi — 2 seconds lo delivery!'
  },

  // Beat 5: Redis Solution & Traffic Absorption
  {
    id: 'redis_box',
    type: 'shape',
    duration: 500,
    dialogue: 'Front counter eh mana Redis Cache! In-memory RAM speed nanoseconds.'
  },
  {
    id: 'redis_title',
    type: 'text',
    text: 'Redis In-Memory Cache (RAM)',
    speed: 24,
    dialogue: 'Front counter eh mana Redis Cache! In-memory RAM speed nanoseconds.'
  },
  {
    id: 'redis_speed',
    type: 'text',
    text: 'Latency: ~1 Millisecond',
    speed: 22,
    dialogue: 'First user DB nunchi thesthadu, migatha 99,999 queries Redis 1ms lo serve chesthundhi.'
  },
  {
    id: 'redis_stat',
    type: 'text',
    text: 'Absorbs 99,999 Reads ✓',
    speed: 20,
    dialogue: 'Database load 100,000 nunchi okka query ki drop aypothundhi!'
  },
  {
    id: 'db_saved_label',
    type: 'text',
    text: '✓ DB Protected: Only 1 Query on Cache Miss!',
    speed: 20,
    dialogue: 'Hard disk safe — zero choke, zero crashes.'
  },

  // Beat 6: Senior Reflex & Invalidation
  {
    id: 'reflex_title',
    type: 'text',
    text: 'Senior Reflex (Cache Invalidation):',
    speed: 24,
    dialogue: 'Interview lo trick question: "Price update aithe old data untundha?" ani.'
  },
  {
    id: 'reflex_ttl',
    type: 'text',
    text: '• Price update: 5-min TTL or Evict key on DB write',
    speed: 20,
    dialogue: 'Ventane "5-min TTL expire avvali lekapothe DB write appudu Redis key delete chestham" ani cheppali.'
  },
  {
    id: 'reflex_rule',
    type: 'text',
    text: '• Rule: Protect the physical hard disk at all costs.',
    speed: 20,
    dialogue: 'Idhe ra production engineering. Ee memory trade-offs chepthene recruiter selection confirm chesthadu!'
  }
];

// Single active text component (Only one text types at any given moment with the pen tip cursor)
function ActiveWriter({ text, speed = 25, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let charIndex = 0;
    const timer = setInterval(() => {
      charIndex += 1;
      setDisplayed(text.slice(0, charIndex));
      if (charIndex >= text.length) {
        clearInterval(timer);
        setTimeout(() => {
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }, 300); // Natural human pause before pen moves to next location
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="inline font-board">
      {displayed}
      <span className="inline-block w-2.5 h-2.5 ml-1 rounded-full bg-yellow-400 animate-pulse align-middle" />
    </span>
  );
}

export default function RoughPaperEngine({ onOpenWaitlist }) {
  // Current step index in the continuous one-pen queue (0 to SCRIPT_STEPS.length - 1)
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [callSeconds, setCallSeconds] = useState(148); // realistic session runtime (e.g. 2m 28s)
  const [showFullDiagram, setShowFullDiagram] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  // Live call timer ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCallTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // When active step is a shape, advance automatically after shape duration
  useEffect(() => {
    if (showFullDiagram) return;
    const currentStep = SCRIPT_STEPS[activeStepIndex];
    if (!currentStep) return;

    if (currentStep.type === 'shape') {
      const timer = setTimeout(() => {
        setActiveStepIndex((prev) => (prev < SCRIPT_STEPS.length - 1 ? prev + 1 : prev));
      }, currentStep.duration || 500);
      return () => clearTimeout(timer);
    }
  }, [activeStepIndex, showFullDiagram]);

  const handleTextComplete = () => {
    if (showFullDiagram) return;
    setActiveStepIndex((prev) => (prev < SCRIPT_STEPS.length - 1 ? prev + 1 : prev));
  };

  const handleReplay = () => {
    setShowFullDiagram(false);
    setActiveStepIndex(0);
    setReplayKey((prev) => prev + 1);
  };

  const handleToggleFull = () => {
    setShowFullDiagram(!showFullDiagram);
  };

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    onOpenWaitlist('Ask Sai Anna about Redis Caching in Live Call');
  };

  // Helper: check if a step is currently visible
  const isVisible = (stepId) => {
    if (showFullDiagram) return true;
    const idx = SCRIPT_STEPS.findIndex((s) => s.id === stepId);
    return idx !== -1 && activeStepIndex >= idx;
  };

  // Helper: check if a step is actively typing right now
  const isWriting = (stepId) => {
    if (showFullDiagram) return false;
    const idx = SCRIPT_STEPS.findIndex((s) => s.id === stepId);
    return idx === activeStepIndex;
  };

  const currentStep = SCRIPT_STEPS[Math.min(activeStepIndex, SCRIPT_STEPS.length - 1)];

  return (
    <section id="rough-paper" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-4 font-sans">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span>1-on-1 Senior Mentorship Canvas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Real engineering understanding happens on a live whiteboard,{' '}
            <span className="text-emerald-700">not pre-recorded slide decks.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Connect 1-on-1 with Sai Anna in a live mentorship room. Watch him live-sketch how real-world architectures hold under 100K traffic surges — sequentially by hand with live Telugu-English captions.
          </p>
        </div>

        {/* ZONE 3: SAI LIVE MENTORSHIP CALL ROOM */}
        <div className="bg-[#18191c] rounded-3xl shadow-2xl border border-slate-800 overflow-hidden text-white font-sans">
          
          {/* Top Bar: Live Call Room Header */}
          <div className="px-5 py-3.5 bg-[#121316] border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              {/* Pulsing LIVE badge with Call Runtime */}
              <div className="flex items-center gap-2 bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 px-3 py-1 rounded-full text-xs font-semibold font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>LIVE SESSION</span>
                <span className="text-emerald-500 font-mono text-[11px] ml-1">({formatCallTime(callSeconds)})</span>
              </div>

              <span className="text-slate-700">|</span>

              {/* Presenting Screen Pill */}
              <div className="flex items-center gap-2 bg-blue-950/80 text-blue-300 border border-blue-800/80 px-3 py-1 rounded-full text-xs font-medium font-sans">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Sai Anna is sharing whiteboard</span>
              </div>
            </div>

            {/* Room Identifier & Replay Tools */}
            <div className="flex items-center gap-3 text-slate-300 text-xs font-sans">
              <span className="hidden sm:inline-block font-mono text-slate-400 text-[11px]">
                sai.thesurfboard.in/live/session-redis
              </span>
              
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-xs">2</span>
              </div>

              {/* Canvas controls: Replay & Full Diagram */}
              <button
                onClick={handleReplay}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer flex items-center gap-1"
                title="Restart live sketch from beginning"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline text-[11px]">Replay</span>
              </button>

              <button
                onClick={handleToggleFull}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer flex items-center gap-1"
                title={showFullDiagram ? "Resume live handwriting" : "Show complete blackboard drawing"}
              >
                <Eye className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline text-[11px]">
                  {showFullDiagram ? 'Live Mode' : 'Complete View'}
                </span>
              </button>
            </div>
          </div>

          {/* ZONE 1: THE CONTINUOUS LIVE WHITEBOARD (STRICTLY PLAYPEN SANS, ONE PEN SEQUENTIAL WRITING) */}
          <div 
            key={replayKey}
            className="relative bg-[#000000] w-full min-h-[480px] sm:min-h-[540px] p-6 sm:p-10 select-none overflow-hidden font-board flex flex-col justify-between"
          >
            
            {/* Live Stylus / Marker Activity Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800 pointer-events-none z-10 font-board">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse"></span>
              <span className="text-sm text-slate-300 font-board font-medium">
                {activeStepIndex < SCRIPT_STEPS.length - 1 && !showFullDiagram 
                  ? 'Sai Anna sketching live...' 
                  : 'Sketch complete'}
              </span>
            </div>

            {/* 1. TOP HEADER (Sequential lines 1 & 2) */}
            <div>
              {isVisible('header_main') && (
                <h3 className="font-board text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  {isWriting('header_main') ? (
                    <ActiveWriter text="IPL Final: 100,000 Traffic Surge (8:00 PM)" speed={26} onComplete={handleTextComplete} />
                  ) : (
                    <span>IPL Final: 100,000 Traffic Surge (8:00 PM)</span>
                  )}
                </h3>
              )}

              {isVisible('header_sub') && (
                <p className="font-board text-lg sm:text-xl text-yellow-300 mt-1">
                  {isWriting('header_sub') ? (
                    <ActiveWriter text="Swiggy Order Rush & Database Crash Analysis" speed={24} onComplete={handleTextComplete} />
                  ) : (
                    <span>Swiggy Order Rush & Database Crash Analysis</span>
                  )}
                </p>
              )}
            </div>

            {/* 2. CENTER ARCHITECTURE DIAGRAM (Builds element by element, ZERO empty boxes) */}
            <div className="my-auto py-6">
              <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                
                {/* 2A. CLIENT USERS */}
                {isVisible('users_icon') && (
                  <div className="flex flex-col items-center text-center p-3 animate-fadeIn">
                    <svg className="w-32 h-10 draw-stroke-1" viewBox="0 0 150 45" fill="none">
                      <circle cx="20" cy="12" r="6" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="45" cy="10" r="6" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="70" cy="13" r="6" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="95" cy="11" r="6" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="120" cy="14" r="6" stroke="#ffffff" strokeWidth="2.5" />
                      <path d="M 10 35 C 18 26, 24 24, 30 35 M 35 33 C 43 24, 48 24, 55 33 M 60 36 C 68 25, 74 27, 80 36 M 85 34 C 93 23, 98 25, 105 34 M 110 37 C 118 26, 124 28, 130 37" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    </svg>

                    {isVisible('users_label') && (
                      <span className="font-board text-xl text-yellow-300 font-bold mt-2">
                        {isWriting('users_label') ? (
                          <ActiveWriter text="100,000 Users" speed={26} onComplete={handleTextComplete} />
                        ) : (
                          <span>100,000 Users</span>
                        )}
                      </span>
                    )}

                    {isVisible('users_sub') && (
                      <span className="font-board text-sm text-slate-300">
                        {isWriting('users_sub') ? (
                          <ActiveWriter text="Swiggy Mobile Apps" speed={22} onComplete={handleTextComplete} />
                        ) : (
                          <span>Swiggy Mobile Apps</span>
                        )}
                      </span>
                    )}
                  </div>
                )}

                {/* 2B. REDIS CACHE (Appears ONLY when active at Scene 5) */}
                {isVisible('redis_box') && (
                  <div className="flex flex-col items-center text-center p-4 rounded-xl border-2 border-emerald-400/90 bg-emerald-950/25 shadow-lg shadow-emerald-950/40 animate-fadeIn">
                    <div className="mb-1">
                      {isVisible('redis_title') && (
                        <span className="font-board text-xl text-emerald-400 font-bold">
                          {isWriting('redis_title') ? (
                            <ActiveWriter text="Redis In-Memory Cache (RAM)" speed={24} onComplete={handleTextComplete} />
                          ) : (
                            <span>Redis In-Memory Cache (RAM)</span>
                          )}
                        </span>
                      )}
                    </div>

                    {isVisible('redis_speed') && (
                      <span className="font-board text-sm text-emerald-300">
                        {isWriting('redis_speed') ? (
                          <ActiveWriter text="Latency: ~1 Millisecond" speed={22} onComplete={handleTextComplete} />
                        ) : (
                          <span>Latency: ~1 Millisecond</span>
                        )}
                      </span>
                    )}

                    {isVisible('redis_stat') && (
                      <span className="font-board text-xs text-slate-200 mt-1">
                        {isWriting('redis_stat') ? (
                          <ActiveWriter text="Absorbs 99,999 Reads ✓" speed={20} onComplete={handleTextComplete} />
                        ) : (
                          <span>Absorbs 99,999 Reads ✓</span>
                        )}
                      </span>
                    )}
                  </div>
                )}

                {/* 2C. FLOW ARROW */}
                {isVisible('arrow_db') && (
                  <div className="flex flex-col items-center text-center px-2 animate-fadeIn">
                    <svg className="w-32 h-8" viewBox="0 0 120 25" fill="none">
                      <path 
                        d="M 6 12 C 35 10, 70 14, 108 12" 
                        stroke={isVisible('redis_box') ? '#4ade80' : '#f43f5e'} 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                      />
                      <path 
                        d="M 96 6 C 103 9, 107 11, 112 12 C 106 15, 101 18, 97 21" 
                        stroke={isVisible('redis_box') ? '#4ade80' : '#f43f5e'} 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                      />
                    </svg>

                    {isVisible('arrow_label') && (
                      <span className={`font-board text-sm font-bold ${isVisible('redis_box') ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isWriting('arrow_label') ? (
                          <ActiveWriter text={isVisible('redis_box') ? "Fast In-Memory Path" : "Direct SELECT * Query (Danger!)"} speed={24} onComplete={handleTextComplete} />
                        ) : (
                          <span>{isVisible('redis_box') ? "Fast In-Memory Path" : "Direct SELECT * Query (Danger!)"}</span>
                        )}
                      </span>
                    )}
                  </div>
                )}

                {/* 2D. POSTGRES DATABASE CYLINDER */}
                {isVisible('db_cylinder') && (
                  <div className="flex flex-col items-center text-center p-3 animate-fadeIn">
                    <svg className="w-28 h-28" viewBox="0 0 90 90" fill="none">
                      <path d="M 12 20 C 13 10, 77 10, 78 20 C 78 29, 11 29, 12 20" stroke="#f43f5e" strokeWidth="2.5" />
                      <path d="M 12 20 C 10 40, 14 60, 12 75 C 25 86, 65 85, 78 75 C 76 60, 80 40, 78 20" stroke="#f43f5e" strokeWidth="2.5" fill="#150508" />
                      <path d="M 13 48 C 28 56, 62 56, 77 48" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" />
                      {/* Crash X Mark */}
                      {isVisible('db_crash_x') && !isVisible('redis_box') && (
                        <path d="M 22 26 C 36 40, 50 56, 68 70 M 68 26 C 52 42, 38 56, 22 70" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
                      )}
                    </svg>

                    {isVisible('db_label') && (
                      <span className="font-board text-lg text-rose-300 font-bold mt-1">
                        {isWriting('db_label') ? (
                          <ActiveWriter text="Postgres DB (Hard Disk)" speed={26} onComplete={handleTextComplete} />
                        ) : (
                          <span>Postgres DB (Hard Disk)</span>
                        )}
                      </span>
                    )}

                    {/* Crash status (Before cache is introduced) */}
                    {isVisible('db_choke_label') && !isVisible('redis_box') && (
                      <span className="font-board text-xs text-rose-400 font-bold mt-1">
                        {isWriting('db_choke_label') ? (
                          <ActiveWriter text="Disk Choke: ~1,000 IOPS Limit" speed={24} onComplete={handleTextComplete} />
                        ) : (
                          <span>Disk Choke: ~1,000 IOPS Limit</span>
                        )}
                      </span>
                    )}

                    {isVisible('db_crash_alert') && !isVisible('redis_box') && (
                      <span className="font-board text-xs text-rose-500 font-bold mt-1">
                        {isWriting('db_crash_alert') ? (
                          <ActiveWriter text="✗ 504 Gateway Timeout: Server Crash!" speed={22} onComplete={handleTextComplete} />
                        ) : (
                          <span>✗ 504 Gateway Timeout: Server Crash!</span>
                        )}
                      </span>
                    )}

                    {/* Saved status (After cache is active) */}
                    {isVisible('db_saved_label') && (
                      <span className="font-board text-xs text-emerald-400 font-bold mt-1">
                        {isWriting('db_saved_label') ? (
                          <ActiveWriter text="✓ DB Protected: Only 1 Query on Cache Miss!" speed={20} onComplete={handleTextComplete} />
                        ) : (
                          <span>✓ DB Protected: Only 1 Query on Cache Miss!</span>
                        )}
                      </span>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* 3. BOTTOM PEDAGOGICAL NOTES (Builds sequentially) */}
            <div className="pt-4 border-t border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Bawarchi Analogy Note */}
              {isVisible('model_title') && (
                <div className="p-3 border-l-4 border-yellow-400/90 pl-4 bg-slate-950/40 rounded-r-md animate-fadeIn">
                  <p className="font-board text-base sm:text-lg text-yellow-300 font-bold">
                    {isWriting('model_title') ? (
                      <ActiveWriter text="Bawarchi Biryani Mental Model:" speed={24} onComplete={handleTextComplete} />
                    ) : (
                      <span>Bawarchi Biryani Mental Model:</span>
                    )}
                  </p>

                  {isVisible('model_kitchen') && (
                    <p className="font-board text-sm text-slate-200 mt-1">
                      {isWriting('model_kitchen') ? (
                        <ActiveWriter text="• Kitchen (DB): 25 mins fresh cooking per order" speed={20} onComplete={handleTextComplete} />
                      ) : (
                        <span>• Kitchen (DB): 25 mins fresh cooking per order</span>
                      )}
                    </p>
                  )}

                  {isVisible('model_counter') && (
                    <p className="font-board text-sm text-slate-200">
                      {isWriting('model_counter') ? (
                        <ActiveWriter text="• Front Hot-Box (Cache): 2 seconds delivery!" speed={20} onComplete={handleTextComplete} />
                      ) : (
                        <span>• Front Hot-Box (Cache): 2 seconds delivery!</span>
                      )}
                    </p>
                  )}
                </div>
              )}

              {/* Senior Reflex Note */}
              {isVisible('reflex_title') && (
                <div className="p-3 border-l-4 border-purple-400/90 pl-4 bg-slate-950/40 rounded-r-md animate-fadeIn">
                  <p className="font-board text-base sm:text-lg text-purple-300 font-bold">
                    {isWriting('reflex_title') ? (
                      <ActiveWriter text="Senior Reflex (Cache Invalidation):" speed={24} onComplete={handleTextComplete} />
                    ) : (
                      <span>Senior Reflex (Cache Invalidation):</span>
                    )}
                  </p>

                  {isVisible('reflex_ttl') && (
                    <p className="font-board text-sm text-slate-200 mt-1">
                      {isWriting('reflex_ttl') ? (
                        <ActiveWriter text="• Price update: 5-min TTL or Evict key on DB write" speed={20} onComplete={handleTextComplete} />
                      ) : (
                        <span>• Price update: 5-min TTL or Evict key on DB write</span>
                      )}
                    </p>
                  )}

                  {isVisible('reflex_rule') && (
                    <p className="font-board text-xs text-emerald-400 mt-1">
                      {isWriting('reflex_rule') ? (
                        <ActiveWriter text="• Rule: Protect the physical hard disk at all costs." speed={20} onComplete={handleTextComplete} />
                      ) : (
                        <span>• Rule: Protect the physical hard disk at all costs.</span>
                      )}
                    </p>
                  )}
                </div>
              )}

            </div>

          </div>

          {/* ZONE 2: LIVE CALL CAPTIONS (AUTHENTIC REAL-TIME MEETING SUBTITLES) */}
          <div className="px-5 py-4 bg-[#121316] border-t border-slate-800 flex items-center gap-3.5 font-sans min-h-[64px]">
            {/* Host Speaker Avatar with live mic pulsation */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs font-sans">
                SA
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#121316] animate-ping" />
            </div>
            
            {/* Live Subtitle Line */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold text-emerald-400 font-sans">Sai Anna (Senior Mentor)</span>
                <span className="text-[10px] text-slate-500 font-sans flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-emerald-400 animate-pulse" />
                  Speaking Live
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 font-medium font-sans leading-snug">
                "{currentStep ? currentStep.dialogue : 'Real systems lo memory trade-offs ni ila live sketch tho clarity ga prove cheyali ra.'}"
              </p>
            </div>
          </div>

          {/* ZONE 3: LIVE MEETING DOCK CONTROLS */}
          <div className="px-6 py-4 bg-[#18191c] border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-4 font-sans">
            
            {/* Call Room Status */}
            <div className="text-xs text-slate-300 font-medium font-sans flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Encrypted 1-on-1 Mentorship Stream</span>
            </div>

            {/* In-Call Action Docks */}
            <div className="flex items-center gap-3">
              
              {/* Mic Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isMuted 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                    : 'bg-[#32343a] hover:bg-[#3f4148] text-white'
                }`}
                title={isMuted ? "Unmute microphone" : "Mute microphone"}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Video Camera */}
              <button
                className="w-10 h-10 rounded-full bg-[#32343a] hover:bg-[#3f4148] text-white flex items-center justify-center transition-all cursor-pointer"
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
                    : 'bg-[#32343a] hover:bg-[#3f4148] text-white'
                }`}
                title="Raise hand to ask question"
              >
                <Hand className="w-4 h-4" />
              </button>

              {/* Options */}
              <button
                className="w-10 h-10 rounded-full bg-[#32343a] hover:bg-[#3f4148] text-white flex items-center justify-center transition-all cursor-pointer hidden sm:flex"
                title="Call settings"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Join / Book Next Call */}
              <button
                onClick={() => onOpenWaitlist('Book 1-on-1 Live Whiteboard Call')}
                className="px-5 h-10 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ml-2 shadow-sm font-sans"
              >
                <PhoneOff className="w-4 h-4" />
                <span className="hidden sm:inline">Join Next Alpha Call</span>
              </button>

            </div>

            {/* Video Feeds (You & Sai Anna) */}
            <div className="flex items-center gap-2">
              <div className="w-20 h-12 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                <span className="text-[10px] text-slate-400 font-sans">You</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-1 right-1" />
              </div>
              <div className="w-20 h-12 bg-slate-900 border border-emerald-500/80 rounded-lg flex items-center justify-center relative overflow-hidden">
                <span className="text-[10px] text-emerald-400 font-semibold font-sans">Sai Anna</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-1 right-1 animate-ping" />
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
              No generic PowerPoint bullet points or pre-fabricated decks. Sai Anna live-sketches every line, bracket, and arrow by hand on a live whiteboard so you see how an engineer actually thinks.
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
