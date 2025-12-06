"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

interface SocialLink {
  icon: typeof Github;
  href: string;
  label: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
  isVisible?: boolean;
}

const defaultLinks: SocialLink[] = [
  { icon: Github, href: "https://github.com/draco28", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@draco.dev", label: "Email" },
];

export function SocialLinks({
  links = defaultLinks,
  className = "",
  isVisible = true,
}: SocialLinksProps) {
  return (
    <motion.div
      className={`flex flex-col gap-4 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {links.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="w-11 h-11 glass-dark rounded-xl flex items-center justify-center text-text-secondary hover:text-coral hover:scale-110 smooth-transition"
        >
          <link.icon className="w-5 h-5" />
        </a>
      ))}
    </motion.div>
  );
}
