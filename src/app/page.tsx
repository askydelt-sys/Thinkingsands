export default function Home() {
  return (
    <>
      <div className="progress-bar" id="progressBar" style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'linear-gradient(135deg, #00f5d4 0%, #9b5de5 100%)', zIndex: 1000, transition: 'width 0.1s ease', width: '0%' }} />

      <nav className="nav-dots" style={{ position: 'fixed', right: '30px', top: '50%', transform: 'translateY(-50%)', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {['intro', 'dream', 'neural', 'embeddings', 'transformer', 'token-game', 'sand', 'agents', 'present', 'future'].map((id, i) => (
          <div key={id} className="nav-dot" data-section={id} data-label={['', 'The Dream', 'Neural Dawn', 'Word Vectors', 'Transformer', 'Token Game', 'Thinking Sand', 'Agents', 'Present', 'Future'][i]} style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative' }} />
        ))}
      </nav>

      {/* INTRO */}
      <section id="intro" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)' }}>
        <div className="section-content" style={{ textAlign: 'center', opacity: 1, transform: 'scale(1)' }}>
          <p style={{ fontSize: '1.4rem', color: '#a0a0b0', marginBottom: '40px' }}>A Journey Through</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '30px', background: 'linear-gradient(135deg, #00f5d4 0%, #9b5de5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            From Translation Machines<br />to <span style={{ color: '#00f5d4' }}>Thinking Sand</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '600px', margin: '0 auto' }}>The remarkable story of how machines learned to understand, reason, and perhaps even think.</p>
        </div>
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: '#a0a0b0', fontSize: '14px', animation: 'bounce 2s infinite' }}>
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f5d4" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* THE DREAM */}
      <section id="dream" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#0a0a0f' }}>
        <div className="section-content slide-left" style={{ maxWidth: '1200px', width: '100%', opacity: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px', position: 'relative' }}>The Dream of Machines That Speak</h2>
          <p style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '20px' }}>Long before neural networks, computer scientists dreamed of machines that could understand human language. The journey began with a simple question: Can computers translate?</p>
          
          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'linear-gradient(135deg, #00f5d4 0%, #9b5de5 100%)' }}></div>
            
            {[
              { year: '1954', title: 'The Georgetown-IBM Experiment', desc: 'The first public demonstration of machine translation. Sixty Russian sentences were automatically translated to English.' },
              { year: '1966', title: 'ELIZA: The First Conversation', desc: 'Joseph Weizenbaum created ELIZA, mimicking a Rogerian therapist. It was simple pattern matching, but people believed.' },
              { year: '1980s-1990s', title: 'Rule-Based Systems Fail', desc: 'Decades of attempts to code language rules proved insufficient. The complexity was infinite.' }
            ].map((item, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: '40px', padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease' }}>
                <div style={{ position: 'absolute', left: '-46px', top: '30px', width: '14px', height: '14px', borderRadius: '50%', background: '#00f5d4', boxShadow: '0 0 20px #00f5d4' }}></div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: '#f15bb5', marginBottom: '8px', display: 'block' }}>{item.year}</span>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{item.title}</h4>
                <p style={{ fontSize: '1rem', color: '#a0a0b0', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '25px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', maxWidth: '400px', marginTop: '40px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca40' }}></div>
            </div>
            <div style={{ color: '#a0a0b0', marginBottom: '8px' }}>&gt; ELIZA: How do you do. Please tell me your problem.</div>
            <div style={{ color: '#a0a0b0', marginBottom: '8px' }}>&gt; USER: My cat is sad</div>
            <div style={{ color: '#a0a0b0' }}>&gt; ELIZA: Tell me more about your <span style={{ color: '#00f5d4' }}>cat</span></div>
          </div>

          <a href="https://en.wikipedia.org/wiki/ELIZA" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(155, 93, 229, 0.2)', border: '1px solid rgba(155, 93, 229, 0.3)', borderRadius: '8px', color: '#9b5de5', textDecoration: 'none', fontSize: '0.9rem', marginTop: '15px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            Learn about ELIZA on Wikipedia
          </a>
        </div>
      </section>

      {/* TOKEN GAME SECTION */}
      <section id="token-game" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#0a0a0f' }}>
        <div className="section-content" style={{ maxWidth: '800px', width: '100%', opacity: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>The Token Game</h2>
          <p style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '20px' }}>Large Language Models predict the next token. They&apos;re sophisticated autocomplete engines. Let&apos;s play:</p>

          <div style={{ background: 'linear-gradient(145deg, #1a1a24, #12121a)', borderRadius: '20px', padding: '40px', border: '1px solid rgba(255,255,255,0.1)', marginTop: '30px' }}>
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

          <p style={{ marginTop: '20px', fontSize: '1rem', color: '#f15bb5' }}>This is exactly what GPT, Claude, and every LLM does — just with billions of parameters!</p>
        </div>
      </section>

      {/* THINKING SAND */}
      <section id="sand" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#12121a' }}>
        <div className="section-content slide-left" style={{ maxWidth: '1200px', width: '100%', opacity: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>Thinking Sand</h2>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#00f5d4', marginBottom: '15px' }}>175 billion parameters. Silicon as substrate.</h3>
          <p style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '20px' }}>Inside every modern LLM are billions of numerical values — &quot;weights&quot; — arranged in matrices. Together, they form a computational substrate that processes meaning.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {[
              { icon: '🖥️', title: 'The Hardware', desc: 'Thousands of GPU/TPU chips working in parallel. Each capable of trillions of operations per second.' },
              { icon: '⚡', title: 'The Energy', desc: 'Training GPT-3 consumed about 1 GWh — enough to power 1000 homes for a month.' },
              { icon: '🧮', title: 'The Math', desc: 'Matrix multiplications, softmax functions, residual connections — elegant mathematics producing emergent intelligence.' }
            ].map((card, i) => (
              <div key={i} style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.4s ease' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{card.icon}</div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{card.title}</h4>
                <p style={{ fontSize: '1rem', margin: 0, color: '#a0a0b0' }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <a href="https://arxiv.org/abs/2001.08361" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(155, 93, 229, 0.2)', border: '1px solid rgba(155, 93, 229, 0.3)', borderRadius: '8px', color: '#9b5de5', textDecoration: 'none', fontSize: '0.9rem', marginTop: '25px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            Kaplan et al. - Scaling Laws for Neural Language Models
          </a>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#0a0a0f' }}>
        <div className="section-content slide-right" style={{ maxWidth: '1200px', width: '100%', opacity: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>Agents in the Machine</h2>
          <p style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '40px' }}>LLMs alone are just text predictors. But give them tools, memory, and the ability to act iteratively — and they become something new: AI agents.</p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            {[
              { step: '1', title: 'Reason', desc: 'Think step-by-step using chain-of-thought prompting' },
              { step: '2', title: 'Plan', desc: 'Break complex tasks into manageable subtasks' },
              { step: '3', title: 'Act', desc: 'Use tools — web search, calculators, code execution' },
              { step: '4', title: 'Reflect', desc: 'Evaluate results and adjust approach if needed' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 30px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '4px solid #9b5de5', transition: 'all 0.3s ease', width: '100%', maxWidth: '600px' }}>
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
              <div key={i} style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{card.title}</h4>
                <p style={{ fontSize: '1rem', margin: 0, color: '#a0a0b0' }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(155, 93, 229, 0.2)', border: '1px solid rgba(155, 93, 229, 0.3)', borderRadius: '8px', color: '#9b5de5', textDecoration: 'none', fontSize: '0.9rem', marginTop: '25px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            Wei et al. - Chain-of-Thought Prompting Elicits Reasoning
          </a>
        </div>
      </section>

      {/* THE PRESENT */}
      <section id="present" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative', background: '#12121a' }}>
        <div className="section-content slide-up" style={{ maxWidth: '1200px', width: '100%', opacity: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>The Present & The Frontier</h2>
          <p style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', marginBottom: '40px' }}>We&apos;re living through an extraordinary moment. AI capabilities are advancing at a pace we&apos;ve never seen before.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {[
              { color: '#00f5d4', name: 'OpenAI', desc: 'GPT-4, o1 reasoning models, Sora video generation, ChatGPT with voice and vision.', link: 'https://openai.com' },
              { color: '#9b5de5', name: 'Anthropic', desc: 'Claude models emphasizing safety and helpfulness. Constitutional AI training.', link: 'https://anthropic.com' },
              { color: '#f15bb5', name: 'Google', desc: 'Gemini family, DeepMind research, integration into Search and Workspace.', link: 'https://deepmind.google' },
              { color: '#fee440', name: 'Meta & Open Source', desc: 'Llama models released openly. Mistral, Falcon, and thousands of fine-tunes.', link: 'https://github.com/meta-llama' }
            ].map((company, i) => (
              <div key={i} style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.08)' }}>
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
        <div className="section-content" style={{ maxWidth: '900px', width: '100%', textAlign: 'center', opacity: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, marginBottom: '25px' }}>What Comes Next?</h2>
          <p style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '700px', margin: '0 auto 40px' }}>The story of AI is far from over. What happens when systems become more capable? More autonomous? More integrated into our lives?</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '60px' }}>
            {[
              { icon: '🤖', title: 'AGI: When?', desc: 'Artificial General Intelligence — machines that can do any intellectual task a human can.' },
              { icon: '⚖️', title: 'Alignment Problem', desc: 'How do we ensure AI systems do what we want? The most important challenge of our time.' },
              { icon: '🌍', title: 'Society & Work', desc: 'Automation of cognitive tasks. New jobs, displaced jobs. The transformation has only begun.' }
            ].map((card, i) => (
              <div key={i} style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'left' }}>
                <div style={{ fontSize: '2rem', marginBottom: '15px' }}>{card.icon}</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{card.title}</h4>
                <p style={{ fontSize: '1rem', margin: 0, color: '#a0a0b0' }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <h3 style={{ color: '#00f5d4', marginBottom: '20px', fontSize: '1.5rem' }}>Continue Learning</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
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
        <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontWeight: 600 }}>The Journey Continues</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 30px', color: '#a0a0b0' }}>From mechanical translation to silicon thought — and whatever comes next. The story of AI is ultimately the story of human ambition.</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
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
        
        <p style={{ color: '#a0a0b0', fontSize: '0.9rem' }}>An interactive journey through LLM history. Created with curiosity and admiration for the researchers who made it possible.</p>
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
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
        // Progress bar
        window.addEventListener('scroll', () => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (scrollTop / docHeight) * 100;
          document.getElementById('progressBar').style.width = scrollPercent + '%';
        });

        // Navigation dots
        const sections = document.querySelectorAll('section');
        const navDots = document.querySelectorAll('.nav-dot');

        const observerOptions = {
          root: null,
          rootMargin: '-50% 0px -50% 0px',
          threshold: 0
        };

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
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));

        navDots.forEach(dot => {
          dot.addEventListener('click', () => {
            const section = document.getElementById(dot.dataset.section);
            section.scrollIntoView({ behavior: 'smooth' });
          });
        });

        // Token Game
        const questions = [
          { sentence: "The cat sat on the ___", options: ["mat", "moon", "happiness", "thinking"], correct: 0, explanation: "The most grammatically and semantically sensible completion." },
          { sentence: "After eating, the ___ died", options: ["person", "fish", "restaurant", "happy"], correct: 1, explanation: "Classic Winograd schema! 'The fish' makes sense — it ate the food, then died." },
          { sentence: "I regret to inform you that your ___ has been approved", options: ["application", "rejection", "complaint", "problem"], correct: 0, explanation: "Only 'application' collocates naturally with 'approved'." },
          { sentence: "The trophy would not fit in the suitcase because ___", options: ["it was too big", "it was too small", "it was shiny", "it was heavy"], correct: 0, explanation: "The trophy is too big for the suitcase — another Winograd schema!" },
          { sentence: "Scientists have discovered that ___ is the key to longevity", options: ["exercise", "sleep", "happiness", "all of the above"], correct: 3, explanation: "Current research suggests all three factors contribute to longevity." },
          { sentence: "The artist painted a picture of the ___ at sunset", options: ["ocean", "keyboard", "telephone", "algorithm"], correct: 0, explanation: "Only 'ocean' creates a coherent scene with 'sunset'." },
          { sentence: "She put the milk in the ___ to keep it cold", options: ["freezer", "oven", "drawer", "lamp"], correct: 0, explanation: "You keep milk cold in the freezer — not in an oven!" },
          { sentence: "The programmer wrote code that fixed the bug in ___", options: ["production", "imagination", "dreams", "stories"], correct: 0, explanation: "Code runs in production systems — not in dreams or stories." }
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
            if (i === q.correct) {
              btn.classList.add('correct');
            } else if (i === index && index !== q.correct) {
              btn.classList.add('incorrect');
            }
          });

          if (index === q.correct) {
            score++;
            document.getElementById('score').textContent = score;
          }

          document.getElementById('total').textContent = currentQuestion + 1;
          
          const resultDiv = document.getElementById('gameResult');
          resultDiv.style.display = 'block';
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
