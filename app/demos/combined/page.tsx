"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, Linkedin, Twitter, FileText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// MESH GRADIENT BACKGROUND
// ============================================
function MeshGradient() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #FF8B6A 0%, transparent 70%)",
          top: "5%",
          left: "15%",
          animation: "float 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)",
          top: "40%",
          right: "5%",
          animation: "float 22s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute w-[450px] h-[450px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)",
          bottom: "10%",
          left: "25%",
          animation: "float 20s ease-in-out infinite",
          animationDelay: "-8s",
        }}
      />
    </div>
  );
}

// ============================================
// PARTICLE CANVAS
// ============================================
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    targetAlpha: number;
  }

  const colors = ["#FF8B6A", "#FFB299", "#A78BFA", "#60A5FA"];

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.4 + 0.1,
      targetAlpha: Math.random() * 0.4 + 0.1,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize 80 particles for better performance
    const particleCount = 80;
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));

    // Throttled mouse tracking
    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate > 16) { // ~60fps
        mouseRef.current = { x: e.clientX, y: e.clientY };
        lastMouseUpdate = now;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.fillStyle = "rgba(26, 26, 26, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse repulsion
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          particle.vx -= (dx / dist) * force * 0.015;
          particle.vy -= (dy / dist) * force * 0.015;
          particle.targetAlpha = 0.7;
        } else {
          particle.targetAlpha = Math.random() * 0.25 + 0.1;
        }

        particle.alpha += (particle.targetAlpha - particle.alpha) * 0.05;
        particle.vx *= 0.995;
        particle.vy *= 0.995;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();

        // Draw connections (optimized - check fewer particles)
        for (let j = i + 1; j < Math.min(i + 15, particlesRef.current.length); j++) {
          const other = particlesRef.current[j];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - dist / 80) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}

