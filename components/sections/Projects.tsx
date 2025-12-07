"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Check, Sparkles } from "lucide-react";

interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features?: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "projectpulse",
    number: "01",
    title: "ProjectPulse",
    tagline: "AI-Powered Development Hub",
    description:
      "An agent-first project management platform designed for AI agents (Claude Code, Cursor AI, Codex) to manage software development workflows with 95% automation via MCP (Model Context Protocol).",
    features: [
      "92% token reduction for skills",
      "41 MCP tools for AI agents",
      "5-level hierarchy tracking",
      "Knowledge Graph with hybrid search",
    ],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "MCP", "AI Agents"],
    liveUrl: "https://projectpulse.dracodev.dev/",
    image: "/projects/projectpulse-preview.png",
    featured: true,
  },
];

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="glass-dark rounded-3xl overflow-hidden border border-transparent hover:border-coral/30 smooth-transition">
        {/* Image Section */}
        {project.image && (
          <div className="relative w-full aspect-video bg-dark-card overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover object-top group-hover:scale-105 smooth-transition"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />

            {/* Featured badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral/20 backdrop-blur-sm border border-coral/30 text-coral text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Featured Project
              </span>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-text-muted text-sm font-mono mb-2 block">
                {project.number}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-text-primary group-hover:text-coral smooth-transition">
                {project.title}
              </h3>
              <p className="text-lg text-coral mt-1">{project.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-text-secondary leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>

          {/* Features Grid */}
          {project.features && project.features.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {project.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="w-5 h-5 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-coral" />
                  </div>
                  <span className="text-text-secondary text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-dark-card text-text-secondary text-sm border border-border-subtle"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-coral rounded-2xl px-8 py-4 inline-flex items-center gap-2"
              >
                <span>View Live</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PlaceholderProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="glass-dark rounded-3xl overflow-hidden border border-transparent hover:border-coral/30 smooth-transition">
        {/* Placeholder Image Area */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-dark-card to-dark flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-coral/10 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-coral" />
            </div>
            <p className="text-text-muted text-sm">Preview coming soon</p>
          </div>

          {/* Featured badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral/20 backdrop-blur-sm border border-coral/30 text-coral text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              Featured Project
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-text-muted text-sm font-mono mb-2 block">
                {project.number}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-text-primary group-hover:text-coral smooth-transition">
                {project.title}
              </h3>
              <p className="text-lg text-coral mt-1">{project.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-text-secondary leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>

          {/* Features Grid */}
          {project.features && project.features.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {project.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="w-5 h-5 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-coral" />
                  </div>
                  <span className="text-text-secondary text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-dark-card text-text-secondary text-sm border border-border-subtle"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-coral rounded-2xl px-8 py-4 inline-flex items-center gap-2"
              >
                <span>View Live</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const featuredProject = projects.find((p) => p.featured);
  const hasImage = featuredProject?.image;

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-6 w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient-coral">Projects</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Featured work showcasing AI expertise and full-stack development
          </p>
        </motion.div>

        {/* Featured Project */}
        {featuredProject && (
          hasImage ? (
            <FeaturedProjectCard project={featuredProject} />
          ) : (
            <PlaceholderProjectCard project={featuredProject} />
          )
        )}

        {/* Coming Soon Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-dark rounded-2xl p-8 inline-block">
            <p className="text-text-muted text-sm mb-2">More projects in development</p>
            <p className="text-text-secondary">
              Currently building AI agents and intelligent applications.
              <br />
              <span className="text-coral">Stay tuned for more!</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
