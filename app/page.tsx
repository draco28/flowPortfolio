"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers, Image, Waves } from "lucide-react";

const demos = [
  {
    id: "combined",
    title: "Combined (Selected)",
    description: "SVG Avatar + Canvas Background - The best of both worlds with particles and animated character",
    icon: Sparkles,
    color: "coral",
  },
  {
    id: "svg-avatar",
    title: "Animated SVG Avatar",
    description: "Stylized character illustration that blinks, moves, and changes poses on scroll",
    icon: Sparkles,
    color: "purple",
  },
  {
    id: "lottie",
    title: "Lottie Animation",
    description: "Smooth vector animations with scroll-triggered transitions",
    icon: Layers,
    color: "blue",
  },
  {
    id: "parallax",
    title: "Parallax Floating",
    description: "Photo/logo with floating orbs, shapes, and code snippets",
    icon: Image,
    color: "green",
  },
  {
    id: "canvas",
    title: "Canvas Effects",
    description: "Particle system and mesh gradient effects for an abstract hero",
    icon: Waves,
    color: "blue",
  },
];

const colorClasses: Record<string, string> = {
  coral: "from-coral to-coral-dark",
  purple: "from-accent-purple to-purple-600",
  blue: "from-accent-blue to-blue-600",
  green: "from-accent-green to-green-600",
};

const borderColorClasses: Record<string, string> = {
  coral: "hover:border-coral/50",
  purple: "hover:border-accent-purple/50",
  blue: "hover:border-accent-blue/50",
  green: "hover:border-accent-green/50",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Floating Orbs */}
      <div className="floating-orb floating-orb-coral w-96 h-96 -top-48 -right-48 float" />
      <div className="floating-orb floating-orb-purple w-64 h-64 bottom-32 -left-32 float" style={{ animationDelay: "-3s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient-coral">DRACO</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-4">
            Portfolio Hero Style Demos
          </p>
          <p className="text-text-muted max-w-2xl mx-auto">
            Choose your preferred hero section style. Each demo showcases a different
            approach to creating an impressive &quot;wow factor&quot; while maintaining performance.
          </p>
        </motion.div>

        {/* Demo Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            >
              <Link href={`/demos/${demo.id}`}>
                <div
                  className={`neu-raised rounded-3xl p-8 smooth-transition hover-lift cursor-pointer group ${borderColorClasses[demo.color]}`}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[demo.color]} flex items-center justify-center shadow-lg`}
                    >
                      <demo.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-text-primary mb-2 group-hover:text-coral smooth-transition">
                        {demo.title}
                      </h2>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {demo.description}
                      </p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-text-muted group-hover:text-coral group-hover:translate-x-2 smooth-transition" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <div className="neu-pressed rounded-3xl p-8 text-center">
            <p className="text-text-secondary mb-4">
              After viewing the demos, tell me which style you prefer and we&apos;ll build your full portfolio!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-coral">Dark Neumorphic</span>
              <span className="badge badge-purple">GSAP ScrollTrigger</span>
              <span className="badge badge-blue">Framer Motion</span>
              <span className="badge badge-green">Performance First</span>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm mb-4">Built with</p>
          <div className="flex flex-wrap justify-center gap-4 text-text-secondary text-sm">
            <span className="code-text">Next.js 15</span>
            <span className="code-text">TypeScript</span>
            <span className="code-text">Tailwind CSS v4</span>
            <span className="code-text">GSAP</span>
            <span className="code-text">Framer Motion</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
