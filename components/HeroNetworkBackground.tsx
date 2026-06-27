"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient animated background: drifting nodes connected by thin lines
 * that occasionally form simple polygons (triangles, squares,
 * pentagons) before dissolving. Pure Canvas2D — no external libraries,
 * GPU-light, and respects prefers-reduced-motion by rendering a single
 * static frame instead of animating.
 *
 * Designed to sit behind hero text at very low opacity so it reads as
 * texture, not a distraction.
 */
export default function HeroNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    let nodes: Node[] = [];
    const NODE_COUNT_DESKTOP = 42;
    const NODE_COUNT_MOBILE = 22;
    const CONNECT_DISTANCE = 160;
    const SHAPE_CONNECT_DISTANCE = 130;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    resize();
    window.addEventListener("resize", resize);

    let animationFrame = 0;
    let frameCount = 0;

    // Periodically pick 3-5 nearby nodes and draw a filled, fading
    // polygon between them — the "forming and dissolving shape" effect.
    let activeShape: { nodeIndices: number[]; life: number; maxLife: number } | null = null;
    let nextShapeAt = 60 + Math.random() * 120;

    function pickShape() {
      if (nodes.length < 5) return;
      const startIdx = Math.floor(Math.random() * nodes.length);
      const start = nodes[startIdx];
      const nearby = nodes
        .map((n, i) => ({ i, d: Math.hypot(n.x - start.x, n.y - start.y) }))
        .filter((n) => n.i !== startIdx && n.d < SHAPE_CONNECT_DISTANCE)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3 + Math.floor(Math.random() * 2)); // 3-4 more -> triangle/square/pentagon

      if (nearby.length >= 2) {
        activeShape = {
          nodeIndices: [startIdx, ...nearby.map((n) => n.i)],
          life: 0,
          maxLife: 90 + Math.random() * 60,
        };
      }
    }

    function draw() {
      if (prefersReducedMotion && frameCount > 0) {
        // Safety net: never schedule a second frame under reduced
        // motion, even if this function is called again for any
        // reason. The static single frame is rendered once below.
        return;
      }

      ctx!.clearRect(0, 0, width, height);

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Draw connecting lines between nearby nodes
      ctx!.strokeStyle = "rgba(14, 165, 233, 0.12)"; // sky-500, very low opacity
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * 0.15;
            ctx!.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      ctx!.fillStyle = "rgba(2, 132, 199, 0.35)"; // sky-600
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Forming/dissolving polygon shape
      if (activeShape) {
        activeShape.life++;
        const progress = activeShape.life / activeShape.maxLife;
        // Fade in for first 20%, hold, fade out for last 30%
        let opacity: number;
        if (progress < 0.2) opacity = progress / 0.2;
        else if (progress > 0.7) opacity = 1 - (progress - 0.7) / 0.3;
        else opacity = 1;
        opacity = Math.max(0, Math.min(1, opacity)) * 0.16;

        const pts = activeShape.nodeIndices.map((i) => nodes[i]).filter(Boolean);
        if (pts.length >= 3) {
          ctx!.beginPath();
          ctx!.moveTo(pts[0].x, pts[0].y);
          for (let k = 1; k < pts.length; k++) ctx!.lineTo(pts[k].x, pts[k].y);
          ctx!.closePath();
          ctx!.fillStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx!.fill();
          ctx!.strokeStyle = `rgba(2, 132, 199, ${opacity * 2})`;
          ctx!.lineWidth = 1.2;
          ctx!.stroke();
        }

        if (activeShape.life >= activeShape.maxLife) {
          activeShape = null;
          nextShapeAt = frameCount + 60 + Math.random() * 120;
        }
      } else if (frameCount >= nextShapeAt) {
        pickShape();
      }

      frameCount++;
      animationFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
