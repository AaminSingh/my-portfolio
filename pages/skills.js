import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";

const coreSkills = [
  { name: "React", level: "Expert", percentage: 95 },
  { name: "Next.js", level: "Advanced", percentage: 90 },
  { name: "JavaScript", level: "Expert", percentage: 95 },
  { name: "TypeScript", level: "Advanced", percentage: 85 },
  { name: "Python", level: "Advanced", percentage: 90 },
  { name: "Node.js", level: "Advanced", percentage: 85 },
  { name: "Express.js", level: "Proficient", percentage: 80 },
  { name: "Java", level: "Proficient", percentage: 75 },
  { name: "C++", level: "Intermediate", percentage: 70 },
];

const dbCloudSkills = [
  { name: "MongoDB", category: "NoSQL DB", icon: "🍃", status: "Production Ready" },
  { name: "Firebase", category: "BaaS & Auth", icon: "🔥", status: "Production Ready" },
  { name: "AWS", category: "Cloud Infra (S3/EC2)", icon: "☁️", status: "Certified / Active" },
  { name: "GCP", category: "Google Cloud", icon: "🌐", status: "Active" },
];

const aiSkills = [
  { name: "Generative AI", tag: "LLMs / Prompting", icon: "🤖", desc: "Fine-tuning, embeddings, and intelligent agent systems." },
  { name: "RAG Architectures", tag: "Vector Stores", icon: "⚡", desc: "LangChain, FAISS, and real-time knowledge retrieval engines." },
  { name: "TensorFlow / PyTorch", tag: "Deep Learning", icon: "🔥", desc: "Model evaluation, custom training loops, and neural networks." },
  { name: "Scikit-learn", tag: "ML Algorithms", icon: "📊", desc: "Predictive modeling, regression, clustering, and data analysis." },
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0d] text-[#e2e8f0] flex flex-col font-sans relative overflow-hidden">
      <Head>
        <title>Technical Arsenal | Skills & Expertise</title>
        <meta
          name="description"
          content="Technical skills and expertise of Aamin Singh covering Full-Stack Development, NoSQL/Cloud, and AI/Machine Learning."
        />
      </Head>

      {data.showCursor && <Cursor />}

      {/* Radial Glow Backgrounds */}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <Header isBlog />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full z-10">
        {/* Header Section */}
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <span className="animate-pulse text-purple-400">●</span>
            <span>SYSTEM_CAPABILITIES_MANIFEST</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Technical <span className="text-purple-400">Arsenal</span>
          </h1>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base font-mono">
            {"// Comprehensive breakdown of core engineering competencies, cloud infrastructure, and AI architectures."}
          </p>
        </div>

        {/* 3 Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Core Development */}
          <div className="glass-card p-6 sm:p-8 flex flex-col justify-between border border-purple-500/20 hover:border-purple-500/40 transition-all shadow-xl bg-[#12111f]/80">
            <div>
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-500/15">
                <div className="w-10 h-10 rounded-xl bg-purple-900/40 text-purple-300 flex items-center justify-center font-mono font-bold text-lg border border-purple-500/30">
                  &lt;/&gt;
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-mono">Core Development</h2>
                  <p className="text-xs text-slate-400 font-mono">Languages & Frameworks</p>
                </div>
              </div>

              {/* Skills with Progress Bars */}
              <div className="space-y-4">
                {coreSkills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                      <span className="text-[#e2e8f0] font-semibold group-hover:text-purple-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-purple-300 text-[11px] bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                        {skill.level}
                      </span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full bg-[#0a0a14] rounded-full h-2 overflow-hidden border border-purple-500/20 p-0.5">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-1000 shadow-sm shadow-purple-500/40"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Database & Cloud */}
          <div className="glass-card p-6 sm:p-8 flex flex-col justify-between border border-purple-500/20 hover:border-purple-500/40 transition-all shadow-xl bg-[#12111f]/80">
            <div>
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-500/15">
                <div className="w-10 h-10 rounded-xl bg-purple-900/40 text-purple-300 flex items-center justify-center font-mono font-bold text-lg border border-purple-500/30">
                  ☁️
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-mono">Database & Cloud</h2>
                  <p className="text-xs text-slate-400 font-mono">Storage & Infrastructure</p>
                </div>
              </div>

              {/* Grid of Cloud & DB items */}
              <div className="space-y-4">
                {dbCloudSkills.map((item) => (
                  <div
                    key={item.name}
                    className="bg-[#0a0a14]/90 border border-purple-500/15 hover:border-purple-500/40 rounded-xl p-4 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="font-mono font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{item.category}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 border border-purple-500/30 px-2.5 py-1 rounded-full">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-purple-950/40 border border-purple-500/25 text-xs font-mono text-slate-300">
              <span className="text-purple-400 font-bold">INFO:</span> Configured with serverless cloud architecture, NoSQL data modeling, and high-availability database pipelines.
            </div>
          </div>

          {/* Card 3: Machine Learning / AI */}
          <div className="glass-card p-6 sm:p-8 flex flex-col justify-between border border-purple-500/20 hover:border-purple-500/40 transition-all shadow-xl bg-[#12111f]/80">
            <div>
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-500/15">
                <div className="w-10 h-10 rounded-xl bg-purple-900/40 text-purple-300 flex items-center justify-center font-mono font-bold text-lg border border-purple-500/30">
                  🧠
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-mono">Machine Learning / AI</h2>
                  <p className="text-xs text-slate-400 font-mono">Generative Models & RAG</p>
                </div>
              </div>

              {/* Grid of AI Skills */}
              <div className="space-y-4">
                {aiSkills.map((item) => (
                  <div
                    key={item.name}
                    className="bg-[#0a0a14]/90 border border-purple-500/15 hover:border-purple-500/40 rounded-xl p-4 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{item.icon}</span>
                        <h3 className="font-mono font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 font-mono leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-purple-950/40 border border-purple-500/25 text-xs font-mono text-slate-300">
              <span className="text-purple-400 font-bold">FOCUS:</span> Production Retrieval-Augmented Generation (RAG) with vector databases, custom prompt engineering, and LLM automation.
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
