import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const logoBase64 = fs.readFileSync(path.resolve('public/Sai-logo-transparent.png')).toString('base64');
const logoSrc = `data:image/png;base64,${logoBase64}`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SAI - Pitch Deck</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #0d1117;
    color: #f1f5f9;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  @page {
    size: 16in 9in;
    margin: 0;
  }
  
  .slide {
    width: 16in;
    height: 9in;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    padding: 0.8in 1in;
    position: relative;
    background: #0d1117;
    background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 28px 28px;
    overflow: hidden;
  }

  .slide-header {
    margin-bottom: 0.4in;
  }
  .tag {
    font-size: 0.22in;
    font-weight: 700;
    color: #38bdf8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.08in;
  }
  .slide-title {
    font-size: 0.48in;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
  }
  .slide-subtitle {
    font-size: 0.24in;
    color: #94a3b8;
    margin-top: 0.08in;
  }

  /* Grid Layouts */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4in;
    flex: 1;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.35in;
    flex: 1;
  }
  .grid-4 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.35in;
    flex: 1;
  }

  .card {
    background: #161b22;
    border: 1.5px solid #30363d;
    border-radius: 16px;
    padding: 0.4in;
    display: flex;
    flex-direction: column;
  }
  .card-danger { border-color: rgba(239, 68, 68, 0.5); }
  .card-warning { border-color: rgba(245, 158, 11, 0.5); }
  .card-success { border-color: rgba(16, 185, 129, 0.5); }
  .card-primary { border-color: rgba(56, 189, 248, 0.5); }

  .card-title {
    font-size: 0.26in;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.15in;
  }
  .card-text {
    font-size: 0.19in;
    line-height: 1.5;
    color: #94a3b8;
  }
  .card-text strong {
    color: #ffffff;
  }
  .stat-num {
    font-size: 0.65in;
    font-weight: 800;
    color: #38bdf8;
    line-height: 1;
    margin-bottom: 0.1in;
  }

  .footer-bar {
    position: absolute;
    bottom: 0.4in;
    left: 1in;
    right: 1in;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #21262d;
    padding-top: 0.15in;
    font-size: 0.16in;
    color: #64748b;
  }
</style>
</head>
<body>

<!-- SLIDE 1: COVER -->
<div class="slide" style="justify-content: center; align-items: flex-start;">
  <img src="${logoSrc}" style="height: 1.1in; margin-bottom: 0.3in;" alt="SAI Logo">
  <div style="font-size: 0.28in; font-weight: 700; color: #38bdf8; letter-spacing: 0.05em; text-transform: uppercase;">
    Draper University Founders Program 2026
  </div>
  <h1 style="font-size: 0.82in; font-weight: 800; color: #ffffff; margin: 0.15in 0; line-height: 1.1;">
    SAI (Senior AI)
  </h1>
  <p style="font-size: 0.34in; color: #38bdf8; font-weight: 600; margin-bottom: 0.15in;">
    Real-world technical mentorship from your digital senior brother.
  </p>
  <p style="font-size: 0.24in; color: #94a3b8; max-width: 12in; line-height: 1.4; margin-bottom: 0.6in;">
    Training Tier-2/3 Indian engineering students for high-paying tech careers via Socratic visual pedagogy, while arming engineering colleges with real-time placement diagnostic intelligence.
  </p>
  <div style="background: #161b22; border: 1.5px solid #30363d; border-radius: 12px; padding: 0.25in 0.4in; display: flex; gap: 0.6in; font-size: 0.18in; color: #cbd5e1;">
    <div><strong>Parent Brand:</strong> The SurfBoard (109K+ Community)</div>
    <div><strong>Canonical:</strong> sai.thesurfboard.in</div>
    <div><strong>Market:</strong> B2B2C Higher Ed & Skilling</div>
  </div>
</div>

