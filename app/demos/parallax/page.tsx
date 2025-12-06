"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, Linkedin, Twitter, FileText, Code2, Braces, Terminal, Database, Cloud, Cpu } from "lucide-react";

// Floating Code Snippet Component
function FloatingCode({ code, position, delay }: { code: string; position: string; delay: number }) {
  return (
    <motion.div
      className={`absolute ${position} glass-dark rounded-xl px-4 py-2 font-mono text-xs text-coral whitespace-pre`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      style={{
        animation: `float ${6 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {code}
    </motion.div>
  );
}

// Floating Shape Component
function FloatingShape({
  icon: Icon,
  size,
  position,
  color,
  delay
}: {
  icon: React.ElementType;
  size: string;
  position: string;
  color: string;
  delay: number;
}) {
  const colorClasses: Record<string, string> = {
    coral: "from-coral to-coral-dark shadow-[0_0_30px_rgba(255,139,106,0.4)]",
    purple: "from-accent-purple to-purple-700 shadow-[0_0_30px_rgba(167,139,250,0.4)]",
    blue: "from-accent-blue to-blue-700 shadow-[0_0_30px_rgba(96,165,250,0.4)]",
    green: "from-accent-green to-green-600 shadow-[0_0_30px_rgba(74,222,128,0.4)]",
  };

  return (
    <motion.div
      className={`absolute ${position} ${size} rounded-2xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      style={{
        animation: `float ${5 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      <Icon className="w-1/2 h-1/2 text-white" />
    </motion.div>
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
      {/* Floating elements preview */}
      <div className="relative w-48 h-48 mb-12">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-3 h-3 rounded-full bg-coral absolute" style={{ top: 0, left: "50%", transform: "translateX(-50%)" }} />
          <div className="w-2 h-2 rounded-full bg-accent-purple absolute" style={{ bottom: 0, left: "50%", transform: "translateX(-50%)" }} />
          <div className="w-2 h-2 rounded-full bg-accent-blue absolute" style={{ left: 0, top: "50%", transform: "translateY(-50%)" }} />
          <div className="w-2 h-2 rounded-full bg-accent-green absolute" style={{ right: 0, top: "50%", transform: "translateY(-50%)" }} />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center shadow-[0_0_40px_rgba(255,139,106,0.4)]">
            <span className="text-3xl font-bold text-white">D</span>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden w-full mb-8">
        <div className="flex whitespace-nowrap marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-bold text-text-muted/20 mx-8">
              PARALLAX MAGIC
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

export default function ParallaxDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const codeSnippets = [
    { code: "const magic = true;", position: "top-20 left-10", delay: 0.2 },
    { code: "<Draco />", position: "top-32 right-20", delay: 0.4 },
    { code: "npm run build", position: "bottom-40 left-20", delay: 0.6 },
    { code: "async () => { }", position: "bottom-32 right-10", delay: 0.8 },
  ];

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
          <span className="badge badge-blue">Parallax Demo</span>
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
              className="w-10 h-10 neu-raised rounded-xl flex items-center justify-center text-text-secondary hover:text-coral smooth-transition"
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </motion.div>

        {/* Hero Section with Parallax */}
        <section ref={heroRef} className="min-h-screen relative overflow-hidden">
          {/* Background Floating Orbs */}
          <motion.div
            className="floating-orb floating-orb-coral w-96 h-96 top-1/4 left-1/4"
            style={{ y: y2 }}
          />
          <motion.div
            className="floating-orb floating-orb-purple w-64 h-64 bottom-1/4 right-1/4"
            style={{ y: y1, rotate }}
          />

          {/* Floating Code Snippets */}
          {!isLoading && codeSnippets.map((snippet, i) => (
            <motion.div key={i} style={{ y: y3 }}>
              <FloatingCode {...snippet} />
            </motion.div>
          ))}

          {/* Floating Shapes */}
          {!isLoading && (
            <>
              <motion.div style={{ y: y1 }}>
                <FloatingShape icon={Code2} size="w-14 h-14" position="top-1/4 left-[15%]" color="coral" delay={0.3} />
              </motion.div>
              <motion.div style={{ y: y2 }}>
                <FloatingShape icon={Braces} size="w-12 h-12" position="top-1/3 right-[20%]" color="purple" delay={0.5} />
              </motion.div>
              <motion.div style={{ y: y1 }}>
                <FloatingShape icon={Terminal} size="w-10 h-10" position="bottom-1/3 left-[25%]" color="blue" delay={0.7} />
              </motion.div>
              <motion.div style={{ y: y3 }}>
                <FloatingShape icon={Database} size="w-11 h-11" position="bottom-1/4 right-[15%]" color="green" delay={0.9} />
              </motion.div>
              <motion.div style={{ y: y2 }}>
                <FloatingShape icon={Cloud} size="w-10 h-10" position="top-[20%] right-[35%]" color="blue" delay={1.1} />
              </motion.div>
              <motion.div style={{ y: y1 }}>
                <FloatingShape icon={Cpu} size="w-9 h-9" position="bottom-[35%] left-[10%]" color="purple" delay={1.3} />
              </motion.div>
            </>
          )}

          {/* Center Content */}
          <motion.div
            className="relative z-10 min-h-screen flex items-center justify-center"
            style={{ scale, opacity }}
          >
            <div className="text-center px-6">
              {/* Main Logo/Name */}
              <motion.div
                className="relative inline-block mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.8 : 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-full bg-coral/20 blur-2xl scale-150" />

                {/* Main Circle */}
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center shadow-[0_0_60px_rgba(255,139,106,0.5)]">
                  <span className="text-6xl md:text-8xl font-bold text-white">D</span>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute inset-0 orbit" style={{ animationDuration: "15s" }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-lg bg-accent-purple flex items-center justify-center">
                    <Braces className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 orbit" style={{ animationDuration: "20s", animationDirection: "reverse" }}>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-lg bg-accent-blue flex items-center justify-center">
                    <Code2 className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Name & Title */}
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="text-gradient-coral">DRACO</span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-text-secondary mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Full-Stack Developer
              </motion.p>

              <motion.p
                className="text-text-muted max-w-md mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Crafting <span className="text-coral">digital experiences</span> that leave a lasting impression
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <button className="btn-coral rounded-2xl px-8 py-4 flex items-center gap-2">
                  <span>View Projects</span>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
                <button className="neu-raised rounded-2xl px-8 py-4 flex items-center gap-2 text-text-secondary hover:text-coral smooth-transition">
                  <FileText className="w-5 h-5" />
                  <span>Resume</span>
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
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

        {/* About Section */}
        <section className="min-h-screen flex items-center py-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Visual */}
              <motion.div
                className="relative flex justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-dark-card to-dark neu-raised flex items-center justify-center">
                    <Code2 className="w-24 h-24 text-coral" />
                  </div>
                  {/* Floating mini shapes */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center float">
                    <Braces className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-purple-700 flex items-center justify-center float" style={{ animationDelay: "-2s" }}>
                    <Terminal className="w-5 h-5 text-white" />
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
                <div className="neu-raised rounded-3xl p-8">
                  <p className="text-text-secondary leading-relaxed mb-6">
                    I&apos;m a developer who believes in the power of clean code and thoughtful
                    design. Every project is an opportunity to create something meaningful.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    With expertise across the full stack, I bring ideas to life from
                    concept to deployment, ensuring every detail is crafted with care.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="min-h-screen flex items-center py-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Tech <span className="text-gradient-coral">Stack</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Frontend", icon: Code2, skills: ["React", "Next.js", "TypeScript", "Tailwind"], color: "coral" },
                { title: "Backend", icon: Database, skills: ["Node.js", "Express", "PostgreSQL", "MongoDB"], color: "purple" },
                { title: "DevOps", icon: Cloud, skills: ["Docker", "AWS", "Vercel", "GitHub Actions"], color: "blue" },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  className="bracket-frame neu-raised rounded-3xl p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                    category.color === "coral" ? "from-coral to-coral-dark" :
                    category.color === "purple" ? "from-accent-purple to-purple-700" :
                    "from-accent-blue to-blue-700"
                  } flex items-center justify-center mb-6`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">{category.title}</h3>
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
        <footer className="py-12 border-t border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-text-muted text-sm">
              Parallax Floating Demo - Scroll to see depth effects!
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
