import React, { useState } from 'react';
import { Logo } from './Logo';
import { ProjectCard } from './ProjectCard';

export const ResumeSections: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative z-10 w-full text-white px-5 sm:px-8 md:px-12 py-16 space-y-24 max-w-6xl mx-auto">
      {/* 1. OBJECTIVE & ABOUT SECTION */}
      <section id="about" className="scroll-mt-28">
        <div className="bg-black/60 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 transition-all hover:border-white/30">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-mono">
                01 // Professional Objective
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-white">
                Aaditya Sudhaker Gurav
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-1">
                Third-Year BSc IT Student • Software Developer • Mumbai, India
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-ping" />
                Available for Software Roles
              </span>
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs bg-white/5 text-white/80 border border-white/10">
                3 Months Production Experience
              </span>
            </div>
          </div>

          <div className="mt-8 text-base sm:text-xl text-white/90 leading-relaxed font-normal">
            <p>
              "Motivated third-year BSc IT student with hands-on software development experience from a 3-month internship at Lekeamp. Skilled in debugging, feature development, and testing, and eager to grow as a software developer in a collaborative team environment."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="text-xs text-white/50 uppercase font-mono">Email</div>
              <button
                type="button"
                onClick={() => copyToClipboard('aaadityavgurav@gmail.com', 'email')}
                className="mt-1 text-sm font-medium text-white hover:underline flex items-center gap-2 group text-left"
              >
                <span>aaadityavgurav@gmail.com</span>
                <span className="text-xs text-white/50 group-hover:text-white">
                  {copiedEmail ? 'Copied!' : (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="5.5" y="5.5" width="8.5" height="8.5" rx="1.5" />
                      <path d="M3.5 10.5H2.5C1.94772 10.5 1.5 10.0523 1.5 9.5V2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H9.5C10.0523 1.5 10.5 1.94772 10.5 2.5V3.5" />
                    </svg>
                  )}
                </span>
              </button>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="text-xs text-white/50 uppercase font-mono">Phone</div>
              <button
                type="button"
                onClick={() => copyToClipboard('9322378090', 'phone')}
                className="mt-1 text-sm font-medium text-white hover:underline flex items-center gap-2 group text-left"
              >
                <span>+91 9322378090</span>
                <span className="text-xs text-white/50 group-hover:text-white">
                  {copiedPhone ? 'Copied!' : (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="5.5" y="5.5" width="8.5" height="8.5" rx="1.5" />
                      <path d="M3.5 10.5H2.5C1.94772 10.5 1.5 10.0523 1.5 9.5V2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H9.5C10.0523 1.5 10.5 1.94772 10.5 2.5V3.5" />
                    </svg>
                  )}
                </span>
              </button>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="text-xs text-white/50 uppercase font-mono">Degree</div>
              <div className="mt-1 text-sm font-medium text-white">
                BSc in Information Technology (Year 3)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPERIENCE SECTION */}
      <section id="experience" className="scroll-mt-28">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-1 font-mono">
              02 // Work Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight">
              Production Experience
            </h2>
          </div>
          <span className="text-white/40 text-sm hidden sm:block">
            01 Position
          </span>
        </div>

        <div className="bg-black/60 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 transition-all hover:border-white/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl sm:text-2xl font-medium text-white">
                  Software Intern
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white text-black font-medium">
                  3 Months
                </span>
              </div>
              <p className="text-white/70 text-base mt-1">
                Lekeamp • Software Development Team
              </p>
            </div>
            <div className="text-sm font-mono text-white/50">
              Live Apps: Stepout &amp; Nivora
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-white/60 font-mono">
              Key Contributions &amp; Responsibilities:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
              <li className="flex items-start gap-3 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                <span className="text-white/40 font-mono mt-0.5">01</span>
                <div>
                  <strong className="text-white font-medium block mb-1">
                    Live Applications Deployment
                  </strong>
                  Worked actively on two live client/consumer applications: <span className="text-white font-semibold underline underline-offset-2">Stepout</span> and <span className="text-white font-semibold underline underline-offset-2">Nivora</span>, collaborating across the core development cycle.
                </div>
              </li>

              <li className="flex items-start gap-3 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                <span className="text-white/40 font-mono mt-0.5">02</span>
                <div>
                  <strong className="text-white font-medium block mb-1">
                    Bug Hunting &amp; Root Cause Analysis
                  </strong>
                  Identified and resolved runtime bugs and edge-case exceptions to significantly enhance application stability and deliver a smoother user experience.
                </div>
              </li>

              <li className="flex items-start gap-3 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                <span className="text-white/40 font-mono mt-0.5">03</span>
                <div>
                  <strong className="text-white font-medium block mb-1">
                    Feature Development
                  </strong>
                  Developed and integrated new interactive features and UI/backend components directly into the applications based on user feedback and team requirements.
                </div>
              </li>

              <li className="flex items-start gap-3 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                <span className="text-white/40 font-mono mt-0.5">04</span>
                <div>
                  <strong className="text-white font-medium block mb-1">
                    Pre-Release Testing &amp; Verification
                  </strong>
                  Conducted comprehensive manual and regression testing on features and hotfixes to verify complete stability before staging and production release.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS SECTION */}
      <section id="projects" className="scroll-mt-28">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-1 font-mono">
              03 // Featured Projects
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight">
              Live Production Applications
            </h2>
          </div>
          <span className="text-white/40 text-sm hidden sm:block">
            02 Live Apps on Google Play
          </span>
        </div>

        <div className="space-y-8">
          {/* Project 1: Stepout */}
          <ProjectCard
            name="Stepout"
            tagline="Book turfs, manage teams & track cricket scores with Step-Out."
            category="Sports & Turf Booking"
            company="Lekeamp"
            iconSrc="/images/projects/stepout/icon.webp"
            playStoreUrl="https://play.google.com/store/apps/details?id=com.stepout.turfapp"
            description="Contributed to end-to-end bug fixing, rapid feature iteration, and cross-platform verification during software engineering internship at Lekeamp. Worked closely with senior developers to diagnose and patch live issues, ensuring high stability and a seamless booking experience for users."
            tags={[
              'Bug Fixing',
              'Feature Development',
              'Turf Booking',
              'Score Tracking',
              'Pre-release QA',
              'App Stability',
            ]}
            screenshots={[
              '/images/projects/stepout/screen_1.webp',
              '/images/projects/stepout/screen_2.webp',
              '/images/projects/stepout/screen_3.webp',
              '/images/projects/stepout/screen_4.webp',
              '/images/projects/stepout/screen_5.webp',
              '/images/projects/stepout/screen_6.webp',
            ]}
          />

          {/* Project 2: Nivora */}
          <ProjectCard
            name="Nivora"
            tagline="Manage your society with ease – visitors, maintenance, notices & more."
            category="Society Management"
            company="Lekeamp"
            iconSrc="/images/projects/nivora/icon.webp"
            playStoreUrl="https://play.google.com/store/apps/details?id=com.societyapp.nivora"
            description="Engineered critical bug fixes, improved UI/UX responsiveness, and carried out integration testing for new modules. Maintained high reliability through rigorous functional verification ahead of staging and production release updates."
            tags={[
              'New Features',
              'Visitor Management',
              'Maintenance Tracking',
              'User Experience',
              'Crash Prevention',
              'Regression Testing',
            ]}
            screenshots={[
              '/images/projects/nivora/screen_1.webp',
              '/images/projects/nivora/screen_2.webp',
              '/images/projects/nivora/screen_3.webp',
              '/images/projects/nivora/screen_4.webp',
              '/images/projects/nivora/screen_5.webp',
              '/images/projects/nivora/screen_6.webp',
            ]}
          />
        </div>
      </section>

      {/* 4. TECHNICAL & SOFT SKILLS */}
      <section id="skills" className="scroll-mt-28">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-1 font-mono">
              04 // Core Competencies
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight">
              Skills &amp; Practices
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Technical Skills */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-normal text-white pb-3 border-b border-white/10 flex items-center justify-between">
              <span>Technical Skills</span>
              <span className="text-xs font-mono text-white/50">Core</span>
            </h3>

            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase font-mono text-white/50 block mb-2">
                  Programming Languages
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white text-black">
                    C++
                  </span>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white border border-white/15">
                    Object-Oriented Programming (OOP)
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase font-mono text-white/50 block mb-2">
                  Web Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white text-black">
                    HTML
                  </span>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white border border-white/15">
                    CSS / Tailwind CSS
                  </span>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white border border-white/15">
                    TypeScript / JavaScript
                  </span>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white border border-white/15">
                    React
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase font-mono text-white/50 block mb-2">
                  Software Engineering Practices
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                    <span className="text-xs text-white/80 block font-medium">Debugging</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                    <span className="text-xs text-white/80 block font-medium">Feature Development</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                    <span className="text-xs text-white/80 block font-medium">Software Testing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-normal text-white pb-3 border-b border-white/10 flex items-center justify-between">
              <span>Soft Skills</span>
              <span className="text-xs font-mono text-white/50">Collaboration</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium text-white mb-1">
                    Problem Solving
                  </h4>
                  <p className="text-sm text-white/70">
                    Analytical mindset focused on breaking down complex bugs, tracing logic errors, and developing robust, maintainable solutions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium text-white mb-1">
                    Teamwork &amp; Communication
                  </h4>
                  <p className="text-sm text-white/70">
                    Proven track record working seamlessly in product development teams, communicating progress clearly, and coordinating across release milestones.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium text-white mb-1">
                    Quick Learner
                  </h4>
                  <p className="text-sm text-white/70">
                    Rapidly adapts to new tools, codebases, frameworks, and workflows with minimal ramp-up time in fast-paced software environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDUCATION SECTION */}
      <section id="education" className="scroll-mt-28">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-1 font-mono">
              05 // Academic Background
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight">
              Education
            </h2>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 transition-all hover:border-white/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white mb-3">
                Undergraduate Degree
              </div>
              <h3 className="text-xl sm:text-3xl font-normal text-white">
                Bachelor of Science in Information Technology (BSc IT)
              </h3>
              <p className="text-white/70 text-sm sm:text-base mt-2">
                Specialized in software development, data structures, computing theory, and web technologies.
              </p>
            </div>
            <div className="sm:text-right shrink-0">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white text-black font-semibold text-sm">
                Year 3 (Ongoing)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT & CONNECT FOOTER */}
      <section id="contact" className="scroll-mt-28 pt-8">
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <span className="text-xs uppercase tracking-widest text-white/60 font-mono mb-3 block">
            Let's Collaborate
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-4">
            Get in touch with Aaditya
          </h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base mb-8">
            Interested in hiring, collaborating on a project, or discussing full-time or internship software engineering opportunities?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:aaadityavgurav@gmail.com"
              className="inline-flex items-center justify-center bg-white text-black rounded-full text-sm font-medium px-6 py-3 hover:bg-black hover:text-white border border-white transition-all cursor-pointer"
            >
              Send an Email
            </a>
            <a
              href="tel:9322378090"
              className="inline-flex items-center justify-center bg-transparent text-white rounded-full text-sm font-medium px-6 py-3 hover:bg-white hover:text-black border border-white transition-all cursor-pointer"
            >
              Call: +91 9322378090
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard('aaadityavgurav@gmail.com', 'email')}
              className="inline-flex items-center justify-center bg-white/10 text-white rounded-full text-sm font-medium px-6 py-3 hover:bg-white hover:text-black border border-white/20 transition-all cursor-pointer"
            >
              {copiedEmail ? 'Email Copied!' : 'Copy Email Address'}
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
            <div className="flex items-center gap-2.5">
              <Logo size={20} />
              <span>© 2026 Aaditya Sudhaker Gurav. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 font-mono">
              <span>9322378090</span>
              <span>•</span>
              <span>aaadityavgurav@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

