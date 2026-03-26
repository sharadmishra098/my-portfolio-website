import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio-data';
import { SectionHeading } from './SectionHeading';
import { ThemeToggle } from './ThemeToggle';

interface MobileExperienceProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function MobileExperience({ theme, onToggle }: MobileExperienceProps) {
  return (
    <main className="theme-text relative min-h-screen overflow-hidden bg-transparent px-5 pb-16 pt-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(116,242,255,0.12),_transparent_28%),linear-gradient(180deg,rgba(4,17,31,0.08)_0%,rgba(6,32,58,0.14)_50%,rgba(2,9,20,0.24)_100%)]" />
      <div className="absolute inset-0 bg-grain bg-[size:18px_18px] opacity-10" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5">
        <div className="theme-outline-button pointer-events-auto rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.36em] theme-muted backdrop-blur">
          3D Journey Portfolio
        </div>
        <div className="pointer-events-auto">
          <ThemeToggle theme={theme} onToggle={onToggle} />
        </div>
      </div>
      <div className="relative mx-auto max-w-md space-y-16">
        <section className="relative flex min-h-[100svh] items-end py-24">
          <div className="w-full space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-cyan/80">Immersive Portfolio</p>
            <h1 className="font-display text-6xl leading-[0.88]">{portfolioData.name}</h1>
            <p className="theme-muted max-w-xs text-lg">{portfolioData.title}</p>
            <p className="theme-muted max-w-sm text-sm leading-7">{portfolioData.summary}</p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${portfolioData.email}`} className="button-primary">
                Start a conversation
              </a>
              <a href="#mobile-journey" className="button-secondary">
                Explore
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3">
              {portfolioData.metrics.map((metric) => (
                <div key={metric.label} className="theme-surface rounded-2xl border theme-border p-4 backdrop-blur">
                  <div className="font-display text-2xl text-cyan">{metric.value}</div>
                  <div className="theme-soft mt-2 text-xs uppercase tracking-[0.24em]">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="mobile-journey" className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan/80">Immersive Portfolio</p>
          <SectionHeading eyebrow="Journey" title="Built for scale, now shaped for AI." description={portfolioData.summary} />
          {portfolioData.experience.map((item, index) => (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="theme-surface rounded-[28px] border theme-border p-5 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-cyan/70">{item.duration}</p>
              <h3 className="mt-3 font-display text-2xl">{item.company}</h3>
              <p className="theme-muted mt-1 text-sm">{item.role}</p>
              <div className="theme-muted mt-4 space-y-3 text-sm leading-7">
                {item.highlights.map((highlight) => (
                  <p key={highlight}>{highlight}</p>
                ))}
              </div>
            </motion.article>
          ))}
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow="Systems" title="Skills, grouped by the way they create value." description="Core engineering capabilities distilled from the resume and arranged by product impact." />
          <div className="space-y-4">
            {portfolioData.skills.map((group) => (
              <div key={group.category} className="theme-surface-strong rounded-[28px] border theme-border p-5">
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: group.color }}>
                  {group.category}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="theme-chip rounded-full px-3 py-2 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow="Project" title="A production-minded GenAI build." description="The featured project from the resume is translated here into a focused product case study." />
          {portfolioData.projects.map((project) => (
            <article key={project.name} className="theme-surface rounded-[28px] border theme-border p-6 backdrop-blur">
              <h3 className="font-display text-3xl">{project.name}</h3>
              <p className="theme-muted mt-4 text-sm leading-7">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="theme-chip rounded-full px-3 py-2 text-xs uppercase tracking-[0.2em]">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[32px] border theme-border bg-[linear-gradient(145deg,rgba(116,242,255,0.14),rgba(255,138,108,0.12))] p-6">
          <SectionHeading eyebrow="Contact" title="Let’s build something with real depth." description={portfolioData.education} />
          <div className="theme-muted mt-6 space-y-4 text-sm">
            <a href={`mailto:${portfolioData.email}`} className="flex items-center gap-3">
              <Mail size={16} />
              {portfolioData.email}
            </a>
            <a href={`tel:${portfolioData.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3">
              <Phone size={16} />
              {portfolioData.phone}
            </a>
            <a href="https://maps.google.com/?q=India" className="flex items-center gap-3">
              <MapPin size={16} />
              {portfolioData.location}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
