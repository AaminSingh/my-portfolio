import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import CertificateCard from "../components/CertificateCard";
import data from "../data/portfolio.json";

const certificates = [
  {
    id: "oracle-ai",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    category: "Cloud & Databases",
    date: "October 30, 2025",
    description:
      "Validates foundational knowledge of Artificial Intelligence and Machine Learning concepts within Oracle Cloud Infrastructure (OCI). I gained practical insights into AI/ML algorithms, deep learning architecture, and supervised vs unsupervised learning workflows.",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=B93C36CB5B7DE59BB7CAA3EE6726114A09FF28B6CCFFA348406E1CD042FCED92",
    imageSrc: "/images/certificates/oracle-ai.png",
    collageClass: "cert-span-wide",
    accentColor: "emerald",
    badge: "FEATURED AI CREDENTIAL",
    isWide: true,
  },
  {
    id: "mongodb-basics",
    title: "MongoDB Basics for Students",
    issuer: "MongoDB",
    category: "Cloud & Databases",
    date: "August 04, 2026",
    description:
      "Focuses on NoSQL database fundamentals and the document model. I learned how to handle scaling and replication within distributed database architectures and gained hands-on experience deploying clusters using MongoDB Atlas.",
    link: "https://www.credly.com/badges/7c79ad2e-c518-4a6e-b80f-5d8e8d3ea32b/linked_in_profile",
    imageSrc: "/images/certificates/mongodb-basics.png",
    collageClass: "cert-span-tall",
    accentColor: "purple",
    badge: "DATABASE & NOSQL",
    isTall: true,
  },
  {
    id: "tata-genai",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata / Forage",
    category: "AI & ML",
    date: "April 1, 2026",
    description:
      "A practical job simulation focused on applying Generative AI to data analysis workflows. I developed skills in exploratory data analysis and risk profiling, utilizing AI to efficiently extract and interpret actionable business insights.",
    link: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_sepFgWt7CbFzbFW2w_1775026328321_completion_certificate.pdf",
    imageSrc: "/images/certificates/tata-genai.png",
    collageClass: "cert-span-standard",
    accentColor: "amber",
    badge: "JOB SIMULATION",
  },
  {
    id: "ibm-genai",
    title: "Generative AI Virtual Internship",
    issuer: "IBM & FutureSkills Prime",
    category: "AI & ML",
    date: "March 13, 2026",
    description:
      "An intensive virtual internship provided by IBM. I built a strong understanding of Generative AI principles, prompt engineering, and the integration of large language models into practical, AI-driven software solutions.",
    link: "https://courses.ibmmooc.skillsnetwork.site/certificates/6f70b18a5eec4b9c95fd6fe4b23564f0",
    imageSrc: "/images/certificates/ibm-genai.png",
    collageClass: "cert-span-standard",
    accentColor: "rose",
    badge: "AI INTERNSHIP",
  },
  {
    id: "ibm-datavis",
    title: "Data Visualization with Python",
    issuer: "Cognitive Class / IBM",
    category: "Data Analytics",
    date: "May 2024",
    description:
      "Focused on effectively communicating data insights using Python. I learned to leverage libraries like Matplotlib and Seaborn to create highly informative, interactive charts and graphs to represent complex datasets visually.",
    link: "https://courses.cognitiveclass.ai/certificates/1449fafd3cb34a80862e6c3f9e8276d8",
    imageSrc: "/images/certificates/ibm-datavis.png",
    collageClass: "cert-span-standard",
    accentColor: "sky",
    badge: "DATA SCIENCE",
  },
  {
    id: "deloitte-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte / Forage",
    category: "Data Analytics",
    date: "March 14, 2026",
    description:
      "A hands-on simulation covering enterprise data analysis and forensic technology. I learned how to process, clean, and analyze complex datasets to uncover anomalies and deliver business-critical reporting.",
    link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_sepFgWt7CbFzbFW2w_1773464748866_completion_certificate.pdf",
    imageSrc: "/images/certificates/deloitte-analytics.png",
    collageClass: "cert-span-wide",
    accentColor: "teal",
    badge: "ENTERPRISE SIMULATION",
    isWide: true,
  },
];

const categories = ["All Credentials", "AI & ML", "Data Analytics", "Cloud & Databases"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.25 },
  },
};

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState("All Credentials");

  const filteredCertificates =
    activeCategory === "All Credentials"
      ? certificates
      : certificates.filter((cert) => cert.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-sans relative overflow-hidden transition-colors duration-300">
      <Head>
        <title>Certificates & Credentials | Aamin Simmi Singh</title>
        <meta
          name="description"
          content="Verified professional certificates, cloud badges, and technical credentials earned by Aamin Simmi Singh presented in an interactive collage layout."
        />
      </Head>

      {data.showCursor && <Cursor />}

      {/* Dynamic Background Radial Glow Orbs */}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <Header isBlog />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono mb-3 shadow-md shadow-emerald-500/10">
            <span className="animate-pulse text-emerald-400">●</span>
            <span>VERIFIED_CREDENTIALS</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Certificates & <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Credentials</span>
              </h1>
              <p className="mt-2 font-mono text-sm max-w-2xl text-slate-400">
                {"// Professional certifications, cloud authorizations, and verified technical achievements presented in a dynamic collage format."}
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="inline-flex items-center gap-4 bg-slate-900/80 border border-emerald-500/30 rounded-2xl px-4 py-2.5 backdrop-blur-md self-start md:self-auto">
              <div className="flex flex-col">
                <span className="text-xs font-mono text-slate-400">Total Cards</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">{certificates.length}</span>
              </div>
              <div className="h-7 w-[1px] bg-emerald-500/20" />
              <div className="flex flex-col">
                <span className="text-xs font-mono text-slate-400">Layout</span>
                <span className="text-xs font-bold text-teal-300 font-mono">Bento Collage</span>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-xs transition-all duration-300 whitespace-nowrap border ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold border-emerald-400 shadow-lg shadow-emerald-500/25 scale-[1.03]"
                      : "bg-slate-900/70 hover:bg-slate-800/90 text-slate-300 border-slate-700/60 hover:border-emerald-500/50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Asymmetrical Bento / Collage Grid Layout */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="cert-collage-grid"
        >
          <AnimatePresence>
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={activeCategory === "All Credentials" ? cert.collageClass : "cert-span-standard"}
              >
                <CertificateCard
                  cert={cert}
                  index={index}
                  heightClass="h-full"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