<!-- SLIDE 2: THE PROBLEM -->
<div class="slide">
  <div class="slide-header">
    <div class="tag">The Reality Check</div>
    <div class="slide-title">The Broken Bridge in Indian Engineering</div>
    <div class="slide-subtitle">A two-sided placement crisis leaving both students and colleges stranded.</div>
  </div>
  <div class="grid-2">
    <div class="card card-danger">
      <div style="font-size: 0.2in; font-weight: 700; color: #ef4444; margin-bottom: 0.1in;">STUDENT CRISIS (B2C)</div>
      <div class="card-title">90%+ Graduates Fail Tech Drives</div>
      <div class="card-text" style="display: flex; flex-direction: column; gap: 0.18in;">
        <div><strong>• Rote Theory Over Problem Solving:</strong> Colleges teach obsolete syntax. Students freeze when faced with live DSA and system edge cases.</div>
        <div><strong>• The AI Text Wall Problem:</strong> Generic AI tutors dump dense paragraphs. Tier-2 students suffer cognitive overload and abandon them in &lt;3 minutes.</div>
        <div><strong>• Zero Elder Brother Guidance:</strong> First-generation engineers have no mentors to pull out a piece of rough paper and dry-run logic step-by-step.</div>
      </div>
    </div>
    <div class="card card-warning">
      <div style="font-size: 0.2in; font-weight: 700; color: #f59e0b; margin-bottom: 0.1in;">COLLEGE CRISIS (B2B)</div>
      <div class="card-title">Survival Tied to Placement Stats</div>
      <div class="card-text" style="display: flex; flex-direction: column; gap: 0.18in;">
        <div><strong>• Marketing Lifeblood:</strong> Admissions in 4,000+ private Indian colleges depend entirely on advertising "90%+ Placement Rates".</div>
        <div><strong>• Zero Early Warning:</strong> Placement Officers (TPOs) only discover a student is unplaceable in their 7th semester—when it is too late to fix.</div>
        <div><strong>• Wasteful Vendor Spend:</strong> Institutions spend lakhs on third-party classroom crash courses with near-zero verifiable outcome tracking.</div>
      </div>
    </div>
  </div>
  <div class="footer-bar"><span>SAI Pitch Deck | Draper University</span><span>Slide 02</span></div>
</div>

<!-- SLIDE 3: THE SOLUTION -->
<div class="slide">
  <div class="slide-header">
    <div class="tag">The Transformation</div>
    <div class="slide-title">Frictionless Messenger + Elder Brother Pedagogy</div>
    <div class="slide-subtitle">Replacing cold LMS portals with an active, WhatsApp-familiar "Placement Squad".</div>
  </div>
  <div class="grid-3">
    <div class="card card-primary">
      <div class="stat-num" style="color: #38bdf8;">01</div>
      <div class="card-title">Mobile-First Messenger</div>
      <div class="card-text">
        Zero portal fatigue. Students learn directly inside a familiar chat interface that removes psychological friction and mirrors real brotherly guidance.
      </div>
    </div>
    <div class="card card-success">
      <div class="stat-num" style="color: #10b981;">02</div>
      <div class="card-title">Socratic 5-Stage Gate</div>
      <div class="card-text">
        Never spoon-feeds code: <strong>Intuition & Analogy ➔ Rough Paper Dry-Run ➔ Edge Case Hunt ➔ Pseudocode ➔ Compiler Execution</strong>.
      </div>
    </div>
    <div class="card card-warning">
      <div class="stat-num" style="color: #f59e0b;">03</div>
      <div class="card-title">Rough Paper Engine</div>
      <div class="card-text">
        Client-side hand-drawn SVG animations (Rough.js) trace memory, pointers, and arrays step-by-step at <strong>₹0 GPU compute cost</strong>.
      </div>
    </div>
  </div>
  <div class="footer-bar"><span>SAI Pitch Deck | Draper University</span><span>Slide 03</span></div>
</div>

