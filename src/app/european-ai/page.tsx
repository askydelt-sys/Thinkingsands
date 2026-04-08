'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePageAnalytics, AnalyticsOverlay, formatTime } from '@/components/Analytics';

function EUBadge({ programme, color = '#003399' }: { programme: string; color?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', background: `${color}18`, border: `1px solid ${color}40`, borderRadius: '6px', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color, letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
      <span style={{ fontSize: '0.8rem' }}>🇪🇺</span>
      {programme}
    </span>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="ext-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#6699ff', textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.2s ease' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
      {children}
    </a>
  );
}

export default function EuropeanAI() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const sectionIds = ['hero', 'silicon', 'models', 'voice-vision', 'robotics', 'defence', 'space', 'people', 'ukraine', 'future'];
  const sectionLabels = ['Overview', 'Silicon Foundation', 'AI Models', 'Voice & Vision', 'Robotics', 'Defence', 'Space', 'Key People', 'Ukraine', 'Future'];
  const { analytics } = usePageAnalytics(sectionIds, sectionLabels, 'european-ai');
  const hasWindow = typeof window !== 'undefined';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      const bar = document.getElementById('progressBar');
      if (bar) bar.style.width = scrollPercent + '%';
    };
    window.addEventListener('scroll', handleScroll);

    const els = document.querySelectorAll('.animate-on-scroll, .animate-scale');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const siblings = Array.from(el.parentElement?.children || []).filter(child =>
            child.classList.contains('animate-on-scroll') || child.classList.contains('animate-scale')
          );
          const si = siblings.indexOf(el);
          el.classList.remove('delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6');
          if (si < 6) el.classList.add('delay-' + (si + 1));
          el.classList.add('visible');
          obs.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
    els.forEach(el => obs.observe(el));

    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot') as NodeListOf<HTMLElement>;
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navDots.forEach(dot => {
            dot.style.background = 'rgba(255,255,255,0.2)';
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.boxShadow = 'none';
            if (dot.dataset.section === id) {
              dot.style.background = '#ffd700';
              dot.style.width = '14px';
              dot.style.height = '14px';
              dot.style.boxShadow = '0 0 10px #ffd70080';
            }
          });
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => sectionObs.observe(s));

    navDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.section || '');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
      dot.addEventListener('mouseenter', () => {
        const label = dot.dataset.label;
        if (label) {
          const tooltip = document.createElement('div');
          tooltip.textContent = label;
          tooltip.style.cssText = 'position:absolute;right:25px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.8);color:#fff;padding:4px 10px;border-radius:6px;font-size:12px;white-space:nowrap;pointer-events:none;font-family:Space Grotesk,sans-serif;';
          tooltip.className = 'dot-tooltip';
          dot.appendChild(tooltip);
        }
      });
      dot.addEventListener('mouseleave', () => {
        const t = dot.querySelector('.dot-tooltip');
        if (t) t.remove();
      });
    });

    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  if (!hasWindow) return null;

  return (
    <>
      <AnalyticsOverlay 
        analytics={analytics} 
        isVisible={showAnalytics} 
        onClose={() => setShowAnalytics(false)}
        accentColor="#ffd700"
      />

      {/* Analytics Button */}
      <button
        onClick={() => setShowAnalytics(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255,215,0,0.2)',
          border: '1px solid rgba(255,215,0,0.4)',
          color: '#ffd700',
          fontSize: '1.2rem',
          cursor: 'pointer',
          zIndex: 1500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
          transition: 'all 0.3s ease',
        }}
      >
        📊
      </button>

      <div className="progress-bar" id="progressBar" style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'linear-gradient(135deg, #003399 0%, #ffd700 50%, #00f5d4 100%)', zIndex: 1000, transition: 'width 0.1s ease', width: '0%' }} />

      <nav className="nav-dots" style={{ position: 'fixed', right: '30px', top: '50%', transform: 'translateY(-50%)', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {['hero', 'silicon', 'models', 'voice-vision', 'robotics', 'defence', 'space', 'people', 'ukraine', 'future'].map((id, i) => (
          <div key={id} className="nav-dot" data-section={id} data-label={['Overview', 'Silicon Foundation', 'AI Models', 'Voice & Vision', 'Robotics', 'AI & Defence', 'AI & Space', 'Key People', 'Ukraine', 'Future'][i]} style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative' }} />
        ))}
      </nav>

      <Link href="/" style={{ position: 'fixed', top: '20px', left: '30px', zIndex: 1000, display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(0,51,153,0.3)', border: '1px solid rgba(0,51,153,0.5)', borderRadius: '8px', color: '#6699ff', textDecoration: 'none', fontSize: '0.85rem', backdropFilter: 'blur(10px)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        LLM History
      </Link>

      {/* ===== EU FUNDING KEY ===== */}
      <div style={{ position: 'fixed', bottom: '20px', left: '30px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', borderRadius: '10px', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.08)', maxWidth: '220px' }}>
        <span style={{ fontSize: '0.65rem', color: '#a0a0b0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>EU Funding Key</span>
        <span style={{ fontSize: '0.68rem', color: '#4d79ff' }}>🇪🇺 = EU co-funded or sponsored</span>
      </div>

      {/* ===== HERO ===== */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(5,5,15,0.92) 0%, rgba(10,10,26,0.92) 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.03, pointerEvents: 'none' }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{ position: 'absolute', fontSize: '4rem', color: '#ffd700', left: `${10 + (i % 6) * 16}%`, top: `${15 + Math.floor(i / 6) * 60}%`, transform: 'rotate(' + (i * 30) + 'deg)' }}>★</div>
          ))}
        </div>
        <div className="section-content animate-scale visible" style={{ textAlign: 'center', maxWidth: '950px' }}>
          <h1 className="animate-on-scroll visible delay-2" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '30px', background: 'linear-gradient(135deg, #003399 0%, #ffd700 50%, #00f5d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            European Leaders<br />in AI
          </h1>
          <p className="animate-on-scroll visible delay-3" style={{ fontSize: '1.25rem', color: '#c0c0dc', maxWidth: '700px', margin: '0 auto 40px' }}>
            From the machines that make AI chips to the models that rival Silicon Valley &mdash; Europe&apos;s AI ecosystem spans lithography monopolies, open-source pioneers, defence shields, and space intelligence.
          </p>
          <div className="animate-on-scroll visible delay-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {['🔬 Chip Infrastructure', '🧠 Foundation Models', '🎙️ Voice & Vision', '🤖 Robotics', '🛡️ Defence AI', '🚀 Space AI'].map((badge, i) => (
              <span key={i} style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.85rem', color: '#c0c0dc' }}>{badge}</span>
            ))}
          </div>
        </div>
        <div className="animate-on-scroll visible delay-5" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: '#c0c0d3', fontSize: '14px', animation: 'bounce 2s infinite' }}>
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* ===== SILICON FOUNDATION ===== */}
      <section id="silicon" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(10,10,15,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🔬</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>The Silicon Foundation</h2>
              <p style={{ color: '#ffd700', fontSize: '1rem', margin: 0 }}>Without European lithography, no AI chip exists</p>
            </div>
          </div>
          <p className="animate-on-scroll" style={{ fontSize: '1.15rem', color: '#c0c0d3', maxWidth: '800px', marginBottom: '40px' }}>
            Every NVIDIA H100, every Apple M4, every AI accelerator on Earth is manufactured using machines built by one company in Veldhoven, Netherlands. Europe doesn&apos;t just participate in the AI revolution &mdash; it enables it at the atomic level.
          </p>

          {/* ASML */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(0,51,153,0.12), rgba(0,51,153,0.03))', borderRadius: '16px', border: '1px solid rgba(0,51,153,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(0,51,153,0.3)', border: '1px solid rgba(0,51,153,0.5)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#4d79ff', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Netherlands 🇳🇱</div>
            <h3 style={{ fontSize: '1.6rem', color: '#4d79ff', marginBottom: '10px' }}>ASML &mdash; The $350B Monopoly</h3>
            <p style={{ fontSize: '1rem', color: '#c0c0d3', marginBottom: '20px', maxWidth: '750px' }}>
              ASML is the <strong style={{ color: '#fff' }}>sole manufacturer of EUV lithography machines</strong> on the planet. Each machine costs ~€350M, weighs 180 tonnes, and uses tin droplets hit by lasers 50,000 times per second to create patterns smaller than a virus. Their new High-NA EUV systems push to 2nm and below.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '15px' }}>
              {[
                { stat: '100%', label: 'EUV market share', color: '#4d79ff' },
                { stat: '€28.3B', label: '2025 revenue', color: '#00f5d4' },
                { stat: '€350M', label: 'Per EUV machine', color: '#ffd700' },
                { stat: '44,000+', label: 'Employees', color: '#f15bb5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.5rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.8rem', color: '#a0a0b0', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
              <EUBadge programme="EU Chips Act ecosystem partner" />
              <EUBadge programme="Largest Mistral AI investor" color="#ff6b35" />
            </div>
            <ExtLink href="https://www.asml.com">asml.com</ExtLink>
          </div>

          {/* IMEC */}
          <div className="animate-on-scroll" style={{ padding: '30px', background: 'linear-gradient(145deg, rgba(0,245,212,0.08), rgba(0,245,212,0.02))', borderRadius: '16px', border: '1px solid rgba(0,245,212,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(0,245,212,0.15)', border: '1px solid rgba(0,245,212,0.3)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#00f5d4', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Belgium 🇧🇪</div>
            <h3 style={{ fontSize: '1.6rem', color: '#00f5d4', marginBottom: '10px' }}>imec &mdash; The World&apos;s Chip Lab</h3>
            <p style={{ fontSize: '1rem', color: '#c0c0d3', marginBottom: '20px', maxWidth: '750px' }}>
              Based in Leuven, imec is the <strong style={{ color: '#fff' }}>world&apos;s leading semiconductor R&D centre</strong>. Every major chipmaker &mdash; TSMC, Samsung, Intel &mdash; develops next-generation processes here. In February 2026, imec opened the <strong style={{ color: '#fff' }}>€2.5 billion NanoIC pilot line</strong> &mdash; the largest EU Chips Act facility to date, with €700M in direct EU investment.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '15px' }}>
              {[
                { stat: '€2.5B', label: 'NanoIC pilot line (2026)', color: '#00f5d4' },
                { stat: '€700M', label: 'EU Chips Act funding', color: '#ffd700' },
                { stat: '5,500+', label: 'Researchers', color: '#9b5de5' },
                { stat: 'Sub-2nm', label: 'Process R&D', color: '#f15bb5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.5rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.8rem', color: '#a0a0b0', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
              <EUBadge programme="EU Chips Act — €700M direct funding" color="#ffd700" />
              <EUBadge programme="Horizon Europe research partner" />
            </div>
            <ExtLink href="https://www.imec-int.com">imec-int.com</ExtLink>
          </div>

          {/* Other chip companies */}
          <div className="animate-on-scroll" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Axelera AI', country: '🇳🇱', desc: 'Building ultra-efficient AI accelerator chips for edge computing. Raised $250M+ in 2026 — the largest EU AI semiconductor round ever. EIC Fund participant.', color: '#9b5de5', url: 'https://axelera.ai', eu: 'EIC Fund (European Innovation Council)' },
              { name: 'Graphcore', country: '🇬🇧', desc: 'Bristol-based IPU (Intelligence Processing Unit) pioneer. Purpose-built AI chips with massive parallelism for training and inference.', color: '#f15bb5', url: 'https://www.graphcore.ai' },
              { name: 'SiPearl', country: '🇫🇷', desc: 'Designing the Rhea1 processor for European exascale supercomputers. Initiated inside the European Processor Initiative (EPI) consortium. Will power EU\'s sovereign HPC infrastructure.', color: '#ffd700', url: 'https://sipearl.com', eu: 'EuroHPC JU — European Processor Initiative' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${company.color}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ color: company.color, fontSize: '1.1rem', margin: 0 }}>{company.name}</h4>
                  <span style={{ fontSize: '1.2rem' }}>{company.country}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#a0a0b0', margin: '0 0 12px' }}>{company.desc}</p>
                {company.eu && <div style={{ marginBottom: '10px' }}><EUBadge programme={company.eu} color={company.color} /></div>}
                <ExtLink href={company.url}>{company.name} website</ExtLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI MODELS ===== */}
      <section id="models" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'linear-gradient(180deg, rgba(18,18,26,0.92) 0%, rgba(10,10,15,0.92) 100%)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🧠</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>Foundation Models &amp; Platforms</h2>
              <p style={{ color: '#ff6b35', fontSize: '1rem', margin: 0 }}>Europe&apos;s open-source AI revolution</p>
            </div>
          </div>
          <p className="animate-on-scroll" style={{ fontSize: '1.15rem', color: '#c0c0d3', maxWidth: '800px', marginBottom: '15px' }}>
            While Silicon Valley builds walled gardens, Europe leads the open-source AI movement. French and European companies have created models that rival GPT-4 and platforms that host the world&apos;s AI community.
          </p>

          {/* EU AI Factories callout */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '22px', background: 'rgba(0,51,153,0.1)', border: '1px solid rgba(0,51,153,0.3)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>🇪🇺</span>
              <h4 style={{ color: '#4d79ff', margin: 0, fontSize: '1rem' }}>EU AI Infrastructure Investment</h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#c0c0d3', margin: '0 0 12px' }}>
              The EU is building <strong style={{ color: '#fff' }}>13 AI Factories</strong> through EuroHPC JU &mdash; GPU supercomputing centres for training European AI models. The <strong style={{ color: '#fff' }}>Digital Europe Programme</strong> deploys ~€700M for AI in 2026. <strong style={{ color: '#fff' }}>InvestAI</strong> mobilises €200B in public-private AI investment. In January 2026, the Council approved <strong style={{ color: '#fff' }}>AI Gigafactories</strong>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <EUBadge programme="EuroHPC AI Factories" color="#4d79ff" />
              <EUBadge programme="Digital Europe Programme" color="#00f5d4" />
              <EUBadge programme="InvestAI — €200B" color="#ffd700" />
              <EUBadge programme="Horizon Europe — €14B for 2025-27" color="#9b5de5" />
            </div>
            <div style={{ marginTop: '10px' }}><ExtLink href="https://digital-strategy.ec.europa.eu/en/policies/ai-factories">EU AI Factories programme</ExtLink></div>
          </div>

          {/* Mistral AI */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(255,107,53,0.1), rgba(255,107,53,0.02))', borderRadius: '16px', border: '1px solid rgba(255,107,53,0.3)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(255,107,53,0.2)', border: '1px solid rgba(255,107,53,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Paris 🇫🇷</div>
            <h3 style={{ fontSize: '1.6rem', color: '#ff6b35', marginBottom: '10px' }}>Mistral AI &mdash; Europe&apos;s Frontier Lab</h3>
            <p style={{ fontSize: '1rem', color: '#c0c0d3', marginBottom: '20px', maxWidth: '750px' }}>
              Founded in 2023 by ex-Google DeepMind and Meta researchers, Mistral has become <strong style={{ color: '#fff' }}>Europe&apos;s most valuable AI startup</strong>. Their models compete head-to-head with OpenAI and Anthropic. In March 2026, Mistral raised €722M to build its first European AI cluster with 13,800 NVIDIA GPUs near Paris.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px', marginBottom: '15px' }}>
              {[
                { stat: '€11.7B', label: 'Valuation', color: '#ff6b35' },
                { stat: '€1B+', label: '2026 revenue target', color: '#ffd700' },
                { stat: '€2.4B+', label: 'Total raised', color: '#00f5d4' },
                { stat: 'Mistral Large', label: 'Flagship model', color: '#9b5de5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.3rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.78rem', color: '#a0a0b0', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              {['Open weights', 'Mistral Large', 'Codestral', 'Le Chat', 'Enterprise API'].map((tag, i) => (
                <span key={i} style={{ padding: '4px 12px', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: '15px', fontSize: '0.78rem', color: '#ff6b35' }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
              <EUBadge programme="France 2030 backed" color="#ff6b35" />
              <EUBadge programme="ASML (EU Chips Act partner) is largest investor" color="#4d79ff" />
            </div>
            <ExtLink href="https://mistral.ai">mistral.ai</ExtLink>
          </div>

          {/* Hugging Face */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(255,213,0,0.08), rgba(255,213,0,0.02))', borderRadius: '16px', border: '1px solid rgba(255,213,0,0.25)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(255,213,0,0.15)', border: '1px solid rgba(255,213,0,0.3)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#ffd700', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Paris 🇫🇷 / New York</div>
            <h3 style={{ fontSize: '1.6rem', color: '#ffd700', marginBottom: '10px' }}>Hugging Face &mdash; The GitHub of AI</h3>
            <p style={{ fontSize: '1rem', color: '#c0c0d3', marginBottom: '20px', maxWidth: '750px' }}>
              Co-founded by French entrepreneur <strong style={{ color: '#fff' }}>Cl&eacute;ment Delangue</strong>, Hugging Face is the <strong style={{ color: '#fff' }}>world&apos;s largest open-source AI platform</strong>. Over 1 million models, 250,000 datasets, and 300,000 demo applications. It&apos;s where the global AI community builds, shares, and deploys.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px', marginBottom: '15px' }}>
              {[
                { stat: '$4.5B', label: 'Valuation', color: '#ffd700' },
                { stat: '1M+', label: 'Models hosted', color: '#00f5d4' },
                { stat: '250K+', label: 'Datasets', color: '#9b5de5' },
                { stat: '50K+', label: 'Organizations', color: '#f15bb5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.3rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.78rem', color: '#a0a0b0', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <ExtLink href="https://huggingface.co">huggingface.co</ExtLink>
          </div>

          {/* Other model companies */}
          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Aleph Alpha', country: '🇩🇪', desc: 'German sovereign AI lab building enterprise LLMs with full data residency in Europe. Strong focus on government and regulated industries.', color: '#4d79ff', url: 'https://aleph-alpha.com', eu: 'Horizon Europe & German SPRIND agency' },
              { name: 'Stability AI', country: '🇬🇧', desc: 'London-based creators of Stable Diffusion, the open-source image generation model that democratised AI art worldwide.', color: '#9b5de5', url: 'https://stability.ai' },
              { name: 'DeepL', country: '🇩🇪', desc: 'Cologne-based neural machine translation that consistently outperforms Google Translate. Used by 100,000+ businesses across all EU languages.', color: '#00f5d4', url: 'https://www.deepl.com' },
              { name: 'Poolside', country: '🇫🇷', desc: 'Paris-based AI coding startup building frontier code generation models. Raised $500M+ to challenge GitHub Copilot.', color: '#f15bb5', url: 'https://www.poolside.ai' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${company.color}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ color: company.color, fontSize: '1.1rem', margin: 0 }}>{company.name}</h4>
                  <span style={{ fontSize: '1.2rem' }}>{company.country}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#a0a0b0', margin: '0 0 12px' }}>{company.desc}</p>
                {company.eu && <div style={{ marginBottom: '10px' }}><EUBadge programme={company.eu} color={company.color} /></div>}
                <ExtLink href={company.url}>{company.name}</ExtLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VOICE & VISION ===== */}
      <section id="voice-vision" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(10,10,15,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🎙️</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>Voice, Vision &amp; Media AI</h2>
              <p style={{ color: '#f15bb5', fontSize: '1rem', margin: 0 }}>European companies leading multimodal AI</p>
            </div>
          </div>

          {/* ElevenLabs */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(241,91,181,0.1), rgba(241,91,181,0.02))', borderRadius: '16px', border: '1px solid rgba(241,91,181,0.3)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(241,91,181,0.2)', border: '1px solid rgba(241,91,181,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#f15bb5', textTransform: 'uppercase', letterSpacing: '1.5px' }}>London 🇬🇧 &middot; Polish-Ukrainian founders</div>
            <h3 style={{ fontSize: '1.6rem', color: '#f15bb5', marginBottom: '10px' }}>ElevenLabs &mdash; The Voice of AI</h3>
            <p style={{ fontSize: '1rem', color: '#c0c0d3', marginBottom: '20px', maxWidth: '750px' }}>
              Founded by <strong style={{ color: '#fff' }}>Mati Staniszewski</strong> (Polish) and <strong style={{ color: '#fff' }}>Piotr D&#261;bkowski</strong> (Polish-Ukrainian), ElevenLabs is the <strong style={{ color: '#fff' }}>world leader in AI voice synthesis</strong>. From a 2023 startup to $11B in under three years &mdash; one of the fastest-growing AI companies in history.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '15px' }}>
              {[
                { stat: '$11B', label: 'Valuation (Feb 2026)', color: '#f15bb5' },
                { stat: '$500M', label: 'Series D (Sequoia)', color: '#ffd700' },
                { stat: '29', label: 'Languages', color: '#00f5d4' },
                { stat: '1M+', label: 'Users', color: '#9b5de5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.3rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.78rem', color: '#a0a0b0', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <ExtLink href="https://elevenlabs.io">elevenlabs.io</ExtLink>
          </div>

          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Synthesia', country: '🇬🇧', desc: 'London-based AI video generation. Creates realistic AI avatars for enterprise content. $2.1B valuation, used by half the Fortune 100.', color: '#4d79ff', url: 'https://www.synthesia.io', stat: '$2.1B valuation' },
              { name: 'Photoroom', country: '🇫🇷', desc: 'Paris-based AI photo editing. Instant background removal and product photography using AI. 150M+ downloads.', color: '#00f5d4', url: 'https://www.photoroom.com', stat: '150M+ downloads' },
              { name: 'Lovable', country: '🇸🇪', desc: 'Swedish AI app builder that generates full-stack applications from natural language. One of Europe\'s fastest-growing GenAI startups.', color: '#ffd700', url: 'https://lovable.dev', stat: 'Fastest-growing GenAI' },
              { name: 'Runway', country: '🇬🇧', desc: 'Co-founded by European researchers, Runway pioneered generative video AI (Gen-2, Gen-3). Used in Hollywood and by millions of creators.', color: '#f15bb5', url: 'https://runwayml.com', stat: 'AI video pioneer' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${company.color}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ color: company.color, fontSize: '1.1rem', margin: 0 }}>{company.name}</h4>
                  <span style={{ fontSize: '1.2rem' }}>{company.country}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#a0a0b0', margin: '0 0 8px' }}>{company.desc}</p>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: company.color, display: 'block', marginBottom: '10px' }}>{company.stat}</span>
                <ExtLink href={company.url}>{company.name}</ExtLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROBOTICS ===== */}
      <section id="robotics" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'linear-gradient(180deg, rgba(18,18,26,0.92) 0%, rgba(10,10,15,0.92) 100%)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🤖</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>Robotics &amp; Automation</h2>
              <p style={{ color: '#00f5d4', fontSize: '1rem', margin: 0 }}>Where European engineering meets AI</p>
            </div>
          </div>
          <p className="animate-on-scroll" style={{ fontSize: '1.1rem', color: '#c0c0d3', maxWidth: '800px', marginBottom: '40px' }}>
            Europe&apos;s industrial heritage gives it a natural advantage in robotics. German precision engineering, Scandinavian automation expertise, and AI-native startups are creating the next generation of intelligent machines.
          </p>

          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {[
              { name: 'ABB Robotics', country: '🇨🇭🇸🇪', desc: 'Swiss-Swedish giant and one of the world\'s "Big Four" robot makers. Leading AI integration into industrial automation. 500,000+ robots installed globally.', color: '#ff6b35', url: 'https://new.abb.com/products/robotics', eu: 'Horizon Europe robotics projects' },
              { name: 'KUKA', country: '🇩🇪', desc: 'Augsburg-based industrial robot manufacturer. AI-driven manufacturing automation, collaborative robots, and smart factory solutions.', color: '#ffd700', url: 'https://www.kuka.com' },
              { name: 'Universal Robots', country: '🇩🇰', desc: 'Danish collaborative robot (cobot) leader. Created the market for lightweight robots that work alongside humans. Now integrating AI vision and adaptive learning.', color: '#00f5d4', url: 'https://www.universal-robots.com' },
              { name: 'Agile Robots', country: '🇩🇪', desc: 'Munich-based AI-powered robots with force-sensing and vision. Combining German engineering with machine learning for dexterous manipulation.', color: '#9b5de5', url: 'https://www.agile-robots.com' },
              { name: 'Exotec', country: '🇫🇷', desc: 'French warehouse robotics whose Skypod robots climb 10m-high racks. Valued at $2B+, serving UNIQLO, Decathlon, and Carrefour. 100% French manufacturing.', color: '#f15bb5', url: 'https://www.exotec.com', eu: 'France 2030 / Bpifrance backed' },
              { name: 'Ocado Technology', country: '🇬🇧', desc: 'British grocery tech with AI-powered warehouse robots picking 65,000 items per hour. Robotic grid system licensed to supermarkets worldwide.', color: '#4d79ff', url: 'https://www.ocadogroup.com/technology' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: `1px solid ${company.color}25` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ color: company.color, fontSize: '1.15rem', margin: 0 }}>{company.name}</h4>
                  <span style={{ fontSize: '1.3rem' }}>{company.country}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#a0a0b0', margin: '0 0 12px' }}>{company.desc}</p>
                {company.eu && <div style={{ marginBottom: '10px' }}><EUBadge programme={company.eu} color={company.color} /></div>}
                <ExtLink href={company.url}>{company.name}</ExtLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI & DEFENCE ===== */}
      <section id="defence" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(10,10,15,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🛡️</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>AI &amp; Defence in Europe</h2>
              <p style={{ color: '#ff3b30', fontSize: '1rem', margin: 0 }}>From missile shields to autonomous systems</p>
            </div>
          </div>
          <p className="animate-on-scroll" style={{ fontSize: '1.15rem', color: '#c0c0d3', maxWidth: '800px', marginBottom: '15px' }}>
            AI is at the core of a new generation of European missile shields, autonomous vehicles, collaborative weapons, and battlefield intelligence. The European Defence Fund deploys €1B+ annually for defence R&amp;D including AI.
          </p>

          {/* EDF callout */}
          <div className="animate-on-scroll" style={{ marginBottom: '30px', padding: '22px', background: 'rgba(0,51,153,0.1)', border: '1px solid rgba(0,51,153,0.3)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>🇪🇺</span>
              <h4 style={{ color: '#4d79ff', margin: 0, fontSize: '1rem' }}>European Defence Fund (EDF)</h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#c0c0d3', margin: '0 0 12px' }}>
              The EDF launched a <strong style={{ color: '#fff' }}>€1B call for proposals in 2026</strong> covering AI, autonomous systems, hypersonic defence, and future combat systems. From AI to quantum, the fund shapes the future of EU defence technologies. 2026 flagships include <strong style={{ color: '#fff' }}>hypersonic defence and the future European main battle tank</strong>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              <EUBadge programme="European Defence Fund — €1B/year" color="#ff3b30" />
              <EUBadge programme="PESCO (Permanent Structured Cooperation)" />
            </div>
            <ExtLink href="https://defence-industry-space.ec.europa.eu/ai-quantum-how-european-defence-fund-shapes-future-eu-defence-technologies-2025-12-15_en">EU Defence AI programmes</ExtLink>
          </div>

          {/* Leonardo */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(255,59,48,0.1), rgba(255,59,48,0.02))', borderRadius: '16px', border: '1px solid rgba(255,59,48,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(255,59,48,0.2)', border: '1px solid rgba(255,59,48,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#ff3b30', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Italy 🇮🇹</div>
            <h3 style={{ fontSize: '1.6rem', color: '#ff3b30', marginBottom: '10px' }}>Leonardo &mdash; Michelangelo Dome</h3>
            <p style={{ fontSize: '1rem', color: '#c0c0d3', marginBottom: '20px', maxWidth: '800px' }}>
              Unveiled in November 2025, the <strong style={{ color: '#fff' }}>Michelangelo Dome</strong> is an AI-powered multi-domain integrated defence architecture &mdash; Europe&apos;s answer to Israel&apos;s Iron Dome. It fuses satellite, radar, electronic warfare, and cyber data into a single AI-driven shield. Now being tested in Ukraine.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
              {[
                { icon: '🛰️', title: 'Space Layer', desc: 'Satellite constellation for early warning and tracking' },
                { icon: '📡', title: 'AI Sensor Fusion', desc: 'Real-time multi-domain threat picture' },
                { icon: '⚡', title: 'AI Decision Engine', desc: 'Millisecond threat classification and response' },
                { icon: '🎯', title: 'Multi-domain', desc: 'Land, sea, air, space, and cyber coordinated' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '1.3rem', marginBottom: '6px' }}>{item.icon}</div>
                  <h5 style={{ fontSize: '0.9rem', color: '#ff3b30', marginBottom: '4px' }}>{item.title}</h5>
                  <p style={{ fontSize: '0.78rem', color: '#a0a0b0', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
              <EUBadge programme="13 EDF programme wins (2024)" color="#ff3b30" />
              <EUBadge programme="NATO integrated" />
            </div>
            <ExtLink href="https://www.leonardo.com/en/press-release-detail/-/detail/27-11-2025-leonardo-cingolani-presents-michelangelo-the-security-dome">Leonardo: Michelangelo Dome</ExtLink>
          </div>

          {/* Rheinmetall */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(155,93,229,0.08), rgba(155,93,229,0.02))', borderRadius: '16px', border: '1px solid rgba(155,93,229,0.25)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(155,93,229,0.2)', border: '1px solid rgba(155,93,229,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#9b5de5', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Germany 🇩🇪</div>
            <h3 style={{ fontSize: '1.5rem', color: '#9b5de5', marginBottom: '10px' }}>Rheinmetall &mdash; Autonomous Combat Systems</h3>
            <p style={{ fontSize: '1rem', color: '#c0c0d3', marginBottom: '15px', maxWidth: '750px' }}>
              Germany&apos;s largest defence company has <strong style={{ color: '#fff' }}>Centres of Excellence for Autonomous Mobility</strong>. AI systems span unmanned ground vehicles, the CT-025 crewless turret, and a partnership with <strong style={{ color: '#fff' }}>Anduril</strong> to build autonomous military drones for European forces.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <EUBadge programme="EDF project participant" color="#9b5de5" />
            </div>
            <ExtLink href="https://www.rheinmetall.com">rheinmetall.com</ExtLink>
          </div>

          {/* Other defence */}
          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'MBDA', countries: '🇫🇷🇬🇧🇮🇹🇩🇪', desc: 'Europe\'s missile champion. Orchestrike AI enables SPEAR cruise missiles to autonomously coordinate attacks mid-flight. Doubling Aster output in 2026.', color: '#ff3b30', url: 'https://www.mbda-systems.com', eu: 'EDF multi-programme' },
              { name: 'Dassault + Thales', countries: '🇫🇷', desc: 'Strategic AI alliance for air combat. Sovereign AI for Rafale F5 and autonomous combat drones. "Controlled defence AI" for crewed-uncrewed teaming.', color: '#4d79ff', url: 'https://www.dassault-aviation.com', eu: 'France 2030 & EDF FCAS' },
              { name: 'BAE Systems', countries: '🇬🇧', desc: 'UK\'s largest defence company. AI for Tempest/GCAP 6th-gen fighter, autonomous subs, and cyber defence. Digital Intelligence division for AI signals intelligence.', color: '#00f5d4', url: 'https://www.baesystems.com' },
              { name: 'Saab', countries: '🇸🇪', desc: 'Swedish defence innovator. AI electronic warfare, Gripen intelligent pilot assistance, autonomous underwater vehicles, and GlobalEye AI surveillance.', color: '#ffd700', url: 'https://www.saab.com' },
              { name: 'Helsing', countries: '🇩🇪🇬🇧🇫🇷', desc: 'Europe\'s most-funded AI defence startup ($500M+). Real-time sensor fusion and autonomous targeting. Active in Ukraine, operational with French and German forces.', color: '#ff6b35', url: 'https://helsing.ai', eu: 'EDF participant, MBDA partner' },
              { name: 'Oxford Dynamics', countries: '🇬🇧', desc: 'UK AI defence startup building autonomous systems for decision dominance. AVIS engine powers ground and aerial platforms.', color: '#f15bb5', url: 'https://oxdynamics.com' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: `1px solid ${company.color}25` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ color: company.color, fontSize: '1.1rem', margin: 0 }}>{company.name}</h4>
                  <span style={{ fontSize: '1rem', letterSpacing: '2px' }}>{company.countries}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#a0a0b0', margin: '0 0 12px' }}>{company.desc}</p>
                {company.eu && <div style={{ marginBottom: '10px' }}><EUBadge programme={company.eu} color={company.color} /></div>}
                <ExtLink href={company.url}>{company.name}</ExtLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI & SPACE ===== */}
      <section id="space" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'linear-gradient(180deg, rgba(18,18,26,0.92) 0%, rgba(10,10,15,0.92) 100%)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🚀</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>AI &amp; Space</h2>
              <p style={{ color: '#4d79ff', fontSize: '1rem', margin: 0 }}>European space intelligence and AI-powered satellites</p>
            </div>
          </div>

          {/* European Space Shield */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(77,121,255,0.1), rgba(77,121,255,0.02))', borderRadius: '16px', border: '1px solid rgba(77,121,255,0.3)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(77,121,255,0.2)', border: '1px solid rgba(77,121,255,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#4d79ff', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Strategic Initiative 🛡️</div>
            <h3 style={{ fontSize: '1.5rem', color: '#4d79ff', marginBottom: '10px' }}>European Space Shield (ESS)</h3>
            <p style={{ fontSize: '1rem', color: '#c0c0d3', marginBottom: '15px', maxWidth: '750px' }}>
              Part of the <strong style={{ color: '#fff' }}>Defence Readiness Roadmap 2030</strong>, the ESS leverages AI-powered **Space Domain Awareness (SDA)** to protect European assets like Galileo and IRIS² from jamming, cyber-attacks, and kinetic threats.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
              <div style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                <h5 style={{ fontSize: '0.9rem', color: '#00f5d4', marginBottom: '4px' }}>Autonomous Defence</h5>
                <p style={{ fontSize: '0.82rem', color: '#a0a0b0', margin: 0 }}>AI-driven threat attribution and automated intrusion response.</p>
              </div>
              <div style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                <h5 style={{ fontSize: '0.9rem', color: '#ffbd2e', marginBottom: '4px' }}>Project MYRIAD</h5>
                <p style={{ fontSize: '0.82rem', color: '#a0a0b0', margin: 0 }}>Processing multi-sensor satellite data 10x faster using neural networks.</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <EUBadge programme="Defence Readiness Roadmap 2030" color="#4d79ff" />
              <EUBadge programme="EU Space Strategy for Security & Defence" color="#00f5d4" />
            </div>
            <p style={{ fontSize: '0.85rem', color: '#7a7a7a', fontStyle: 'italic' }}>Rollout scheduled for Q2 2026</p>
          </div>

          <div className="animate-on-scroll" style={{ marginBottom: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'ESA Phi-Sat Programme', desc: 'On-board AI processing satellites. Phi-Sat-2 uses AI chips to analyse Earth observation data in orbit. Thales Alenia Space\'s PhiFireAI enables real-time wildfire detection from space.', color: '#00f5d4', url: 'https://earth.esa.int/eogateway/missions/phisat-2/overview', eu: 'ESA Earth Observation Programme' },
              { name: 'IRIS\u00B2 Constellation', desc: 'The EU\'s €6B secure satellite internet constellation. 264 satellites in multiple orbits by 2027, providing sovereign communications for governments and broadband for citizens.', color: '#9b5de5', url: 'https://www.euspa.europa.eu/eu-space-programme/secure-satcom/iris2', eu: 'EU Space Programme — €6B investment' },
              { name: 'Copernicus + AI', desc: 'EU\'s flagship Earth observation generating 250TB/day. AI extracts insights from deforestation to urban heat. Six Sentinel satellite families — world\'s most comprehensive environmental monitoring.', color: '#ffd700', url: 'https://www.copernicus.eu', eu: 'EU Space Programme — Copernicus' },
            ].map((project, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: `1px solid ${project.color}25` }}>
                <h4 style={{ color: project.color, fontSize: '1.1rem', marginBottom: '12px' }}>{project.name}</h4>
                <p style={{ fontSize: '0.88rem', color: '#a0a0b0', margin: '0 0 12px' }}>{project.desc}</p>
                {project.eu && <div style={{ marginBottom: '10px' }}><EUBadge programme={project.eu} color={project.color} /></div>}
                <ExtLink href={project.url}>{project.name}</ExtLink>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll" style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#ff6b35', marginBottom: '12px' }}>Space-Defence Convergence</h4>
            <p style={{ fontSize: '0.95rem', color: '#c0c0d3', margin: '0 0 10px' }}>
              Leonardo&apos;s Michelangelo Dome integrates a space layer for missile tracking. Europe is building an AI-powered sovereign space surveillance network connecting civilian Earth observation with military threat detection.
            </p>
            <EUBadge programme="EU Space Surveillance & Tracking (SST)" color="#ff6b35" />
          </div>
        </div>
      </section>

      {/* ===== KEY PEOPLE ===== */}
      <section id="people" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(10,10,15,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>👤</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>Key People in European AI</h2>
              <p style={{ color: '#ffd700', fontSize: '1rem', margin: 0 }}>Leaders, researchers, and founders shaping the continent&apos;s AI future</p>
            </div>
          </div>

          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginTop: '30px' }}>
            {[
              { name: 'Arthur Mensch', role: 'CEO & Co-founder, Mistral AI', origin: '🇫🇷', desc: 'Ex-Google DeepMind. Built Europe\'s most valuable AI company in under 2 years. Champions open-weight models and European sovereignty.', color: '#ff6b35', url: 'https://en.wikipedia.org/wiki/Arthur_Mensch', image: '/images/leaders/arthur-mensch.png' },
              { name: 'Clément Delangue', role: 'CEO & Co-founder, Hugging Face', origin: '🇫🇷', desc: 'Built the "GitHub of AI" — the world\'s largest open-source AI platform with 1M+ models.', color: '#ffd700', url: 'https://huggingface.co/clem', image: '/images/leaders/clement-delangue.png' },
              { name: 'Yann LeCun', role: 'Chief AI Scientist, Meta', origin: '🇫🇷', desc: 'Turing Award winner (2018). Born in Paris, pioneer of convolutional neural networks. Outspoken advocate for open-source AI.', color: '#4d79ff', url: 'https://en.wikipedia.org/wiki/Yann_LeCun', image: '/images/leaders/yann-lecun.png' },
              { name: 'Demis Hassabis', role: 'CEO, Google DeepMind', origin: '🇬🇧', desc: 'Nobel Prize winner (Chemistry, 2024) for AlphaFold. Built DeepMind from a London startup into the world\'s most prestigious AI lab.', color: '#00f5d4', url: 'https://en.wikipedia.org/wiki/Demis_Hassabis', image: '/images/leaders/demis-hassabis.png' },
              { name: 'Mati Staniszewski', role: 'CEO & Co-founder, ElevenLabs', origin: '🇵🇱', desc: 'Built the world\'s leading voice AI company to $11B in under 3 years — one of the fastest-growing AI startups ever.', color: '#f15bb5', url: 'https://elevenlabs.io/blog/series-d', image: '/images/leaders/mati-staniszewski.png' },
              { name: 'Roberto Cingolani', role: 'CEO, Leonardo', origin: '🇮🇹', desc: 'Physicist turned defence CEO. Architect of Michelangelo Dome. Former Italian Minister of Ecological Transition.', color: '#ff3b30', url: 'https://www.leonardo.com', image: '/images/leaders/roberto-cingolani.png' },
              { name: 'Cédric O', role: 'Co-founder, Mistral AI', origin: '🇫🇷', desc: 'Former French Secretary of State for Digital. Bridges AI policy and entrepreneurship. Key figure in France\'s AI sovereignty push.', color: '#9b5de5', url: 'https://mistral.ai', image: '/images/leaders/cedric-o.png' },
              { name: 'Jürgen Schmidhuber', role: 'LSTM Pioneer', origin: '🇩🇪🇨🇭', desc: 'Created LSTM networks (1997) that powered speech recognition and translation for decades. Pioneer at IDSIA in Switzerland.', color: '#ff6b35', url: 'https://en.wikipedia.org/wiki/J%C3%BCrgen_Schmidhuber', image: '/images/leaders/jurgen-schmidhuber.png' },
              { name: 'Guillaume Lample', role: 'Co-founder & Chief Scientist, Mistral', origin: '🇫🇷', desc: 'Ex-Meta FAIR researcher. Co-developed key techniques behind modern LLMs. Leads Mistral\'s model development.', color: '#ffd700', url: 'https://mistral.ai', image: '/images/leaders/guillaume-lample.png' },
              { name: 'Luc Julia', role: 'CTO, Renault', origin: '🇫🇷', desc: 'Co-creator of Apple\'s Siri. Now leading AI at Renault — conversational AI, autonomous driving, and predictive maintenance for European automotive.', color: '#00f5d4', url: 'https://en.wikipedia.org/wiki/Luc_Julia', image: '/images/leaders/luc-julia.png' },
              { name: 'Dario Amodei', role: 'CEO, Anthropic', origin: '🇮🇹 heritage', desc: 'Italian-American co-founder of Anthropic (Claude). Former VP Research at OpenAI. Pioneer of AI safety research.', color: '#4d79ff', url: 'https://en.wikipedia.org/wiki/Dario_Amodei', image: '/images/leaders/dario-amodei.png' },
              { name: 'Gesa Miczaika', role: 'Investor & AI Advocate', origin: '🇩🇪', desc: 'Co-founder of Auxxo, Europe\'s first female-founded VC. Funds AI startups and champions diversity in European AI.', color: '#f15bb5', url: 'https://www.auxxo.com', image: '/images/leaders/gesa-miczaika.png' },
            ].map((person, i) => (
              <div key={i} style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '25px', border: `1px solid ${person.color}20`, display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '-2px', background: person.color, borderRadius: '50%', opacity: 0.3, filter: 'blur(4px)' }} />
                  <img src={person.image} alt={person.name} style={{ width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${person.color}`, position: 'relative', background: '#000' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: person.color, marginBottom: '4px' }}>{person.name}</h4>
                      <p style={{ fontSize: '0.82rem', color: '#c0c0d3', margin: 0, fontWeight: 500 }}>{person.role}</p>
                    </div>
                    <span style={{ fontSize: '1.1rem' }}>{person.origin}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#a0a0b0', margin: '12px 0 10px' }}>{person.desc}</p>
                  <ExtLink href={person.url}>{person.name}</ExtLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UKRAINE ===== */}
      <section id="ukraine" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'linear-gradient(180deg, rgba(18,18,26,0.92) 0%, rgba(10,10,15,0.92) 100%)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🇺🇦</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>Ukraine &mdash; The AI Forge</h2>
              <p style={{ color: '#0057b7', fontSize: '1rem', margin: 0 }}>Where AI meets the battlefield &mdash; and beyond</p>
            </div>
          </div>
          <p className="animate-on-scroll" style={{ fontSize: '1.15rem', color: '#c0c0d3', maxWidth: '800px', marginBottom: '20px' }}>
            Ukraine&apos;s war has created the world&apos;s most advanced real-world AI testing ground. Ukrainian tech companies innovate at a pace no peacetime R&amp;D lab could match.
          </p>

          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(0,87,183,0.12), rgba(255,215,0,0.06))', borderRadius: '16px', border: '1px solid rgba(0,87,183,0.3)' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#0057b7', marginBottom: '15px' }}>The Drone Revolution</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              {[
                { stat: '7 Million', label: 'Drones planned for 2026', color: '#0057b7' },
                { stat: '1,500+', label: 'Defence tech companies', color: '#ffd700' },
                { stat: '10', label: 'Drone factories expanding to EU', color: '#00f5d4' },
                { stat: 'World first', label: 'Battlefield AI data sharing', color: '#f15bb5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '18px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.3rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.78rem', color: '#a0a0b0', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.95rem', color: '#c0c0d3', margin: '0 0 12px' }}>
              Ukraine aims to build <strong style={{ color: '#fff' }}>7 million drones in 2026</strong> &mdash; 70 times more than the US. In March 2026, Ukraine became the first country to <strong style={{ color: '#fff' }}>open battlefield AI data to allies</strong>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <ExtLink href="https://euromaidanpress.com/2026/01/26/ukraine-aims-to-build-7-million-drones-in-2026-70-times-more-than-the-us/">Ukraine drone programme</ExtLink>
              <ExtLink href="https://techukraine.org/2026/02/16/sky-high-ambitions-10-ukrainian-drone-factories-to-scale-across-europe-by-2026/">Drone factories expanding to EU</ExtLink>
            </div>
          </div>

          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            {[
              { name: 'Deus Robotics', desc: 'Ukrainian warehouse robotics (founded 2018). AI-powered autonomous warehouse robots competing globally.', color: '#0057b7', url: 'https://deusrobotics.com' },
              { name: 'AI Mariner', desc: 'Turns boats into autonomous marine drones. Modular AI kit adds navigation and autonomy to existing vessels — dual-use civilian/defence.', color: '#ffd700', url: 'https://aimariner.tech' },
              { name: 'ElevenLabs (roots)', desc: 'Co-founder Piotr Dąbkowski has Ukrainian heritage. The company embodies the Ukrainian-Polish tech talent pipeline producing world-class AI.', color: '#f15bb5', url: 'https://elevenlabs.io' },
              { name: 'Defence Tech Ecosystem', desc: '1,500+ startups developing AI targeting, autonomous navigation, electronic warfare, and drone swarm coordination. EU co-funding increasing.', color: '#00f5d4', url: 'https://www.militarytimes.com/flashpoints/ukraine/2026/03/13/ukraine-opens-battlefield-ai-data-to-allies-in-world-first-move/' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${company.color}30` }}>
                <h4 style={{ color: company.color, fontSize: '1.1rem', marginBottom: '10px' }}>{company.name}</h4>
                <p style={{ fontSize: '0.88rem', color: '#a0a0b0', margin: '0 0 12px' }}>{company.desc}</p>
                <ExtLink href={company.url}>{company.name}</ExtLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FUTURE ===== */}
      <section id="future" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(10,10,15,0.92)', textAlign: 'center' }}>
        <div className="section-content" style={{ maxWidth: '900px', width: '100%' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>Europe&apos;s AI Future</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.2rem', color: '#c0c0d3', maxWidth: '700px', margin: '0 auto 40px' }}>
            Europe will never be another Silicon Valley &mdash; and it shouldn&apos;t try to be. Its strengths are sovereign infrastructure, regulatory leadership, industrial heritage, defence integration, and the open-source ethos.
          </p>

          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', textAlign: 'left', marginBottom: '50px' }}>
            {[
              { icon: '🔬', title: 'Silicon Sovereignty', desc: 'ASML and imec ensure no AI chip is made without European technology. The EU Chips Act adds €43B.', color: '#4d79ff', eu: 'EU Chips Act — €43B' },
              { icon: '🧠', title: 'Open-Source Leadership', desc: 'Mistral, Hugging Face, and Stability AI lead the global open-source AI movement.', color: '#ff6b35', eu: 'GenAI4EU & AI Factories' },
              { icon: '🛡️', title: 'Defence Transformation', desc: 'Leonardo\'s Michelangelo Dome, MBDA smart missiles, and Helsing battlefield AI rebuild European security.', color: '#ff3b30', eu: 'European Defence Fund' },
              { icon: '📋', title: 'Regulatory Pioneer', desc: 'The EU AI Act is the world\'s first comprehensive AI regulation. Europe writes the rules others follow.', color: '#ffd700', eu: 'EU AI Act (2024)' },
              { icon: '🚀', title: 'Space Intelligence', desc: 'BROMO creates a European space champion. IRIS\u00B2, Copernicus, and Phi-Sat deliver AI-powered Earth intelligence.', color: '#00f5d4', eu: 'EU Space Programme & IRIS\u00B2' },
              { icon: '🤖', title: 'Industrial AI', desc: 'ABB, KUKA, and startups like Exotec combine European engineering with AI to lead in robotics.', color: '#9b5de5', eu: 'Horizon Europe Robotics' },
            ].map((item, i) => (
              <div key={i} className="animate-on-scroll" style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: `1px solid ${item.color}20` }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '1.1rem', color: item.color, marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#a0a0b0', margin: '0 0 10px' }}>{item.desc}</p>
                <EUBadge programme={item.eu} color={item.color} />
              </div>
            ))}
          </div>

          <div className="animate-on-scroll" style={{ padding: '35px', background: 'linear-gradient(145deg, rgba(0,51,153,0.15), rgba(255,215,0,0.08))', borderRadius: '16px', border: '1px solid rgba(0,51,153,0.3)', marginBottom: '40px' }}>
            <p style={{ fontSize: '1.3rem', color: '#fff', fontStyle: 'italic', margin: 0 }}>
              Europe doesn&apos;t just use AI &mdash; it makes the machines that make AI possible, builds the open platforms the world relies on, and writes the rules everyone will follow.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5,5,10,0.92)' }}>
        <p className="animate-on-scroll" style={{ fontSize: '1rem', color: '#c0c0d3', margin: '0 0 20px' }}>European Leaders in AI &middot; A guide to Europe&apos;s AI ecosystem</p>
        <div className="animate-on-scroll" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '600px', margin: '0 auto 30px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, rgba(0,245,212,0.15) 0%, rgba(155,93,229,0.1) 100%)', border: '1px solid rgba(0,245,212,0.3)', borderRadius: '10px', color: '#00f5d4', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← LLM History
          </Link>
          <Link href="/ec-ai-tools" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, rgba(0,51,153,0.3) 0%, rgba(255,204,0,0.1) 100%)', border: '1px solid rgba(0,51,153,0.4)', borderRadius: '10px', color: '#6699ff', textDecoration: 'none', fontSize: '0.9rem' }}>
            🇪🇺 AI Tools for EC Staff →
          </Link>
        </div>
        <p className="animate-on-scroll" style={{ color: '#7a7a7a', fontSize: '0.85rem', maxWidth: '600px', margin: '0 auto' }}>
          Information compiled from public sources. Not an official publication. Data as of early 2026.
        </p>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Space Grotesk', sans-serif; background: #0a0a0f; color: #fff; overflow-x: hidden; line-height: 1.6; }
        h2, h3, h4, h5 { color: #fff; }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-on-scroll { opacity: 0; }
        .animate-on-scroll.visible { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale.visible { animation: fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-1 { animation-delay: 0.1s !important; }
        .delay-2 { animation-delay: 0.2s !important; }
        .delay-3 { animation-delay: 0.3s !important; }
        .delay-4 { animation-delay: 0.4s !important; }
        .delay-5 { animation-delay: 0.5s !important; }
        .delay-6 { animation-delay: 0.6s !important; }
        .nav-dot:hover { background: #ffd700 !important; transform: scale(1.3) !important; }
        .ext-link:hover { color: #ffd700 !important; }
        footer a:hover { transform: translateY(-2px) !important; filter: brightness(1.2) !important; }
        @media (max-width: 768px) { .nav-dots { display: none !important; } }
      `}</style>

      {/* Static Analytics Section */}
      <div style={{ padding: '60px 5%', background: 'linear-gradient(180deg, rgba(10,10,15,0.95) 0%, rgba(18,18,26,0.95) 100%)', borderTop: '1px solid rgba(255,215,0,0.2)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#ffd700', marginBottom: '30px', textAlign: 'center' }}>Page Analytics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ffd700', fontFamily: 'JetBrains Mono, monospace' }}>{analytics.totalVisitors}</div>
              <div style={{ fontSize: '0.8rem', color: '#a0a0b0', marginTop: '5px' }}>Total Visitors</div>
            </div>
            {analytics.sections.slice(0, 4).map((section) => {
              const maxTime = Math.max(...analytics.sections.map(s => s.timeSpent), 1);
              const percentage = (section.timeSpent / maxTime) * 100;
              return (
                <div key={section.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#ccc' }}>{section.label}</span>
                    <span style={{ fontSize: '0.75rem', color: '#ffd700', fontFamily: 'JetBrains Mono, monospace' }}>{formatTime(section.timeSpent)}</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${percentage}%`, background: '#ffd700', borderRadius: '3px' }} />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#7a7a7a', marginTop: '5px' }}>{section.visits} visits</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </>
  );
}
