"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { AnimatedAvatar, AvatarPose } from "@/components/AnimatedAvatar";

interface HeroProps {
  isLoading: boolean;
  currentPose: AvatarPose;
}

export function Hero({ isLoading, currentPose }: HeroProps) {
  return (
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
              <a
                href="#projects"
                className="btn-coral rounded-2xl px-8 py-4 flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark rounded-2xl px-8 py-4 flex items-center gap-2 text-text-secondary hover:text-coral smooth-transition"
              >
                <FileText className="w-5 h-5" />
                <span>Resume</span>
              </a>
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
  );
}
