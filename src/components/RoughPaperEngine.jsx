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
  Sparkles
} from 'lucide-react';

function ActiveTypingText({ text, speed = 28, className = '', showCursor = true, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(true);
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
        setIsTyping(false);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={`inline font-board ${className}`}>
      {displayed}
      {isTyping && showCursor && (
        <span className="inline-block w-2.5 h-2.5 ml-1 rounded-full bg-yellow-400 animate-pulse align-middle" />
      )}
    </span>
  );
}

// Authentic letter-by-letter handwriting component strictly in Playpen Sans
function HandwrittenText({ 
  text, 
  speed = 28, 
  isCompleted = false, 
  className = '', 
  showCursor = true,
  onComplete
}) {
  if (isCompleted) {
    return <span className={`inline font-board ${className}`}>{text}</span>;
  }

  return (
    <ActiveTypingText 
      text={text} 
      speed={speed} 
      className={className} 
      showCursor={showCursor} 
      onComplete={onComplete} 
    />
  );
}

export default function RoughPaperEngine({ onOpenWaitlist }) {
  const [currentBeat, setCurrentBeat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [subtitleOpacity, setSubtitleOpacity] = useState(1);

  // Lesson structure: Continuous video timeline of Sai Anna teaching on live whiteboard
  const beats = [
    {
      id: 0,
      timestamp: '0:18',
      totalTime: '3:00',
      title: '01. The 8:00 PM Traffic Surge',
      dialogue: 'Chudu, 8:00 PM IPL match final over jaruguthundhi... 100,000 mandhi oke sari Swiggy app open chesi biryani kosam search chestharu ra.',
      baseDuration: 6500,
      penColor: '#facc15'
    },
    {
      id: 1,
      timestamp: '0:48',
      totalTime: '3:00',
      title: '02. The Junior Dev Mistake',
      dialogue: 'Freshers em chestharo thelusa? Direct ga Postgres database meedhaki SELECT query kotti hard disk ni champestharu ra.',
      baseDuration: 7000,
      penColor: '#f43f5e'
    },
    {
      id: 2,
      timestamp: '1:18',
      totalTime: '3:00',
      title: '03. Hardware Bottleneck & Crash',
      dialogue: 'Hard disk physical spin limit ~1,000 IOPS mathrame. 100K queries hit aithe 100% disk choke — 504 Gateway Timeout, server dead!',
      baseDuration: 7500,
      penColor: '#ef4444'
    },
    {
      id: 3,
      timestamp: '1:54',
      totalTime: '3:00',
      title: '04. The Bawarchi Biryani Mental Model',
      dialogue: 'Bawarchi hotel ki velli biryani adagagane, prathi customer kosam kitchen loki velli fresh rice vandaru ra. Front counter hot-box lo already 50 packets ready ga untayi!',
      baseDuration: 8500,
      penColor: '#38bdf8'
    },
    {
      id: 4,
      timestamp: '2:28',
      totalTime: '3:00',
      title: '05. In-Memory Redis Cache Solution',
      dialogue: 'Front counter eh mana Redis Cache! RAM speed nanoseconds. First query DB nunchi thestham, migatha 99,999 queries Redis 1ms lo ichesthundhi.',
      baseDuration: 8000,
      penColor: '#4ade80'
    },
    {
      id: 5,
      timestamp: '3:00',
      totalTime: '3:00',
      title: '06. Cache Invalidation & Senior Reflex',
      dialogue: 'Interview lo trick question: "Price marithe old data untundha?" ani. "5-min TTL or Invalidate on DB update" ani cheppali. Ee trade-offs tho ne selection vasthundhi ra!',
      baseDuration: 8500,
      penColor: '#a78bfa'
    }
  ];

  const activeBeatData = beats[currentBeat];

  // Beat progression timer (respects play/pause and playback speed)
  useEffect(() => {
    if (!isPlaying) return;

    const duration = activeBeatData.baseDuration / playbackSpeed;
    const timer = setTimeout(() => {
      if (currentBeat < beats.length - 1) {
        // Fade subtitle
        setSubtitleOpacity(0);
        setTimeout(() => {
          setCurrentBeat((prev) => prev + 1);
          setSubtitleOpacity(1);
        }, 250);
      } else {
        // Pause at completion
        setIsPlaying(false);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentBeat, isPlaying, playbackSpeed, activeBeatData.baseDuration, beats.length]);

  const handleReplay = () => {
    setSubtitleOpacity(0);
    setTimeout(() => {
      setCurrentBeat(0);
      setIsPlaying(true);
      setSubtitleOpacity(1);
    }, 200);
  };

  const handleJumpToBeat = (index) => {
    setSubtitleOpacity(0);
    setTimeout(() => {
      setCurrentBeat(index);
      setIsPlaying(false);
      setSubtitleOpacity(1);
    }, 200);
  };

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    onOpenWaitlist('Ask Sai Anna about Redis Caching in Live Call');
  };

  const toggleSpeed = () => {
    const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
    setPlaybackSpeed(nextSpeed);
  };

  return (
    <section id="rough-paper" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-4 font-sans">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Whiteboard Lecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Real engineering understanding happens on a live whiteboard,{' '}
            <span className="text-emerald-700">not pre-recorded slide decks.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Watch Sai Anna live-sketch how real-world architectures hold under 100K traffic surges. No slideshow cuts — a single continuous blackboard drawing with live Telugu-English mentorship subtitles.
          </p>
        </div>

        {/* ZONE 3: GOOGLE MEET SCREEN-SHARE PLAYER */}
        <div className="bg-[#1f2023] rounded-3xl shadow-2xl border border-slate-800 overflow-hidden text-white font-sans">
          
          {/* Top Bar: Google Meet Call Header */}
          <div className="px-5 py-3.5 bg-[#18191c] border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              {/* Pulsing REC badge */}
              <div className="flex items-center gap-2 bg-[#2d1b1e] px-2.5 py-1 rounded-full border border-rose-900/60">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="text-rose-200 font-bold text-[11px] uppercase tracking-wider font-sans">
                  REC
                </span>
              </div>

              <span className="text-slate-600">|</span>

              {/* Presenting Pill */}
              <div className="flex items-center gap-2 bg-blue-950/80 text-blue-300 border border-blue-800/80 px-3 py-1 rounded-full text-xs font-medium font-sans">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Sai Anna is presenting screen</span>
              </div>
            </div>

            {/* Meet Link & Room Count */}
            <div className="flex items-center gap-4 text-slate-300 text-xs font-sans">
              <span className="hidden sm:inline-block font-semibold">meet.google.com/sai-mentorship-live</span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-xs">2</span>
              </div>
            </div>
          </div>

          {/* Continuous Video Timeline & Scrubber Bar */}
          <div className="bg-[#16171a] px-5 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 font-sans">
            
            {/* Play/Pause & Time */}
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
              </button>

              <button
                onClick={handleReplay}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Restart from beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="font-mono text-slate-300 text-xs tracking-wider">
                <span className="text-emerald-400 font-bold">{activeBeatData.timestamp}</span>
                <span className="text-slate-600 mx-1">/</span>
                <span className="text-slate-400">{activeBeatData.totalTime}</span>
              </div>
            </div>

            {/* Interactive Timeline Beat Steppers (Clickable Progress Segments) */}
            <div className="flex-1 max-w-xl mx-2 flex items-center gap-1.5">
              {beats.map((beat, idx) => {
                const isPassed = currentBeat > idx;
                const isCurrent = currentBeat === idx;
                return (
                  <button
                    key={beat.id}
                    onClick={() => handleJumpToBeat(idx)}
                    className="flex-1 h-2 rounded-full transition-all cursor-pointer relative group overflow-hidden"
                    style={{
                      backgroundColor: isPassed ? '#3b82f6' : isCurrent ? '#60a5fa' : '#334155'
                    }}
                    title={beat.title}
                  >
                    {isCurrent && isPlaying && (
                      <span className="absolute inset-0 bg-white/40 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Playback Speed Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSpeed}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold font-mono transition-colors cursor-pointer"
                title="Change playback speed"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>

          {/* ZONE 1: THE CONTINUOUS LIVE WHITEBOARD (STRICTLY PLAYPEN SANS, SEQUENTIAL DRAWING) */}
          <div 
            className="relative bg-[#000000] w-full min-h-[460px] sm:min-h-[520px] p-6 sm:p-10 select-none overflow-hidden font-board flex flex-col justify-between"
          >
            
            {/* Live Writing Tip Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800 pointer-events-none z-10 font-board">
              <span 
                className="w-2.5 h-2.5 rounded-full animate-pen-pulse"
                style={{ backgroundColor: activeBeatData.penColor }}
              ></span>
              <span className="text-sm text-slate-300 font-board font-medium">
                {isPlaying ? 'Sai Anna sketching...' : 'Paused'}
              </span>
            </div>

            {/* TOP HEADER: Writes at Beat 0, stays permanently on board */}
            {currentBeat >= 0 && (
              <div>
                <h3 className="font-board text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  <HandwrittenText 
                    text="IPL Final: 100,000 Traffic Surge (8:00 PM)" 
                    speed={25 / playbackSpeed}
                    isCompleted={currentBeat > 0}
                  />
                </h3>
                <p className="font-board text-lg sm:text-xl text-yellow-300 mt-1">
                  <HandwrittenText 
                    text="Topic: Swiggy Order Rush & Database Crash Analysis" 
                    speed={22 / playbackSpeed}
                    isCompleted={currentBeat > 0}
                  />
                </p>
              </div>
            )}

            {/* CENTER ARCHITECTURE SKETCH (Sequential build-up, zero empty boxes) */}
            <div className="my-auto py-6">
              <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                
                {/* 1. CLIENTS / USERS (Mounts at Beat >= 0) */}
                {currentBeat >= 0 && (
                  <div className="flex flex-col items-center text-center p-3">
                    <svg className="w-32 h-10 draw-stroke-1" viewBox="0 0 150 45" fill="none">
                      <circle cx="20" cy="12" r="6" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="45" cy="10" r="6" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="70" cy="13" r="6" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="95" cy="11" r="6" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="120" cy="14" r="6" stroke="#ffffff" strokeWidth="2.5" />
                      <path d="M 10 35 C 18 26, 24 24, 30 35 M 35 33 C 43 24, 48 24, 55 33 M 60 36 C 68 25, 74 27, 80 36 M 85 34 C 93 23, 98 25, 105 34 M 110 37 C 118 26, 124 28, 130 37" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="font-board text-xl text-yellow-300 font-bold mt-2">
                      <HandwrittenText 
                        text="100,000 Users" 
                        speed={28 / playbackSpeed} 
                        isCompleted={currentBeat > 0}
                      />
                    </span>
                    <span className="font-board text-sm text-slate-300">
                      <HandwrittenText 
                        text="Swiggy Mobile Apps" 
                        speed={25 / playbackSpeed} 
                        isCompleted={currentBeat > 0}
                      />
                    </span>
                  </div>
                )}

                {/* 2. IN-MEMORY REDIS CACHE (Mounts at Beat >= 4 as the protective buffer) */}
                {currentBeat >= 4 && (
                  <div className="flex flex-col items-center text-center p-4 rounded-xl border-2 border-emerald-400/90 bg-emerald-950/25 shadow-lg shadow-emerald-950/40 animate-fadeIn">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-board text-xl text-emerald-400 font-bold">
                        <HandwrittenText 
                          text="Redis Cache (RAM)" 
                          speed={25 / playbackSpeed}
                          isCompleted={currentBeat > 4}
                        />
                      </span>
                    </div>
                    <span className="font-board text-sm text-emerald-300">
                      <HandwrittenText 
                        text="Speed: ~1 Millisecond" 
                        speed={22 / playbackSpeed}
                        isCompleted={currentBeat > 4}
                      />
                    </span>
                    <span className="font-board text-xs text-slate-200 mt-1">
                      <HandwrittenText 
                        text="Absorbs 99,999 Reads ✓" 
                        speed={20 / playbackSpeed}
                        isCompleted={currentBeat > 4}
                      />
                    </span>
                  </div>
                )}

                {/* 3. ARROWS & QUERY FLOW */}
                {currentBeat >= 1 && (
                  <div className="flex flex-col items-center text-center px-2">
                    <svg className="w-32 h-8" viewBox="0 0 120 25" fill="none">
                      <path 
                        d="M 6 12 C 35 10, 70 14, 108 12" 
                        stroke={currentBeat >= 4 ? '#4ade80' : '#f43f5e'} 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                      />
                      <path 
                        d="M 96 6 C 103 9, 107 11, 112 12 C 106 15, 101 18, 97 21" 
                        stroke={currentBeat >= 4 ? '#4ade80' : '#f43f5e'} 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                      />
                    </svg>
                    <span className={`font-board text-sm font-bold ${currentBeat >= 4 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      <HandwrittenText 
                        text={currentBeat >= 4 ? "Fast In-Memory Path" : "Direct Disk Query (Danger!)"} 
                        speed={22 / playbackSpeed}
                        isCompleted={currentBeat > 1 && currentBeat !== 4}
                      />
                    </span>
                  </div>
                )}

                {/* 4. POSTGRES DATABASE (Disk Cylinder - Mounts at Beat >= 1) */}
                {currentBeat >= 1 && (
                  <div className="flex flex-col items-center text-center p-3">
                    <svg className="w-28 h-28" viewBox="0 0 90 90" fill="none">
                      <path d="M 12 20 C 13 10, 77 10, 78 20 C 78 29, 11 29, 12 20" stroke="#f43f5e" strokeWidth="2.5" />
                      <path d="M 12 20 C 10 40, 14 60, 12 75 C 25 86, 65 85, 78 75 C 76 60, 80 40, 78 20" stroke="#f43f5e" strokeWidth="2.5" fill="#150508" />
                      <path d="M 13 48 C 28 56, 62 56, 77 48" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" />
                      {currentBeat >= 2 && currentBeat < 4 && (
                        <path d="M 22 26 C 36 40, 50 56, 68 70 M 68 26 C 52 42, 38 56, 22 70" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
                      )}
                    </svg>
                    <span className="font-board text-lg text-rose-300 font-bold mt-1">
                      <HandwrittenText 
                        text="Postgres DB (Disk)" 
                        speed={25 / playbackSpeed} 
                        isCompleted={currentBeat > 1}
                      />
                    </span>
                    
                    {/* Crash warning (Beat 2 & 3) vs Protected state (Beat >= 4) */}
                    {currentBeat >= 2 && currentBeat < 4 && (
                      <span className="font-board text-xs text-rose-400 font-bold animate-pulse mt-1">
                        <HandwrittenText 
                          text="✗ 100% I/O Choke (504 Timeout)" 
                          speed={22 / playbackSpeed}
                          isCompleted={currentBeat > 2}
                        />
                      </span>
                    )}

                    {currentBeat >= 4 && (
                      <span className="font-board text-xs text-emerald-400 font-bold mt-1">
                        <HandwrittenText 
                          text="✓ Safe: Only 1 Query on Miss!" 
                          speed={22 / playbackSpeed}
                          isCompleted={currentBeat > 4}
                        />
                      </span>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* BOTTOM LESSON NOTES: Explanations that build up sequentially */}
            <div className="pt-4 border-t border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Bawarchi Analogy (Mounts at Beat >= 3) */}
              {currentBeat >= 3 && (
                <div className="p-3 border-l-4 border-yellow-400/90 pl-4 bg-slate-950/40 rounded-r-md">
                  <p className="font-board text-base sm:text-lg text-yellow-300 font-bold">
                    <HandwrittenText 
                      text="Bawarchi Biryani Mental Model:" 
                      speed={22 / playbackSpeed}
                      isCompleted={currentBeat > 3}
                    />
                  </p>
                  <p className="font-board text-sm text-slate-200 mt-1">
                    <HandwrittenText 
                      text="Kitchen (DB): 25 mins fresh cook time per plate." 
                      speed={20 / playbackSpeed}
                      isCompleted={currentBeat > 3}
                    />
                  </p>
                  <p className="font-board text-sm text-slate-200">
                    <HandwrittenText 
                      text="Hot-Box Counter (Redis): 2 seconds delivery!" 
                      speed={20 / playbackSpeed}
                      isCompleted={currentBeat > 3}
                    />
                  </p>
                </div>
              )}

              {/* Cache Invalidation & Senior Reflex (Mounts at Beat >= 5) */}
              {currentBeat >= 5 && (
                <div className="p-3 border-l-4 border-purple-400/90 pl-4 bg-slate-950/40 rounded-r-md">
                  <p className="font-board text-base sm:text-lg text-purple-300 font-bold">
                    <HandwrittenText 
                      text="Senior Reflex (Cache Invalidation):" 
                      speed={22 / playbackSpeed}
                      isCompleted={false}
                    />
                  </p>
                  <p className="font-board text-sm text-slate-200 mt-1">
                    <HandwrittenText 
                      text="When price changes: 5-min TTL or Evict key on DB write." 
                      speed={20 / playbackSpeed}
                      isCompleted={false}
                    />
                  </p>
                  <p className="font-board text-xs text-emerald-400 mt-1">
                    <HandwrittenText 
                      text="Rule: Protect the physical hard disk at all costs." 
                      speed={20 / playbackSpeed}
                      isCompleted={false}
                    />
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* ZONE 2: LIVE SUBTITLES (CLOSED CAPTIONS IN GOOGLE MEET, 1:1 SYNCED WITH ACTIVE BEAT) */}
          <div className="px-5 py-4 bg-[#16171a] border-t border-slate-800 flex items-center gap-3.5 font-sans min-h-[64px]">
            {/* Host Avatar with active speaker indicator */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs font-sans">
                SA
              </div>
              {isPlaying && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#16171a] animate-ping" />
              )}
            </div>
            
            {/* Subtitle Dialogue (Smooth fade on step transition, clean closed-caption style) */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold text-emerald-400 font-sans">Sai Anna (Host)</span>
                <span className="text-[10px] text-slate-500 font-sans">• Speaking Live</span>
              </div>
              <p 
                className="text-xs sm:text-sm text-slate-100 font-medium font-sans leading-snug transition-opacity duration-200"
                style={{ opacity: subtitleOpacity }}
              >
                "{activeBeatData.dialogue}"
              </p>
            </div>
            
            {/* Live Step Badge */}
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 shrink-0 font-sans">
              Step {currentBeat + 1} of {beats.length}
            </span>
          </div>

          {/* ZONE 3: GOOGLE MEET BOTTOM CONTROL BAR */}
          <div className="px-6 py-4 bg-[#1f2023] border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-4 font-sans">
            
            {/* Room ID & Time */}
            <div className="text-xs text-slate-300 font-medium font-sans">
              10:45 AM <span className="text-slate-600 mx-2">|</span> <span className="font-semibold text-white">sai-anna-live-call</span>
            </div>

            {/* Meet Action Icons */}
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

              {/* Hand Raise */}
              <button
                onClick={handleRaiseHand}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isHandRaised 
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold' 
                    : 'bg-[#3c4043] hover:bg-[#4a4e51] text-white'
                }`}
                title="Raise hand to ask question"
              >
                <Hand className="w-4 h-4" />
              </button>

              {/* Present Screen Active Icon */}
              <div 
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
                title="Sai Anna is presenting screen"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              </div>

              {/* Options */}
              <button
                className="w-10 h-10 rounded-full bg-[#3c4043] hover:bg-[#4a4e51] text-white flex items-center justify-center transition-all cursor-pointer hidden sm:flex"
                title="More settings"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Book Call / Join */}
              <button
                onClick={() => onOpenWaitlist('Book 1-on-1 Live Whiteboard Call')}
                className="px-5 h-10 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ml-2 shadow-sm font-sans"
              >
                <PhoneOff className="w-4 h-4" />
                <span className="hidden sm:inline">Join Next Alpha Call</span>
              </button>

            </div>

            {/* Video Feed Thumbnails (You & Sai Anna) */}
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
              No generic PowerPoint bullet points or distracting AI video avatars. Sai Anna live-sketches every line, bracket, and arrow by hand on a continuous board so you see how an engineer actually thinks.
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