// ============================================
// ANIMATED SVG AVATAR (Refined Version)
// ============================================
function AnimatedAvatar({ pose }: { pose: "standing" | "thinking" | "coding" }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, 3500 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const poses = {
    standing: { headRotation: 0, headY: 0, bodyRotation: 0, armLeftRotation: 0, armRightRotation: 0, shoulderY: 0 },
    thinking: { headRotation: -8, headY: -3, bodyRotation: -3, armLeftRotation: -40, armRightRotation: 15, shoulderY: -2 },
    coding: { headRotation: 10, headY: 5, bodyRotation: 3, armLeftRotation: -25, armRightRotation: -25, shoulderY: 3 },
  };

  const currentPose = poses[pose];

  return (
    <motion.svg
      viewBox="0 0 240 320"
      className="w-full h-full max-w-[260px] md:max-w-[300px]"
      style={{ filter: "drop-shadow(0 30px 60px rgba(255, 139, 106, 0.3))" }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <defs>
        {/* Enhanced gradients */}
        <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFDAB9" />
          <stop offset="50%" stopColor="#F4C4A0" />
          <stop offset="100%" stopColor="#E8B896" />
        </linearGradient>
        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D2D2D" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8B6A" />
          <stop offset="50%" stopColor="#FF7A55" />
          <stop offset="100%" stopColor="#E67759" />
        </linearGradient>
        <linearGradient id="pantsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D3D3D" />
          <stop offset="100%" stopColor="#2A2A2A" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Shadow filter */}
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.15"/>
        </filter>
      </defs>

      {/* Body Group */}
      <g
        style={{
          transform: `rotate(${currentPose.bodyRotation}deg)`,
          transformOrigin: "120px 200px",
          transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Neck */}
        <ellipse cx="120" cy="130" rx="18" ry="12" fill="url(#skinGradient)" />

        {/* Torso / Shirt */}
        <path
          d="M75 138 Q120 125 165 138 L172 215 Q120 225 68 215 Z"
          fill="url(#shirtGradient)"
          filter="url(#dropShadow)"
        />

        {/* Shirt collar */}
        <path
          d="M95 138 L120 155 L145 138"
          stroke="#E67759"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* AI/Code symbol on shirt */}
        <g opacity="0.3">
          <text x="108" y="185" fill="#1A1A1A" fontSize="20" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
        </g>

        {/* Left Arm */}
        <g
          style={{
            transform: `rotate(${currentPose.armLeftRotation}deg) translateY(${currentPose.shoulderY}px)`,
            transformOrigin: "78px 145px",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Upper arm */}
          <path
            d="M78 145 Q60 175 55 200"
            stroke="url(#shirtGradient)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hand */}
          <circle cx="52" cy="208" r="12" fill="url(#skinGradient)" />
        </g>

        {/* Right Arm */}
        <g
          style={{
            transform: `rotate(${currentPose.armRightRotation}deg) translateY(${currentPose.shoulderY}px)`,
            transformOrigin: "162px 145px",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Upper arm */}
          <path
            d="M162 145 Q180 175 185 200"
            stroke="url(#shirtGradient)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hand */}
          <circle cx="188" cy="208" r="12" fill="url(#skinGradient)" />
        </g>

        {/* Pants */}
        <path
          d="M80 215 L75 295 Q85 298 95 295 L105 230 L120 230 L135 295 Q145 298 155 295 L160 215 Q120 225 80 215"
          fill="url(#pantsGradient)"
        />

        {/* Belt */}
        <rect x="78" y="212" width="84" height="8" rx="2" fill="#1A1A1A" />
        <rect x="115" y="213" width="10" height="6" rx="1" fill="#A78BFA" />
      </g>

      {/* Head Group */}
      <g
        style={{
          transform: `rotate(${currentPose.headRotation}deg) translateY(${currentPose.headY}px)`,
          transformOrigin: "120px 75px",
          transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Ears */}
        <ellipse cx="68" cy="78" rx="8" ry="12" fill="url(#skinGradient)" />
        <ellipse cx="172" cy="78" rx="8" ry="12" fill="url(#skinGradient)" />

        {/* Head base */}
        <ellipse
          cx="120"
          cy="72"
          rx="52"
          ry="58"
          fill="url(#skinGradient)"
          filter="url(#softGlow)"
        />

        {/* Hair back */}
        <path
          d="M68 72 Q68 20 120 18 Q172 20 172 72"
          fill="url(#hairGradient)"
        />

        {/* Hair top/volume */}
        <path
          d="M75 55 Q90 15 120 12 Q150 15 165 55"
          fill="url(#hairGradient)"
        />

        {/* Hair side details */}
        <path
          d="M72 65 Q72 45 85 40"
          stroke="#3D3D3D"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Hair shine */}
        <path
          d="M95 30 Q110 22 125 28"
          stroke="#4A4A4A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Eyebrows */}
        <path
          d="M88 58 Q95 55 105 58"
          stroke="#2D2D2D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M135 58 Q145 55 152 58"
          stroke="#2D2D2D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes */}
        <g>
          {/* Eye whites */}
          <ellipse cx="97" cy="75" rx="12" ry="10" fill="white" />
          <ellipse cx="143" cy="75" rx="12" ry="10" fill="white" />

          {/* Iris and pupils */}
          <motion.g
            animate={{
              scaleY: isBlinking ? 0.1 : 1,
            }}
            transition={{ duration: 0.08 }}
            style={{ transformOrigin: "120px 75px" }}
          >
            <circle cx="98" cy="76" r="6" fill="#4A3728" />
            <circle cx="144" cy="76" r="6" fill="#4A3728" />
            <circle cx="98" cy="76" r="3" fill="#1A1A1A" />
            <circle cx="144" cy="76" r="3" fill="#1A1A1A" />
          </motion.g>

          {/* Eye shine */}
          {!isBlinking && (
            <>
              <circle cx="101" cy="73" r="2" fill="white" />
              <circle cx="147" cy="73" r="2" fill="white" />
              <circle cx="95" cy="78" r="1" fill="white" opacity="0.5" />
              <circle cx="141" cy="78" r="1" fill="white" opacity="0.5" />
            </>
          )}
        </g>

        {/* Nose */}
        <path
          d="M120 78 L118 92 Q120 95 122 92"
          stroke="#D4A88A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Mouth / Smile */}
        <path
          d="M105 105 Q120 115 135 105"
          stroke="#C47D68"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Subtle smile line */}
        <path
          d="M108 108 Q120 112 132 108"
          stroke="#E8B896"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </g>

      {/* Floating AI elements around avatar */}
      <g opacity="0.6">
        <motion.g
          animate={{ y: [-3, 3, -3], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <circle cx="45" cy="100" r="8" fill="url(#accentGradient)" />
          <text x="42" y="104" fill="white" fontSize="8" fontWeight="bold">AI</text>
        </motion.g>

        <motion.g
          animate={{ y: [3, -3, 3], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <rect x="185" y="95" width="20" height="16" rx="3" fill="url(#accentGradient)" />
          <text x="189" y="106" fill="white" fontSize="7" fontFamily="monospace">{`{}`}</text>
        </motion.g>
      </g>
    </motion.svg>
  );
}

// ============================================
// LOADING SCREEN
// ============================================
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
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
              AI AGENT BUILDER
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
              FULL-STACK + AI
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN COMBINED DEMO
// ============================================
export default function CombinedDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPose, setCurrentPose] = useState<"standing" | "thinking" | "coding">("standing");
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger for pose changes
  useEffect(() => {
    if (isLoading) return;

    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setCurrentPose("thinking"),
      onLeaveBack: () => setCurrentPose("standing"),
    });

    ScrollTrigger.create({
      trigger: skillsRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setCurrentPose("coding"),
      onLeaveBack: () => setCurrentPose("thinking"),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-dark relative overflow-hidden">
        {/* Background Layers */}
        {!isLoading && (
          <>
            <MeshGradient />
            <ParticleCanvas />
          </>
        )}

        {/* Back Button */}
        <Link
          href="/"
          className="fixed top-6 left-6 z-40 glass-dark rounded-2xl px-4 py-2 flex items-center gap-2 text-text-secondary hover:text-coral smooth-transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Demos</span>
        </Link>

        {/* Demo Label */}
        <div className="fixed top-6 right-6 z-40">
          <span className="badge badge-coral">Combined Demo</span>
        </div>

        {/* Social Links Sidebar */}
        <motion.div
          className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? -20 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <button
              key={i}
              className="w-11 h-11 glass-dark rounded-xl flex items-center justify-center text-text-secondary hover:text-coral hover:scale-110 smooth-transition"
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </motion.div>

        {/* Vertical Title */}
        <motion.div
          className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? 20 : 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="text-text-muted text-xs tracking-[0.3em] uppercase">
            AI Agent Builder
          </span>
        </motion.div>

        {/* ==================== HERO SECTION ==================== */}
        <section className="min-h-screen flex items-center relative z-10">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left - Text Content */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? -50 : 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold mb-4">
                  <span className="text-gradient-coral">DRACO</span>
                </h1>
                <p className="text-xl md:text-2xl text-text-secondary mb-3">
                  Building the future with <span className="text-coral font-semibold">AI-powered code</span>
                </p>
                <p className="text-text-muted mb-8 max-w-md mx-auto lg:mx-0">
                  Full-Stack Developer crafting AI agents and intelligent applications with an AI-augmented workflow
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <button className="btn-coral rounded-2xl px-8 py-4 flex items-center gap-2">
                    <span>View Projects</span>
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>
                  <button className="glass-dark rounded-2xl px-8 py-4 flex items-center gap-2 text-text-secondary hover:text-coral smooth-transition">
                    <FileText className="w-5 h-5" />
                    <span>Resume</span>
                  </button>
                </div>
              </motion.div>

              {/* Right - Avatar */}
              <div className="flex justify-center items-center order-first lg:order-last">
                {!isLoading && <AnimatedAvatar pose={currentPose} />}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-text-muted/50 rounded-full flex justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-3 bg-coral rounded-full mt-2"
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==================== ABOUT SECTION ==================== */}
        <section ref={aboutRef} className="min-h-screen flex items-center py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Avatar */}
              <motion.div
                className="flex justify-center order-2 lg:order-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-48 md:w-56">
                  <AnimatedAvatar pose={currentPose} />
                </div>
              </motion.div>

              {/* About Text */}
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-gradient-coral">About</span> Me
                </h2>
                <div className="glass-dark rounded-3xl p-8">
                  <p className="text-text-secondary leading-relaxed mb-6">
                    I&apos;m a Full-Stack Developer who leverages <span className="text-coral">AI-augmented workflows</span> to
                    build intelligent applications faster and smarter. My focus is on creating
                    <span className="text-coral"> AI agents</span> that solve real-world problems.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    From autonomous coding assistants to intelligent automation systems,
                    I&apos;m passionate about pushing the boundaries of what&apos;s possible
                    when humans and AI collaborate.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== SKILLS SECTION ==================== */}
        <section ref={skillsRef} className="min-h-screen flex items-center py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What I <span className="text-gradient-coral">Do</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { title: "AI & AGENTS", skills: ["Claude SDK", "LangChain", "AI Agents", "Prompt Engineering"] },
                { title: "FULL-STACK", skills: ["React", "Next.js", "Node.js", "TypeScript"] },
                { title: "TOOLS & OPS", skills: ["Docker", "AWS", "Vercel", "Git"] },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  className="bracket-frame glass-dark rounded-3xl p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <h3 className="text-2xl font-bold text-coral mb-6">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="badge badge-coral">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Small avatar at bottom */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="w-32">
                <AnimatedAvatar pose={currentPose} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="py-12 border-t border-border-subtle relative z-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-text-muted text-sm mb-4">
              Combined Demo: SVG Avatar + Canvas Effects
            </p>
            <p className="text-text-secondary text-xs">
              Move your mouse to interact with particles. Scroll to see avatar pose changes.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