<!-- SLIDE 4: THE PLACEMENT COUNCIL -->
<div class="slide">
  <div class="slide-header">
    <div class="tag">Product Architecture</div>
    <div class="slide-title">The Multi-Agent Placement Council</div>
    <div class="slide-subtitle">Smart AI intent routing dispatches students to specialized elder brothers.</div>
  </div>
  <div class="grid-4">
    <div class="card">
      <div style="color: #38bdf8; font-weight: 700; font-size: 0.18in;">LEAD BROTHER & ORCHESTRATOR</div>
      <div class="card-title">Sai Anna (Free Tier)</div>
      <div class="card-text">
        Welcomes the student 1-on-1, learns their target dream company, teaches foundational intuition using real-world analogies, and holds them accountable with tough love.
      </div>
    </div>
    <div class="card">
      <div style="color: #10b981; font-weight: 700; font-size: 0.18in;">CORE DSA & SANDBOXES</div>
      <div class="card-title">Kiran Anna (Flagship Pro)</div>
      <div class="card-text">
        Guides hard algorithmic breakthroughs, edge-case discoveries, rough-paper whiteboard dry runs, and company-specific hard coding sandboxes.
      </div>
    </div>
    <div class="card">
      <div style="color: #f59e0b; font-weight: 700; font-size: 0.18in;">STRATEGY & RETENTION</div>
      <div class="card-title">Ravi Anna (Pro Senior)</div>
      <div class="card-text">
        Reverse-engineers target hiring drives (Amazon, TCS Prime, Swiggy), monitors preparation streaks, delivers scoldings, and auto-generates 1-click revision PDFs.
      </div>
    </div>
    <div class="card">
      <div style="color: #a855f7; font-weight: 700; font-size: 0.18in;">SYSTEM ARCHITECTURE</div>
      <div class="card-title">Venkat Anna (VIP All-Access)</div>
      <div class="card-text">
        Conducts GitHub repository code audits, teaches scalable API and system design patterns, and ensures portfolio projects are interview-proof.
      </div>
    </div>
  </div>
  <div class="footer-bar"><span>SAI Pitch Deck | Draper University</span><span>Slide 04</span></div>
</div>

<!-- SLIDE 5: DETERMINISTIC ENGINE -->
<div class="slide">
  <div class="slide-header">
    <div class="tag">Technical Integrity</div>
    <div class="slide-title">Zero-Guesswork: Deterministic Precision</div>
    <div class="slide-subtitle">Why SAI is not a generic prompt wrapper: mathematical certainty at every step.</div>
  </div>
  <div class="grid-2">
    <div class="card card-primary">
      <div class="card-title">1. Zero AI Code Evaluation</div>
      <div class="card-text" style="font-size: 0.2in; line-height: 1.6;">
        LLMs are strictly <strong>forbidden from judging code correctness</strong>. Student code executes deterministically inside client-side WebAssembly / Pyodide sandboxes and isolated Judge0 runners against real test suites.<br><br>
        The AI only receives runtime test telemetry to formulate targeted Socratic hints without giving away answers.
      </div>
    </div>
    <div class="card card-success">
      <div class="card-title">2. Ground-Truth Curriculum DAG</div>
      <div class="card-text" style="font-size: 0.2in; line-height: 1.6;">
        Every algorithmic pattern, analogy, and edge case lives in a <strong>pre-verified canonical knowledge graph</strong> with locked Big-O bounds.<br><br>
        <strong>Strict Schema & Fallback:</strong> All AI outputs adhere to rigid Pydantic/Zod schemas. Any latency or schema drift immediately trips a circuit breaker to serve curated canonical notes.
      </div>
    </div>
  </div>
  <div class="footer-bar"><span>SAI Pitch Deck | Draper University</span><span>Slide 05</span></div>
</div>

<!-- SLIDE 6: B2B TPO DASHBOARD -->
<div class="slide">
  <div class="slide-header">
    <div class="tag">Enterprise B2B Layer</div>
    <div class="slide-title">Institutional Placement Intelligence for Colleges</div>
    <div class="slide-subtitle">Empowering Training & Placement Officers (TPOs) with real-time diagnostic power.</div>
  </div>
  <div class="grid-3">
    <div class="card card-primary">
      <div style="font-size: 0.18in; font-weight: 700; color: #38bdf8;">PREDICTIVE PRI</div>
      <div class="card-title">Placement Readiness Index</div>
      <div class="card-text">
        Real-time (0–100) readiness score per student computed from sandbox performance, streak consistency, and algorithmic problem intuition.
      </div>
    </div>
    <div class="card card-danger">
      <div style="font-size: 0.18in; font-weight: 700; color: #ef4444;">EARLY DETECTION</div>
      <div class="card-title">Unplaceability Alerts</div>
      <div class="card-text">
        Flags struggling 5th & 6th semester students to college management 6 months before campus drives, eliminating late-stage placement panic.
      </div>
    </div>
    <div class="card card-success">
      <div style="font-size: 0.18in; font-weight: 700; color: #10b981;">ACCREDITATION</div>
      <div class="card-title">NAAC / NBA Analytics</div>
      <div class="card-text">
        Batch-level skill deficiency heatmaps (e.g., "ECE 3rd-year is 40% behind on Graph Traversal") exportable for institutional accreditation compliance.
      </div>
    </div>
  </div>
  <div class="footer-bar"><span>SAI Pitch Deck | Draper University</span><span>Slide 06</span></div>
