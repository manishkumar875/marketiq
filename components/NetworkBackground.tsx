"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  className?: string;
  opacity?: number;
}

export default function NetworkBackground({ className = "", opacity = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track mouse position for interactivity
  const mouse = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Support prefers-reduced-motion for accessibility
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrameId = 0;
    
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }
    
    let particles: Particle[] = [];
    
    // Configuration to match the exact effect
    const PARTICLE_COUNT = 80;
    const MAX_LINE_DISTANCE = 150;
    const BASE_COLOR = `rgba(28, 66, 126, ${0.6 * opacity})`; // #1c427e with opacity
    const LINE_COLOR = `rgba(28, 66, 126, ${0.4 * opacity})`;
    
    // Initialize or re-initialize canvas and particles
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Seed initial particles
      particles = Array.from({ length: width < 640 ? 40 : PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5, // gentle drift
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2 + 1.5 // sizes between 1.5 and 3.5
      }));
    }

    // Animation loop
    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Update positions
      if (true) {
        particles.forEach(p => {
          // Normal movement
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off edges smoothly
          if (p.x <= 0 || p.x >= width) p.vx *= -1;
          if (p.y <= 0 || p.y >= height) p.vy *= -1;

          // Mouse Repulse Effect (Hover)
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.current.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            // The closer the mouse, the stronger the push
            const force = (mouse.current.radius - distance) / mouse.current.radius;
            const pushX = forceDirectionX * force * 2;
            const pushY = forceDirectionY * force * 2;
            
            p.x += pushX;
            p.y += pushY;
          }
        });
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_LINE_DISTANCE) {
            // Lines fade out as distance increases
            const lineOpacity = (1 - dist / MAX_LINE_DISTANCE) * 0.4 * opacity;
            ctx!.strokeStyle = `rgba(28, 66, 126, ${lineOpacity})`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw particles (dots)
      particles.forEach(p => {
        ctx!.fillStyle = BASE_COLOR;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      });

      if (true) {
        animationFrameId = requestAnimationFrame(draw);
      }
    }

    // Handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    };
    
    // Mouse Click Effect (Spawn Burst)
    const handleClick = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      // Spawn 4 new particles at click location
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 4, // burst outward faster
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 2 + 1.5
        });
      }
    };

    // Initialize
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);
    
    draw();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // Note: z-0 places it behind text, but it still captures events on empty background spaces!
      className={`absolute inset-0 w-full h-full z-0 ${className}`}
    />
  );
}
