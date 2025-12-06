"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { AnimatedAvatar, AvatarPose } from "@/components/AnimatedAvatar";

interface AboutProps {
  currentPose: AvatarPose;
}

export const About = forwardRef<HTMLDivElement, AboutProps>(
  function About({ currentPose }, ref) {
    return (
      <section ref={ref} className="min-h-screen flex items-center py-20 relative z-10">
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
    );
  }
);
