import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Pause, 
  PhoneCall, 
  ShieldCheck, 
  Loader2 
} from 'lucide-react';

export default function Hero({ onOpenWaitlist }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setLoading(true);
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier: 'Hero Waitlist', role: 'student' })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Focused on WHY */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
              The senior brother who walks you into your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                dream tech job.
              </span>
            </h1>

            {/* Apple-grade Copy */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              You attend lectures for four years, but in technical rounds, your mind goes blank on edge cases. 
              Generic AI tutors dump code you copy and forget by tomorrow.
              <br /><br />
              <strong className="text-slate-950 font-semibold">S.A.I.</strong> gives you an experienced senior right in your pocket — breaking down problems with visceral intuition, challenging your blind spots, and holding you accountable until you get placed.
            </p>

            {/* Live Working Waitlist Form */}
            <div id="waitlist" className="pt-2 max-w-lg">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-300 focus-within:border-slate-950 focus-within:ring-2 focus-within:ring-slate-950/10 transition-all shadow-xs">
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your student or personal email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-slate-950 hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Request Access</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold">
                    You're registered in the priority alpha cohort! We will notify you via email.
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  Zero spam
                </span>
                <span>•</span>
                <span>Private campus alpha cohort</span>
                <span>•</span>
                <span>by The SurfBoard</span>
              </div>
            </div>

            {/* Micro Stats */}
            <div className="pt-6 border-t border-slate-100 flex items-center gap-10">
              <div>
                <p className="text-2xl font-extrabold text-slate-950">109K+</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Community Engineers</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-950">6 Years</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Student Research</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-950">Zero</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Spoon-Fed Spoilers</p>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Messenger Experience with Transparent Logo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[390px] rounded-[36px] bg-slate-900 p-3 shadow-2xl ring-1 ring-slate-900/10">
              {/* Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
              </div>

              {/* Phone Content */}
              <div className="relative rounded-[28px] overflow-hidden bg-[#efeae2] border border-slate-200">
                
                {/* App Top Bar */}
                <div className="bg-[#075e54] text-white px-4 pt-8 pb-3 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-white/95 border-2 border-white flex items-center justify-center overflow-hidden">
                        <img 
                          src="/Sai-logo-transparent.webp" 
                          alt="Sai Anna" 
                          className="h-7 w-auto object-contain"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white"></span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                        <span>Sai Anna</span>
                        <span className="text-[9px] bg-emerald-700/80 px-1.5 py-0.2 rounded font-medium">Lead Senior</span>
                      </h4>
                      <p className="text-[10px] text-emerald-200">Online • S.A.I. Mentorship Workspace</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => onOpenWaitlist('Sai Anna Audio Call')}
                    title="Call Sai Anna"
                    className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </button>
                </div>

                {/* Chat Stream */}
                <div className="p-3.5 space-y-3 text-xs bg-whatsapp-pattern min-h-[380px] max-h-[440px] overflow-y-auto">
                  
                  <div className="text-center my-1">
                    <span className="px-2 py-0.5 rounded-md bg-white/70 text-[10px] font-medium text-slate-500 shadow-2xs">
                      Today • Amazon SDE-1 Prep
                    </span>
                  </div>

                  {/* Student Message */}
                  <div className="flex justify-end">
                    <div className="bg-[#d9fdd3] text-slate-900 p-2.5 rounded-lg rounded-tr-none max-w-[85%] shadow-2xs border border-emerald-100">
                      <p className="text-[10px] font-semibold text-emerald-800 mb-0.5">You</p>
                      <p className="text-[12px] leading-snug">
                        Anna, Amazon SDE-1 crack cheyali ante bhayam ga undhi. Two Pointers solve chesthunte edge cases lo fail avuthunna.
                      </p>
                      <span className="text-[9px] text-slate-500 block text-right mt-1">11:42 AM ✓✓</span>
                    </div>
                  </div>

                  {/* Voice Note Simulation */}
                  <div className="flex justify-start">
                    <div className="bg-white text-slate-900 p-2.5 rounded-lg rounded-tl-none max-w-[88%] shadow-2xs border border-slate-200/60">
                      <div className="flex items-center gap-2 mb-1.5">
                        <button 
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer"
                        >
                          {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        
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
                        "Rey direct code jump cheyaku! Two Pointers ante narrow bridge meeda pedestrians walk chesthunattu oohinchuko. Intuition fix ayyaka break cheddam."
                      </p>
                      <span className="text-[9px] text-slate-400 block text-right mt-1">11:43 AM</span>
                    </div>
                  </div>

                  {/* Practice Card in Chat */}
                  <div className="flex justify-start">
                    <div className="bg-white text-slate-900 p-2.5 rounded-lg rounded-tl-none max-w-[88%] shadow-2xs border border-slate-200/60 space-y-2">
                      <p className="text-[11.5px] text-slate-700">
                        Interactive whiteboard ready. Step-by-step trace chusi solve chey:
                      </p>
                      <a 
                        href="#rough-paper"
                        className="block text-center py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                      >
                        Open Visual Dry Run
                      </a>
                    </div>
                  </div>

                </div>

                {/* Input Simulator */}
                <div className="bg-white border-t border-slate-200 p-2 flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full px-3 py-1.5 text-[11px] text-slate-400">
                    Ask Sai Anna anything...
                  </div>
                  <button 
                    onClick={() => onOpenWaitlist('Hero Chat Interaction')}
                    className="w-7 h-7 rounded-full bg-[#075e54] text-white flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
