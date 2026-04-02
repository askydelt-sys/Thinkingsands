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

    // Create neural network nodes
    const NODE_COUNT = Math.min(80, Math.floor(width * height / 15000));
    const MAX_CONNECTIONS = 200;
    const CONNECTION_DIST = Math.min(280, width * 0.22);

    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const layer = Math.floor(Math.random() * 5);
      const baseRadius = 1.2 + Math.random() * 2.2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 600 - 300, // depth for parallax
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        vz: (Math.random() - 0.5) * 0.05,
        radius: baseRadius,
        baseRadius,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
        layer,
        activation: 0,
        activationTarget: 0,
        activationSpeed: 0.01 + Math.random() * 0.03,
      });
    }

    const signals: Signal[] = [];
    let signalTimer = 0;

    // Precompute connections (edges)
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

    // Fire a signal cascade (simulates weight recalculation)
    function fireSignalCascade() {
      const startIdx = Math.floor(Math.random() * nodes.length);
      nodes[startIdx].activationTarget = 1;

      // Find neighbours and fire signals to them
      const conns = getConnections();
      const neighbours = conns.filter(c => c[0] === startIdx || c[1] === startIdx);
      const count = Math.min(neighbours.length, 3 + Math.floor(Math.random() * 3));

      for (let i = 0; i < count; i++) {
        const conn = neighbours[i];
        if (!conn) break;
        const toIdx = conn[0] === startIdx ? conn[1] : conn[0];
        signals.push({
          fromIdx: startIdx,
          toIdx,
          progress: 0,
          speed: 0.008 + Math.random() * 0.012,
          strength: 0.5 + Math.random() * 0.5,
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
      // Fire new signal cascades periodically
      if (signalTimer % 90 === 0) {
        fireSignalCascade();
      }
      // Random secondary firings
      if (Math.random() < 0.02) {
        fireSignalCascade();
      }

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Subtle parallax from scroll
        const parallax = node.z * 0.0002;
        node.y += scrollY * parallax * 0.01;

        // Boundaries with wrapping
        if (node.x < -30) node.x = width + 30;
        if (node.x > width + 30) node.x = -30;
        if (node.y < -30) node.y = height + 30;
        if (node.y > height + 30) node.y = -30;
        if (node.z < -300) node.z = 300;
        if (node.z > 300) node.z = -300;

        // Pulse
        node.pulse += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulse) * 0.4;

        // Activation decay
        node.activation += (node.activationTarget - node.activation) * node.activationSpeed;
        node.activationTarget *= 0.98;
      }

      // Get connections
      const conns = getConnections();

      // Draw connections (synapses)
      for (const [i, j, dist] of conns) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const opacity = (1 - dist / CONNECTION_DIST) * 0.1;
        const activation = Math.max(n1.activation, n2.activation);
        const activatedOpacity = opacity + activation * 0.18;

        // Depth-based brightness
        const avgZ = (n1.z + n2.z) / 2;
        const depthFactor = 0.45 + 0.55 * ((avgZ + 300) / 600);

        const r = 75 + activation * 45;
        const g = 75 + activation * 35;
        const b = 85 + activation * 25;

        ctx!.beginPath();
        ctx!.moveTo(n1.x, n1.y);
        ctx!.lineTo(n2.x, n2.y);
        ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${activatedOpacity * depthFactor})`;
        ctx!.lineWidth = 0.5 + activation * 0.8;
        ctx!.stroke();
      }

      // Draw signals (traveling pulses along connections)
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;
        sig.life -= 0.008;

        if (sig.progress >= 1 || sig.life <= 0) {
          // Signal arrived — activate target and maybe cascade
          if (sig.progress >= 1) {
            nodes[sig.toIdx].activationTarget = Math.min(1, sig.strength * 0.7);

            // Cascade: small chance to propagate further
            if (Math.random() < 0.3) {
              const nextConns = conns.filter(c =>
                (c[0] === sig.toIdx || c[1] === sig.toIdx) &&
                c[0] !== sig.fromIdx && c[1] !== sig.fromIdx
              );
              if (nextConns.length > 0) {
                const nextConn = nextConns[Math.floor(Math.random() * nextConns.length)];
                const nextTo = nextConn[0] === sig.toIdx ? nextConn[1] : nextConn[0];
                signals.push({
                  fromIdx: sig.toIdx,
                  toIdx: nextTo,
                  progress: 0,
                  speed: 0.006 + Math.random() * 0.01,
                  strength: sig.strength * 0.6,
                  life: 1,
                });
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
        const signalAlpha = sig.life * sig.strength * 0.7;

        // Glow
        const grad = ctx!.createRadialGradient(px, py, 0, px, py, 7 + sig.strength * 5);
        grad.addColorStop(0, `rgba(160, 160, 185, ${signalAlpha})`);
        grad.addColorStop(0.5, `rgba(120, 120, 140, ${signalAlpha * 0.35})`);
        grad.addColorStop(1, 'rgba(95, 95, 115, 0)');
        ctx!.beginPath();
        ctx!.arc(px, py, 7 + sig.strength * 5, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(200, 200, 220, ${signalAlpha})`;
        ctx!.fill();
      }

      // Draw nodes (neurons)
      for (const node of nodes) {
        const depthFactor = 0.35 + 0.65 * ((node.z + 300) / 600);
        const act = node.activation;

        // Outer glow when activated
        if (act > 0.05) {
          const glowR = node.radius * (3.5 + act * 7);
          const grad = ctx!.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
          grad.addColorStop(0, `rgba(140, 140, 168, ${act * 0.18 * depthFactor})`);
          grad.addColorStop(1, 'rgba(95, 95, 115, 0)');
          ctx!.beginPath();
          ctx!.arc(node.x, node.y, glowR, 0, Math.PI * 2);
          ctx!.fillStyle = grad;
          ctx!.fill();
        }

        // Node body
        const r = 65 + act * 65;
        const g = 65 + act * 55;
        const b = 73 + act * 45;
        const alpha = (0.3 + act * 0.55) * depthFactor;

        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius * depthFactor, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.fill();

        // Bright core for activated nodes
        if (act > 0.2) {
          ctx!.beginPath();
          ctx!.arc(node.x, node.y, node.radius * 0.4 * depthFactor, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(185, 185, 205, ${act * 0.45 * depthFactor})`;
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
