"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin, ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/draco28",
    username: "@draco28",
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "#",
    username: "Connect",
    color: "hover:text-[#0A66C2]",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "#",
    username: "Follow",
    color: "hover:text-[#1DA1F2]",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@draco.dev",
    username: "hello@draco.dev",
    color: "hover:text-coral",
  },
];

export function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span className="text-gradient-coral">Connect</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Interested in AI agents, collaboration, or just want to chat? Reach out through any of these channels.
          </p>
        </motion.div>

        {/* Social Links Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group glass-dark rounded-3xl p-6 text-center hover:border-coral/30 border border-transparent smooth-transition ${link.color}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-dark-card flex items-center justify-center group-hover:bg-coral/10 smooth-transition">
                <link.icon className="w-7 h-7 text-text-secondary group-hover:text-coral smooth-transition" />
              </div>
              <h3 className="font-bold text-text-primary mb-1 group-hover:text-coral smooth-transition">
                {link.name}
              </h3>
              <p className="text-sm text-text-muted flex items-center justify-center gap-1">
                {link.username}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 smooth-transition" />
              </p>
            </motion.a>
          ))}
        </div>

        {/* Location */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 text-text-muted">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Available for remote work worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
