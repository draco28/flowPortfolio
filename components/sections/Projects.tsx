"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Folder } from "lucide-react";
import { GitHubRepo, fetchGitHubRepos, getLanguageColor, formatRelativeTime } from "@/lib/github";

export function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRepos() {
      const data = await fetchGitHubRepos();
      setRepos(data);
      setIsLoading(false);
    }
    loadRepos();
  }, []);

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient-coral">Projects</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Open source projects and experiments. Check out my GitHub for more.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass-dark rounded-3xl p-6 animate-pulse"
              >
                <div className="h-6 bg-dark-card rounded w-3/4 mb-4" />
                <div className="h-4 bg-dark-card rounded w-full mb-2" />
                <div className="h-4 bg-dark-card rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center py-20">
            <Folder className="w-16 h-16 mx-auto text-text-muted mb-4" />
            <p className="text-text-secondary">No projects found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-dark rounded-3xl p-6 hover:border-coral/30 border border-transparent smooth-transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-text-muted text-sm font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-coral smooth-transition truncate max-w-[200px]">
                      {repo.name}
                    </h3>
                  </div>
                  <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-coral smooth-transition flex-shrink-0" />
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2 min-h-[40px]">
                  {repo.description || "No description available"}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Language */}
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span className="text-xs text-text-muted">{repo.language}</span>
                      </div>
                    )}
                    {/* Stars */}
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-text-muted" />
                        <span className="text-xs text-text-muted">{repo.stargazers_count}</span>
                      </div>
                    )}
                    {/* Forks */}
                    {repo.forks_count > 0 && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-text-muted" />
                        <span className="text-xs text-text-muted">{repo.forks_count}</span>
                      </div>
                    )}
                  </div>

                  {/* Updated time */}
                  <span className="text-xs text-text-muted">
                    {formatRelativeTime(repo.updated_at)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* View all on GitHub link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/draco28"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-coral smooth-transition"
          >
            <span>View all on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
