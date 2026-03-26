import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { MobileExperience } from '@/components/MobileExperience';
import { SectionHeading } from '@/components/SectionHeading';
import { ThemeToggle } from '@/components/ThemeToggle';
import { portfolioData } from '@/data/portfolio-data';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrollProgress } from '@/hooks/useScrollProgress';

gsap.registerPlugin(ScrollTrigger);

const sectionIds = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'] as const;
const SceneCanvas = lazy(() =>
  import('@/components/SceneCanvas').then((module) => ({ default: module.SceneCanvas })),
);

function App() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const progress = useScrollProgress();
  const [activeSkill, setActiveSkill] = useState<string | null>(portfolioData.skills[0]?.items[0] ?? null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const frame = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const triggers = sectionsRef.current
      .map((section) => {
        if (!section) return null;

        return gsap.fromTo(
          section.querySelectorAll('[data-reveal]'),
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            },
          },
        );
      })
      .filter(Boolean);

    return () => {
      triggers.forEach((trigger) => trigger?.scrollTrigger?.kill());
      gsap.killTweensOf('[data-reveal]');
    };
  }, [isMobile]);

  useEffect(() => {
    const skills = portfolioData.skills.flatMap((group) => group.items);
    const index = Math.min(skills.length - 1, Math.floor(progress * skills.length * 1.2));
    setActiveSkill(skills[Math.max(0, index)] ?? null);
  }, [progress]);

  if (isMobile) {
    return (
      <div className="theme-text relative min-h-screen bg-ink">
        <Suspense
          fallback={<div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(116,242,255,0.18),_transparent_28%),linear-gradient(180deg,_#04111f_0%,_#05192e_48%,_#020814_100%)]" />}
        >
          <SceneCanvas progress={progress} activeSkill={activeSkill} mobile />
        </Suspense>
        <MobileExperience
          theme={theme}
          onToggle={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
        />
      </div>
    );
  }

  return (
    <div className="theme-text relative min-h-screen bg-ink">
      <Suspense
        fallback={<div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(116,242,255,0.18),_transparent_28%),linear-gradient(180deg,_#04111f_0%,_#05192e_48%,_#020814_100%)]" />}
      >
        <SceneCanvas progress={progress} activeSkill={activeSkill} />
      </Suspense>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 lg:px-10">
        <div className="theme-outline-button pointer-events-auto rounded-full px-4 py-2 text-xs uppercase tracking-[0.4em] theme-muted backdrop-blur">
          3D Journey Portfolio
        </div>
        <div className="pointer-events-auto">
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
          />
        </div>
      </div>

      <main className="relative z-10">
        <section
          id="hero"
          ref={(node) => {
            sectionsRef.current[0] = node;
          }}
          className="section-shell min-h-[140vh] px-6 pt-28 lg:px-10"
        >
          <div className="grid min-h-screen items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-3xl space-y-8">
              <p data-reveal className="text-xs uppercase tracking-[0.6em] text-cyan/75">
                Backend architecting meets generative intelligence
              </p>
              <div className="space-y-6">
                <h1 data-reveal className="theme-text font-display text-6xl leading-[0.9] sm:text-7xl lg:text-[7rem]">
                  {portfolioData.name}
                </h1>
                <p data-reveal className="theme-muted max-w-xl text-xl leading-9">
                  {portfolioData.title}
                </p>
                <p data-reveal className="theme-muted max-w-2xl text-lg leading-9">
                  {portfolioData.taglines[0]}
                </p>
              </div>
              <div data-reveal className="flex flex-wrap gap-4">
                <a href={`mailto:${portfolioData.email}`} className="button-primary">
                  Start a conversation
                  <ArrowUpRight size={18} />
                </a>
                <a href="#experience" className="button-secondary">
                  Explore the journey
                </a>
              </div>
              <div data-reveal className="grid max-w-2xl grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
                {portfolioData.metrics.map((metric) => (
                  <div key={metric.label} className="theme-surface rounded-3xl border theme-border px-4 py-4 backdrop-blur">
                    <div className="theme-text font-display text-3xl">{metric.value}</div>
                    <div className="theme-soft mt-2 text-[11px] uppercase tracking-[0.28em]">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="pointer-events-none min-h-[70vh]"
            />
          </div>
        </section>

        <section
          id="about"
          ref={(node) => {
            sectionsRef.current[1] = node;
          }}
          className="section-shell min-h-[120vh] px-6 lg:px-10"
        >
          <div className="grid min-h-screen items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-panel max-w-md space-y-5 p-7" data-reveal>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan/75">Depth transition</p>
              <h2 className="theme-text font-display text-4xl">From backend foundations to immersive AI products.</h2>
            </div>
            <div className="space-y-10">
              <SectionHeading
                eyebrow="About"
                title="A systems-first engineer with product instincts."
                description={portfolioData.summary}
              />
              <div className="grid gap-4 md:grid-cols-3">
                {portfolioData.taglines.map((tagline) => (
                  <div key={tagline} data-reveal className="theme-surface rounded-[28px] border theme-border p-5 backdrop-blur">
                    <p className="theme-muted text-sm leading-7">{tagline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={(node) => {
            sectionsRef.current[2] = node;
          }}
          className="section-shell min-h-[170vh] px-6 lg:px-10"
        >
          <div className="grid min-h-screen items-start gap-16 pt-20 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="sticky top-24">
              <SectionHeading
                eyebrow="Experience"
                title="A 3D timeline of systems shipped under real constraints."
                description="The scene ahead turns each role into a spatial node while the overlay surfaces the business outcomes."
              />
            </div>
            <div className="space-y-6">
              {portfolioData.experience.map((item) => (
                <article key={item.company} data-reveal className="glass-panel ml-auto max-w-2xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.36em]" style={{ color: item.accent }}>
                        {item.duration}
                      </p>
                      <h3 className="theme-text mt-3 font-display text-3xl">{item.company}</h3>
                      <p className="theme-muted mt-1 text-base">{item.role}</p>
                    </div>
                  </div>
                  <div className="theme-muted mt-6 grid gap-3 text-sm leading-8">
                    {item.highlights.map((highlight) => (
                      <p key={highlight}>{highlight}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="skills"
          ref={(node) => {
            sectionsRef.current[3] = node;
          }}
          className="section-shell min-h-[140vh] px-6 lg:px-10"
        >
          <div className="grid min-h-screen items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Skills"
                title="An orbit of capabilities around product impact."
                description="As the camera drifts deeper, the skill cloud becomes a living map of Sharad's backend, cloud, data, and GenAI toolkit."
              />
              <div data-reveal className="theme-surface rounded-[32px] border theme-border p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.4em] text-cyan/75">Highlighted node</p>
                <p className="theme-text mt-4 font-display text-3xl">{activeSkill}</p>
                <p className="theme-muted mt-3 text-sm leading-7">
                  Hoverable and clickable interactions can expand from this foundation, while the current build keeps the scene responsive and performant.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {portfolioData.skills.map((group) => (
                <div
                  key={group.category}
                  data-reveal
                  className="theme-surface-strong rounded-[30px] border theme-border p-5 backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-[0.34em]" style={{ color: group.color }}>
                    {group.category}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <button
                        type="button"
                        key={skill}
                        onMouseEnter={() => setActiveSkill(skill)}
                        onFocus={() => setActiveSkill(skill)}
                        className={`rounded-full border px-3 py-2 text-sm transition ${
                          activeSkill === skill
                            ? 'border-cyan bg-cyan/12 theme-text'
                            : 'theme-outline-button theme-muted hover:border-cyan/30 hover:text-cyan'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(node) => {
            sectionsRef.current[4] = node;
          }}
          className="section-shell min-h-[130vh] px-6 lg:px-10"
        >
          <div className="grid min-h-screen items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Projects"
                title="Focus mode for a GenAI product case study."
                description="The featured build becomes a floating panel in the 3D world while the content overlay reveals architecture and outcome."
              />
            </div>
            <div className="space-y-6">
              {portfolioData.projects.map((project) => (
                <article key={project.name} data-reveal className="glass-panel p-7">
                  <p className="text-xs uppercase tracking-[0.42em]" style={{ color: project.accent }}>
                    Featured build
                  </p>
                  <h3 className="theme-text mt-4 font-display text-4xl">{project.name}</h3>
                  <p className="theme-muted mt-4 max-w-2xl text-base leading-8">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="theme-chip rounded-full px-3 py-2 text-xs uppercase tracking-[0.24em]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="theme-muted mt-7 grid gap-3 text-sm leading-8">
                    {project.achievements.map((achievement) => (
                      <p key={achievement}>{achievement}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          ref={(node) => {
            sectionsRef.current[5] = node;
          }}
          className="section-shell min-h-[110vh] px-6 pb-20 lg:px-10"
        >
          <div className="grid min-h-screen items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl space-y-8">
              <SectionHeading
                eyebrow="Final scene"
                title="Ready for the next system worth building."
                description={portfolioData.education}
              />
              <div data-reveal className="grid gap-4 sm:grid-cols-3">
                <a href={`mailto:${portfolioData.email}`} className="glass-panel flex items-center justify-center gap-4 p-4 text-center">
                  <Mail size={18} />
                  <span>{portfolioData.email}</span>
                </a>
                <a href={`tel:${portfolioData.phone.replace(/\s+/g, '')}`} className="glass-panel flex items-center gap-4 p-5">
                  <Phone size={18} />
                  <span>{portfolioData.phone}</span>
                </a>
                <a href="https://maps.google.com/?q=India" className="glass-panel flex items-center gap-4 p-5">
                  <MapPin size={18} />
                  <span>{portfolioData.location}</span>
                </a>
              </div>
            </div>

            <div data-reveal className="glass-panel max-w-sm p-7">
              <p className="text-xs uppercase tracking-[0.4em] text-cyan/75">Call to action</p>
              <p className="theme-text mt-4 font-display text-3xl leading-tight">
                Need scalable backend architecture or a GenAI experience that actually ships?
              </p>
              <a href={`mailto:${portfolioData.email}`} className="button-primary mt-6 inline-flex">
                Reach out
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <div className="theme-outline-button theme-soft fixed bottom-6 left-1/2 z-30 hidden -translate-x-1/2 rounded-full px-4 py-3 text-xs uppercase tracking-[0.4em] backdrop-blur lg:block">
        {sectionIds[Math.min(sectionIds.length - 1, Math.floor(progress * sectionIds.length))]}
      </div>
    </div>
  );
}

export default App;
