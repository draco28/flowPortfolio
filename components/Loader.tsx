"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
  topText?: string;
  bottomText?: string;
}

export function Loader({
  onComplete,
  topText = "AI AGENT BUILDER",
  bottomText = "FULL-STACK + AI",
}: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mini particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 180;
    canvas.height = 180;

    interface MiniParticle {
      x: number;
      y: number;
      angle: number;
      speed: number;
      size: number;
      color: string;
    }

    const particles: MiniParticle[] = [];
    const colors = ["#FF8B6A", "#A78BFA", "#60A5FA"];

    for (let i = 0; i < 25; i++) {
      particles.push({
        x: 90,
        y: 90,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.5 + 0.5,
        size: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(26, 26, 26, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        const dist = Math.sqrt((p.x - 90) ** 2 + (p.y - 90) ** 2);
        if (dist > 70) {
          p.x = 90;
          p.y = 90;
          p.angle = Math.random() * Math.PI * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 1 - dist / 70;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-dark flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Particle preview */}
      <canvas ref={canvasRef} className="mb-8 rounded-full" />

      {/* Top Marquee */}
      <div className="overflow-hidden w-full mb-6">
        <div className="flex whitespace-nowrap marquee">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-5xl md:text-7xl font-bold text-text-muted/15 mx-6">
              {topText}
            </span>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="relative w-56">
        <div className="h-1.5 bg-dark-card rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-coral via-accent-purple to-accent-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center mt-4 text-text-secondary text-sm font-mono">
          {progress}%
        </p>
      </div>

      {/* Bottom Marquee */}
      <div className="overflow-hidden w-full mt-6">
        <div className="flex whitespace-nowrap marquee" style={{ animationDirection: "reverse" }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-5xl md:text-7xl font-bold text-text-muted/15 mx-6">
              {bottomText}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
