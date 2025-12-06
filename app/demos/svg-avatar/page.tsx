"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, Linkedin, Twitter, FileText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animated SVG Avatar Component
function AnimatedAvatar({ pose }: { pose: "standing" | "thinking" | "coding" }) {
  const [isBlinking, setIsBlinking] = useState(false);

  // Blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Different poses configurations
  const poses = {
    standing: {
      headRotation: 0,
      headY: 0,
      bodyRotation: 0,
      armLeftRotation: 0,
      armRightRotation: 0,
    },
    thinking: {
      headRotation: -10,
      headY: -5,
      bodyRotation: -5,
      armLeftRotation: -45,
      armRightRotation: 20,
    },
    coding: {
      headRotation: 15,
      headY: 10,
      bodyRotation: 5,
      armLeftRotation: -30,
      armRightRotation: -30,
    },
  };

  const currentPose = poses[pose];

  return (
    <svg
      viewBox="0 0 200 300"
      className="w-full h-full max-w-[300px]"
      style={{ filter: "drop-shadow(0 20px 40px rgba(255, 139, 106, 0.3))" }}
    >
      {/* Glow Effect */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="coralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8B6A" />
          <stop offset="100%" stopColor="#E67759" />
        </linearGradient>
        <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>

      {/* Body Group */}
      <g
        style={{
          transform: `rotate(${currentPose.bodyRotation}deg)`,
          transformOrigin: "100px 200px",
          transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Body */}
        <motion.path
          d="M70 140 Q100 130 130 140 L140 220 Q100 230 60 220 Z"
          fill="url(#coralGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Left Arm */}
        <motion.path
          d="M70 150 Q50 170 45 200"
          stroke="url(#coralGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          style={{
            transform: `rotate(${currentPose.armLeftRotation}deg)`,
            transformOrigin: "70px 150px",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        {/* Right Arm */}
        <motion.path
          d="M130 150 Q150 170 155 200"
          stroke="url(#coralGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          style={{
            transform: `rotate(${currentPose.armRightRotation}deg)`,
            transformOrigin: "130px 150px",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        {/* Legs */}
        <path
          d="M80 220 L75 280"
          stroke="url(#darkGradient)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M120 220 L125 280"
          stroke="url(#darkGradient)"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </g>

      {/* Head Group */}
      <g
        style={{
          transform: `rotate(${currentPose.headRotation}deg) translateY(${currentPose.headY}px)`,
          transformOrigin: "100px 80px",
          transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Head */}
        <motion.ellipse
          cx="100"
          cy="70"
          rx="45"
          ry="50"
          fill="url(#coralGradient)"
          filter="url(#glow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Hair */}
        <motion.path
          d="M55 60 Q70 20 100 25 Q130 20 145 60"
          fill="#1A1A1A"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />

        {/* Eyes */}
        <g>
          {/* Left Eye */}
          <motion.ellipse
            cx="80"
            cy="70"
            rx={isBlinking ? 6 : 6}
            ry={isBlinking ? 1 : 8}
            fill="#1A1A1A"
            transition={{ duration: 0.1 }}
          />
          {/* Right Eye */}
          <motion.ellipse
            cx="120"
            cy="70"
            rx={isBlinking ? 6 : 6}
            ry={isBlinking ? 1 : 8}
            fill="#1A1A1A"
            transition={{ duration: 0.1 }}
          />
          {/* Eye Shine */}
          {!isBlinking && (
            <>
              <circle cx="83" cy="67" r="2" fill="white" />
              <circle cx="123" cy="67" r="2" fill="white" />
            </>
          )}
        </g>

        {/* Smile */}
        <motion.path
          d="M85 90 Q100 100 115 90"
          stroke="#1A1A1A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </g>
    </svg>
  );
}

// Marquee Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

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
      {/* Marquee Text */}
      <div className="overflow-hidden w-full mb-12">
        <div className="flex whitespace-nowrap marquee">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-bold text-text-muted/20 mx-8"
            >
              FULL-STACK DEVELOPER
            </span>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="relative w-48">
        <div className="h-1 bg-dark-card rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-coral rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center mt-4 text-text-secondary text-sm">
          {progress}%
        </p>
      </div>

      {/* Bottom Marquee */}
      <div className="overflow-hidden w-full mt-12">
        <div
          className="flex whitespace-nowrap marquee"
          style={{ animationDirection: "reverse" }}
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-bold text-text-muted/20 mx-8"
            >
              CREATIVE CODER
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SVGAvatarDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPose, setCurrentPose] = useState<"standing" | "thinking" | "coding">("standing");
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger for pose changes
  useEffect(() => {
    if (isLoading) return;

    // About section - thinking pose
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setCurrentPose("thinking"),
      onLeaveBack: () => setCurrentPose("standing"),
    });

    // Skills section - coding pose
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

      <div className="min-h-screen bg-dark">
        {/* Back Button */}
        <Link
          href="/"
          className="fixed top-6 left-6 z-40 neu-raised rounded-2xl px-4 py-2 flex items-center gap-2 text-text-secondary hover:text-coral smooth-transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Demos</span>
        </Link>

        {/* Demo Label */}
        <div className="fixed top-6 right-6 z-40">
          <span className="badge badge-coral">SVG Avatar Demo</span>
        </div>

        {/* Floating Orb */}
        <div className="floating-orb floating-orb-coral w-96 h-96 top-1/4 right-1/4 float opacity-40" />

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center relative overflow-hidden"
        >
          {/* Social Links - Left Side */}
          <motion.div
            className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? -20 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <button
                key={i}
                className="w-10 h-10 neu-raised rounded-xl flex items-center justify-center text-text-secondary hover:text-coral smooth-transition"
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? -50 : 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold mb-4">
                  <span className="text-text-primary">DRACO</span>
                </h1>
                <p className="text-xl md:text-2xl text-text-secondary mb-8">
                  I craft <span className="text-gradient-coral font-semibold">digital experiences</span> with code
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-coral rounded-2xl px-8 py-4 flex items-center gap-2">
                    <span>View Projects</span>
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>
                  <button className="neu-raised rounded-2xl px-8 py-4 flex items-center gap-2 text-text-secondary hover:text-coral smooth-transition">
                    <FileText className="w-5 h-5" />
                    <span>Resume</span>
                  </button>
                </div>
              </motion.div>

              {/* Right - Avatar */}
              <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isLoading ? 0 : 1,
                  scale: isLoading ? 0.8 : 1,
                }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <AnimatedAvatar pose={currentPose} />
              </motion.div>
            </div>
          </div>

          {/* Right - Title */}
          <motion.div
            className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? 20 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ writingMode: "vertical-rl" }}
          >
            <span className="text-text-muted text-sm tracking-widest">
              FULL-STACK DEVELOPER
            </span>
          </motion.div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="min-h-screen flex items-center py-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Avatar stays visible */}
              <motion.div
                className="flex justify-center items-center order-2 lg:order-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <AnimatedAvatar pose={currentPose} />
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
                <div className="neu-raised rounded-3xl p-8">
                  <p className="text-text-secondary leading-relaxed mb-6">
                    I&apos;m a passionate Full-Stack Developer who loves turning ideas into
                    reality through code. With expertise in modern web technologies,
                    I build scalable, performant, and beautiful applications.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                    contributing to open source, or sharing knowledge with the
                    developer community.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} className="min-h-screen flex items-center py-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What I <span className="text-gradient-coral">Do</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "DEVELOP", skills: ["React", "Next.js", "Node.js", "TypeScript"] },
                { title: "DESIGN", skills: ["UI/UX", "Figma", "Tailwind", "Framer Motion"] },
                { title: "DEPLOY", skills: ["AWS", "Docker", "Vercel", "CI/CD"] },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  className="bracket-frame neu-raised rounded-3xl p-8"
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

            {/* Avatar at bottom */}
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="w-48">
                <AnimatedAvatar pose={currentPose} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-text-muted text-sm">
              SVG Avatar Demo - Scroll to see pose changes!
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