</div>

<!-- SLIDE 7: BUSINESS MODEL -->
<div class="slide">
  <div class="slide-header">
    <div class="tag">Monetization</div>
    <div class="slide-title">Dual B2B2C Revenue Architecture</div>
    <div class="slide-subtitle">Culturally aligned student micro-transactions + enterprise annual college contracts.</div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div style="color: #38bdf8; font-weight: 700; font-size: 0.2in;">B2C: "SENIOR TREAT" MODEL</div>
      <div class="card-title">Frictionless Cultural Tipping</div>
      <div class="card-text" style="display: flex; flex-direction: column; gap: 0.18in;">
        <div><strong>• Micro-Treats (₹15 - ₹25):</strong> 1-tap UPI impulse tips (Chai / Pani Puri) triggered after "Aha!" concept breakthroughs. Zero subscription resistance.</div>
        <div><strong>• Monthly Squad Unlocks (₹99 - ₹299/mo):</strong> Shawarma and Biryani treats unlocking Kiran & Ravi Anna for hard DSA mock rounds and 1-click revision PDFs.</div>
        <div><strong>• Grand Mandi Treat (₹499/mo):</strong> Complete council access with GitHub portfolio and system design audits.</div>
      </div>
    </div>
    <div class="card">
      <div style="color: #10b981; font-weight: 700; font-size: 0.2in;">B2B: INSTITUTIONAL SAAS</div>
      <div class="card-title">Predictable Annual Campus Licenses</div>
      <div class="card-text" style="display: flex; flex-direction: column; gap: 0.18in;">
        <div><strong>• Student Seat License:</strong> ₹300 – ₹500 per eligible student per year billed directly to college management.</div>
        <div><strong>• Campus Contract Size:</strong> An average private college (1,500 – 2,500 students) yields <strong>₹6L – ₹12L ARR</strong>.</div>
        <div><strong>• Sticky Retention:</strong> Near-zero annual churn due to deep integration with placement cell metrics and accreditation requirements.</div>
      </div>
    </div>
  </div>
  <div class="footer-bar"><span>SAI Pitch Deck | Draper University</span><span>Slide 07</span></div>
</div>

<!-- SLIDE 8: DISTRIBUTION MOAT -->
<div class="slide">
  <div class="slide-header">
    <div class="tag">Unfair Advantage</div>
    <div class="slide-title">The SurfBoard Distribution Engine</div>
    <div class="slide-subtitle">109,000+ organic developers from Day 0 with zero paid acquisition costs.</div>
  </div>
  <div class="grid-3">
    <div class="card card-primary">
      <div class="stat-num">109K+</div>
      <div class="card-title">Organic Dev Followers</div>
      <div class="card-text">
        Built organically over 6 years across Instagram and YouTube under The SurfBoard. Zero ad-spend CAC on Day 0.
      </div>
    </div>
    <div class="card card-success">
      <div class="stat-num" style="color: #10b981;">1,000+</div>
      <div class="card-title">Direct Student DMs</div>
      <div class="card-text">
        Every feature, analogy, and persona is reverse-engineered from 6 years of qualitative ground-level student placement queries.
      </div>
    </div>
    <div class="card card-warning">
      <div class="stat-num" style="color: #f59e0b;">₹0</div>
      <div class="card-title">Authentic Trust Moat</div>
      <div class="card-text">
        Never ran scam affiliate schemes or predatory courses. High founder integrity creates natural elder-brother loyalty.
      </div>
    </div>
  </div>
  <div class="footer-bar"><span>SAI Pitch Deck | Draper University</span><span>Slide 08</span></div>
