'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function EuropeanAI() {
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
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

      {/* ===== HERO ===== */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(5,5,15,0.92) 0%, rgba(10,10,26,0.92) 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.03, pointerEvents: 'none' }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{ position: 'absolute', fontSize: '4rem', color: '#ffd700', left: `${10 + (i % 6) * 16}%`, top: `${15 + Math.floor(i / 6) * 60}%`, transform: 'rotate(' + (i * 30) + 'deg)' }}>★</div>
          ))}
        </div>
        <div className="section-content animate-scale visible" style={{ textAlign: 'center', maxWidth: '950px' }}>
          <div className="animate-on-scroll visible delay-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '8px 20px', background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '30px', marginBottom: '30px' }}>
            <span style={{ fontSize: '1.2rem' }}>🇪🇺</span>
            <span style={{ fontSize: '0.9rem', color: '#ffd700', letterSpacing: '1px', textTransform: 'uppercase' }}>Europe &middot; UK &middot; Ukraine</span>
          </div>
          <h1 className="animate-on-scroll visible delay-2" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '30px', background: 'linear-gradient(135deg, #003399 0%, #ffd700 50%, #00f5d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            European Leaders<br />in AI
          </h1>
          <p className="animate-on-scroll visible delay-3" style={{ fontSize: '1.25rem', color: '#a0a0b8', maxWidth: '700px', margin: '0 auto 40px' }}>
            From the machines that make AI chips to the models that rival Silicon Valley &mdash; Europe&apos;s AI ecosystem spans lithography monopolies, open-source pioneers, defence shields, and space intelligence.
          </p>
          <div className="animate-on-scroll visible delay-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {['🔬 Chip Infrastructure', '🧠 Foundation Models', '🎙️ Voice & Vision', '🤖 Robotics', '🛡️ Defence AI', '🚀 Space AI'].map((badge, i) => (
              <span key={i} style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.85rem', color: '#a0a0b8' }}>{badge}</span>
            ))}
          </div>
        </div>
        <div className="animate-on-scroll visible delay-5" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: '#a0a0b0', fontSize: '14px', animation: 'bounce 2s infinite' }}>
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* ===== SILICON FOUNDATION: ASML & IMEC ===== */}
      <section id="silicon" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(10,10,15,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🔬</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>The Silicon Foundation</h2>
              <p style={{ color: '#ffd700', fontSize: '1rem', margin: 0 }}>Without European lithography, no AI chip exists</p>
            </div>
          </div>
          <p className="animate-on-scroll" style={{ fontSize: '1.15rem', color: '#a0a0b0', maxWidth: '800px', marginBottom: '40px' }}>
            Every NVIDIA H100, every Apple M4, every AI accelerator on Earth is manufactured using machines built by one company in Veldhoven, Netherlands. Europe doesn&apos;t just participate in the AI revolution &mdash; it enables it at the atomic level.
          </p>

          {/* ASML */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(0,51,153,0.12), rgba(0,51,153,0.03))', borderRadius: '16px', border: '1px solid rgba(0,51,153,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(0,51,153,0.3)', border: '1px solid rgba(0,51,153,0.5)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#4d79ff', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Netherlands 🇳🇱</div>
            <h3 style={{ fontSize: '1.6rem', color: '#4d79ff', marginBottom: '10px' }}>ASML &mdash; The $350B Monopoly</h3>
            <p style={{ fontSize: '1rem', color: '#a0a0b0', marginBottom: '20px', maxWidth: '750px' }}>
              ASML is the <strong style={{ color: '#fff' }}>sole manufacturer of EUV lithography machines</strong> on the planet. Each machine costs ~€350M, weighs 180 tonnes, and uses tin droplets hit by lasers 50,000 times per second to create patterns smaller than a virus. Their new High-NA EUV systems push to 2nm and below.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {[
                { stat: '100%', label: 'EUV market share', color: '#4d79ff' },
                { stat: '€28.3B', label: '2025 revenue', color: '#00f5d4' },
                { stat: '€350M', label: 'Per EUV machine', color: '#ffd700' },
                { stat: '44,000+', label: 'Employees', color: '#f15bb5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.5rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '15px', fontStyle: 'italic' }}>
              ASML became the largest investor in Mistral AI in 2025, directly connecting Europe&apos;s chip infrastructure to its AI model ecosystem.
            </p>
          </div>

          {/* IMEC */}
          <div className="animate-on-scroll" style={{ padding: '30px', background: 'linear-gradient(145deg, rgba(0,245,212,0.08), rgba(0,245,212,0.02))', borderRadius: '16px', border: '1px solid rgba(0,245,212,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(0,245,212,0.15)', border: '1px solid rgba(0,245,212,0.3)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#00f5d4', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Belgium 🇧🇪</div>
            <h3 style={{ fontSize: '1.6rem', color: '#00f5d4', marginBottom: '10px' }}>imec &mdash; The World&apos;s Chip Lab</h3>
            <p style={{ fontSize: '1rem', color: '#a0a0b0', marginBottom: '20px', maxWidth: '750px' }}>
              Based in Leuven, imec is the <strong style={{ color: '#fff' }}>world&apos;s leading semiconductor R&D centre</strong>. Every major chipmaker &mdash; TSMC, Samsung, Intel &mdash; develops next-generation processes here. In February 2026, imec opened a <strong style={{ color: '#fff' }}>€2.5 billion pilot line</strong> to strengthen Europe&apos;s AI chip capabilities.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {[
                { stat: '€2.5B', label: 'New pilot line (2026)', color: '#00f5d4' },
                { stat: '5,500+', label: 'Researchers', color: '#9b5de5' },
                { stat: 'Sub-2nm', label: 'Process R&D', color: '#ffd700' },
                { stat: '80+', label: 'Partner companies', color: '#f15bb5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.5rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Other chip companies */}
          <div className="animate-on-scroll" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Axelera AI', country: '🇳🇱', desc: 'Building ultra-efficient AI accelerator chips for edge computing. A direct European challenger to NVIDIA in edge inference.', color: '#9b5de5' },
              { name: 'Graphcore', country: '🇬🇧', desc: 'Bristol-based IPU (Intelligence Processing Unit) pioneer. Purpose-built AI chips with massive parallelism for training and inference.', color: '#f15bb5' },
              { name: 'SiPearl', country: '🇫🇷', desc: 'Designing the European processor for exascale supercomputers. Their Rhea chip powers the EU\'s sovereign HPC infrastructure.', color: '#ffd700' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${company.color}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ color: company.color, fontSize: '1.1rem', margin: 0 }}>{company.name}</h4>
                  <span style={{ fontSize: '1.2rem' }}>{company.country}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#888', margin: 0 }}>{company.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI MODELS: MISTRAL & HUGGING FACE ===== */}
      <section id="models" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'linear-gradient(180deg, rgba(18,18,26,0.92) 0%, rgba(10,10,15,0.92) 100%)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🧠</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>Foundation Models &amp; Platforms</h2>
              <p style={{ color: '#ff6b35', fontSize: '1rem', margin: 0 }}>Europe&apos;s open-source AI revolution</p>
            </div>
          </div>
          <p className="animate-on-scroll" style={{ fontSize: '1.15rem', color: '#a0a0b0', maxWidth: '800px', marginBottom: '40px' }}>
            While Silicon Valley builds walled gardens, Europe leads the open-source AI movement. French and European companies have created models that rival GPT-4 and platforms that host the world&apos;s AI community.
          </p>

          {/* Mistral AI */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(255,107,53,0.1), rgba(255,107,53,0.02))', borderRadius: '16px', border: '1px solid rgba(255,107,53,0.3)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(255,107,53,0.2)', border: '1px solid rgba(255,107,53,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Paris 🇫🇷</div>
            <h3 style={{ fontSize: '1.6rem', color: '#ff6b35', marginBottom: '10px' }}>Mistral AI &mdash; Europe&apos;s Frontier Lab</h3>
            <p style={{ fontSize: '1rem', color: '#a0a0b0', marginBottom: '20px', maxWidth: '750px' }}>
              Founded in 2023 by ex-Google DeepMind and Meta researchers, Mistral has become <strong style={{ color: '#fff' }}>Europe&apos;s most valuable AI startup</strong>. Their models compete head-to-head with OpenAI and Anthropic, while championing open weights. Le Chat, their consumer product, gained massive traction across Europe.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              {[
                { stat: '€11.7B', label: 'Valuation (2025)', color: '#ff6b35' },
                { stat: '€1B+', label: '2026 revenue target', color: '#ffd700' },
                { stat: '€1.7B', label: 'Total raised', color: '#00f5d4' },
                { stat: 'Mistral Large 2', label: 'Flagship model', color: '#9b5de5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.3rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.78rem', color: '#888', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Open weights', 'Mistral Large', 'Mistral Medium', 'Codestral', 'Le Chat', 'Enterprise API', 'Sovereign AI'].map((tag, i) => (
                <span key={i} style={{ padding: '4px 12px', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: '15px', fontSize: '0.78rem', color: '#ff6b35' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Hugging Face */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(255,213,0,0.08), rgba(255,213,0,0.02))', borderRadius: '16px', border: '1px solid rgba(255,213,0,0.25)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(255,213,0,0.15)', border: '1px solid rgba(255,213,0,0.3)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#ffd700', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Paris 🇫🇷 / New York</div>
            <h3 style={{ fontSize: '1.6rem', color: '#ffd700', marginBottom: '10px' }}>Hugging Face &mdash; The GitHub of AI</h3>
            <p style={{ fontSize: '1rem', color: '#a0a0b0', marginBottom: '20px', maxWidth: '750px' }}>
              Co-founded by French entrepreneur <strong style={{ color: '#fff' }}>Cl&eacute;ment Delangue</strong>, Hugging Face has become the <strong style={{ color: '#fff' }}>world&apos;s largest open-source AI platform</strong>. Over 1 million models, 250,000 datasets, and 300,000 demo applications. It&apos;s where the global AI community builds, shares, and deploys.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
              {[
                { stat: '$4.5B', label: 'Valuation', color: '#ffd700' },
                { stat: '1M+', label: 'Models hosted', color: '#00f5d4' },
                { stat: '250K+', label: 'Datasets', color: '#9b5de5' },
                { stat: '50K+', label: 'Organizations', color: '#f15bb5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.3rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.78rem', color: '#888', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Other model companies */}
          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Aleph Alpha', country: '🇩🇪', desc: 'German sovereign AI lab building enterprise LLMs with full data residency in Europe. Strong focus on government and regulated industries.', color: '#4d79ff' },
              { name: 'Stability AI', country: '🇬🇧', desc: 'London-based creators of Stable Diffusion, the open-source image generation model that democratised AI art worldwide.', color: '#9b5de5' },
              { name: 'DeepL', country: '🇩🇪', desc: 'Cologne-based neural machine translation that consistently outperforms Google Translate. Used by 100,000+ businesses.', color: '#00f5d4' },
              { name: 'Poolside', country: '🇫🇷', desc: 'Paris-based AI coding startup building frontier code generation models. Raised $500M+ to challenge GitHub Copilot.', color: '#f15bb5' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${company.color}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ color: company.color, fontSize: '1.1rem', margin: 0 }}>{company.name}</h4>
                  <span style={{ fontSize: '1.2rem' }}>{company.country}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#888', margin: 0 }}>{company.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VOICE & VISION: ELEVENLABS etc ===== */}
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
            <p style={{ fontSize: '1rem', color: '#a0a0b0', marginBottom: '20px', maxWidth: '750px' }}>
              Founded by <strong style={{ color: '#fff' }}>Mati Staniszewski</strong> (Polish) and <strong style={{ color: '#fff' }}>Piotr D&#261;bkowski</strong> (Polish-Ukrainian), ElevenLabs has become the <strong style={{ color: '#fff' }}>world leader in AI voice synthesis</strong>. Their technology powers dubbing, audiobooks, podcasts, and voice cloning across 29 languages. From a 2023 startup to $11B in under three years.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              {[
                { stat: '$11B', label: 'Valuation (2026)', color: '#f15bb5' },
                { stat: '$500M', label: 'Series D', color: '#ffd700' },
                { stat: '29', label: 'Languages', color: '#00f5d4' },
                { stat: '1M+', label: 'Users', color: '#9b5de5' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.3rem', color: item.color, fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ fontSize: '0.78rem', color: '#888', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Other media AI */}
          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Synthesia', country: '🇬🇧', desc: 'London-based AI video generation platform. Creates realistic AI avatars for enterprise video content. Used by 50,000+ companies including half of the Fortune 100.', color: '#4d79ff', stat: '$2.1B valuation' },
              { name: 'Photoroom', country: '🇫🇷', desc: 'Paris-based AI photo editing platform. Instant background removal and product photography using AI. 150M+ downloads.', color: '#00f5d4', stat: '150M+ downloads' },
              { name: 'Lovable', country: '🇸🇪', desc: 'Swedish AI-powered app builder that generates full-stack applications from natural language descriptions. One of Europe\'s fastest-growing GenAI startups.', color: '#ffd700', stat: 'Fastest-growing GenAI' },
              { name: 'Runway', country: '🇬🇧', desc: 'Co-founded by European researchers, Runway pioneered generative video AI (Gen-2, Gen-3). Used in Hollywood productions and by millions of creators.', color: '#f15bb5', stat: 'AI video pioneer' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${company.color}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ color: company.color, fontSize: '1.1rem', margin: 0 }}>{company.name}</h4>
                  <span style={{ fontSize: '1.2rem' }}>{company.country}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#888', margin: 0, marginBottom: '10px' }}>{company.desc}</p>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: company.color }}>{company.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROBOTICS & AUTOMATION ===== */}
      <section id="robotics" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'linear-gradient(180deg, rgba(18,18,26,0.92) 0%, rgba(10,10,15,0.92) 100%)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🤖</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>Robotics &amp; Automation</h2>
              <p style={{ color: '#00f5d4', fontSize: '1rem', margin: 0 }}>Where European engineering meets AI</p>
            </div>
          </div>
          <p className="animate-on-scroll" style={{ fontSize: '1.1rem', color: '#a0a0b0', maxWidth: '800px', marginBottom: '40px' }}>
            Europe&apos;s industrial heritage gives it a natural advantage in robotics. German precision engineering, Scandinavian automation expertise, and a growing wave of AI-native robotics startups are creating the next generation of intelligent machines.
          </p>

          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {[
              { name: 'ABB Robotics', country: '🇨🇭🇸🇪', desc: 'Swiss-Swedish giant and one of the world\'s "Big Four" robot makers. Leading integrator of AI into industrial automation — from car assembly to logistics. 500,000+ robots installed globally.', color: '#ff6b35' },
              { name: 'KUKA', country: '🇩🇪', desc: 'Augsburg-based industrial robot manufacturer. Pioneers in AI-driven manufacturing automation, collaborative robots, and smart factory solutions. Major supplier to automotive industry.', color: '#ffd700' },
              { name: 'Universal Robots', country: '🇩🇰', desc: 'Danish collaborative robot (cobot) leader. Created the market for lightweight, flexible robots that work alongside humans. Now integrating AI vision and adaptive learning.', color: '#00f5d4' },
              { name: 'Agile Robots', country: '🇩🇪', desc: 'Munich-based startup building AI-powered robots with force-sensing and vision. Combining German robotics engineering with cutting-edge machine learning for dexterous manipulation.', color: '#9b5de5' },
              { name: 'Exotec', country: '🇫🇷', desc: 'French warehouse robotics company whose Skypod system combines AI path-planning with 3D movement. Robots climb 10m-high racks. Valued at $2B+, serving UNIQLO, Decathlon, and Carrefour.', color: '#f15bb5' },
              { name: 'Ocado Technology', country: '🇬🇧', desc: 'British grocery technology company with AI-powered warehouse robots that pick 65,000 items per hour. Their robotic grid system is licensed to supermarkets worldwide.', color: '#4d79ff' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: `1px solid ${company.color}25` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ color: company.color, fontSize: '1.15rem', margin: 0 }}>{company.name}</h4>
                  <span style={{ fontSize: '1.3rem' }}>{company.country}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#888', margin: 0 }}>{company.desc}</p>
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
          <p className="animate-on-scroll" style={{ fontSize: '1.15rem', color: '#a0a0b0', maxWidth: '800px', marginBottom: '20px' }}>
            Russia&apos;s invasion of Ukraine and rising global threats have transformed European defence. AI is now at the core of a new generation of missile shields, autonomous vehicles, collaborative weapons, and battlefield intelligence systems.
          </p>

          {/* Leonardo Michelangelo Dome */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(255,59,48,0.1), rgba(255,59,48,0.02))', borderRadius: '16px', border: '1px solid rgba(255,59,48,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(255,59,48,0.2)', border: '1px solid rgba(255,59,48,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#ff3b30', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Italy 🇮🇹</div>
            <h3 style={{ fontSize: '1.6rem', color: '#ff3b30', marginBottom: '10px' }}>Leonardo &mdash; Michelangelo Dome</h3>
            <p style={{ fontSize: '1rem', color: '#a0a0b0', marginBottom: '20px', maxWidth: '800px' }}>
              Unveiled in November 2025 by CEO Roberto Cingolani, the <strong style={{ color: '#fff' }}>Michelangelo Dome</strong> is an AI-powered, multi-domain integrated defence architecture &mdash; Europe&apos;s answer to Israel&apos;s Iron Dome but vastly more ambitious. It fuses data from satellites, radars, electronic warfare, and cyber systems into a single AI-driven shield.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              {[
                { icon: '🛰️', title: 'Space Layer', desc: 'Satellite constellation for early warning detection and tracking of ballistic/hypersonic threats' },
                { icon: '📡', title: 'Sensor Fusion', desc: 'AI combines radar, EW, cyber, and space data into unified threat picture in real-time' },
                { icon: '⚡', title: 'AI Decision Engine', desc: 'Autonomous threat classification and interceptor assignment in milliseconds' },
                { icon: '🎯', title: 'Multi-domain Response', desc: 'Coordinated land, sea, air, space, and cyber response against simultaneous threats' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '18px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{item.icon}</div>
                  <h5 style={{ fontSize: '0.95rem', color: '#ff3b30', marginBottom: '6px' }}>{item.title}</h5>
                  <p style={{ fontSize: '0.82rem', color: '#888', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
              In March 2026, Leonardo announced testing of Michelangelo Dome in Ukraine &mdash; positioning it as a blueprint for allied nations. The system integrates Leonardo&apos;s existing ASTER/SAMP-T air defence with new AI-enabled C2.
            </p>
          </div>

          {/* Rheinmetall */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(155,93,229,0.08), rgba(155,93,229,0.02))', borderRadius: '16px', border: '1px solid rgba(155,93,229,0.25)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(155,93,229,0.2)', border: '1px solid rgba(155,93,229,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#9b5de5', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Germany 🇩🇪</div>
            <h3 style={{ fontSize: '1.5rem', color: '#9b5de5', marginBottom: '10px' }}>Rheinmetall &mdash; Autonomous Combat Systems</h3>
            <p style={{ fontSize: '1rem', color: '#a0a0b0', marginBottom: '20px', maxWidth: '750px' }}>
              Germany&apos;s largest defence company has established <strong style={{ color: '#fff' }}>Centres of Excellence for Autonomous Mobility</strong>. Their AI systems span unmanned ground vehicles, autonomous logistics, and the CT-025 crewless turret. In June 2025, they partnered with <strong style={{ color: '#fff' }}>Anduril</strong> to build autonomous military drones for European forces.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Autonomous ground vehicles', 'AI-enabled fire control', 'Crewless turret (CT-025)', 'Anduril drone partnership', 'Mission Master UGV', 'Skyranger air defence'].map((tag, i) => (
                <span key={i} style={{ padding: '4px 12px', background: 'rgba(155,93,229,0.1)', border: '1px solid rgba(155,93,229,0.2)', borderRadius: '15px', fontSize: '0.78rem', color: '#9b5de5' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Other defence */}
          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'MBDA', countries: '🇫🇷🇬🇧🇮🇹🇩🇪', desc: 'Europe\'s missile champion. Their Orchestrike AI system enables SPEAR cruise missiles to autonomously coordinate attacks, share targeting data mid-flight, and adapt to threats without human intervention. Doubling Aster missile production in 2026.', color: '#ff3b30' },
              { name: 'Dassault + Thales', countries: '🇫🇷', desc: 'Strategic AI alliance for air combat. Developing sovereign AI for the Rafale F5 fighter and autonomous combat drones. Their "controlled defence AI" partnership aims to create crewed-uncrewed teaming for next-gen air superiority.', color: '#4d79ff' },
              { name: 'BAE Systems', countries: '🇬🇧', desc: 'UK\'s largest defence company. Developing AI for the Tempest/GCAP 6th-gen fighter, autonomous submarine systems, and cyber defence. Their Digital Intelligence division specialises in AI-powered signals intelligence.', color: '#00f5d4' },
              { name: 'Saab', countries: '🇸🇪', desc: 'Swedish defence innovator. AI-powered electronic warfare, the Gripen\'s intelligent pilot assistance, and autonomous underwater vehicles. Their GlobalEye surveillance aircraft uses AI for threat detection.', color: '#ffd700' },
              { name: 'Oxford Dynamics', countries: '🇬🇧', desc: 'UK AI defence startup building autonomous systems for decision dominance. Their AVIS engine powers ground and aerial platforms designed to "outsmart, outpace, and outmove" threats.', color: '#f15bb5' },
              { name: 'Helsing', countries: '🇩🇪🇬🇧🇫🇷', desc: 'Europe\'s most-funded AI defence startup ($500M+). Building battlefield AI software for real-time sensor fusion and autonomous targeting. Active in Ukraine, operational with French and German forces.', color: '#ff6b35' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: `1px solid ${company.color}25` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ color: company.color, fontSize: '1.1rem', margin: 0 }}>{company.name}</h4>
                  <span style={{ fontSize: '1rem', letterSpacing: '2px' }}>{company.countries}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#888', margin: 0 }}>{company.desc}</p>
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
          <p className="animate-on-scroll" style={{ fontSize: '1.15rem', color: '#a0a0b0', maxWidth: '800px', marginBottom: '20px' }}>
            Europe is merging AI with its world-class space heritage. From AI-powered Earth observation to autonomous satellite operations, the continent is building sovereign space intelligence capabilities. A landmark merger of Airbus, Thales, and Leonardo space divisions is creating a unified European space champion.
          </p>

          {/* BROMO Merger */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '30px', background: 'linear-gradient(145deg, rgba(77,121,255,0.1), rgba(77,121,255,0.02))', borderRadius: '16px', border: '1px solid rgba(77,121,255,0.3)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(77,121,255,0.2)', border: '1px solid rgba(77,121,255,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#4d79ff', textTransform: 'uppercase', letterSpacing: '1.5px' }}>🇫🇷🇮🇹🇩🇪 Joint Venture</div>
            <h3 style={{ fontSize: '1.5rem', color: '#4d79ff', marginBottom: '10px' }}>BROMO &mdash; Europe&apos;s Space Super-Company</h3>
            <p style={{ fontSize: '1rem', color: '#a0a0b0', marginBottom: '20px', maxWidth: '750px' }}>
              In October 2025, <strong style={{ color: '#fff' }}>Airbus, Thales, and Leonardo</strong> signed a landmark MoU to merge their space divisions into a single European champion &mdash; codenamed <strong style={{ color: '#fff' }}>BROMO</strong>. This creates a company capable of competing with SpaceX and building sovereign European satellite constellations with AI-powered capabilities.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Airbus Defence & Space', 'Thales Alenia Space', 'Leonardo Space', 'Sovereign constellations', 'AI-enabled satellites', 'Earth observation'].map((tag, i) => (
                <span key={i} style={{ padding: '5px 14px', background: 'rgba(77,121,255,0.1)', border: '1px solid rgba(77,121,255,0.2)', borderRadius: '15px', fontSize: '0.8rem', color: '#4d79ff' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* ESA AI */}
          <div className="animate-on-scroll" style={{ marginBottom: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'ESA Phi-Sat Programme', desc: 'The European Space Agency\'s pioneering on-board AI processing satellite programme. Phi-Sat-2 uses AI chips to analyse Earth observation data in orbit — filtering clouds and detecting changes before downlinking. Thales Alenia Space\'s PhiFireAI and IRMA projects enable real-time wildfire detection and atmospheric monitoring from space.', color: '#00f5d4' },
              { name: 'ESA AI for Earth Observation', desc: 'ESA\'s AI challenge programme advances satellite-based disaster mapping. In 2025, four international teams were recognised for breakthrough work using AI to detect earthquake damage from space — reducing response times from days to hours.', color: '#9b5de5' },
              { name: 'Copernicus + AI', desc: 'The EU\'s flagship Earth observation programme generates 250TB of data daily. AI is increasingly used to extract insights — from deforestation tracking to urban heat mapping. Six Sentinel satellite families provide the world\'s most comprehensive environmental monitoring.', color: '#ffd700' },
            ].map((project, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: `1px solid ${project.color}25` }}>
                <h4 style={{ color: project.color, fontSize: '1.1rem', marginBottom: '12px' }}>{project.name}</h4>
                <p style={{ fontSize: '0.88rem', color: '#888', margin: 0 }}>{project.desc}</p>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll" style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#ff6b35', marginBottom: '15px' }}>Space-Defence Convergence</h4>
            <p style={{ fontSize: '0.95rem', color: '#a0a0b0', margin: 0 }}>
              Leonardo&apos;s Michelangelo Dome explicitly integrates a space layer for missile tracking. The BROMO merger includes defence satellite capabilities. Europe is building an AI-powered sovereign space surveillance network that connects civilian Earth observation with military threat detection &mdash; creating a dual-use infrastructure that strengthens both scientific research and continental security.
            </p>
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
              <p style={{ color: '#ffd700', fontSize: '1rem', margin: 0 }}>The leaders, researchers, and founders shaping the continent&apos;s AI future</p>
            </div>
          </div>

          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginTop: '30px' }}>
            {[
              { name: 'Arthur Mensch', role: 'CEO & Co-founder, Mistral AI', origin: '🇫🇷 France', desc: 'Ex-Google DeepMind researcher. Built Europe\'s most valuable AI company in under 2 years. Champions open-weight models and European AI sovereignty.', color: '#ff6b35' },
              { name: 'Clément Delangue', role: 'CEO & Co-founder, Hugging Face', origin: '🇫🇷 France', desc: 'Built the "GitHub of AI" — the world\'s largest open-source AI platform. Advocates for collaborative, transparent AI development.', color: '#ffd700' },
              { name: 'Yann LeCun', role: 'Chief AI Scientist, Meta', origin: '🇫🇷 France', desc: 'Turing Award winner (2018). Born in Paris, pioneer of convolutional neural networks. Outspoken advocate for open-source AI and opponent of AI doomerism.', color: '#4d79ff' },
              { name: 'Demis Hassabis', role: 'CEO, Google DeepMind', origin: '🇬🇧 UK', desc: 'Nobel Prize winner (Chemistry, 2024) for AlphaFold. Built DeepMind from a London startup into the world\'s most prestigious AI lab. Chess prodigy turned AI visionary.', color: '#00f5d4' },
              { name: 'Mati Staniszewski', role: 'CEO & Co-founder, ElevenLabs', origin: '🇵🇱 Poland', desc: 'Built the world\'s leading voice AI company from London. ElevenLabs reached $11B valuation in under 3 years — making it one of the fastest-growing AI startups ever.', color: '#f15bb5' },
              { name: 'Roberto Cingolani', role: 'CEO, Leonardo', origin: '🇮🇹 Italy', desc: 'Former Italian Minister of Ecological Transition. Physicist turned defence CEO. Architect of the Michelangelo Dome — Europe\'s AI-powered missile shield.', color: '#ff3b30' },
              { name: 'Cédric O', role: 'Co-founder, Mistral AI', origin: '🇫🇷 France', desc: 'Former French Secretary of State for Digital. Bridges AI policy and entrepreneurship. Key figure in France\'s AI sovereignty push.', color: '#9b5de5' },
              { name: 'Jürgen Schmidhuber', role: 'AI Pioneer', origin: '🇩🇪🇨🇭 Germany/Switzerland', desc: 'Created LSTM networks (1997) that powered speech recognition and translation for decades. Pioneer of neural network research at IDSIA in Switzerland.', color: '#ff6b35' },
              { name: 'Guillaume Lample', role: 'Co-founder & Chief Scientist, Mistral AI', origin: '🇫🇷 France', desc: 'Ex-Meta FAIR researcher. Co-developed key techniques behind modern LLMs. Leads Mistral\'s model development and research direction.', color: '#ffd700' },
              { name: 'Gesa Miczaika', role: 'Investor & AI Advocate', origin: '🇩🇪 Germany', desc: 'Co-founder of Auxxo, Europe\'s first female-founded VC. Funds AI startups across Europe and champions diversity in the European AI ecosystem.', color: '#00f5d4' },
              { name: 'Jarosław Kuźniar', role: 'Founder, AI Poland', origin: '🇵🇱 Poland', desc: 'Leading voice of Eastern Europe\'s AI ecosystem. Connects Polish and Ukrainian AI talent with Western European markets and investment.', color: '#4d79ff' },
              { name: 'Luc Julia', role: 'CTO, Renault', origin: '🇫🇷 France', desc: 'Co-creator of Apple\'s Siri. Now leading AI integration at Renault — bringing conversational AI, autonomous driving, and predictive maintenance to European automotive.', color: '#f15bb5' },
            ].map((person, i) => (
              <div key={i} style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '25px', border: `1px solid ${person.color}20`, transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: person.color, marginBottom: '4px' }}>{person.name}</h4>
                    <p style={{ fontSize: '0.82rem', color: '#a0a0b0', margin: 0, fontWeight: 500 }}>{person.role}</p>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#666', whiteSpace: 'nowrap' }}>{person.origin}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#888', margin: '12px 0 0' }}>{person.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UKRAINE: THE AI BATTLEFIELD ===== */}
      <section id="ukraine" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'linear-gradient(180deg, rgba(18,18,26,0.92) 0%, rgba(10,10,15,0.92) 100%)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🇺🇦</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>Ukraine &mdash; The AI Forge</h2>
              <p style={{ color: '#0057b7', fontSize: '1rem', margin: 0 }}>Where AI meets the battlefield &mdash; and beyond</p>
            </div>
          </div>
          <p className="animate-on-scroll" style={{ fontSize: '1.15rem', color: '#a0a0b0', maxWidth: '800px', marginBottom: '20px' }}>
            Ukraine&apos;s war has created the world&apos;s most advanced real-world AI testing ground. From AI-guided drones to battlefield decision systems, Ukrainian tech companies are innovating at a pace no peacetime R&amp;D lab could match. The country&apos;s tech talent is also powering civilian AI breakthroughs.
          </p>

          {/* Drone revolution */}
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
                  <div style={{ fontSize: '0.78rem', color: '#888', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.95rem', color: '#a0a0b0', margin: 0 }}>
              Ukraine aims to build <strong style={{ color: '#fff' }}>7 million drones in 2026</strong> &mdash; 70 times more than the US. Manufacturing has doubled every year since 2023. In March 2026, Ukraine became the first country to <strong style={{ color: '#fff' }}>open battlefield AI data to allies</strong>, creating an unprecedented resource for training defence AI systems.
            </p>
          </div>

          {/* Ukrainian AI companies */}
          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            {[
              { name: 'Deus Robotics', desc: 'Ukrainian warehouse robotics company (founded 2018, Palo Alto HQ). Building AI-powered autonomous warehouse robots that compete globally.', color: '#0057b7' },
              { name: 'AI Mariner', desc: 'Ukrainian startup turning boats into autonomous marine drones. Their modular kit adds AI navigation and autonomy to existing vessels — dual-use civilian/defence.', color: '#ffd700' },
              { name: 'ElevenLabs (roots)', desc: 'Co-founder Piotr Dąbkowski has Ukrainian heritage. The company embodies the Ukrainian-Polish tech talent pipeline that\'s producing world-class AI.', color: '#f15bb5' },
              { name: 'Defence Tech Ecosystem', desc: '1,500+ Ukrainian defence tech startups developing AI-powered targeting, autonomous navigation, electronic warfare, and drone swarm coordination.', color: '#00f5d4' },
            ].map((company, i) => (
              <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${company.color}30` }}>
                <h4 style={{ color: company.color, fontSize: '1.1rem', marginBottom: '10px' }}>{company.name}</h4>
                <p style={{ fontSize: '0.88rem', color: '#888', margin: 0 }}>{company.desc}</p>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll" style={{ padding: '25px', background: 'linear-gradient(145deg, rgba(0,87,183,0.1), rgba(255,215,0,0.05))', borderRadius: '16px', border: '1px solid rgba(0,87,183,0.2)' }}>
            <p style={{ fontSize: '1.1rem', color: '#fff', fontStyle: 'italic', margin: 0, textAlign: 'center' }}>
              &ldquo;Ukraine is producing more battlefield AI innovation in months than most countries produce in decades. This is the future of defence technology.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ===== FUTURE ===== */}
      <section id="future" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(10,10,15,0.92)', textAlign: 'center' }}>
        <div className="section-content" style={{ maxWidth: '900px', width: '100%' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>Europe&apos;s AI Future</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', margin: '0 auto 40px' }}>
            Europe will never be another Silicon Valley &mdash; and it shouldn&apos;t try to be. Its strengths are different: sovereign infrastructure, regulatory leadership, industrial robotics heritage, defence integration, and the open-source ethos. The question isn&apos;t whether Europe matters in AI. It&apos;s how it shapes AI&apos;s future.
          </p>

          <div className="animate-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', textAlign: 'left', marginBottom: '50px' }}>
            {[
              { icon: '🔬', title: 'Silicon Sovereignty', desc: 'ASML and imec ensure no AI chip is made without European technology. The EU Chips Act adds €43B in investment.', color: '#4d79ff' },
              { icon: '🧠', title: 'Open-Source Leadership', desc: 'Mistral, Hugging Face, and Stability AI lead the global open-source AI movement — an antidote to Big Tech concentration.', color: '#ff6b35' },
              { icon: '🛡️', title: 'Defence Transformation', desc: 'Leonardo\'s Michelangelo Dome, MBDA\'s smart missiles, and Helsing\'s battlefield AI are rebuilding European security.', color: '#ff3b30' },
              { icon: '📋', title: 'Regulatory Pioneer', desc: 'The EU AI Act is the world\'s first comprehensive AI regulation. Europe writes the rules that others eventually follow.', color: '#ffd700' },
              { icon: '🚀', title: 'Space Intelligence', desc: 'BROMO creates a European space champion. AI-powered satellites monitor climate, security, and disasters in real-time.', color: '#00f5d4' },
              { icon: '🤖', title: 'Industrial AI', desc: 'ABB, KUKA, and a wave of startups combine European engineering excellence with AI to lead in robotics and manufacturing.', color: '#9b5de5' },
            ].map((item, i) => (
              <div key={i} className="animate-on-scroll" style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: `1px solid ${item.color}20` }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '1.1rem', color: item.color, marginBottom: '10px' }}>{item.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', margin: 0 }}>{item.desc}</p>
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
        <p className="animate-on-scroll" style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0, marginBottom: '20px' }}>European Leaders in AI &middot; A guide to Europe&apos;s AI ecosystem</p>

        <div className="animate-on-scroll" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '600px', margin: '0 auto 30px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, rgba(0,245,212,0.15) 0%, rgba(155,93,229,0.1) 100%)', border: '1px solid rgba(0,245,212,0.3)', borderRadius: '10px', color: '#00f5d4', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← LLM History: From Translation Machines to Thinking Sand
          </Link>
          <Link href="/ec-ai-tools" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, rgba(0,51,153,0.3) 0%, rgba(255,204,0,0.1) 100%)', border: '1px solid rgba(0,51,153,0.4)', borderRadius: '10px', color: '#6699ff', textDecoration: 'none', fontSize: '0.9rem' }}>
            🇪🇺 AI Tools for EC Staff →
          </Link>
        </div>

        <p className="animate-on-scroll" style={{ color: '#555', fontSize: '0.85rem', maxWidth: '600px', margin: '0 auto' }}>
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
        footer a:hover { transform: translateY(-2px) !important; filter: brightness(1.2) !important; }
        @media (max-width: 768px) { .nav-dots { display: none !important; } }
      `}</style>
    </>
  );
}
