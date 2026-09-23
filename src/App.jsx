import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Terminal } from "lucide-react";

const SECTIONS = [
  {
    id: "about",
    path: "About",
    label: "about",
    status: "ONLINE",
    accent: "#4CC9F0",
  },
  {
    id: "skills",
    path: "Skills",
    label: "skills",
    status: "LOADED",
    accent: "#B983FF",
  },
  {
    id: "projects",
    path: "Projects",
    label: "projects",
    status: "BUILT",
    accent: "#FFB454",
  },
  {
    id: "journey",
    path: "Journey",
    label: "journey",
    status: "DEPLOYED",
    accent: "#4ADE80",
  },
  {
    id: "contact",
    path: "Contact",
    label: "contact",
    status: "LISTENING",
    accent: "#FF6B9D",
  },
];

const SKILLS = [
  {
    group: "Frontend",
    items: ["React.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "Razor / MVC Views"],
  },
  {
    group: "Backend",
    items: ["Node.js", "NestJS", "Express", "ASP.NET Core MVC", "REST API Design"],
  },
  {
    group: "AI / ML",
    items: ["YOLOv8", "CNNs (Image Classification)", "Python", "OpenCV"],
  },
  {
    group: "Data & Persistence",
    items: ["MongoDB / Mongoose", "SQL Server", "Dapper", "Schema & Index Design"],
  },
  {
    group: "Engineering Practice",
    items: ["Repository Pattern", "Idempotency & Locking", "Git", "Jest / Testing"],
  },
];

const PROJECTS = [
  {
    name: "MedVision AI",
    tag: "Final Year Project",
    desc: "A clinical decision-support system that detects bone fractures from X-rays using YOLOv8 for localization and CNN models for classification. Ships bilingual English/Urdu PDF reports so findings reach clinicians and patients alike.",
    stack: ["YOLOv8", "CNN", "Python", "React"],
  },
  {
    name: "ExampleHR Time-Off Microservice",
    tag: "NestJS · Systems Design",
    desc: "A 24-module leave-management microservice built to a formal TRD: a Reservation Pattern with pessimistic locking prevents double-booked leave, idempotency keys make retries safe, and a Mock HCM service simulates the upstream system of record.",
    stack: ["NestJS", "SQLite", "Jest"],
  },
  {
    name: "Social Media App",
    tag: "MERN Stack",
    desc: "A full social platform designed around denormalized counters for fast reads, a polymorphic Like model shared across content types, and soft-delete flags so nothing is destructively removed.",
    stack: ["MongoDB", "Express", "React", "Node"],
  },
  {
    name: "Project Management Tool",
    tag: "MERN Stack",
    desc: "Built in parallel with the social app under the same deadline: self-referential task subtrees for nested work items, compound indexes for query performance, and embedded membership documents for team access.",
    stack: ["MongoDB", "Express", "React", "Node"],
  },
  {
    name: "WebCMS-MMC-Pro",
    tag: "ASP.NET Core MVC",
    desc: "A content management dashboard wired to real database data through Dapper, following a clean repository pattern with async controllers and ViewModel-driven Razor views.",
    stack: ["C#", "ASP.NET Core", "Dapper", "SQL Server"],
  },
];

const JOURNEY = [
  {
    when: "Final Year",
    title: "MedVision AI — FYP delivery",
    detail:
      "Presented a full clinical decision-support pipeline: model training, a React frontend, and bilingual report export, defended live in front of an evaluation panel.",
  },
  {
    when: "Prior Semester",
    title: "Two MERN apps, one deadline",
    detail:
      "Designed and shipped production-ready schemas for a social platform and a project-management tool at the same time, under real time pressure.",
  },
  {
    when: "Client Test Project",
    title: "ExampleHR microservice",
    detail:
      "Took a formal technical requirements document and turned it into a working, smoke-tested NestJS service with concurrency-safe leave reservations.",
  },
  {
    when: "Internship Work",
    title: "WebCMS-MMC-Pro",
    detail:
      "Rebuilt a CMS dashboard on real data with a repository pattern in ASP.NET Core, debugging through schema mismatches to get live data flowing end to end.",
  },
];

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.id);
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return [active, refs];
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".pf-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Portfolio() {
  const [active, refs] = useActiveSection();
  useScrollReveal();
  const accent = SECTIONS.find((s) => s.id === active)?.accent || SECTIONS[0].accent;

  const scrollTo = (id) => {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ "--accent": accent }} className="pf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap');

        .pf-root {
          --bg: #0a0e14;
          --surface: #10151f;
          --surface-2: #151b26;
          --text: #e6edf3;
          --muted: #6b7787;
          --line: #1e2530;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          position: relative;
          min-height: 100%;
          overflow-x: hidden;
        }
        .pf-mono { font-family: 'JetBrains Mono', monospace; }

        .pf-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(230,237,243,0.06) 1px, transparent 0);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .pf-blob {
          position: absolute;
          top: -10%;
          left: 50%;
          width: 700px;
          height: 700px;
          transform: translateX(-50%);
          background: radial-gradient(circle, var(--accent) 0%, transparent 65%);
          opacity: 0.16;
          filter: blur(40px);
          transition: background 0.8s ease;
          pointer-events: none;
          animation: pf-drift 14s ease-in-out infinite;
        }
        @keyframes pf-drift {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-46%) translateY(30px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-blob { animation: none; }
        }

        .pf-rail {
          transition: border-color 0.6s ease;
        }
        .pf-dot {
          transition: background 0.5s ease, box-shadow 0.5s ease, transform 0.3s ease;
        }
        .pf-dot.is-active {
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent);
        }
        .pf-dot-pulse {
          animation: pf-pulse 2.2s ease-in-out infinite;
        }
        @keyframes pf-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-dot-pulse { animation: none; }
        }

        .pf-nav-label {
          transition: color 0.5s ease;
        }

        .pf-eyebrow {
          transition: color 0.6s ease;
        }

        .pf-card {
          background: var(--surface);
          border: 1px solid var(--line);
          transition: border-color 0.4s ease, transform 0.25s ease, box-shadow 0.4s ease;
        }
        .pf-card:hover {
          border-color: color-mix(in srgb, var(--accent) 55%, var(--line));
          transform: translateY(-3px);
          box-shadow: 0 12px 30px -12px color-mix(in srgb, var(--accent) 35%, transparent);
        }

        .pf-tag {
          border: 1px solid var(--line);
          color: var(--muted);
        }

        .pf-btn-primary {
          background: var(--accent);
          color: #0a0e14;
          transition: background 0.5s ease, transform 0.2s ease;
        }
        .pf-btn-primary:hover { transform: translateY(-2px); }

        .pf-btn-ghost {
          border: 1px solid var(--line);
          color: var(--text);
          transition: border-color 0.5s ease, color 0.5s ease, transform 0.15s ease;
        }
        .pf-btn-ghost:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
          /* Tactile press feedback for buttons/links */
        .pf-press { transition: transform 0.15s ease, background 0.5s ease, border-color 0.5s ease, color 0.5s ease; }
        .pf-press:active { transform: scale(0.96); }

        .pf-underline {
          text-decoration-color: var(--accent);
          text-decoration-thickness: 2px;
          text-underline-offset: 4px;
          transition: text-decoration-color 0.6s ease;
        }

        .pf-scan {
          position: relative;
        }
        .pf-scan::after {
          content: "";
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 1px;
          background: var(--accent);
          opacity: 0.5;
          transition: background 0.6s ease;
        }
          
        /* Scroll-triggered reveal: fade + rise, applied via the pf-reveal class */
        .pf-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .pf-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-reveal { opacity: 1; transform: none; transition: none; }
        }

        /* Blinking terminal cursor, used on the two "prompt" eyebrows */
        @keyframes pf-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .pf-cursor::after {
          content: "▌";
          display: inline-block;
          margin-left: 6px;
          animation: pf-blink 1s steps(1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-cursor::after { animation: none; }
        }
      `}</style>

      <div className="pf-grid-bg" />
      <div className="pf-blob" />

      {/* Mobile top bar */}
      <div className="pf-mono md:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-3 px-4 py-3 bg-[#0a0e14]/90 backdrop-blur border-b border-[var(--line)] overflow-x-auto">
        <Terminal size={14} style={{ color: accent }} className="shrink-0" />
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="pf-nav-label text-xs shrink-0"
            style={{ color: active === s.id ? s.accent : "#6b7787" }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Desktop left rail */}
      <aside className="pf-rail hidden md:flex fixed left-0 top-0 h-full w-64 flex-col justify-between border-r border-[var(--line)] px-8 py-10 z-40">
        <div>
          <div className="pf-mono flex items-center gap-2 text-sm" style={{ color: accent }}>
            <Terminal size={16} />
            <span>safi@dev:~$</span>
          </div>
          <nav className="mt-12 flex flex-col gap-6">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="group flex items-center gap-3 text-left"
                >
                  <span
                    className={`pf-dot h-2 w-2 rounded-full shrink-0 ${isActive ? "is-active pf-dot-pulse" : ""}`}
                    style={{ background: isActive ? s.accent : "#2a3140" }}
                  />
                  <span className="flex flex-col">
                    <span
                      className="pf-nav-label pf-mono text-sm"
                      style={{ color: isActive ? s.accent : "#6b7787" }}
                    >
                      {s.path}
                    </span>
                    {isActive && (
                      <span className="pf-mono text-[10px] tracking-widest" style={{ color: s.accent }}>
                        [ {s.status} ]
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/muhammadsafi512-rgb/" className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/safi-malik-dev/" className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:muhammadsafi.512@gmail.com" className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-64 relative z-10 pt-16 md:pt-0">
        {/* ABOUT */}
        <section
          data-id="about"
          ref={(el) => (refs.current.about = el)}
          className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-24"
        >
          <p className="pf-eyebrow pf-mono text-sm tracking-widest pf-reveal pf-cursor" style={{ color: accent }}>
            WHO I AM
          </p>
          <h1 className="pf-mono mt-4 text-5xl md:text-7xl font-extrabold leading-[1.05] pf-reveal" style={{ transitionDelay: "100ms" }}>
            SAFI
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--muted)] leading-relaxed pf-reveal" style={{ transitionDelay: "200ms" }}>
            Final-year Computer Science engineer building full-stack systems and
            applied AI — from a fracture-detection model that reads X-rays, to
            backend services that hold up under concurrent load.
          </p>
          <div className="pf-mono mt-8 flex items-center gap-2 text-xs pf-reveal" style={{ color: accent, transitionDelay: "300ms" }}>
            <span className="pf-dot pf-dot-pulse h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            SYSTEM ONLINE — open to new-grad & internship roles
          </div>
          <div className="mt-10 flex flex-wrap gap-4 pf-reveal" style={{ transitionDelay: "400ms" }}>
            <button onClick={() => scrollTo("projects")} className="pf-btn-primary pf-mono rounded-md px-5 py-3 text-sm font-semibold">
              View projects
            </button>
            <button onClick={() => scrollTo("contact")} className="pf-btn-ghost pf-mono rounded-md px-5 py-3 text-sm font-semibold">
              Get in touch
            </button>
          </div>
        </section>

        {/* SKILLS */}
        <section
          data-id="skills"
          ref={(el) => (refs.current.skills = el)}
          className="pf-scan min-h-screen px-6 md:px-16 py-24 border-t border-[var(--line)]"
        >
          <p className="pf-eyebrow pf-mono text-sm tracking-widest pf-reveal pf-cursor" style={{ color: accent }}>
            SKILLS
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold pf-underline underline pf-reveal" style={{ transitionDelay: "80ms" }}>
            What I build with
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((group) => (
              <div key={group.group} className="pf-card rounded-lg p-6 pf_reveal" style={{ transitionDelay: "120ms" }}>
                <h3 className="pf-mono text-sm font-bold pf-reveal" style={{ color: accent }}>
                  {group.group}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="pf-tag pf-mono text-xs rounded px-2 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          data-id="projects"
          ref={(el) => (refs.current.projects = el)}
          className="pf-scan min-h-screen px-6 md:px-16 py-24 border-t border-[var(--line)]"
        >
          <p className="pf-eyebrow pf-mono text-sm tracking-widest pf-reveal pf-cursor" style={{ color: accent }}>
            PROJECTS
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold pf-underline underline pf-reveal" style={{ transitionDelay: "80ms" }}>
            Things I've shipped
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <div key={p.name} className="pf-card rounded-lg p-6 flex flex-col pf-reveal" style={{ transitionDelay: "160ms" }}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <ArrowUpRight size={16} className="shrink-0 mt-1 text-[var(--muted)]" />
                </div>
                <span className="pf-mono text-xs mt-1" style={{ color: accent }}>
                  {p.tag}
                </span>
                <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="pf-tag pf-mono text-[11px] rounded px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* JOURNEY */}
        <section
          data-id="journey"
          ref={(el) => (refs.current.journey = el)}
          className="pf-scan min-h-screen px-6 md:px-16 py-24 border-t border-[var(--line)]"
        >
          <p className="pf-eyebrow pf-mono text-sm tracking-widest pf-reveal pf-cursor" style={{ color: accent }}>
            JOURNEY
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold pf-underline underline pf-reveal" style={{ transitionDelay: "80ms" }}>
            Build log
          </h2>
          <div className="mt-12 max-w-2xl">
            {JOURNEY.map((j, i) => (
              <div key={j.title} className="relative pl-8 pb-10 last:pb-0 pf-reveal" style={{ transitionDelay: `${100 + i * 80}ms` }}>
                {i !== JOURNEY.length - 1 && (
                  <span className="absolute left-[5px] top-3 bottom-0 w-px bg-[var(--line)]" />
                )}
                <span
                  className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full"
                  style={{ background: accent }}
                />
                <p className="pf-mono text-xs" style={{ color: accent }}>
                  {j.when}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{j.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{j.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          data-id="contact"
          ref={(el) => (refs.current.contact = el)}
          className="pf-scan min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 border-t border-[var(--line)]"
        >
          <p className="pf-eyebrow pf-mono text-sm tracking-widest pf-reveal pf-cursor" style={{ color: accent }}>
            CONTACT
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-2xl pf-reveal" style={{ transitionDelay: "80ms" }}>
            Building something interesting? I'd like to hear about it.
          </h2>
          <p className="mt-6 max-w-xl text-[var(--muted)] leading-relaxed pf-reveal" style={{ transitionDelay: "160ms" }}>
            Whether it's a graduate role, an internship, or a project worth
            collaborating on — my inbox is open.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:muhammadsafi.512@gmail.com"
              className="pf-btn-primary pf-mono rounded-md px-5 py-3 text-sm font-semibold inline-flex items-center gap-2"
            >
              <Mail size={16} /> muhammadsafi.512@gmail.com
            </a>
            <a href="https://github.com/muhammadsafi512-rgb/" className="pf-btn-ghost pf-mono rounded-md px-5 py-3 text-sm font-semibold inline-flex items-center gap-2">
              <Github size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/safi-malik-dev/" className="pf-btn-ghost pf-mono rounded-md px-5 py-3 text-sm font-semibold inline-flex items-center gap-2">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
          <p className="pf-mono mt-16 text-xs text-[var(--muted)] pf-reveal" style={{ transitionDelay: "240ms" }}>
            © {new Date().getFullYear()} SAFI — built with React.
          </p>
        </section>
      </main>
    </div>
  );
}
