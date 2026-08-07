import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";

const certificates = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "October 30, 2025",
    description:
      "Validates foundational knowledge of Artificial Intelligence and Machine Learning concepts within the Oracle Cloud Infrastructure (OCI). I gained practical insights into the differences between AI, ML, and deep learning, and explored supervised and unsupervised learning techniques.",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=B93C36CB5B7DE59BB7CAA3EE6726114A09FF28B6CCFFA348406E1CD042FCED92",
    imageSrc: "/images/certificates/oracle-ai.png",
  },
  {
    title: "MongoDB Basics for Students",
    issuer: "MongoDB",
    date: "August 04, 2026",
    description:
      "Focuses on NoSQL database fundamentals and the document model. I learned how to handle scaling and replication within distributed database architectures and gained hands-on experience deploying clusters using MongoDB Atlas.",
    link: "https://www.credly.com/badges/7c79ad2e-c518-4a6e-b80f-5d8e8d3ea32b/linked_in_profile",
    imageSrc: "/images/certificates/mongodb-basics.png",
  },
  {
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata / Forage",
    date: "April 1, 2026",
    description:
      "A practical job simulation focused on applying Generative AI to data analysis workflows. I developed skills in exploratory data analysis and risk profiling, utilizing AI to efficiently extract and interpret actionable business insights.",
    link: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_sepFgWt7CbFzbFW2w_1775026328321_completion_certificate.pdf",
    imageSrc: "/images/certificates/tata-genai.png",
  },
  {
    title: "Generative AI Virtual Internship",
    issuer: "IBM & FutureSkills Prime",
    date: "March 13, 2026",
    description:
      "An intensive virtual internship provided by IBM. I built a strong understanding of Generative AI principles, prompt engineering, and the integration of large language models into practical, AI-driven software solutions.",
    link: "https://courses.ibmmooc.skillsnetwork.site/certificates/6f70b18a5eec4b9c95fd6fe4b23564f0",
    imageSrc: "/images/certificates/ibm-genai.png",
  },
  {
    title: "Data Visualization with Python",
    issuer: "Cognitive Class / IBM",
    date: "May 2024",
    description:
      "Focused on effectively communicating data insights using Python. I learned to leverage libraries like Matplotlib and Seaborn to create highly informative, interactive charts and graphs to represent complex datasets visually.",
    link: "https://courses.cognitiveclass.ai/certificates/1449fafd3cb34a80862e6c3f9e8276d8",
    imageSrc: "/images/certificates/ibm-datavis.png",
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte / Forage",
    date: "March 14, 2026",
    description:
      "A hands-on simulation covering enterprise data analysis and forensic technology. I learned how to process, clean, and analyze complex datasets to uncover anomalies and deliver business-critical reporting.",
    link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_sepFgWt7CbFzbFW2w_1773464748866_completion_certificate.pdf",
    imageSrc: "/images/certificates/deloitte-analytics.png",
  },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-sans relative overflow-hidden transition-colors duration-300">
      <Head>
        <title>Certificates & Credentials | Aamin Simmi Singh</title>
        <meta
          name="description"
          content="Verified professional certificates, cloud badges, and technical credentials earned by Aamin Simmi Singh."
        />
      </Head>

      {data.showCursor && <Cursor />}

      {/* Dynamic Background Radial Glow Orbs */}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <Header isBlog />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full z-10">
        {/* Header Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-mono mb-3">
            <span className="animate-pulse">●</span>
            <span>VERIFIED_CREDENTIALS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Certificates & <span className="text-[var(--accent-primary)]">Credentials</span>
          </h1>
          <p className="mt-2 font-mono text-sm max-w-2xl opacity-75">
            {"// Professional certifications, cloud authorizations, and verified technical achievements."}
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="glass-card border border-[var(--border-color)] hover:border-[var(--border-hover)] rounded-2xl p-0 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl bg-[var(--bg-card)] group"
            >
              <div>
                {/* Image / Placeholder Header */}
                <div className="relative w-full h-52 bg-slate-950 overflow-hidden border-b border-[var(--border-color)]">
                  <img
                    src={cert.imageSrc}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/600x350/0f172a/7c3aed?text=Verified+Credential";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[var(--bg-main)]/90 text-[var(--accent-primary)] border border-[var(--border-color)] font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-1 font-sans tracking-tight group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                    {cert.title}
                  </h2>
                  
                  <div className="flex items-center space-x-2 font-mono text-xs text-[var(--accent-primary)] mb-3">
                    <span className="font-semibold">{cert.issuer}</span>
                    <span>•</span>
                    <span className="opacity-75">{cert.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans line-clamp-4">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 mt-auto">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 border border-[var(--border-color)] text-[var(--accent-primary)] hover:bg-gradient-to-r hover:from-[var(--accent-secondary)] hover:to-[var(--accent-tertiary)] hover:text-white py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all duration-300 shadow-md hover:shadow-lg text-center group-hover:border-[var(--border-hover)]"
                >
                  <span>Verify Credential</span>
                  <span className="text-sm">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
