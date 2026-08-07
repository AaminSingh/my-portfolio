import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";

export default function ResumePage() {
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf");

  // Fetch active resume PDF URL from API
  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await fetch("/api/resume");
        const json = await res.json();
        if (json.success && json.data && json.data.resumeUrl) {
          setResumeUrl(json.data.resumeUrl);
        }
      } catch (e) {
        // Fall back to default
      }
    }
    fetchResume();
  }, []);

  const experiences = [
    {
      id: "1",
      company: "WaterPlane (Tannex & Curio)",
      location: "Lucknow, India",
      role: "Software Developer",
      period: "2025 – Present",
      credential: "Letter of Recommendation",
      bulletPoints: [
        "Collaborated in an Agile environment to build innovative, multi-tiered e-commerce solutions (tannex.in), integrating complex backend components with high-performance interfaces.",
        "Designed and implemented scalable API structures utilizing Object-Oriented Design (OOD) principles to handle dynamic product filtering and robust user authentication.",
        "Resolved broadly defined, ambiguous technical challenges across the application lifecycle to improve system latency, data tracking, and fault tolerance.",
      ],
    },
    {
      id: "2",
      company: "IBM (via FutureSkills Prime)",
      location: "Virtual",
      role: "Virtual Intern – Generative AI",
      period: "Feb 2026 – Mar 2026",
      credential: "IBM Skills Network Certificate",
      bulletPoints: [
        "Authored programmatic solutions to evaluate predictions and automated logic on distributed GenAI systems, navigating ambiguous technical challenges.",
        "Effectively articulated technical challenges and applied strong analytical skills to maintain logic integrity and ensure high-quality software deliverables.",
      ],
    },
  ];

  const projectsHackathons = [
    {
      id: "1",
      name: "Aegis – AI Medical Diagnosis Platform",
      role: "Backend & ML Engineer",
      tech: "Python, Node.js, MongoDB (Microservices)",
      honor: "2026",
      bulletPoints: [
        "Architected a multi-tiered clinical diagnosis platform using a Node.js backend and Python ML microservice, implementing a strict-timeout fallback engine to ensure fault-tolerant, zero-downtime inference.",
        "Integrated Scikit-learn classification models with conversational LLM agents to process unstructured symptom data, securely managing session state and NoSQL data lookups with JWT and MongoDB.",
      ],
    },
    {
      id: "2",
      name: "PRAMAAN – AI Financial Analyst",
      role: "Data Automation & AI Engineer",
      tech: "Python, APIs",
      honor: "Finalist, TechKriti (IIT Kanpur) | Mar 2025",
      bulletPoints: [
        "Built automation tools using Python to extract, track, and synthesize data from complex financial PDFs, converting unstructured reporting into predictable, queryable datasets.",
        "Monitored key system metrics during data ingestion, optimizing the distributed pipeline to reduce manual analysis time by 40% while handling broadly defined technical requirements.",
      ],
    },
    {
      id: "3",
      name: "Vaayu Darshak",
      role: "Data Research Lead & Forecaster",
      tech: "Python, Scikit-learn",
      honor: "State Finalist, ISRO Hackathon | Jul 2025",
      bulletPoints: [
        "Created solutions to run highly accurate predictions on large, distributed environmental datasets using Python-based optimization mathematics (ARIMA+LSTM).",
        "Built robust query models to process extensive satellite telemetry data, ensuring the predictive system remained scalable, low cost, and easy to manage.",
      ],
    },
  ];

  const certifications = [
    { name: "Oracle Certified Professional (AI Foundations)", issuer: "Oracle Cloud Infrastructure", date: "July 2025" },
    { name: "Data Visualization with Python", issuer: "IBM (Cognitive Class)", date: "May 2024" },
    { name: "Microsoft Learn Achievement Badge", issuer: "Microsoft", date: "2024" },
    { name: "Data Analytics Job Simulation", issuer: "Deloitte (Forage)", date: "2026" },
  ];

  const technicalSkills = [
    { title: "Core CS Fundamentals", items: ["Object-Oriented Design (OOD)", "Operating Systems", "Algorithms", "Data Structures", "Complexity Analysis"] },
    { title: "Systems & Architecture", items: ["Distributed Systems", "Relational/NoSQL Databases", "Multi-tiered Systems", "Microservices", "Agile Workflow"] },
    { title: "Languages", items: ["Python", "Java", "C/C++", "SQL", "JavaScript"] },
    { title: "Developer Tools", items: ["Git/GitHub", "Linux", "REST APIs", "React", "Node.js", "Express", "MongoDB", "Jupyter"] },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-[#e2e8f0] flex flex-col font-sans relative overflow-hidden">
      <Head>
        <title>Aamin Simmi Singh | Resume & Engineering Profile</title>
        <meta
          name="description"
          content="Official resume of Aamin Simmi Singh - Software Engineering Student, Python & Backend Developer specializing in Generative AI, Microservices, and Full-Stack Architecture."
        />
      </Head>

      {data.showCursor && <Cursor />}

      {/* Vibrant Purple Glow Background Orbs */}
      <div
        className="fixed pointer-events-none z-0 top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[450px] opacity-25 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.9) 0%, rgba(129, 140, 248, 0.4) 50%, transparent 100%)",
        }}
      ></div>
      <div
        className="fixed pointer-events-none z-0 bottom-[-100px] right-[-100px] w-[600px] h-[450px] opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(192, 132, 252, 0.8) 0%, rgba(99, 102, 241, 0.4) 50%, transparent 100%)",
        }}
      ></div>

      <Header isBlog />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full z-10 space-y-10">
        
        {/* ===== HEADER BANNER ===== */}
        <div className="bg-[#12111f]/90 border border-purple-500/25 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono mb-3">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                <span>SOFTWARE_ENGINEER_RESUME</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Aamin Simmi <span className="text-purple-400">Singh</span>
              </h1>
              <p className="mt-2 text-purple-300 font-mono text-sm sm:text-base font-semibold">
                Software Engineering Student | Python & Backend Developer
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5"><span className="text-purple-400">📍</span> Lucknow, India</span>
                <span className="flex items-center gap-1.5"><span className="text-purple-400">✉️</span> aaminsimmisingh@gmail.com</span>
                <span className="flex items-center gap-1.5"><span className="text-purple-400">📞</span> +91-7002960053</span>
              </div>
            </div>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-bold text-sm px-6 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 border border-purple-400/30 w-fit"
            >
              <span>📄</span>
              <span>Download Full Resume (PDF)</span>
            </a>
          </div>
        </div>

        {/* ===== EDUCATION & TECHNICAL SKILLS GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Education */}
          <div className="lg:col-span-5 bg-[#12111f]/80 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-500/15">
                <div className="w-10 h-10 rounded-2xl bg-purple-900/40 text-purple-300 flex items-center justify-center font-mono font-bold text-lg border border-purple-500/30">
                  🎓
                </div>
                <h2 className="text-xl font-bold text-white font-mono">Education</h2>
              </div>

              <div className="space-y-6">
                {/* University */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base text-white">Babu Banarasi Das University</h3>
                    <span className="text-[11px] font-mono text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/30">
                      Lucknow, UP
                    </span>
                  </div>
                  <p className="text-xs font-mono text-purple-400 font-medium">
                    B.Tech in Computer Science and Engineering
                  </p>
                  <p className="text-xs font-mono text-slate-400">Aug 2023 – Present</p>
                  <div className="mt-2 inline-block bg-purple-900/30 text-purple-300 text-xs font-mono px-3 py-1.5 rounded-xl border border-purple-500/30">
                    ✨ Current CGPA: <span className="font-bold text-white">8.90</span> (Passing Out: 2027)
                  </div>
                </div>

                {/* High School */}
                <div className="pt-4 border-t border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-slate-200">Army Public School, Saugor</h3>
                    <span className="text-[11px] font-mono text-slate-400">Madhya Pradesh</span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">Class XII (CBSE Board) – PCM | 2022</p>
                  <p className="text-xs font-mono text-purple-300">Percentage: 87.8%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="lg:col-span-7 bg-[#12111f]/80 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-500/15">
              <div className="w-10 h-10 rounded-2xl bg-purple-900/40 text-purple-300 flex items-center justify-center font-mono font-bold text-lg border border-purple-500/30">
                ⚙️
              </div>
              <h2 className="text-xl font-bold text-white font-mono">Technical Skills</h2>
            </div>

            <div className="space-y-4">
              {technicalSkills.map((sec, idx) => (
                <div key={idx} className="bg-[#0a0a14]/80 border border-purple-500/15 rounded-2xl p-4">
                  <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-2.5">
                    {sec.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sec.items.map((item, i) => (
                      <span
                        key={i}
                        className="bg-purple-950/60 text-purple-200 border border-purple-500/30 font-mono text-xs px-3 py-1 rounded-xl hover:border-purple-400/60 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ===== PROFESSIONAL EXPERIENCE ===== */}
        <div className="bg-[#12111f]/80 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-500/15">
            <div className="w-10 h-10 rounded-2xl bg-purple-900/40 text-purple-300 flex items-center justify-center font-mono font-bold text-lg border border-purple-500/30">
              💼
            </div>
            <h2 className="text-xl font-bold text-white font-mono">Professional Experience</h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-[#0a0a14]/90 border border-purple-500/20 hover:border-purple-500/40 rounded-2xl p-6 transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-white font-sans">{exp.role}</h3>
                    <p className="text-xs font-mono text-purple-400 font-semibold mt-0.5">
                      {exp.company} • <span className="text-slate-400">{exp.location}</span>
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                    <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-3 py-1 rounded-lg border border-purple-500/30">
                      {exp.period}
                    </span>
                    {exp.credential && (
                      <span className="text-[11px] font-mono text-indigo-400 mt-1">
                        📜 Credential: {exp.credential}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="mt-4 space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  {exp.bulletPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ===== PROJECTS & HACKATHONS ===== */}
        <div className="bg-[#12111f]/80 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-500/15">
            <div className="w-10 h-10 rounded-2xl bg-purple-900/40 text-purple-300 flex items-center justify-center font-mono font-bold text-lg border border-purple-500/30">
              🚀
            </div>
            <h2 className="text-xl font-bold text-white font-mono">Projects & Hackathons</h2>
          </div>

          <div className="space-y-6">
            {projectsHackathons.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#0a0a14]/90 border border-purple-500/20 hover:border-purple-500/40 rounded-2xl p-6 transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-white font-sans">{proj.name}</h3>
                    <p className="text-xs font-mono text-purple-400 font-semibold mt-0.5">
                      {proj.role} • <span className="text-indigo-300">{proj.tech}</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-3 py-1 rounded-lg border border-purple-500/30 w-fit mt-2 sm:mt-0">
                    🏆 {proj.honor}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  {proj.bulletPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CERTIFICATIONS & ACHIEVEMENTS ===== */}
        <div className="bg-[#12111f]/80 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-500/15">
            <div className="w-10 h-10 rounded-2xl bg-purple-900/40 text-purple-300 flex items-center justify-center font-mono font-bold text-lg border border-purple-500/30">
              🏅
            </div>
            <h2 className="text-xl font-bold text-white font-mono">Certifications & Achievements</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-[#0a0a14]/90 border border-purple-500/20 hover:border-purple-500/40 rounded-2xl p-4 flex items-center justify-between transition-all"
              >
                <div>
                  <h3 className="font-mono font-bold text-sm text-white">{cert.name}</h3>
                  <p className="text-xs font-mono text-purple-400 mt-0.5">{cert.issuer}</p>
                </div>
                <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/30 whitespace-nowrap ml-3">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
