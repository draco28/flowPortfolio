"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ParticleCanvas,
  MeshGradient,
  Loader,
  SocialLinks,
  Hero,
  About,
  Skills,
  Projects,
  Contact,
  AvatarPose,
} from "@/components";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPose, setCurrentPose] = useState<AvatarPose>("standing");
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
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-dark relative overflow-hidden">
        {/* Background Layers */}
        {!isLoading && (
          <>
            <MeshGradient />
            <ParticleCanvas />
          </>
        )}

        {/* Social Links Sidebar */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
          <SocialLinks isVisible={!isLoading} />
        </div>

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

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <Hero isLoading={isLoading} currentPose={currentPose} />

          {/* About Section */}
          <About ref={aboutRef} currentPose={currentPose} />

          {/* Skills Section */}
          <Skills ref={skillsRef} currentPose={currentPose} />

          {/* Projects Section */}
          <Projects />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-border-subtle relative z-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-text-muted text-sm mb-2">
              Built with Next.js, GSAP, and Framer Motion
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