</div>

<!-- SLIDE 9: UNIT ECONOMICS -->
<div class="slide">
  <div class="slide-header">
    <div class="tag">Cost Engineering</div>
    <div class="slide-title">Cheap for Owner, Premium for User</div>
    <div class="slide-subtitle">Built to deliver enterprise-grade margins even on Tier-2 Indian student pricing.</div>
  </div>
  <div class="grid-4">
    <div class="card">
      <div class="card-title" style="color: #10b981;">Client-Side Execution (₹0)</div>
      <div class="card-text">
        80%+ of student code tests run client-side in the browser via Pyodide / WebAssembly, eliminating heavy cloud sandbox server costs.
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="color: #10b981;">SVG Canvas vs Video ($0 vs $1000s)</div>
      <div class="card-text">
        Video diffusion models burn $0.20/min. SAI's Rough.js hand-drawn whiteboard runs locally at 0 GPU overhead and &lt;10ms latency.
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="color: #38bdf8;">Context Caching (70% Token Cut)</div>
      <div class="card-text">
        Pre-verified DSA curriculum DAGs are cached via Redis and Gemini Implicit Caching, drastically reducing LLM inference burn.
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="color: #38bdf8;">Single-Persona Router</div>
      <div class="card-text">
        Intelligent router passes messages to exactly ONE brother persona at a time, preventing token multiplication across the squad.
      </div>
    </div>
  </div>
  <div class="footer-bar"><span>SAI Pitch Deck | Draper University</span><span>Slide 09</span></div>
</div>

<!-- SLIDE 10: THE DRAPERU ASK -->
<div class="slide" style="justify-content: space-between;">
  <div class="slide-header">
    <div class="tag">Vision & The Ask</div>
    <div class="slide-title">Taking SAI to the Global Frontier</div>
    <div class="slide-subtitle">Scaling regional trust into a venture-grade technical skilling platform.</div>
  </div>
  <div class="card card-primary" style="flex: 1; margin-bottom: 0.3in; justify-content: center;">
    <div style="font-size: 0.28in; font-weight: 700; color: #ffffff; margin-bottom: 0.25in;">
      Why Draper University Founders Program:
    </div>
    <div class="card-text" style="font-size: 0.22in; line-height: 1.6; display: flex; flex-direction: column; gap: 0.2in;">
      <div><strong>1. Global Venture & Enterprise Scaling:</strong> Structuring our institutional sales playbooks to transition from initial college pilots into standardized annual campus contracts.</div>
      <div><strong>2. Corporate & Tech Hiring Bridges:</strong> Connecting SAI's Placement Readiness Index directly with global tech recruiters and Silicon Valley engineering networks.</div>
      <div><strong>3. Seed Capital & Ecosystem Acceleration:</strong> Partnering with top-tier venture networks to scale engineering capacity and onboard 50+ college campuses in Year 1.</div>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; background: #161b22; border: 1.5px solid #30363d; border-radius: 12px; padding: 0.25in 0.4in;">
    <div style="font-size: 0.2in; color: #ffffff;"><strong>Contact:</strong> founder@thesurfboard.in</div>
    <div style="font-size: 0.2in; color: #38bdf8;"><strong>Product:</strong> sai.thesurfboard.in</div>
    <div style="font-size: 0.2in; color: #10b981;"><strong>Parent Studio:</strong> thesurfboard.in</div>
  </div>
  <div class="footer-bar"><span>SAI Pitch Deck | Draper University</span><span>Slide 10</span></div>
</div>

</body>
</html>
`;

fs.writeFileSync(path.resolve('deck.html'), html);
console.log('deck.html generated successfully.');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputPath = path.resolve('../SAI_Pitch_Deck.pdf');
const inputUrl = `file:///${path.resolve('deck.html').replace(/\\/g, '/')}`;

console.log('Rendering PDF via Headless Edge...');
const cmd = `"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outputPath}" --print-to-pdf-no-header "${inputUrl}"`;
execSync(cmd);
console.log('PDF rendered successfully at:', outputPath);
