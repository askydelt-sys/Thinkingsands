# LLM History Interactive Presentation - Storyboard

## Overview
An immersive, scroll-driven experience taking ~10 minutes to explore. Each section slides in from different directions as you scroll, creating a cinematic reveal effect.

---

## Section 1: "The Dream of Machines That Speak" (2 min)
**Visual**: Old computer terminals, paper tape, mechanical switches
**Content**:
- 1954: Georgetown-IBM Experiment - First machine translation
- 1966: ELIZA - Joseph Weizenbaum's therapist
- The dream: can machines understand language?

**Interactive Element**: "Type a sentence, see it 'translated' mechanically"

---

## Section 2: "The Neural Dawn" (1.5 min)
**Visual**: Neuron diagrams, network visualizations
**Content**:
- 1957: Perceptron (Rosenblatt)
- 1986: Backpropagation (Rumelhart, Hinton, Williams)
- The insight: learn from data, not rules

**Reference**: Rumelhart et al. 1986 - Learning representations by back-propagating errors

---

## Section 3: "Words as Numbers" (1.5 min)
**Visual**: Floating word vectors in 3D space
**Content**:
- Word2Vec (Mikolov et al., 2013)
- Embeddings: "king - man + woman ≈ queen"
- The breakthrough: meaning as geometry

**Interactive Element**: Drag words to see vector relationships

**Reference**: Mikolov et al. - Efficient Estimation of Word Representations in Vector Space

---

## Section 4: "Attention Is All You Need" (2 min)
**Visual**: Transformer architecture visualization, heads moving
**Content**:
- 2017: Vaswani et al. paper
- Self-attention: everything looks at everything
- Parallel processing, long-range dependencies

**Interactive Element**: Click words to see attention weights light up

**Reference**: Vaswani et al. - Attention Is All You Need (2017)

---

## Section 5: "The Token Game" - Interactive Section (2 min)
**Visual**: Clean terminal-style interface
**Content**: **PLAYABLE TOKEN PREDICTION GAME**
- Show partial sentence
- Present 4 token choices
- Show how selection changes meaning
- Track score

**Examples**:
1. "The cat sat on the ___"
   - mat ✓
   - moon
   - happiness
   - thinking

2. "After eating, the ___ died"
   - cat
   - philosopher ✓ (context-dependent)
   - rock

3. "I regret to inform you that your ___ has been approved"
   - application
   - rejection
   - confusion

---

## Section 6: "Thinking Sand" (1.5 min)
**Visual**: Sand particles forming neural network
**Content**:
- 175 billion parameters (GPT-4 estimate)
- Silicon as substrate
- "Grains of sand that learned to think"
- The physical reality: compute, memory, electricity

**Reference**: Kaplan et al. - Scaling Laws for Neural Language Models

---

## Section 7: "Agents in the Machine" (1.5 min)
**Visual**: Robot figure assembling itself
**Content**:
- Tool use: calculators, code interpreters, web search
- Chain-of-thought: think step by step
- ReAct: reasoning + acting
- AutoGPT, BabyAGI, Claude's tools

**Reference**: Wei et al. - Chain-of-Thought Prompting Elicits Reasoning

---

## Section 8: "The Present & The Frontier" (1.5 min)
**Visual**: Timeline stretching to horizon
**Content**:
- OpenAI: GPT-4, o1, ChatGPT
- Anthropic: Claude, Constitutional AI
- Google: Gemini
- Meta: Llama, open source revolution
- The race continues

**Reference**: https://openai.com, https://anthropic.com, https://arxiv.org

---

## Section 9: "What Comes Next" (1 min)
**Visual**: Stars, constellation forming
**Content**:
- AGI: when?
- Alignment problem
- Open questions
- The story continues...

**CTA**: Links to learn more, papers, courses

---

## Technical Approach
- Single HTML file with embedded CSS/JS
- Intersection Observer for scroll animations
- CSS transforms for slide-in effects (translateX, translateY)
- No external dependencies except fonts
- Responsive design
- Smooth scroll behavior
