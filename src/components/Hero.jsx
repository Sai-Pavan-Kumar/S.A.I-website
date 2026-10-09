import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Pause, 
  PhoneCall, 
  ExternalLink, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-18 md:pb-28 bg-white border-b border-slate-200/70">
      {/* Background subtle technical grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />

      {/* Gentle gradient accent */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-50/80 via-emerald-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Apple-Grade UX Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Pedagogical Engine by <strong className="text-slate-900 font-bold">The SurfBoard</strong></span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-medium">109K+ Community Backed</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
              The digital senior brother who gets you{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                placed.
              </span>
            </h1>

            {/* Crisp Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Traditional AI tutors dump walls of text. College lectures teach outdated theory. 
              <strong className="text-slate-900 font-semibold"> S.A.I. (Senior AI)</strong> bridges the hiring gap through 
              real-world intuition, hand-drawn paper traces, and deterministic compiler sandboxes on WhatsApp.
            </p>

            {/* Waitlist Form */}
            <div id="waitlist" className="pt-2 max-w-lg">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-300/80 shadow-xs focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/10 transition-all">
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your college or personal email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Request Alpha Access</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold">
                    Access reserved. You are in the priority queue for the closed alpha cohort!
                  </span>
                </div>
              )}
              <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  Zero spam guarantee
                </span>
                <span>•</span>
                <span>Tier-2 & Tier-3 campus alpha rollout</span>
                <span>•</span>
                <span>by The SurfBoard</span>
              </div>
            </div>

            {/* Quick Micro-Proofs */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="text-xl font-extrabold text-slate-950">109K+</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Community Engineers</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-950">₹0 GPU</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Local SVG Paper Traces</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-950">100%</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Deterministic Sandboxes</p>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic WhatsApp Experience Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[390px] rounded-[36px] bg-slate-900 p-3 shadow-2xl ring-1 ring-slate-900/10">
              {/* Phone Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
              </div>

              {/* Screen Container */}
              <div className="relative rounded-[28px] overflow-hidden bg-[#efeae2] border border-slate-200">
                
                {/* WhatsApp Chat Top Bar */}
                <div className="bg-[#075e54] text-white px-4 pt-8 pb-3 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center overflow-hidden">
                        <img 
                          src="/Sai-logo-black.webp" 
                          alt="Sai Anna" 
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white"></span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold tracking-tight text-white">Sai Anna</h4>
                        <span className="text-[9px] bg-emerald-700/80 px-1.5 py-0.2 rounded text-emerald-100 font-medium">Lead Senior</span>
                      </div>
                      <p className="text-[10px] text-emerald-200">Online • The SurfBoard Squad</p>
                    </div>
                  </div>

                  {/* "Call Sai Anna" Button */}
                  <button 
                    title="Call Sai Anna (Audio Screenshare Mode)"
                    className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </button>
                </div>

                {/* Chat Stream Body */}
                <div className="p-3.5 space-y-3 text-xs bg-whatsapp-pattern min-h-[380px] max-h-[440px] overflow-y-auto">
                  
                  {/* Timestamp marker */}
                  <div className="text-center my-1">
                    <span className="px-2 py-0.5 rounded-md bg-white/70 text-[10px] font-medium text-slate-500 shadow-2xs">
                      Today • SDE-1 Placement Prep
                    </span>
                  </div>

                  {/* Student Message */}
                  <div className="flex justify-end">
                    <div className="bg-[#d9fdd3] text-slate-900 p-2.5 rounded-lg rounded-tr-none max-w-[85%] shadow-2xs border border-emerald-100">
                      <p className="text-[10px] font-semibold text-emerald-800 mb-0.5">You (Tier-2 Engineering)</p>
                      <p className="text-[12px] leading-snug">
                        Anna, Amazon SDE-1 crack cheyali ante bhayam ga undhi. Two Pointers solve chesthunte edge cases lo fail avuthunna.
                      </p>
                      <span className="text-[9px] text-slate-500 block text-right mt-1">11:42 AM ✓✓</span>
                    </div>
                  </div>

                  {/* Sai Anna Voice Note Simulator */}
                  <div className="flex justify-start">
                    <div className="bg-white text-slate-900 p-2.5 rounded-lg rounded-tl-none max-w-[88%] shadow-2xs border border-slate-200/60">
                      <div className="flex items-center gap-2 mb-1.5">
                        <button 
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs transition-transform active:scale-95 cursor-pointer"
                        >
                          {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        
                        {/* Audio Waveform visualization */}
                        <div className="flex-1">
                          <div className="flex items-center gap-0.5 h-6">
                            {[12, 24, 16, 28, 14, 20, 32, 26, 18, 10, 24, 30, 16, 22, 14, 28, 18].map((h, i) => (
                              <span 
                                key={i} 
                                style={{ height: `${h}px` }} 
                                className={`w-1 rounded-full transition-all ${
                                  isPlayingAudio && i % 2 === 0 ? 'bg-emerald-600 animate-pulse' : 'bg-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-400 mt-0.5">
                            <span>0:{isPlayingAudio ? '18' : '42'}</span>
                            <span className="font-semibold text-emerald-700">Sai Anna Audio Note</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11.5px] text-slate-800 leading-snug">
                        "Rey direct code jump cheyaku! Two Pointers ante narrow bridge meeda pedestrians walk chesthunattu oohinchuko. Left pointer slow aithe, right ni pull chey."
                      </p>
                      <span className="text-[9px] text-slate-400 block text-right mt-1">11:43 AM</span>
                    </div>
                  </div>

                  {/* Visual Trace Whiteboard Preview link in chat */}
                  <div className="flex justify-start">
                    <div className="bg-white text-slate-900 p-2.5 rounded-lg rounded-tl-none max-w-[88%] shadow-2xs border border-slate-200/60">
                      <div className="p-2 rounded bg-amber-50/70 border border-amber-200/80 mb-2">
                        <span className="text-[10px] font-bold text-amber-900 block mb-1">
                          📝 Rough Paper Whiteboard Trace:
                        </span>
                        <div className="font-mono text-[11px] text-slate-800 bg-white p-1.5 rounded border border-amber-100 flex items-center justify-between">
                          <span>[2, 7, 11, 15] • Target: 9</span>
                          <span className="text-[10px] text-emerald-600 font-bold">L=0, R=1 ✓</span>
                        </div>
                      </div>

                      {/* 1-Tap Practice Sandbox Link */}
                      <a 
                        href="#rough-paper"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors w-full justify-center"
                      >
                        <span>Open Practice Sandbox (Zero GPU)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-[9px] text-slate-400 block text-right mt-1.5">11:43 AM</span>
                    </div>
                  </div>

                </div>

                {/* WhatsApp Chat Bottom Input Simulator */}
                <div className="bg-white border-t border-slate-200 p-2 flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full px-3 py-1.5 text-[11px] text-slate-400">
                    Ask Anna a doubt...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#075e54] text-white flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xl items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">The SurfBoard Parent Studio</p>
                <p className="text-[11px] text-slate-500">Tier-2/3 student network & zero-CAC</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
