import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Mic, 
  Video as VideoIcon, 
  Share2, 
  Hand, 
  PhoneOff
} from 'lucide-react';

export default function RoughPaperEngine({ onOpenWaitlist }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

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
            Just like an experienced senior pulling you into a 1-on-1 Google Meet call — sharing a live digital whiteboard, sketching architectures by hand, and talking through every edge case until the mental model clicks.
          </p>
        </div>

        {/* Google Meet Style Video Container */}
        <div className="bg-slate-950 rounded-3xl p-3 sm:p-5 shadow-2xl border border-slate-800 relative overflow-hidden">
          
          {/* Google Meet Top Bar */}
          <div className="px-4 py-3 bg-slate-900/90 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs mb-3 border border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="font-mono text-slate-300 font-semibold text-[11px] uppercase tracking-wider">
                  REC • 1-on-1 Mentorship
                </span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-semibold">
                  Sai Anna (Presenting Screen)
                </span>
                <span className="hidden sm:inline-block text-slate-400 text-[11px]">
                  Candidate: You
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>HD 720p Screen Stream</span>
            </div>
          </div>

          {/* Video Stage with Custom Player Controls */}
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-h-[580px] flex items-center justify-center group">
            <video
              ref={videoRef}
              src="/sai-demo.mp4"
              poster="/sai-demo-poster.jpg"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain cursor-pointer"
              onClick={togglePlay}
              playsInline
            />

            {/* Play Overlay Button if Paused */}
            {!isPlaying && (
              <div 
                onClick={togglePlay}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-white/95 hover:bg-white text-slate-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95 mb-4">
                  <Play className="w-8 h-8 ml-1 fill-slate-950" />
                </div>
                <div className="text-center px-4">
                  <p className="text-white font-bold text-sm sm:text-base">
                    Click to Play 1-on-1 Live Whiteboard Walkthrough
                  </p>
                  <p className="text-slate-300 text-xs mt-1">
                    Watch Sai Anna live-sketch algorithmic intuition like a Google Meet session
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Floating Control Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-90 transition-opacity">
              {/* Progress Scrub Bar */}
              <div 
                onClick={handleSeek}
                className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full mb-3 cursor-pointer relative overflow-hidden transition-all"
              >
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                  </button>

                  <button 
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <span className="font-mono text-[11px] text-slate-300">
                    Live Session Preview (3:54)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleFullScreen}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Google Meet Bottom Call Controls Dock */}
          <div className="pt-4 pb-2 px-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-900 mt-3">
            <div className="text-xs text-slate-400 font-medium">
              Meeting: <strong className="text-white">Sai Anna Whiteboard Studio</strong>
            </div>

            {/* Meet control buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                  isMuted ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
                title={isMuted ? "Unmute mic" : "Mute mic"}
              >
                <Mic className="w-4 h-4" />
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
            <p className="text-xs text-slate-600 leading-relaxed">
              No generic PowerPoint bullet points or distracting AI video avatars. Sai Anna live-sketches every line, box, and model by hand so you see how an engineer actually thinks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950">
              Visceral Visual Anchors
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Green for optimal algorithmic branches, pink for subtle edge-case traps, and real-time pointer walks. Visual mental models you can recall in high-pressure interviews.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-950">
              Natural Conversational Rhythm
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explained with authentic elder-brother warmth in relatable Telugu-English dialogue. Stop when confused, explore boundary inputs, and resume with absolute conviction.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
