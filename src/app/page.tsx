'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="progress-bar" id="progressBar" style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'linear-gradient(135deg, #00f5d4 0%, #9b5de5 100%)', zIndex: 1000, transition: 'width 0.1s ease', width: '0%' }} />

      <nav className="nav-dots" style={{ position: 'fixed', right: '30px', top: '50%', transform: 'translateY(-50%)', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {['intro', 'dream', 'embeddings', 'transformer', 'bridge', 'pioneers', 'token-game', 'sand', 'agents', 'programming', 'present', 'future'].map((id, i) => (
          <div key={id} className="nav-dot" data-section={id} data-label={['', 'The Dream', 'Word Vectors', 'Transformer', 'Bridge', 'Pioneers', 'Token Game', 'Thinking Sand', 'Agents', 'Genius Coder', 'Present', 'Future'][i]} style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative' }} />
        ))}
      </nav>

      {/* INTRO */}
      <section id="intro" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)' }}>
        <div className="section-content animate-scale visible" style={{ textAlign: 'center' }}>
          <p className="animate-on-scroll visible delay-1" style={{ fontSize: '1.4rem', color: '#a0a0b0', marginBottom: '40px' }}>A Journey Through</p>
          <h1 className="animate-on-scroll visible delay-2" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '30px', background: 'linear-gradient(135deg, #00f5d4 0%, #9b5de5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            From Translation Machines<br />to <span style={{ color: '#00f5d4' }}>Thinking Sand</span>
          </h1>
          <p className="animate-on-scroll visible delay-3" style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '600px', margin: '0 auto' }}>The remarkable story of how machines learned to understand, reason, and perhaps even think.</p>
        </div>
        <div className="animate-on-scroll visible delay-5" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: '#a0a0b0', fontSize: '14px', animation: 'bounce 2s infinite' }}>
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f5d4" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* THE DREAM - Early Machine Translation */}
      <section id="dream" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#0a0a0f' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px', position: 'relative' }}>The Dream of Machines That Speak</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '20px' }}>It all started with a simple question: <em>Can computers translate between languages?</em> From this humble beginning, an entire revolution would emerge.</p>
          
          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'linear-gradient(135deg, #00f5d4 0%, #9b5de5 100%)' }}></div>
            
            {[
              { year: '1954', title: 'The Georgetown-IBM Experiment', desc: 'The first public demonstration of machine translation. Sixty Russian sentences translated to English. Limited, but revolutionary.' },
              { year: '1966', title: 'ELIZA: The First Conversation', desc: 'Joseph Weizenbaum created ELIZA, mimicking a Rogerian therapist. Simple pattern matching, but people talked to it for hours.' },
              { year: '1980s-90s', title: 'Rule-Based Systems Collapse', desc: 'Decades of hand-coded grammar rules proved insufficient. The complexity of language was infinite.' },
              { year: '2013', title: 'Word2Vec: Words as Vectors', desc: 'Mikolov discovered that word meaning could be captured as numbers in space. king - man + woman ≈ queen.' }
            ].map((item, i) => (
              <div key={i} className="animate-on-scroll" style={{ position: 'relative', marginBottom: '40px', padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease' }}>
                <div style={{ position: 'absolute', left: '-46px', top: '30px', width: '14px', height: '14px', borderRadius: '50%', background: '#00f5d4', boxShadow: '0 0 20px #00f5d4' }}></div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: '#f15bb5', marginBottom: '8px', display: 'block' }}>{item.year}</span>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{item.title}</h4>
                <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll" style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '25px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', maxWidth: '450px', marginTop: '40px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca40' }}></div>
            </div>
            <div style={{ color: '#a0a0b0', marginBottom: '8px' }}>&gt; ELIZA: How do you do. Please tell me your problem.</div>
            <div style={{ color: '#a0a0b0', marginBottom: '8px' }}>&gt; USER: My cat is sad</div>
            <div style={{ color: '#a0a0b0' }}>&gt; ELIZA: Tell me more about your <span style={{ color: '#00f5d4' }}>cat</span></div>
          </div>

          <a href="https://en.wikipedia.org/wiki/ELIZA" target="_blank" rel="noopener noreferrer" className="animate-on-scroll" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(155, 93, 229, 0.2)', border: '1px solid rgba(155, 93, 229, 0.3)', borderRadius: '8px', color: '#9b5de5', textDecoration: 'none', fontSize: '0.9rem', marginTop: '20px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            Learn about ELIZA on Wikipedia
          </a>
        </div>
      </section>

      {/* THE TRANSFORMER - Attention Is All You Need */}
      <section id="transformer" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#12121a' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>Attention Is All You Need</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '20px' }}>In June 2017, a paper from Google Brain changed everything. The Transformer architecture abandoned recurrence entirely. Instead, it used &quot;attention&quot; — letting every word look at every other word simultaneously.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
            <div className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(0,245,212,0.1), rgba(0,245,212,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(0,245,212,0.2)' }}>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#00f5d4' }}>The Key Innovation</h4>
              <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>Self-attention: each token looks at all other tokens to understand context. &quot;The&quot; knows it&apos;s connected to &quot;animal&quot; and &quot;crossed.&quot;</p>
            </div>
            <div className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(155,93,229,0.1), rgba(155,93,229,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(155,93,229,0.2)' }}>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#9b5de5' }}>Parallel Processing</h4>
              <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>Unlike RNNs, Transformers process entire sequences at once. Training became 100x faster. Scale became possible.</p>
            </div>
            <div className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(241,91,181,0.1), rgba(241,91,181,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(241,91,181,0.2)' }}>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#f15bb5' }}>Long-range Dependencies</h4>
              <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>The first word can directly influence the last word. No information decay through time steps.</p>
            </div>
          </div>

          <div className="animate-on-scroll" style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '30px', marginTop: '40px', maxWidth: '600px' }}>
            <h4 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: '#fee440', marginBottom: '15px' }}>ATTENTION MECHANISM</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {['The', 'animal', "didn't", 'cross', 'the', 'street', 'because', 'it', 'was', 'tired'].map((word, i) => (
                <span key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', padding: '8px 12px', background: 'rgba(155,93,229,0.2)', borderRadius: '6px', color: '#fff' }}>{word}</span>
              ))}
            </div>
            <p style={{ fontSize: '0.9rem', color: '#a0a0b0', marginTop: '15px', textAlign: 'center' }}>Every word attends to every other word. &quot;it&quot; strongly attends to &quot;animal&quot; and &quot;tired&quot;.</p>
          </div>

          <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer" className="animate-on-scroll" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(155, 93, 229, 0.2)', border: '1px solid rgba(155, 93, 229, 0.3)', borderRadius: '8px', color: '#9b5de5', textDecoration: 'none', fontSize: '0.9rem', marginTop: '25px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            Vaswani et al. - Attention Is All You Need (2017)
          </a>
        </div>
      </section>

      {/* THE BRIDGE - How a Translator Became a Thinker */}
      <section id="bridge" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: 'linear-gradient(180deg, #0a0a0f 0%, #15151f 100%)' }}>
        <div className="section-content" style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>How a Translator Became a Thinker</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '50px', textAlign: 'left' }}>
            <div className="animate-on-scroll" style={{ display: 'flex', alignItems: 'flex-start', gap: '25px', padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', borderLeft: '4px solid #00f5d4' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🔄</span>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#00f5d4' }}>From Translation to Prediction</h4>
                <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>What if instead of translating between languages, you predict the next word in the same language? That&apos;s all GPT does — sophisticated autocomplete. But with enough data and compute, prediction becomes understanding.</p>
              </div>
            </div>
            
            <div className="animate-on-scroll" style={{ display: 'flex', alignItems: 'flex-start', gap: '25px', padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', borderLeft: '4px solid #9b5de5' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>📈</span>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#9b5de5' }}>Scale Changes Everything</h4>
                <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>GPT-1 (2018): 117M parameters. GPT-2 (2019): 1.5B. GPT-3 (2020): 175B. With scale came emergent abilities — the model started doing things it wasn&apos;t explicitly trained to do.</p>
              </div>
            </div>
            
            <div className="animate-on-scroll" style={{ display: 'flex', alignItems: 'flex-start', gap: '25px', padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', borderLeft: '4px solid #f15bb5' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🧠</span>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#f15bb5' }}>Emergent Reasoning</h4>
                <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>At sufficient scale, predicting the next token requires understanding context, causality, and intent. The model learns to reason step-by-step, even though it was never taught to. Chain-of-thought prompting emerged naturally.</p>
              </div>
            </div>
            
            <div className="animate-on-scroll" style={{ display: 'flex', alignItems: 'flex-start', gap: '25px', padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', borderLeft: '4px solid #fee440' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>⚡</span>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#fee440' }}>Thinking Emerges</h4>
                <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>The leap from translator to thinker wasn&apos;t programmed — it emerged. Billions of parameters organizing themselves to minimize prediction error created something that looks remarkably like understanding. We still don&apos;t fully understand why it works.</p>
              </div>
            </div>
          </div>

          <div className="animate-on-scroll" style={{ marginTop: '50px', padding: '30px', background: 'linear-gradient(145deg, rgba(155,93,229,0.15), rgba(0,245,212,0.05))', borderRadius: '16px', border: '1px solid rgba(155,93,229,0.3)' }}>
            <p style={{ fontSize: '1.3rem', color: '#fff', fontStyle: 'italic', margin: 0 }}>&quot;We present a new simple network architecture, the Transformer, based solely on attention mechanisms...&quot;</p>
            <p style={{ fontSize: '0.9rem', color: '#a0a0b0', marginTop: '15px' }}>— Vaswani et al., 2017</p>
          </div>
        </div>
      </section>

      {/* THE MINDS BEHIND THE REVOLUTION */}
      <section id="pioneers" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: 'linear-gradient(180deg, #12121a 0%, #0a0a0f 100%)' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '15px' }}>The Minds Behind the Revolution</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.1rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '40px' }}>This transformation wasn&apos;t accidental. It was driven by brilliant humans — many of them women — who dared to imagine machines that could think.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginTop: '30px' }}>
            {[
              { name: 'Fei-Fei Li', img: '/images/pioneers/fei-fei-li.jpg', role: 'Computer Vision Pioneer', contribution: 'Led ImageNet, proving that large-scale data drives deep learning breakthroughs.', color: '#00f5d4' },
              { name: 'Yoshua Bengio', img: '/images/pioneers/yoshua-bengio.jpg', role: 'Deep Learning Godfather', contribution: 'Co-winner of Turing Award 2018. Pioneered recurrent networks and attention mechanisms.', color: '#9b5de5' },
              { name: 'Andrej Karpathy', img: '/images/pioneers/andrej-karpathy.png', role: 'Deep Learning Educator', contribution: 'Created Stanford\'s CNN course. Made AI education accessible to millions.', color: '#f15bb5' },
              { name: 'Frances Haugen', img: '/images/pioneers/frances-haugen.jpg', role: 'AI Transparency Advocate', contribution: 'Exposed Meta\'s AI practices. Champions responsible AI development.', color: '#fee440' },
              { name: 'Demis Hassabis', img: '/images/pioneers/demis-hassabis.jpg', role: 'DeepMind Founder', contribution: 'Combined neuroscience, AI, and games. Created AlphaFold solving protein folding.', color: '#00f5d4' },
              { name: 'Timnit Gebru', img: '/images/pioneers/timnit-gebru.jpg', role: 'AI Ethics Pioneer', contribution: 'Founded DAIR Institute. Advocated for diversity and accountability in AI.', color: '#9b5de5' },
              { name: 'Shakir Mohamed', img: '/images/pioneers/shakir-mohamed.jpg', role: 'DeepMind Research Lead', contribution: 'Led Responsible AI at DeepMind. Pioneering work in African AI and fairness.', color: '#f15bb5' },
              { name: 'Daphne Koller', img: '/images/pioneers/daphne-koller.jpg', role: 'Online Education Pioneer', contribution: 'Co-founded Coursera. Brought AI education to millions worldwide.', color: '#fee440' }
            ].map((person, i) => (
              <div key={i} className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '25px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', transition: 'all 0.3s ease' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 20px', overflow: 'hidden', border: '3px solid ' + person.color, boxShadow: '0 0 30px ' + person.color + '40' }}>
                  <Image src={person.img} alt={person.name} width={100} height={100} style={{ objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '5px', color: person.color }}>{person.name}</h4>
                <p style={{ fontSize: '0.85rem', color: '#a0a0b0', marginBottom: '10px', fontWeight: 500 }}>{person.role}</p>
                <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>{person.contribution}</p>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll" style={{ marginTop: '50px', padding: '30px', background: 'linear-gradient(145deg, rgba(0,245,212,0.1), rgba(155,93,229,0.05))', borderRadius: '16px', border: '1px solid rgba(0,245,212,0.2)' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#00f5d4' }}>Honorable Mentions</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {['Geoffrey Hinton', 'Yann LeCun', 'Ilya Sutskever', 'Sam Altman', 'Dario Amodei', 'Jensen Huang', 'Cynthia Dwork', 'David Ha', 'Shannon', 'Turing'].map((name, i) => (
                <span key={i} style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.85rem', color: '#a0a0b0' }}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOKEN GAME SECTION */}
      <section id="token-game" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#0a0a0f' }}>
        <div className="section-content" style={{ maxWidth: '800px', width: '100%' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>The Token Game</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '20px' }}>This is what LLMs do — predict the next token. They&apos;re sophisticated autocomplete engines. Try it yourself:</p>

          <div className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, #1a1a24, #12121a)', borderRadius: '20px', padding: '40px', border: '1px solid rgba(255,255,255,0.1)', marginTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: '#00f5d4', textTransform: 'uppercase', letterSpacing: '2px' }}>Next Token Prediction</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', color: '#fee440' }}>Score: <span id="score">0</span> / <span id="total">0</span></span>
            </div>
            
            <div id="sentenceDisplay" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', padding: '30px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', marginBottom: '25px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
              The cat sat on the <span style={{ display: 'inline-block', minWidth: '120px', padding: '5px 15px', background: 'linear-gradient(135deg, #00f5d4 0%, #9b5de5 100%)', borderRadius: '6px', margin: '0 5px', animation: 'pulse 1.5s infinite' }}></span>
            </div>
            
            <div id="tokenOptions" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
              {['mat', 'moon', 'happiness', 'thinking'].map((opt, i) => (
                <button key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', padding: '20px', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', cursor: 'pointer', transition: 'all 0.3s ease' }}>{opt}</button>
              ))}
            </div>
            
            <div id="gameResult" style={{ textAlign: 'center', marginTop: '25px', padding: '20px', borderRadius: '12px', display: 'none' }}>
              <p id="resultText" style={{ fontSize: '1rem', margin: '0 auto', color: '#a0a0b0' }}></p>
              <button id="nextBtn" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 500, padding: '15px 40px', background: 'linear-gradient(135deg, #00f5d4 0%, #9b5de5 100%)', border: 'none', borderRadius: '10px', color: '#0a0a0f', cursor: 'pointer', marginTop: '20px', transition: 'all 0.3s ease' }}>Next Question</button>
            </div>
          </div>

          <p className="animate-on-scroll" style={{ marginTop: '20px', fontSize: '1rem', color: '#f15bb5' }}>This is exactly what GPT, Claude, and every LLM does — just with billions of parameters!</p>
        </div>
      </section>

      {/* THINKING SAND */}
      <section id="sand" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#12121a' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>Thinking Sand</h2>
          <h3 className="animate-on-scroll" style={{ fontSize: '1.5rem', fontWeight: 500, color: '#00f5d4', marginBottom: '15px' }}>175 billion parameters. Silicon as substrate.</h3>
          <p className="animate-on-scroll" style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '20px' }}>Inside every modern LLM are billions of numerical values — &quot;weights&quot; — arranged in matrices. Together, they form a computational substrate that processes meaning. Grains of sand that learned to think.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {[
              { icon: '🖥️', title: 'The Hardware', desc: 'Thousands of GPU/TPU chips working in parallel. Each capable of trillions of operations per second.' },
              { icon: '⚡', title: 'The Energy', desc: 'Training GPT-3 consumed about 1 GWh — enough to power 1000 homes for a month.' },
              { icon: '🧮', title: 'The Math', desc: 'Matrix multiplications, softmax functions, residual connections — elegant mathematics producing emergent intelligence.' }
            ].map((card, i) => (
              <div key={i} className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.4s ease' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{card.icon}</div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{card.title}</h4>
                <p style={{ fontSize: '1rem', margin: 0, color: '#a0a0b0' }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <a href="https://arxiv.org/abs/2001.08361" target="_blank" rel="noopener noreferrer" className="animate-on-scroll" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(155, 93, 229, 0.2)', border: '1px solid rgba(155, 93, 229, 0.3)', borderRadius: '8px', color: '#9b5de5', textDecoration: 'none', fontSize: '0.9rem', marginTop: '25px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            Kaplan et al. - Scaling Laws for Neural Language Models
          </a>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#0a0a0f' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>Agents in the Machine</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '40px' }}>LLMs alone are just text predictors. But give them tools, memory, and the ability to act iteratively — and they become something new: AI agents that can explore, plan, and execute.</p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            {[
              { step: '1', title: 'Reason', desc: 'Think step-by-step using chain-of-thought prompting' },
              { step: '2', title: 'Plan', desc: 'Break complex tasks into manageable subtasks' },
              { step: '3', title: 'Act', desc: 'Use tools — web search, calculators, code execution' },
              { step: '4', title: 'Reflect', desc: 'Evaluate results and adjust approach if needed' }
            ].map((item, i) => (
              <div key={i} className="animate-on-scroll" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 30px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '4px solid #9b5de5', transition: 'all 0.3s ease', width: '100%', maxWidth: '600px' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.5rem', color: '#9b5de5', fontWeight: 700 }}>{item.step}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p style={{ margin: 0, fontSize: '1rem', color: '#a0a0b0' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {[
              { title: 'ReAct (2023)', desc: 'Combines reasoning traces with action plans. The model thinks out loud while deciding what to do.' },
              { title: 'Tool Use', desc: 'Modern LLMs can browse the web, run code, use calculators, and interact with APIs.' }
            ].map((card, i) => (
              <div key={i} className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{card.title}</h4>
                <p style={{ fontSize: '1rem', margin: 0, color: '#a0a0b0' }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noopener noreferrer" className="animate-on-scroll" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(155, 93, 229, 0.2)', border: '1px solid rgba(155, 93, 229, 0.3)', borderRadius: '8px', color: '#9b5de5', textDecoration: 'none', fontSize: '0.9rem', marginTop: '25px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            Wei et al. - Chain-of-Thought Prompting Elicits Reasoning
          </a>
        </div>
      </section>

      {/* AI AS GENIUS PROGRAMMER */}
      <section id="programming" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a25 100%)' }}>
        <div className="section-content" style={{ maxWidth: '1100px', width: '100%' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>The Genius Programmer</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '800px', marginBottom: '30px' }}>Perhaps the most profound demonstration of LLM capability: AI has become a world-class programmer. Code is just another language — and these machines have learned to speak it fluently.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginTop: '40px' }}>
            <div className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(0,245,212,0.08), rgba(0,245,212,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(0,245,212,0.2)' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#00f5d4' }}>💻 One of Humanity&apos;s Most Complex Activities</h4>
              <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>Programming requires mastering syntax, semantics, algorithms, data structures, architecture, debugging, and abstract reasoning. It demands precision, creativity, and deep logical thought.</p>
            </div>
            
            <div className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(155,93,229,0.08), rgba(155,93,229,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(155,93,229,0.2)' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#9b5de5' }}>🧠 Surpassing Human Experts</h4>
              <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>AI systems now score in the 99th percentile on programming competitions. They debug complex systems, optimize algorithms, and architect entire applications — often better than humans who spent decades mastering the craft.</p>
            </div>
            
            <div className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(241,91,181,0.08), rgba(241,91,181,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(241,91,181,0.2)' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#f15bb5' }}>⚡ Exponential Acceleration</h4>
              <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>The rate of software improvement is no longer linear — it&apos;s exponential. AI writes code in seconds that would take humans days or weeks. The feedback loop is closing. AI writes AI.</p>
            </div>
          </div>

          <div className="animate-on-scroll" style={{ marginTop: '50px', padding: '35px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#fee440' }}>The Self-Improving Loop</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '15px', fontFamily: 'JetBrains Mono, monospace' }}>
              {[
                { text: 'AI Writes Code', color: '#00f5d4' },
                { text: '→', color: '#666' },
                { text: 'Code Improves AI', color: '#9b5de5' },
                { text: '→', color: '#666' },
                { text: 'Better AI Writes Better Code', color: '#f15bb5' },
                { text: '→', color: '#666' },
                { text: 'Repeat', color: '#fee440' }
              ].map((item, i) => (
                <span key={i} style={{ color: item.color, fontSize: '1rem', padding: '8px 12px', background: `${item.color}15`, borderRadius: '8px' }}>{item.text}</span>
              ))}
            </div>
            <p style={{ fontSize: '1rem', color: '#a0a0b0', marginTop: '20px', textAlign: 'center' }}>We&apos;re witnessing a recursive improvement loop — software building better software building better software. The singularity isn&apos;t science fiction anymore. It&apos;s happening in GitHub repos right now.</p>
          </div>

          <div className="animate-on-scroll" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '30px' }}>
            <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(0,245,212,0.15)', border: '1px solid rgba(0,245,212,0.3)', borderRadius: '8px', color: '#00f5d4', textDecoration: 'none', fontSize: '0.9rem' }}>
              GitHub Copilot
            </a>
            <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(241,91,181,0.15)', border: '1px solid rgba(241,91,181,0.3)', borderRadius: '8px', color: '#f15bb5', textDecoration: 'none', fontSize: '0.9rem' }}>
              Claude Code
            </a>
            <a href="https://openai.com/index/openai-codex/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(155,93,229,0.15)', border: '1px solid rgba(155,93,229,0.3)', borderRadius: '8px', color: '#9b5de5', textDecoration: 'none', fontSize: '0.9rem' }}>
              OpenAI Codex
            </a>
          </div>
        </div>
      </section>

      {/* THE PRESENT */}
      <section id="present" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#12121a' }}>
        <div className="section-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>The Present & The Frontier</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '40px' }}>We&apos;re living through an extraordinary moment. AI capabilities are advancing at a pace we&apos;ve never seen before.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {[
              { color: '#00f5d4', name: 'OpenAI', desc: 'GPT-4, o1 reasoning models, Sora video generation, ChatGPT with voice and vision.', link: 'https://openai.com' },
              { color: '#9b5de5', name: 'Anthropic', desc: 'Claude models emphasizing safety and helpfulness. Constitutional AI training.', link: 'https://anthropic.com' },
              { color: '#f15bb5', name: 'Google', desc: 'Gemini family, DeepMind research, integration into Search and Workspace.', link: 'https://deepmind.google' },
              { color: '#fee440', name: 'Meta & Open Source', desc: 'Llama models released openly. Mistral, Falcon, and thousands of fine-tunes.', link: 'https://github.com/meta-llama' }
            ].map((company, i) => (
              <div key={i} className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '12px', color: company.color }}>{company.name}</h4>
                <p style={{ fontSize: '1rem', margin: 0, color: '#a0a0b0' }}>{company.desc}</p>
                <a href={company.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: `${company.color}33`, border: `1px solid ${company.color}50`, borderRadius: '8px', color: company.color, textDecoration: 'none', fontSize: '0.85rem', marginTop: '15px' }}>
                  {company.name === 'Meta & Open Source' ? 'GitHub →' : company.name + ' →'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE FUTURE */}
      <section id="future" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#0a0a0f' }}>
        <div className="section-content" style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>What Comes Next?</h2>
          <p className="animate-on-scroll" style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', margin: '0 auto 40px' }}>The story of AI is far from over. What happens when systems become more capable? More autonomous? More integrated into our lives?</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '60px' }}>
            {[
              { icon: '🤖', title: 'AGI: When?', desc: 'Artificial General Intelligence — machines that can do any intellectual task a human can.' },
              { icon: '⚖️', title: 'Alignment Problem', desc: 'How do we ensure AI systems do what we want? The most important challenge of our time.' },
              { icon: '🌍', title: 'Society & Work', desc: 'Automation of cognitive tasks. New jobs, displaced jobs. The transformation has only begun.' }
            ].map((card, i) => (
              <div key={i} className="animate-on-scroll" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'left' }}>
                <div style={{ fontSize: '2rem', marginBottom: '15px' }}>{card.icon}</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{card.title}</h4>
                <p style={{ fontSize: '1rem', margin: 0, color: '#a0a0b0' }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="animate-on-scroll" style={{ color: '#00f5d4', marginBottom: '20px', fontSize: '1.5rem' }}>Continue Learning</h3>
          <div className="animate-on-scroll" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
            {[
              { label: 'arXiv cs.AI', url: 'https://arxiv.org/list/cs.AI/recent' },
              { label: 'DeepLearning.AI', url: 'https://learn.deeplearning.ai/' },
              { label: 'Andrej Karpathy', url: 'https://www.youtube.com/@AndrejKarpathy' },
              { label: 'Anthropic Research', url: 'https://transformer-circuits.pub/' }
            ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', color: '#fff', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s ease' }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 5%', textAlign: 'center', background: 'linear-gradient(180deg, #12121a 0%, #0a0a0f 100%)' }}>
        <h2 className="animate-on-scroll" style={{ fontSize: '2rem', marginBottom: '40px', fontWeight: 600 }}>The Journey Continues</h2>
        <p className="animate-on-scroll" style={{ maxWidth: '600px', margin: '0 auto 30px', color: '#a0a0b0' }}>From mechanical translation to silicon thought — and whatever comes next. The story of AI is ultimately the story of human ambition.</p>
        
        <div className="animate-on-scroll" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          {[
            { label: 'GPT-4 Paper', url: 'https://arxiv.org/abs/2306.12001' },
            { label: 'Llama 2 Paper', url: 'https://arxiv.org/abs/2307.09288' },
            { label: 'Claude Paper', url: 'https://arxiv.org/abs/2303.12712' },
            { label: 'Gemini Paper', url: 'https://arxiv.org/abs/2402.03300' }
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s ease' }}>
              {link.label}
            </a>
          ))}
        </div>
        
        <p className="animate-on-scroll" style={{ color: '#a0a0b0', fontSize: '0.9rem' }}>An interactive journey through LLM history. Created with curiosity and admiration for the researchers who made it possible.</p>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #0a0a0f;
          color: #fff;
          overflow-x: hidden;
          line-height: 1.6;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-on-scroll {
          opacity: 0;
        }
        
        .animate-on-scroll.visible {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-left.visible {
          animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-right.visible {
          animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-scale.visible {
          animation: fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .delay-1 { animation-delay: 0.1s !important; }
        .delay-2 { animation-delay: 0.2s !important; }
        .delay-3 { animation-delay: 0.3s !important; }
        .delay-4 { animation-delay: 0.4s !important; }
        .delay-5 { animation-delay: 0.5s !important; }
        .delay-6 { animation-delay: 0.6s !important; }
        
        .nav-dot:hover {
          background: #00f5d4 !important;
          transform: scale(1.3) !important;
        }
        
        .token-btn:hover {
          background: rgba(0, 245, 212, 0.1) !important;
          border-color: #00f5d4 !important;
          transform: scale(1.02) !important;
        }
        
        .token-btn.correct {
          background: rgba(0, 245, 212, 0.2) !important;
          border-color: #00f5d4 !important;
          animation: correctPulse 0.5s ease !important;
        }
        
        .token-btn.incorrect {
          background: rgba(241, 91, 181, 0.2) !important;
          border-color: #f15bb5 !important;
          animation: shake 0.5s ease !important;
        }
        
        @keyframes correctPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        footer a:hover {
          background: #9b5de5 !important;
          transform: translateY(-3px) !important;
        }
        
        @media (max-width: 768px) {
          .nav-dots {
            display: none !important;
          }
          #tokenOptions {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll', () => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (scrollTop / docHeight) * 100;
          document.getElementById('progressBar').style.width = scrollPercent + '%';
        });

        // Observe all elements with animation classes
        function initElementAnimations() {
          const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale');
          
          const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                // Add staggered delay based on sibling order
                const siblings = Array.from(entry.target.parentElement?.children || []).filter(el => 
                  el.classList.contains('animate-on-scroll') || 
                  el.classList.contains('animate-left') || 
                  el.classList.contains('animate-right') || 
                  el.classList.contains('animate-scale')
                );
                const siblingIndex = siblings.indexOf(entry.target);
                
                // Remove any existing delay classes
                entry.target.classList.remove('delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6');
                
                // Add staggered delay
                if (siblingIndex < 6) {
                  entry.target.classList.add('delay-' + (siblingIndex + 1));
                }
                
                entry.target.classList.add('visible');
                elementObserver.unobserve(entry.target);
              }
            });
          }, { 
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1 
          });

          animatedElements.forEach(el => elementObserver.observe(el));
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initElementAnimations);
        } else {
          initElementAnimations();
        }

        const sections = document.querySelectorAll('section');
        const navDots = document.querySelectorAll('.nav-dot');

        const sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id;
              navDots.forEach(dot => {
                dot.style.background = 'rgba(255,255,255,0.2)';
                if (dot.dataset.section === sectionId) {
                  dot.style.background = '#00f5d4';
                }
              });
            }
          });
        }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

        sections.forEach(section => sectionObserver.observe(section));

        navDots.forEach(dot => {
          dot.addEventListener('click', () => {
            const section = document.getElementById(dot.dataset.section);
            section.scrollIntoView({ behavior: 'smooth' });
          });
        });

        const questions = [
          { sentence: "The cat sat on the ___", options: ["mat", "moon", "happiness", "thinking"], correct: 0, explanation: "The most grammatically sensible completion." },
          { sentence: "After eating, the ___ died", options: ["person", "fish", "restaurant", "happy"], correct: 1, explanation: "Classic Winograd schema! 'The fish' makes sense — it ate the food, then died." },
          { sentence: "I regret to inform you that your ___ has been approved", options: ["application", "rejection", "complaint", "problem"], correct: 0, explanation: "Only 'application' collocates naturally with 'approved'." },
          { sentence: "The trophy would not fit in the suitcase because ___", options: ["it was too big", "it was too small", "it was shiny", "it was heavy"], correct: 0, explanation: "The trophy is too big for the suitcase — another Winograd schema!" },
          { sentence: "Scientists have discovered that ___ is the key to longevity", options: ["exercise", "sleep", "happiness", "all of the above"], correct: 3, explanation: "All three factors contribute to longevity." },
          { sentence: "The artist painted a picture of the ___ at sunset", options: ["ocean", "keyboard", "telephone", "algorithm"], correct: 0, explanation: "Only 'ocean' creates a coherent scene with 'sunset'." },
          { sentence: "She put the milk in the ___ to keep it cold", options: ["freezer", "oven", "drawer", "lamp"], correct: 0, explanation: "You keep milk cold in the freezer!" },
          { sentence: "The programmer wrote code that fixed the bug in ___", options: ["production", "imagination", "dreams", "stories"], correct: 0, explanation: "Code runs in production systems — not dreams." }
        ];

        let currentQuestion = 0;
        let score = 0;

        function loadQuestion() {
          const q = questions[currentQuestion];
          document.getElementById('sentenceDisplay').innerHTML = q.sentence.replace('___', '<span style="display:inline-block;min-width:120px;padding:5px 15px;background:linear-gradient(135deg, #00f5d4 0%, #9b5de5 100%);border-radius:6px;margin:0 5px;animation:pulse 1.5s infinite"></span>');
          
          const optionsContainer = document.getElementById('tokenOptions');
          optionsContainer.innerHTML = '';
          q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'token-btn';
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(i);
            optionsContainer.appendChild(btn);
          });

          document.getElementById('gameResult').style.display = 'none';
          document.getElementById('score').textContent = score;
          document.getElementById('total').textContent = currentQuestion;
        }

        function checkAnswer(index) {
          const q = questions[currentQuestion];
          const buttons = document.querySelectorAll('.token-btn');
          
          buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === q.correct) btn.classList.add('correct');
            else if (i === index && index !== q.correct) btn.classList.add('incorrect');
          });

          if (index === q.correct) {
            score++;
            document.getElementById('score').textContent = score;
          }

          document.getElementById('total').textContent = currentQuestion + 1;
          document.getElementById('gameResult').style.display = 'block';
          document.getElementById('resultText').textContent = q.explanation;
        }

        function nextQuestion() {
          currentQuestion = (currentQuestion + 1) % questions.length;
          loadQuestion();
        }

        document.getElementById('nextBtn').addEventListener('click', nextQuestion);
        loadQuestion();
      `}} />
    </>
  );
}
