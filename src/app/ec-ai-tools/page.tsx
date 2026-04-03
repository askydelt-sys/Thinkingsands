'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ECAITools() {
  useEffect(() => {
    // Progress bar on scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      const bar = document.getElementById('progressBar');
      if (bar) bar.style.width = scrollPercent + '%';
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll animation observer
    const els = document.querySelectorAll('.animate-on-scroll, .animate-scale');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const siblings = Array.from(el.parentElement?.children || []).filter(child =>
            child.classList.contains('animate-on-scroll') || child.classList.contains('animate-scale')
          );
          const si = siblings.indexOf(el);
          el.classList.remove('delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5');
          if (si < 5) el.classList.add('delay-' + (si + 1));
          el.classList.add('visible');
          obs.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
    els.forEach(el => obs.observe(el));

    // Nav dots section tracking
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
              dot.style.background = '#FFCC00';
              dot.style.width = '14px';
              dot.style.height = '14px';
              dot.style.boxShadow = '0 0 10px #FFCC0080';
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
      <div className="progress-bar" id="progressBar" style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'linear-gradient(135deg, #003399 0%, #FFCC00 100%)', zIndex: 1000, transition: 'width 0.1s ease', width: '0%' }} />

      {/* NAV DOTS */}
      <nav className="nav-dots" style={{ position: 'fixed', right: '30px', top: '50%', transform: 'translateY(-50%)', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {['hero', 'gpt-ec', 'language-tools', 'speech', 'research', 'ai-act', 'access', 'tips'].map((id, i) => (
          <div key={id} className="nav-dot" data-section={id} data-label={['Overview', 'GPT@EC', 'Language Tools', 'Speech & Text', 'Research', 'AI Act', 'Access', 'Tips'][i]} style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative' }} />
        ))}
      </nav>

      {/* BACK LINK */}
      <Link href="/" style={{ position: 'fixed', top: '20px', left: '30px', zIndex: 1000, display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(0,51,153,0.3)', border: '1px solid rgba(0,51,153,0.5)', borderRadius: '8px', color: '#6699ff', textDecoration: 'none', fontSize: '0.85rem', backdropFilter: 'blur(10px)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        LLM History
      </Link>

      {/* HERO */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(5,5,15,0.92) 0%, rgba(10,10,26,0.92) 100%)' }}>
        {/* EU flag stars decoration */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.04, pointerEvents: 'none' }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{ position: 'absolute', fontSize: '3rem', left: `${10 + (i % 6) * 16}%`, top: `${15 + Math.floor(i / 6) * 60}%`, transform: 'rotate(' + (i * 30) + 'deg)' }}>★</div>
          ))}
        </div>

        <div className="section-content animate-scale visible" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <div className="animate-on-scroll visible delay-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '8px 20px', background: 'rgba(0,51,153,0.2)', border: '1px solid rgba(0,51,153,0.4)', borderRadius: '30px', marginBottom: '30px' }}>
            <span style={{ fontSize: '1.2rem' }}>🇪🇺</span>
            <span style={{ fontSize: '0.9rem', color: '#6699ff', letterSpacing: '1px', textTransform: 'uppercase' }}>European Commission · DIGIT</span>
          </div>
          <h1 className="animate-on-scroll visible delay-2" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '30px', background: 'linear-gradient(135deg, #4d79ff 0%, #FFCC00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            AI Tools for<br />Commission Staff
          </h1>
          <p className="animate-on-scroll visible delay-3" style={{ fontSize: '1.25rem', color: '#a0a0b8', maxWidth: '650px', margin: '0 auto 40px' }}>
            Your practical guide to the European Commission&apos;s growing suite of secure, EU-built AI tools — from ChatGPT-style assistants to document intelligence and speech transcription.
          </p>
          <div className="animate-on-scroll visible delay-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {['🔒 Secure & EU-hosted', '🌍 All 24 EU languages', '✅ GDPR compliant', '🆓 Free for EC staff'].map((badge, i) => (
              <span key={i} style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.85rem', color: '#a0a0b8' }}>{badge}</span>
            ))}
          </div>
        </div>
        <div className="animate-on-scroll visible delay-5" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: '#a0a0b0', fontSize: '14px', animation: 'bounce 2s infinite' }}>
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFCC00" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* GPT@EC */}
      <section id="gpt-ec" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(10,10,15,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.5rem' }}>🤖</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>GPT@EC</h2>
              <p style={{ color: '#4d79ff', fontSize: '1rem', margin: 0 }}>The Commission&apos;s secure ChatGPT — developed by DIGIT · launched October 2024</p>
            </div>
          </div>

          <p className="animate-on-scroll" style={{ fontSize: '1.15rem', color: '#a0a0b0', maxWidth: '750px', marginBottom: '40px' }}>
            GPT@EC is the Commission&apos;s own large language model assistant. Unlike using external tools like ChatGPT or Copilot, your prompts and documents <strong style={{ color: '#fff' }}>never leave Commission servers</strong>. Built on top of GPT@JRC (the Joint Research Centre&apos;s earlier pilot), it supports multiple LLMs — each suited to different sensitivity levels.
          </p>

          {/* SNC CALLOUT */}
          <div className="animate-on-scroll" style={{ marginBottom: '35px', padding: '25px 30px', background: 'linear-gradient(135deg, rgba(255,59,48,0.08) 0%, rgba(255,204,0,0.06) 100%)', borderRadius: '16px', border: '1px solid rgba(255,59,48,0.25)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '12px', right: '15px', background: 'rgba(255,59,48,0.2)', border: '1px solid rgba(255,59,48,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#ff3b30', textTransform: 'uppercase', letterSpacing: '1.5px' }}>SNC compatible</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>🔐</span>
              <h4 style={{ color: '#ff3b30', margin: 0, fontSize: '1.1rem' }}>Works with Sensitive Non-Classified (SNC) documents</h4>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#a0a0b0', margin: '0 0 15px', maxWidth: '700px' }}>
              GPT@EC is the <strong style={{ color: '#fff' }}>only EC AI tool approved for processing SNC-marked information</strong>. It is hosted on the Commission&apos;s own data centre and offers multiple LLMs matched to different sensitivity levels. Staff can select the appropriate model depending on whether they are working with public, Commission-internal or SNC documents.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {[
                { level: 'Public', color: '#4dff91', desc: 'Any LLM available — full model selection' },
                { level: 'Commission Use', color: '#FFCC00', desc: 'Internal LLMs hosted on EC servers — data never shared externally' },
                { level: 'SNC', color: '#ff3b30', desc: 'Restricted models on isolated infrastructure — highest internal security tier' },
              ].map((tier, i) => (
                <div key={i} style={{ padding: '12px 15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', borderLeft: `3px solid ${tier.color}` }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: tier.color, marginBottom: '4px', fontWeight: 600 }}>{tier.level}</div>
                  <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>{tier.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.78rem', color: '#666', marginTop: '12px', fontStyle: 'italic', margin: '12px 0 0' }}>
              Note: External tools (ChatGPT, Copilot, Gemini, etc.) must <strong style={{ color: '#999' }}>never</strong> be used with any non-public Commission information — including SNC. The EC&apos;s 2023 Guidelines for Staff on Generative AI explicitly prohibit this.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' }}>
            {[
              { icon: '✍️', title: 'Draft & Edit', desc: 'Generate first drafts of emails, notes, speeches, policy briefs and internal communications. Iterate with follow-up prompts to refine tone or structure.', color: '#4d79ff' },
              { icon: '📄', title: 'Summarise Documents', desc: 'Paste or upload long reports and get concise executive summaries. Ideal for digesting consultation responses, legal texts, or meeting notes before a meeting.', color: '#FFCC00' },
              { icon: '💻', title: 'Code & Data', desc: 'Write or debug Python, SQL, VBA macros. Build Excel formulas, automate repetitive tasks, or generate scripts for data processing pipelines.', color: '#4d79ff' },
              { icon: '🔍', title: 'Research & Analysis', desc: 'Ask questions, compare options, or request structured analyses. Useful for preparing Q&As, background notes, or comparative tables for policy positions.', color: '#FFCC00' },
            ].map((card, i) => (
              <div key={i} className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))', borderRadius: '16px', padding: '28px', border: `1px solid ${card.color}30` }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{card.icon}</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', color: card.color }}>{card.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#a0a0b0', margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Example prompt */}
          <div className="animate-on-scroll" style={{ background: '#0d0d12', border: '1px solid rgba(77,121,255,0.3)', borderRadius: '12px', padding: '25px', maxWidth: '700px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca40' }}></div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#666', marginLeft: '8px' }}>GPT@EC · Example prompt</span>
            </div>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: '#FFCC00', marginBottom: '10px' }}>You:</p>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: '#a0a0b0', marginBottom: '15px' }}>&quot;Summarise the key obligations for operators of high-risk AI systems under the EU AI Act in 5 bullet points, in plain language suitable for a non-legal audience.&quot;</p>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: '#4d79ff', marginBottom: '10px' }}>GPT@EC:</p>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#888', lineHeight: 1.7 }}>
              • Conduct a conformity assessment before deployment...<br />
              • Register the AI system in the EU database...<br />
              • Maintain technical documentation and logs...<br />
              • Ensure human oversight mechanisms are in place...<br />
              • Report serious incidents to national authorities...
            </div>
          </div>

          <div style={{ marginTop: '25px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <a href="https://commission.europa.eu/news-and-media/news/commission-launches-new-general-purpose-ai-tool-gptec-2024-10-22_en" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(77,121,255,0.15)', border: '1px solid rgba(77,121,255,0.3)', borderRadius: '8px', color: '#4d79ff', textDecoration: 'none', fontSize: '0.9rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              Official Announcement
            </a>
          </div>
        </div>
      </section>

      {/* LANGUAGE TOOLS */}
      <section id="language-tools" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(18,18,26,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <span style={{ fontSize: '2.5rem' }}>🌐</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600 }}>Language & Document Tools</h2>
              <p style={{ color: '#FFCC00', fontSize: '1rem', margin: 0 }}>language-tools.ec.europa.eu · DG Translation · free with EU Login</p>
            </div>
          </div>
          <p className="animate-on-scroll" style={{ fontSize: '1.1rem', color: '#a0a0b0', maxWidth: '750px', marginBottom: '40px' }}>
            The EU&apos;s multilingual AI toolkit — built on decades of professional translation expertise. All tools work in all 24 EU official languages and several others. Your data is never used to train commercial models.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              {
                name: 'eBriefing',
                icon: '📋',
                color: '#4d79ff',
                url: 'https://language-tools.ec.europa.eu/EBriefingServices/Briefing',
                tagline: 'Background documents from multiple sources',
                desc: 'Upload up to 10 source files. eBriefing generates a structured background document with main messages, context and Q&A — in official or general style. Perfect for meeting prep, cabinet briefings, or policy overviews.',
                example: 'Upload 5 stakeholder position papers → get a 2-page briefing with key asks and diverging positions, ready to hand to a Commissioner before a trilogue.',
              },
              {
                name: 'eTranslation',
                icon: '🔄',
                color: '#FFCC00',
                url: 'https://language-tools.ec.europa.eu/ETranslationServices/Snippet',
                tagline: 'Neural machine translation in all EU languages',
                desc: 'The EU institutions\' official translation tool. Translate documents, websites and texts across all EU official languages. Multiple styles including EU formal register. Connect via API or use via the web portal.',
                example: 'Translate a Council Presidency note from French to English in EU formal register before circulating it to your DG.',
              },
              {
                name: 'eSummary',
                icon: '✂️',
                color: '#ff6b6b',
                url: 'https://language-tools.ec.europa.eu/SummarizationServices/Summarization',
                tagline: 'Instant document summaries, any length',
                desc: 'Upload any document and get a concise summary. Choose from short (1 page) to longer versions. Works across all EU official languages. Ideal for quickly absorbing long Commission Communications or EPRS studies.',
                example: 'Summarise a 120-page impact assessment into a 1-page executive brief before an interservice consultation deadline.',
              },
              {
                name: 'eReply',
                icon: '↩️',
                color: '#4d79ff',
                url: 'https://language-tools.ec.europa.eu/EBriefingServices/eReply',
                tagline: 'Drafts formal replies to complex submissions',
                desc: 'Upload a complex submission (consultation response, stakeholder letter, Parliament question) and eReply generates a suggested formal response plus a full analysis of the original document.',
                example: 'Receive 200+ consultation responses → use eReply to draft acknowledgements and identify recurring themes for the synthesis report.',
              },
              {
                name: 'eReporting',
                icon: '📊',
                color: '#FFCC00',
                url: 'https://language-tools.ec.europa.eu/EBriefingServices/eReporting',
                tagline: 'Activity reports & reporting obligations mapping',
                desc: 'NEW (February 2026): Upload legal acts or policy documents and get an automatic identification of reporting obligations — roles, responsibilities, mandatory vs optional requirements — plus a draft activity report.',
                example: 'Feed a new Regulation text → get a structured list of all reporting deadlines, responsible entities and output formats your DG must comply with.',
              },
              {
                name: 'WebText',
                icon: '🌐',
                color: '#ff6b6b',
                url: 'https://language-tools.ec.europa.eu/EBriefingServices/WebText',
                tagline: 'Optimise content for the web',
                desc: 'Paste any text and get a web-optimised version: plain language, clear headings, bullet points and scannable structure. Available in all EU official languages.',
                example: 'Rewrite a dense policy background section into a citizen-friendly web article for your DG\'s Europa page.',
              },
              {
                name: 'Accessible Text',
                icon: '♿',
                color: '#4d79ff',
                url: 'https://language-tools.ec.europa.eu/EBriefingServices/AccessibleText',
                tagline: 'Easy-to-read versions of any document',
                desc: 'Rewrites complex texts using "easy-to-read" guidelines for accessibility. Available in English, French and German. Useful for communications aimed at all citizens, including those with cognitive disabilities.',
                example: 'Convert a Commission Decision summary into an easy-to-read leaflet for public outreach.',
              },
              {
                name: 'Anonymisation',
                icon: '🔏',
                color: '#FFCC00',
                url: 'https://language-tools.ec.europa.eu/NLPServices/NLP',
                tagline: 'Automatic personal data redaction',
                desc: 'Automatically detects and replaces or redacts names, addresses, organisations and other personal data from documents. Essential for GDPR compliance when publishing or sharing materials.',
                example: 'Anonymise interview transcripts from stakeholder consultations before including them in a published study.',
              },
              {
                name: 'Multilingual Post',
                icon: '📣',
                color: '#ff6b6b',
                url: 'https://language-tools.ec.europa.eu/SocialMediaTranslator/Snippets',
                tagline: 'Social media content in all EU languages at once',
                desc: 'Generate short post translations in multiple languages simultaneously. Ideal for rapid, consistent social media campaigns across all EU member states.',
                example: 'Create a launch announcement in English and get all 24 EU language versions in one click for your DG\'s X/LinkedIn campaign.',
              },
            ].map((tool, i) => (
              <div key={i} className="animate-on-scroll" style={{ display: 'flex', gap: '25px', padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: `1px solid ${tool.color}20`, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flexShrink: 0, width: '50px', height: '50px', borderRadius: '12px', background: `${tool.color}15`, border: `1px solid ${tool.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{tool.icon}</div>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <h4 style={{ fontSize: '1.15rem', color: tool.color, margin: 0 }}>{tool.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>— {tool.tagline}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#a0a0b0', margin: '0 0 10px' }}>{tool.desc}</p>
                  <div style={{ padding: '10px 15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', borderLeft: `3px solid ${tool.color}` }}>
                    <span style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Example use</span>
                    <p style={{ fontSize: '0.85rem', color: '#888', margin: 0, fontStyle: 'italic' }}>{tool.example}</p>
                  </div>
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, padding: '8px 16px', background: `${tool.color}20`, border: `1px solid ${tool.color}40`, borderRadius: '8px', color: tool.color, textDecoration: 'none', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                  Open tool →
                </a>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll" style={{ marginTop: '30px' }}>
            <a href="https://language-tools.ec.europa.eu/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'rgba(255,204,0,0.15)', border: '1px solid rgba(255,204,0,0.3)', borderRadius: '8px', color: '#FFCC00', textDecoration: 'none', fontSize: '0.9rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              Language Tools Portal — language-tools.ec.europa.eu
            </a>
          </div>
        </div>
      </section>

      {/* SPEECH TO TEXT */}
      <section id="speech" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(10,10,15,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '1100px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <span style={{ fontSize: '2.5rem' }}>🎙️</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600 }}>Speech-to-Text</h2>
              <p style={{ color: '#ff6b6b', fontSize: '1rem', margin: 0 }}>Transcription & subtitles for meetings, workshops and conferences</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            <div className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(255,107,107,0.08), rgba(255,107,107,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,107,107,0.2)' }}>
              <h4 style={{ color: '#ff6b6b', marginBottom: '15px', fontSize: '1.1rem' }}>What it does</h4>
              <ul style={{ color: '#a0a0b0', fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
                <li>Upload audio or video recordings</li>
                <li>Get full text transcriptions</li>
                <li>Generate subtitle files (.srt)</li>
                <li>All EU official languages + several others</li>
                <li>Speaker diarisation (who said what)</li>
              </ul>
            </div>
            <div className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(77,121,255,0.08), rgba(77,121,255,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(77,121,255,0.2)' }}>
              <h4 style={{ color: '#4d79ff', marginBottom: '15px', fontSize: '1.1rem' }}>Practical use cases</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Record a stakeholder meeting → get minutes draft via transcription + eSummary',
                  'Transcribe a Commissioner speech for the press release',
                  'Convert a recorded webinar into searchable text for the intranet',
                  'Generate subtitles for accessibility compliance on videos',
                ].map((uc, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#4d79ff', flexShrink: 0, marginTop: '2px' }}>▸</span>
                    <span style={{ fontSize: '0.9rem', color: '#a0a0b0' }}>{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workflow example */}
          <div className="animate-on-scroll" style={{ marginTop: '30px', padding: '25px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h4 style={{ fontSize: '1rem', color: '#FFCC00', marginBottom: '15px' }}>⚡ Power workflow: Meeting → Minutes in 10 minutes</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}>
              {[
                { text: 'Record meeting', color: '#4d79ff' },
                { text: '→', color: '#444' },
                { text: 'Speech-to-Text', color: '#ff6b6b' },
                { text: '→', color: '#444' },
                { text: 'eSummary', color: '#FFCC00' },
                { text: '→', color: '#444' },
                { text: 'GPT@EC to format', color: '#4d79ff' },
                { text: '→', color: '#444' },
                { text: 'Final minutes', color: '#4dff91' },
              ].map((item, i) => (
                <span key={i} style={{ color: item.color, padding: '5px 10px', background: `${item.color}15`, borderRadius: '6px' }}>{item.text}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <a href="https://language-tools.ec.europa.eu/SpeechServices/Transcription" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '8px', color: '#ff6b6b', textDecoration: 'none', fontSize: '0.9rem' }}>
              Open Speech-to-Text →
            </a>
          </div>
        </div>
      </section>

      {/* RESEARCH TOOLS */}
      <section id="research" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(18,18,26,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '1100px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <span style={{ fontSize: '2.5rem' }}>📚</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600 }}>Research & Library Tools</h2>
              <p style={{ color: '#4d79ff', fontSize: '1rem', margin: 0 }}>EC Library · Find-eR catalogue · available via EU Login</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {[
              {
                name: 'Primo Research Assistant',
                icon: '🔬',
                color: '#4d79ff',
                access: 'EU Login (EC staff)',
                desc: 'RAG-powered academic search built into Find-eR, the Commission libraries catalogue. Ask questions in natural language and get answers grounded in academic literature, with full citations.',
                url: 'https://ec.europa.eu/libraries/finder',
                example: 'Ask: "What does recent research say about the effectiveness of carbon border adjustment mechanisms?" → get a synthesised answer with cited academic sources.',
              },
              {
                name: 'Statista Research AI',
                icon: '📈',
                color: '#FFCC00',
                access: 'EU Login (EC staff)',
                desc: 'Query millions of statistics, infographics and market research reports in natural language. Delivers answers with inline citations and data sources for easy verification.',
                url: 'https://ec-europa-finder.primo.exlibrisgroup.com/view/action/uresolver.do?operation=resolveService&package_service_id=17469614320004061&institutionId=4061&customerId=4060&VE=true',
                example: 'Ask: "What percentage of EU citizens use AI tools at work?" → get statistics with source links for your communication or report.',
              },
              {
                name: 'Consensus',
                icon: '🧬',
                color: '#ff6b6b',
                access: 'Free (basic plan)',
                desc: 'Academic search engine powered by AI. Searches 200M+ papers from Semantic Scholar and OpenAlex. Ideal for policy officers needing quick evidence checks for impact assessments.',
                url: 'https://consensus.app/',
                example: 'Search: "Does reducing working hours increase productivity?" → get an AI consensus from dozens of academic studies.',
              },
              {
                name: 'Perplexity (Academic)',
                icon: '🧭',
                color: '#4d79ff',
                access: 'Free (basic)',
                desc: 'AI search engine with an academic mode that draws exclusively from peer-reviewed literature. Good for fast, cited literature checks. Note: use academic mode; avoid uploading confidential Commission data.',
                url: 'https://www.perplexity.ai/',
                example: 'Use academic mode to quickly survey recent literature on digital services market concentration before drafting a background note.',
              },
            ].map((tool, i) => (
              <div key={i} className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))', borderRadius: '16px', padding: '25px', border: `1px solid ${tool.color}25` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{tool.icon}</span>
                    <h4 style={{ color: tool.color, margin: 0, fontSize: '1.05rem' }}>{tool.name}</h4>
                  </div>
                  <span style={{ fontSize: '0.75rem', padding: '3px 10px', background: `${tool.color}15`, borderRadius: '10px', color: tool.color }}>{tool.access}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#a0a0b0', marginBottom: '12px' }}>{tool.desc}</p>
                <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', borderLeft: `2px solid ${tool.color}`, marginBottom: '12px' }}>
                  <p style={{ fontSize: '0.82rem', color: '#777', margin: 0, fontStyle: 'italic' }}>{tool.example}</p>
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', color: tool.color, textDecoration: 'none' }}>Open →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI ACT EXPLORER */}
      <section id="ai-act" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'linear-gradient(180deg, rgba(10,10,15,0.92) 0%, rgba(16,16,28,0.92) 100%)' }}>
        <div className="section-content" style={{ maxWidth: '1100px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <span style={{ fontSize: '2.5rem' }}>⚖️</span>
            <div>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600 }}>AI Act & Legislation Tools</h2>
              <p style={{ color: '#FFCC00', fontSize: '1rem', margin: 0 }}>Navigate the EU AI regulatory framework</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
            {[
              {
                name: 'AI Act Explorer',
                icon: '🔍',
                color: '#FFCC00',
                url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act-explorer',
                desc: 'Official EC tool to browse the EU AI Act chapter by chapter, including annexes and recitals. Search specific provisions, understand obligations by role and system type. Maintained by the European AI Office.',
                tips: ['Search obligations by system type (high-risk, GPAI, etc.)', 'Cross-reference recitals with articles', 'Look up prohibited AI practices (Article 5)', 'Check compliance timelines by tier'],
              },
              {
                name: 'EUR-Lex AI Legislation',
                icon: '📜',
                color: '#4d79ff',
                url: 'https://eur-lex.europa.eu/search.html?text=artificial+intelligence&scope=EURLEX&type=quick&lang=en',
                desc: 'EUR-Lex is the official EU law database. Search for all AI-related legislation, Commission decisions, implementing acts, delegated acts and case law. Filter by institution, date or legal type.',
                tips: ['Find the full text of Regulation (EU) 2024/1689 (AI Act)', 'Track amendments and implementing regulations', 'Find sector-specific AI rules (medical devices, vehicles)', 'Download official texts in all EU languages'],
              },
              {
                name: 'AI Office Service Desk',
                icon: '🛡️',
                color: '#ff6b6b',
                url: 'https://ai-act-service-desk.ec.europa.eu/',
                desc: 'The European AI Office\'s service desk for guidance on AI Act compliance. Includes FAQs, guidance documents, notified body registries, and Q&A on specific provisions.',
                tips: ['Ask compliance questions for your DG\'s AI projects', 'Find guidance on GPAI model obligations', 'Access the FRIA (Fundamental Rights Impact Assessment) templates', 'Get updates on forthcoming technical standards'],
              },
            ].map((tool, i) => (
              <div key={i} className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))', borderRadius: '16px', padding: '28px', border: `1px solid ${tool.color}25` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{tool.icon}</span>
                  <h4 style={{ color: tool.color, margin: 0 }}>{tool.name}</h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#a0a0b0', marginBottom: '15px' }}>{tool.desc}</p>
                <ul style={{ paddingLeft: '18px', margin: '0 0 15px', color: '#777', fontSize: '0.85rem', lineHeight: 1.8 }}>
                  {tool.tips.map((t, j) => <li key={j}>{t}</li>)}
                </ul>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: `${tool.color}15`, border: `1px solid ${tool.color}30`, borderRadius: '8px', color: tool.color, textDecoration: 'none', fontSize: '0.85rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                  Open →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESS */}
      <section id="access" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(18,18,26,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '900px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <span style={{ fontSize: '2.5rem' }}>🔑</span>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600 }}>How to Get Access</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px' }}>
            {[
              {
                step: '01',
                title: 'EU Login',
                color: '#4d79ff',
                desc: 'All EC language tools require an EU Login account. External users (public administrations, academia, NGOs) can also register. Staff already have this via your EC credentials.',
                link: { text: 'Register EU Login', url: 'https://webgate.ec.europa.eu/cas/eim/external/register.cgi' },
              },
              {
                step: '02',
                title: 'Language Tools Portal',
                color: '#FFCC00',
                desc: 'Register once on the Language Tools Portal and get access to eBriefing, eTranslation, Speech-to-Text, eSummary, eReply, eReporting and all other language tools.',
                link: { text: 'Register on portal', url: 'https://language-tools.ec.europa.eu/welcome?lang=en' },
              },
              {
                step: '03',
                title: 'GPT@EC',
                color: '#ff6b6b',
                desc: 'GPT@EC is accessible to Commission staff via the internal network. Access through MyIntraComm or the DIGIT portal. Contact your local IT helpdesk if you cannot find it.',
                link: { text: 'DIGIT IT helpdesk', url: 'https://commission.europa.eu/about/departments-and-executive-agencies/digital-services_en' },
              },
              {
                step: '04',
                title: 'EC Library Tools',
                color: '#4d79ff',
                desc: 'Primo Research Assistant and Statista Research AI require EU Login. Access via the Find-eR library catalogue. External access is possible through your institution\'s library subscription.',
                link: { text: 'EC Library / Find-eR', url: 'https://ec.europa.eu/libraries/finder' },
              },
            ].map((item, i) => (
              <div key={i} className="animate-on-scroll" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '25px', border: `1px solid ${item.color}20` }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '2rem', color: `${item.color}40`, fontWeight: 700, marginBottom: '10px' }}>{item.step}</div>
                <h4 style={{ color: item.color, marginBottom: '10px', fontSize: '1.05rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.88rem', color: '#a0a0b0', marginBottom: '15px' }}>{item.desc}</p>
                <a href={item.link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: item.color, textDecoration: 'none' }}>{item.link.text} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section id="tips" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', background: 'rgba(10,10,15,0.92)' }}>
        <div className="section-content" style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, marginBottom: '15px' }}>Tips for Responsible Use</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.1rem', color: '#a0a0b0', marginBottom: '40px' }}>The Commission&apos;s AI@EC Communication sets out the principles. Here&apos;s what matters in practice.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', textAlign: 'left', marginBottom: '50px' }}>
            {[
              { icon: '🔒', title: 'Use EC tools for sensitive data', desc: 'Never paste confidential or sensitive Commission information into external tools like ChatGPT, Copilot or Gemini. Use GPT@EC or the Language Tools portal instead.', color: '#4d79ff' },
              { icon: '✅', title: 'Always verify AI outputs', desc: 'AI tools can hallucinate or make errors. Always fact-check summaries, translations and legal analysis before using them in official documents or communications.', color: '#FFCC00' },
              { icon: '📝', title: 'Disclose AI use when required', desc: 'The AI@EC rules require transparency. If AI substantially contributed to a document, note it. Check your DG\'s specific guidelines for disclosures.', color: '#ff6b6b' },
              { icon: '🎯', title: 'Match tool to sensitivity', desc: 'GPT@EC offers multiple LLMs suited to different sensitivity levels. Use appropriate models for the classification level of information you are processing.', color: '#4d79ff' },
              { icon: '📚', title: 'Maintain human oversight', desc: 'AI tools assist — they do not decide. Policy judgements, legal assessments and external communications must remain under human control and responsibility.', color: '#FFCC00' },
              { icon: '🔄', title: 'Combine tools for best results', desc: 'Chain tools: Speech-to-Text → eSummary → GPT@EC for meeting minutes. Or eTranslation → eBriefing for multilingual stakeholder analysis. The tools complement each other.', color: '#ff6b6b' },
            ].map((tip, i) => (
              <div key={i} className="animate-on-scroll" style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${tip.color}20` }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{tip.icon}</div>
                <h4 style={{ color: tip.color, fontSize: '0.95rem', marginBottom: '8px' }}>{tip.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>{tip.desc}</p>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll" style={{ padding: '30px', background: 'linear-gradient(145deg, rgba(0,51,153,0.15), rgba(255,204,0,0.05))', borderRadius: '16px', border: '1px solid rgba(0,51,153,0.3)', marginBottom: '30px' }}>
            <p style={{ fontSize: '1.1rem', color: '#fff', fontStyle: 'italic', margin: '0 0 10px' }}>
              &quot;We want Commission staff to benefit from all the possibilities that AI has to offer, but we need to give them the tools and guidance to do it safely.&quot;
            </p>
            <p style={{ fontSize: '0.85rem', color: '#a0a0b0', margin: 0 }}>— Veronica Gaffey, Director-General for Digital Services (DIGIT), October 2024</p>
          </div>

          <div className="animate-on-scroll" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {[
              { label: 'AI@EC Communication', url: 'https://commission.europa.eu/news/commission-adopts-its-own-approach-development-and-use-artificial-intelligence-2024-01-24_en' },
              { label: 'Language Tools Portal', url: 'https://language-tools.ec.europa.eu/' },
              { label: 'DIGIT — Digital Services', url: 'https://commission.europa.eu/about/departments-and-executive-agencies/digital-services_en' },
              { label: 'AI Act Service Desk', url: 'https://ai-act-service-desk.ec.europa.eu/' },
            ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '25px', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s ease' }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 5%', textAlign: 'center', background: 'linear-gradient(180deg, rgba(18,18,26,0.92) 0%, rgba(10,10,15,0.92) 100%)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
          <span style={{ fontSize: '2rem' }}>🇪🇺</span>
          <p className="animate-on-scroll" style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>European Commission AI Tools Guide · Not an official Commission publication</p>
        </div>
        <p className="animate-on-scroll" style={{ color: '#555', fontSize: '0.85rem', maxWidth: '600px', margin: '0 auto 25px' }}>
          Information compiled from official EC sources. Always check the Commission intranet (MyIntraComm) and your DG&apos;s IT guidelines for the most current access and usage policies.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(77,121,255,0.15)', border: '1px solid rgba(77,121,255,0.3)', borderRadius: '8px', color: '#4d79ff', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← LLM History
          </Link>
          <Link href="/european-ai" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '8px', color: '#ffd700', textDecoration: 'none', fontSize: '0.9rem' }}>
            🔬 European Leaders in AI →
          </Link>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Space Grotesk', sans-serif; background: #0a0a0f; color: #fff; overflow-x: hidden; line-height: 1.6; }
        h2, h4 { color: #fff; }

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
        .nav-dot:hover { background: #FFCC00 !important; transform: scale(1.3) !important; }
        @media (max-width: 768px) { .nav-dots { display: none !important; } }
      `}</style>


    </>
  );
}
