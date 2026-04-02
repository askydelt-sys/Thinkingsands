'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  baseRadius: number;
  pulse: number;
  pulseSpeed: number;
  layer: number;
  activation: number;
  activationTarget: number;
  activationSpeed: number;
}

interface Signal {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  strength: number;
  life: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  brightness: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + 'px';
      canvas!.style.height = height + 'px';
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    // Create neural network nodes — more nodes for denser network
    const NODE_COUNT = Math.min(100, Math.floor(width * height / 12000));
    const MAX_CONNECTIONS = 300;
    const CONNECTION_DIST = Math.min(320, width * 0.25);

    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const layer = Math.floor(Math.random() * 5);
      const baseRadius = 1.5 + Math.random() * 2.5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 600 - 300,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        vz: (Math.random() - 0.5) * 0.06,
        radius: baseRadius,
        baseRadius,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.018,
        layer,
        activation: 0,
        activationTarget: 0,
        activationSpeed: 0.02 + Math.random() * 0.04,
      });
    }

    const signals: Signal[] = [];
    const sparkles: Sparkle[] = [];
    let signalTimer = 0;

    function getConnections(): [number, number, number][] {
      const conns: [number, number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            conns.push([i, j, dist]);
          }
          if (conns.length > MAX_CONNECTIONS) break;
        }
        if (conns.length > MAX_CONNECTIONS) break;
      }
      return conns;
    }

    // Emit sparkles at a position
    function emitSparkles(x: number, y: number, count: number, strength: number) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2.5 * strength;
        sparkles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.4 + Math.random() * 0.6,
          size: 0.8 + Math.random() * 2 * strength,
          brightness: 0.6 + Math.random() * 0.4,
        });
      }
    }

    function fireSignalCascade() {
      const startIdx = Math.floor(Math.random() * nodes.length);
      nodes[startIdx].activationTarget = 1;
      // Sparkle burst at origin
      emitSparkles(nodes[startIdx].x, nodes[startIdx].y, 6, 1);

      const conns = getConnections();
      const neighbours = conns.filter(c => c[0] === startIdx || c[1] === startIdx);
      // Fire more signals per cascade
      const count = Math.min(neighbours.length, 4 + Math.floor(Math.random() * 4));

      for (let i = 0; i < count; i++) {
        const conn = neighbours[i];
        if (!conn) break;
        const toIdx = conn[0] === startIdx ? conn[1] : conn[0];
        signals.push({
          fromIdx: startIdx,
          toIdx,
          progress: 0,
          speed: 0.01 + Math.random() * 0.015,
          strength: 0.6 + Math.random() * 0.4,
          life: 1,
        });
      }
    }

    let scrollY = 0;
    function onScroll() {
      scrollY = window.scrollY;
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      signalTimer++;
      // Fire cascades more frequently
      if (signalTimer % 60 === 0) {
        fireSignalCascade();
      }
      if (Math.random() < 0.035) {
        fireSignalCascade();
      }

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        const parallax = node.z * 0.0002;
        node.y += scrollY * parallax * 0.01;

        if (node.x < -30) node.x = width + 30;
        if (node.x > width + 30) node.x = -30;
        if (node.y < -30) node.y = height + 30;
        if (node.y > height + 30) node.y = -30;
        if (node.z < -300) node.z = 300;
        if (node.z > 300) node.z = -300;

        node.pulse += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulse) * 0.5;

        node.activation += (node.activationTarget - node.activation) * node.activationSpeed;
        node.activationTarget *= 0.97;
      }

      const conns = getConnections();

      // Draw connections (synapses) — brighter
      for (const [i, j, dist] of conns) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const opacity = (1 - dist / CONNECTION_DIST) * 0.14;
        const activation = Math.max(n1.activation, n2.activation);
        const activatedOpacity = opacity + activation * 0.35;

        const avgZ = (n1.z + n2.z) / 2;
        const depthFactor = 0.5 + 0.5 * ((avgZ + 300) / 600);

        const r = 90 + activation * 60;
        const g = 90 + activation * 50;
        const b = 100 + activation * 40;

        ctx!.beginPath();
        ctx!.moveTo(n1.x, n1.y);
        ctx!.lineTo(n2.x, n2.y);
        ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${activatedOpacity * depthFactor})`;
        ctx!.lineWidth = 0.6 + activation * 1.2;
        ctx!.stroke();

        // Bright flash on connection when both nodes are highly active
        if (activation > 0.5) {
          ctx!.beginPath();
          ctx!.moveTo(n1.x, n1.y);
          ctx!.lineTo(n2.x, n2.y);
          ctx!.strokeStyle = `rgba(200, 200, 225, ${(activation - 0.5) * 0.15 * depthFactor})`;
          ctx!.lineWidth = 1.5 + activation * 1.5;
          ctx!.stroke();
        }
      }

      // Draw signals (traveling pulses) — much brighter with trail
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;
        sig.life -= 0.006;

        if (sig.progress >= 1 || sig.life <= 0) {
          if (sig.progress >= 1) {
            nodes[sig.toIdx].activationTarget = Math.min(1, sig.strength * 0.8);
            // SPARKLE BURST on arrival
            emitSparkles(nodes[sig.toIdx].x, nodes[sig.toIdx].y, 4 + Math.floor(sig.strength * 5), sig.strength);

            // Cascade with higher probability
            if (Math.random() < 0.4) {
              const nextConns = conns.filter(c =>
                (c[0] === sig.toIdx || c[1] === sig.toIdx) &&
                c[0] !== sig.fromIdx && c[1] !== sig.fromIdx
              );
              if (nextConns.length > 0) {
                const cascadeCount = Math.min(nextConns.length, 1 + Math.floor(Math.random() * 2));
                for (let c = 0; c < cascadeCount; c++) {
                  const nextConn = nextConns[Math.floor(Math.random() * nextConns.length)];
                  const nextTo = nextConn[0] === sig.toIdx ? nextConn[1] : nextConn[0];
                  signals.push({
                    fromIdx: sig.toIdx,
                    toIdx: nextTo,
                    progress: 0,
                    speed: 0.008 + Math.random() * 0.012,
                    strength: sig.strength * 0.65,
                    life: 1,
                  });
                }
              }
            }
          }
          signals.splice(s, 1);
          continue;
        }

        const from = nodes[sig.fromIdx];
        const to = nodes[sig.toIdx];
        const px = from.x + (to.x - from.x) * sig.progress;
        const py = from.y + (to.y - from.y) * sig.progress;
        const signalAlpha = sig.life * sig.strength;

        // Large outer glow
        const glowSize = 12 + sig.strength * 8;
        const grad = ctx!.createRadialGradient(px, py, 0, px, py, glowSize);
        grad.addColorStop(0, `rgba(190, 195, 220, ${signalAlpha * 0.5})`);
        grad.addColorStop(0.3, `rgba(150, 155, 180, ${signalAlpha * 0.2})`);
        grad.addColorStop(0.6, `rgba(110, 115, 140, ${signalAlpha * 0.06})`);
        grad.addColorStop(1, 'rgba(80, 85, 110, 0)');
        ctx!.beginPath();
        ctx!.arc(px, py, glowSize, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        // Bright core
        ctx!.beginPath();
        ctx!.arc(px, py, 2.2 + sig.strength, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(220, 225, 245, ${signalAlpha * 0.8})`;
        ctx!.fill();

        // Hot white center
        ctx!.beginPath();
        ctx!.arc(px, py, 1, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${signalAlpha * 0.6})`;
        ctx!.fill();

        // Trail sparkles behind the signal
        if (Math.random() < 0.3) {
          emitSparkles(px, py, 1, sig.strength * 0.3);
        }
      }

      // Draw sparkles
      for (let s = sparkles.length - 1; s >= 0; s--) {
        const sp = sparkles[s];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.96;
        sp.vy *= 0.96;
        sp.life -= 1 / (sp.maxLife * 60);

        if (sp.life <= 0) {
          sparkles.splice(s, 1);
          continue;
        }

        const alpha = sp.life * sp.brightness;
        const size = sp.size * (0.5 + sp.life * 0.5);

        // Sparkle glow
        const sg = ctx!.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, size * 3);
        sg.addColorStop(0, `rgba(200, 210, 240, ${alpha * 0.4})`);
        sg.addColorStop(0.5, `rgba(160, 170, 200, ${alpha * 0.1})`);
        sg.addColorStop(1, 'rgba(120, 130, 160, 0)');
        ctx!.beginPath();
        ctx!.arc(sp.x, sp.y, size * 3, 0, Math.PI * 2);
        ctx!.fillStyle = sg;
        ctx!.fill();

        // Sparkle core — bright white/blue point
        ctx!.beginPath();
        ctx!.arc(sp.x, sp.y, size * 0.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(230, 235, 255, ${alpha * 0.9})`;
        ctx!.fill();

        // Tiny hot pixel at center
        if (sp.life > 0.5) {
          ctx!.beginPath();
          ctx!.arc(sp.x, sp.y, 0.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx!.fill();
        }
      }

      // Draw nodes (neurons) — brighter
      for (const node of nodes) {
        const depthFactor = 0.4 + 0.6 * ((node.z + 300) / 600);
        const act = node.activation;

        // Outer glow — bigger and brighter when activated
        if (act > 0.03) {
          const glowR = node.radius * (4 + act * 10);
          const grad = ctx!.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
          grad.addColorStop(0, `rgba(160, 165, 195, ${act * 0.25 * depthFactor})`);
          grad.addColorStop(0.5, `rgba(120, 125, 155, ${act * 0.08 * depthFactor})`);
          grad.addColorStop(1, 'rgba(90, 95, 120, 0)');
          ctx!.beginPath();
          ctx!.arc(node.x, node.y, glowR, 0, Math.PI * 2);
          ctx!.fillStyle = grad;
          ctx!.fill();
        }

        // Node body — significantly brighter
        const r = 80 + act * 80;
        const g = 80 + act * 70;
        const b = 90 + act * 60;
        const alpha = (0.4 + act * 0.55) * depthFactor;

        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius * depthFactor, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.fill();

        // Bright core for activated nodes
        if (act > 0.15) {
          ctx!.beginPath();
          ctx!.arc(node.x, node.y, node.radius * 0.5 * depthFactor, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(210, 215, 240, ${act * 0.6 * depthFactor})`;
          ctx!.fill();
        }

        // White hot center at peak activation
        if (act > 0.6) {
          ctx!.beginPath();
          ctx!.arc(node.x, node.y, node.radius * 0.25 * depthFactor, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255, 255, 255, ${(act - 0.6) * 0.8 * depthFactor})`;
          ctx!.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
