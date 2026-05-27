/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";

interface ConfettiProps {
  active: boolean;
  type?: "burst" | "continuous";
}

export const Confetti: React.FC<ConfettiProps> = ({ active, type = "burst" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      rotation: number;
      rotationSpeed: number;
      shape: "circle" | "rect" | "star";
    }

    const particles: Particle[] = [];
    const colors = ["#F0A500", "#E91E8C", "#9B59D0", "#FFD166", "#10B981", "#3B82F6"];

    const createParticle = (originX: number, originY: number, angle: number, speed: number): Particle => {
      const radius = Math.random() * 6 + 3;
      return {
        x: originX,
        y: originY,
        r: radius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        shape: Math.random() > 0.6 ? "circle" : Math.random() > 0.4 ? "star" : "rect",
      };
    };

    // Initial burst
    if (type === "burst") {
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4;
        particles.push(createParticle(width / 2, height / 2 - 100, angle, speed));
      }
    } else {
      // Stream particles from sides
      const particleCount = 60;
      for (let i = 0; i < particleCount; i++) {
        const side = Math.random() > 0.5;
        const x = side ? 50 : width - 50;
        const angle = side ? -Math.random() * Math.PI * 0.4 : -Math.PI + Math.random() * Math.PI * 0.4;
        const speed = Math.random() * 12 + 6;
        particles.push(createParticle(x, height - 100, angle, speed));
      }
    }

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string, alpha: number) => {
      if (!ctx) return;
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // gravity effect
        p.vx *= 0.98; // wind drag friction
        p.alpha -= 0.01;
        p.rotation += p.rotationSpeed;

        if (p.alpha <= 0 || p.y > height + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "rect") {
          ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        } else if (p.shape === "star") {
          ctx.restore(); // Star has its own restore
          drawStar(p.x, p.y, 5, p.r, p.r / 2, p.color, p.alpha);
          ctx.save(); // keep stack symmetric
        }
        ctx.restore();
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(updateAndDraw);
      }
    };

    updateAndDraw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [active, type]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
