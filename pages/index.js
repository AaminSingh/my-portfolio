import { useRef, useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Socials from "../components/Socials";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Cursor from "../components/Cursor";

// Local Data
import data from "../data/portfolio.json";

// Keywords to highlight in the About section
const HIGHLIGHT_KEYWORDS = [
  "Frontend Strategist",
  "AI/ML Enthusiast",
  "Tech Lead",
  "IoT",
  "Blockchain",
  "Generative AI",
  "MERN",
  "Next.js",
  "ISRO",
  "TechKriti",
];

function highlightText(text, keywords) {
  if (!text) return text;
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliestIndex = remaining.length;
    let earliestKeyword = null;

    for (const kw of keywords) {
      const idx = remaining.indexOf(kw);
      if (idx !== -1 && idx < earliestIndex) {
        earliestIndex = idx;
        earliestKeyword = kw;
      }
    }

    if (earliestKeyword) {
      if (earliestIndex > 0) {
        parts.push(remaining.substring(0, earliestIndex));
      }
      parts.push(
        <span key={key++} className="highlight-keyword">
          {earliestKeyword}
        </span>
      );
      remaining = remaining.substring(earliestIndex + earliestKeyword.length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return parts;
}

// Custom hook for scroll reveal using Intersection Observer
function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = ref.current?.querySelectorAll(".scroll-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Home() {
  // Refs
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const scrollContainer = useScrollReveal();

  // State
  const [projects, setProjects] = useState(data.projects);
  const [selectedProject, setSelectedProject] = useState(null);

  // Load projects from localStorage (admin dashboard sync)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        }
      }
    } catch (e) {
      // Fall back to default projects from JSON
    }
  }, []);

  // Scroll handlers
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  // GSAP entrance animation
  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  const handleViewDetails = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div
      ref={scrollContainer}
      className={`relative ${data.showCursor && "cursor-none"}`}
    >
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name} – Portfolio</title>
        <meta
          name="description"
          content="Aamin Simmi Singh – Curious Learner and Software Developer. Passionate about AI, Full-Stack Development, Data Science, and building impactful software solutions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />

        {/* ===== HERO SECTION ===== */}
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h2
              ref={textTwo}
              className="text-2xl tablet:text-4xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 font-bold w-full laptop:w-4/5 mt-2"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {data.headerTaglineTwo}
            </h2>
            <p
              ref={textThree}
              className="text-base tablet:text-lg laptop:text-xl p-1 tablet:p-2 text-gray-400 w-full laptop:w-3/5 mt-3 leading-relaxed"
            >
              {data.headerSubheading}
            </p>
            <p
              ref={textFour}
              className="text-sm tablet:text-base laptop:text-lg p-1 tablet:p-2 text-gray-500 w-full laptop:w-3/5 mt-2 leading-relaxed"
            >
              {data.headerIntro}
            </p>
          </div>

          <Socials className="mt-5 laptop:mt-8" />
        </div>

        {/* ===== PROJECTS SECTION ===== */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <div className="scroll-reveal">
            <p className="section-title">Featured Projects</p>
            <h2 className="section-heading text-2xl tablet:text-3xl mb-2">
              Work.
            </h2>
            <p className="text-gray-400 text-sm tablet:text-base mb-8 max-w-2xl">
              A selection of projects I&apos;ve built — from AI-powered platforms to
              full-stack web applications.
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 scroll-reveal">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>

        {/* ===== ABOUT SECTION ===== */}
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <div className="scroll-reveal">
            <p className="section-title">About Me</p>
            <h2 className="section-heading text-2xl tablet:text-3xl mb-2">
              About.
            </h2>
            <p className="text-gray-400 text-sm tablet:text-base mb-6 italic">
              Building intelligent software and turning ideas into impactful
              digital experiences.
            </p>
          </div>
          <div className="scroll-reveal max-w-3xl">
            <p
              className="text-lg laptop:text-xl text-gray-300 leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              {highlightText(data.aboutpara, HIGHLIGHT_KEYWORDS)}
            </p>
          </div>
        </div>

        <Footer />
      </div>

      {/* ===== PROJECT DETAIL MODAL ===== */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </div>
  );
}
