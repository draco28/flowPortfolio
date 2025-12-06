"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, Linkedin, Twitter, FileText, Code2, Palette, Server } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animated Code/Developer Icon using CSS animations (Lottie-style)
function AnimatedIcon({ variant }: { variant: "code" | "design" | "deploy" }) {
  const variants = {
    code: {
      icon: Code2,
      color: "coral",
      animation: "pulse-glow",
    },
    design: {
      icon: Palette,
      color: "purple",
      animation: "heartbeat",
    },
    deploy: {
      icon: Server,
      color: "green",
      animation: "float",
    },
  };

  const config = variants[variant];
  const Icon = config.icon;

  const colorClasses: Record<string, string> = {
    coral: "from-coral to-coral-dark shadow-[0_0_40px_rgba(255,139,106,0.4)]",
    purple: "from-accent-purple to-purple-700 shadow-[0_0_40px_rgba(167,139,250,0.4)]",
    green: "from-accent-green to-green-600 shadow-[0_0_40px_rgba(74,222,128,0.4)]",
  };

  return (
    <div className={`relative ${config.animation}`}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-coral/20 to-transparent animate-spin-slow" style={{ animationDuration: "8s" }} />

      {/* Main icon container */}
      <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${colorClasses[config.color]} flex items-center justify-center`}>
        <Icon className="w-16 h-16 text-white" />
      </div>

      {/* Orbiting dots */}
      <div className="absolute inset-0 orbit" style={{ animationDuration: "10s" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-coral" />
      </div>
      <div className="absolute inset-0 orbit" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-purple" />
      </div>
    </div>
  );
}

// Hero Animation - Typing effect with icons
function HeroAnimation() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "< Draco />";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Main animated element */}
      <div className="relative z-10">
        {/* Code brackets animation */}
        <motion.div
          className="text-8xl md:text-9xl font-mono font-bold text-coral"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {displayedText}
          <motion.span
            className="inline-block w-1 h-20 bg-coral ml-2"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.div>

        {/* Floating elements around */}
        <motion.div
          className="absolute -top-8 -right-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-purple to-purple-700 flex items-center justify-center"
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Palette className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          className="absolute -bottom-8 -left-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-green to-green-600 flex items-center justify-center"
          animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <Server className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 -right-16 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-blue-600 flex items-center justify-center"
          animate={{ x: [-5, 5, -5], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          <Code2 className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-coral/20 blur-3xl rounded-full scale-150 -z-10" />
    </div>
  );
}

// Loading Screen
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
      {/* Animated Loader Icon */}
      <motion.div
        className="mb-12"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center shadow-[0_0_40px_rgba(255,139,106,0.4)]">
          <Code2 className="w-10 h-10 text-white" />
        </div>
      </motion.div>

      {/* Marquee Text */}
      <div className="overflow-hidden w-full mb-8">
        <div className="flex whitespace-nowrap marquee">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-bold text-text-muted/20 mx-8"
            >
              LOADING AWESOMENESS
            </span>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="relative w-48">
        <div className="h-1 bg-dark-card rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-coral to-coral-light rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center mt-4 text-text-secondary text-sm font-mono">
          {progress}%
        </p>
      </div>
    </motion.div>
  );
}

export default function LottieDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<"hero" | "about" | "skills">("hero");
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger setup
  useEffect(() => {
    if (isLoading) return;

    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActiveSection("about"),
      onLeaveBack: () => setActiveSection("hero"),
    });

    ScrollTrigger.create({
      trigger: skillsRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActiveSection("skills"),
      onLeaveBack: () => setActiveSection("about"),
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
          <span className="badge badge-purple">Lottie-Style Demo</span>
        </div>

        {/* Floating Orbs */}
        <div className="floating-orb floating-orb-purple w-96 h-96 top-1/4 right-1/4 float opacity-40" />
        <div className="floating-orb floating-orb-coral w-64 h-64 bottom-1/4 left-1/4 float opacity-30" style={{ animationDelay: "-3s" }} />

        {/* Section Indicator */}
        <motion.div
          className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ delay: 0.5 }}
        >
          {["hero", "about", "skills"].map((section) => (
            <div
              key={section}
              className={`w-2 h-8 rounded-full smooth-transition ${
                activeSection === section ? "bg-coral" : "bg-dark-card"
              }`}
            />
          ))}
        </motion.div>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center relative overflow-hidden">
          {/* Social Links */}
          <motion.div
            className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? 20 : 0 }}
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
            <div className="flex flex-col items-center text-center">
              {/* Hero Animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8"
              >
                <HeroAnimation />
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="text-xl md:text-2xl text-text-secondary mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Full-Stack Developer crafting <span className="text-gradient-coral font-semibold">digital magic</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <button className="btn-coral rounded-2xl px-8 py-4 flex items-center gap-2">
                  <span>Explore Work</span>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
                <button className="neu-raised rounded-2xl px-8 py-4 flex items-center gap-2 text-text-secondary hover:text-coral smooth-transition">
                  <FileText className="w-5 h-5" />
                  <span>Resume</span>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="min-h-screen flex items-center py-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Animated Icon */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <AnimatedIcon variant="design" />
              </motion.div>

              {/* About Text */}
              <motion.div
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
                    I transform complex problems into elegant solutions. With a keen eye
                    for design and a passion for clean code, I create web experiences
                    that users love.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    My toolkit includes React, Next.js, Node.js, and a variety of
                    modern technologies that help bring ideas to life.
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
              My <span className="text-gradient-coral">Skills</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { variant: "code" as const, title: "Development", skills: ["React", "Next.js", "TypeScript", "Node.js"] },
                { variant: "design" as const, title: "Design", skills: ["Figma", "Tailwind", "Animations", "UI/UX"] },
                { variant: "deploy" as const, title: "DevOps", skills: ["Docker", "AWS", "CI/CD", "Kubernetes"] },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  className="neu-raised rounded-3xl p-8 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className="flex justify-center mb-6">
                    <AnimatedIcon variant={category.variant} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">{category.title}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
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
        <footer className="py-12 border-t border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-text-muted text-sm">
              Lottie-Style Animation Demo - Smooth vector animations with scroll triggers
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
