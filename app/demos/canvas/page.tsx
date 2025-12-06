"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, Linkedin, Twitter, FileText } from "lucide-react";

// Particle System Component
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(null);

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
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.1,
      targetAlpha: Math.random() * 0.5 + 0.1,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleCount = 100;
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(26, 26, 26, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          particle.vx -= (dx / dist) * force * 0.02;
          particle.vy -= (dy / dist) * force * 0.02;
          particle.targetAlpha = 0.8;
        } else {
          particle.targetAlpha = Math.random() * 0.3 + 0.1;
        }

        // Smooth alpha transition
        particle.alpha += (particle.targetAlpha - particle.alpha) * 0.05;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - dist / 100) * 0.2;
            ctx.stroke();
          }
        });
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
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}

// Mesh Gradient Background
function MeshGradient() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Animated gradient blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #FF8B6A 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          animation: "float 15s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)",
          top: "50%",
          right: "10%",
          animation: "float 20s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)",
          bottom: "10%",
          left: "30%",
          animation: "float 18s ease-in-out infinite",
          animationDelay: "-5s",
        }}
      />
    </div>
  );
}

// Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mini particle animation for loader
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 200;

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

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: 100,
        y: 100,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 2 + 1,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(26, 26, 26, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        // Reset if too far
        const dist = Math.sqrt((p.x - 100) ** 2 + (p.y - 100) ** 2);
        if (dist > 80) {
          p.x = 100;
          p.y = 100;
          p.angle = Math.random() * Math.PI * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 1 - dist / 80;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-dark flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Particle animation preview */}
      <canvas ref={canvasRef} className="mb-8 rounded-full" />

      {/* Marquee */}
      <div className="overflow-hidden w-full mb-8">
        <div className="flex whitespace-nowrap marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-bold text-text-muted/20 mx-8">
              CANVAS MAGIC
            </span>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="relative w-48">
        <div className="h-1 bg-dark-card rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-coral via-accent-purple to-accent-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center mt-4 text-text-secondary text-sm">{progress}%</p>
      </div>
    </motion.div>
  );
}

// Animated Text with stagger
function AnimatedTitle({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function CanvasDemo() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-dark relative">
        {/* Canvas Effects */}
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
          <span className="badge badge-green">Canvas Demo</span>
        </div>

        {/* Social Links */}
        <motion.div
          className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? -20 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <button
              key={i}
              className="w-10 h-10 glass-dark rounded-xl flex items-center justify-center text-text-secondary hover:text-coral smooth-transition"
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </motion.div>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center relative z-10">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="text-center">
              {/* Name */}
              <motion.h1
                className="text-7xl md:text-9xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedTitle text="DRACO" delay={0.3} />
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-xl md:text-3xl text-text-secondary mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="text-gradient-coral font-semibold">Full-Stack Developer</span>
              </motion.p>

              <motion.p
                className="text-text-muted max-w-md mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Creating digital experiences through code and creativity.
                Move your mouse to interact with the particles.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <button className="btn-coral rounded-2xl px-8 py-4 flex items-center gap-2">
                  <span>View Projects</span>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
                <button className="glass-dark rounded-2xl px-8 py-4 flex items-center gap-2 text-text-secondary hover:text-coral smooth-transition">
                  <FileText className="w-5 h-5" />
                  <span>Resume</span>
                </button>
              </motion.div>

              {/* Interaction Hint */}
              <motion.p
                className="mt-12 text-text-muted text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 0.6 }}
                transition={{ delay: 2 }}
              >
                ✨ Move your mouse to interact with particles
              </motion.p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="min-h-screen flex items-center py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Visual */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {/* Animated rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-coral/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full border-2 border-accent-purple/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-8 rounded-full border-2 border-accent-blue/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />

                  {/* Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center shadow-[0_0_60px_rgba(255,139,106,0.4)]">
                      <span className="text-5xl font-bold text-white">D</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
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
                    I build interactive experiences that push the boundaries of web
                    technology. From particle systems to complex animations, I love
                    making the web come alive.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    Every line of code is an opportunity to create something beautiful
                    and functional.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="min-h-screen flex items-center py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              My <span className="text-gradient-coral">Expertise</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Frontend", skills: ["React", "Next.js", "Three.js", "Canvas API"] },
                { title: "Backend", skills: ["Node.js", "Python", "PostgreSQL", "GraphQL"] },
                { title: "Creative", skills: ["WebGL", "GSAP", "Framer Motion", "SVG Animation"] },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  className="glass-dark rounded-3xl p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <h3 className="text-xl font-bold text-coral mb-6">{category.title}</h3>
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
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border-subtle relative z-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-text-muted text-sm">
              Canvas Effects Demo - Interactive particles and mesh gradients!
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
