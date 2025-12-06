"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { AnimatedAvatar, AvatarPose } from "@/components/AnimatedAvatar";

interface SkillsProps {
  currentPose: AvatarPose;
}

const skillCategories = [
  {
    title: "AI & AGENTS",
    skills: ["Claude SDK", "LangChain", "AI Agents", "Prompt Engineering"],
  },
  {
    title: "FULL-STACK",
    skills: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    title: "TOOLS & OPS",
    skills: ["Docker", "AWS", "Vercel", "Git"],
  },
];

export const Skills = forwardRef<HTMLDivElement, SkillsProps>(
  function Skills({ currentPose }, ref) {
    return (
      <section ref={ref} className="min-h-screen flex items-center py-20 relative z-10">
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
            {skillCategories.map((category, index) => (
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
    );
  }
);
