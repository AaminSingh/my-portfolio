import { Popover } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import data from "../../data/portfolio.json";

const Header = ({
  handleWorkScroll,
  handleAboutScroll,
  handleSkillsScroll,
  handleCertificatesScroll,
  handleAchievementsScroll,
  isBlog,
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("purple");

  const { name = "Aamin Simmi Singh" } = data;

  useEffect(() => {
    setMounted(true);
    // Read stored theme from localStorage or default to purple
    const savedTheme = localStorage.getItem("portfolio_theme") || "purple";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem("portfolio_theme", themeName);
    document.documentElement.setAttribute("data-theme", themeName);
  };

  const navigateToSection = (sectionId, customScrollHandler) => {
    if (router.pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else if (customScrollHandler) {
      customScrollHandler();
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { label: "Home", onClick: () => (router.pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/")) },
    { label: "Projects", onClick: () => navigateToSection("projects", handleWorkScroll) },
    { label: "Skills", onClick: () => (router.pathname === "/skills" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/skills")) },
    { label: "Certificates", onClick: () => (router.pathname === "/certificates" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/certificates")) },
    { label: "Resume", onClick: () => router.push("/resume") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)] py-3.5 px-4 sm:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo (Always High Contrast & Theme Colored) */}
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer group flex items-center space-x-1.5"
        >
          <span className="font-mono font-bold text-lg text-[var(--accent-primary)] group-hover:brightness-125 transition-all">
            &lt;
          </span>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors">
            {name}
          </span>
          <span className="font-mono font-bold text-lg text-[var(--accent-primary)] group-hover:brightness-125 transition-all">
            &#47;&gt;
          </span>
          <span className="w-2 h-4 bg-[var(--accent-primary)] inline-block animate-pulse ml-0.5 rounded-sm"></span>
        </div>

        {/* Center: Desktop Minimalist Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className="px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-mono text-[var(--text-main)] opacity-80 hover:opacity-100 hover:text-[var(--accent-primary)] hover:bg-[var(--badge-bg)] transition-all duration-200"
            >
              <span className="text-[var(--accent-primary)] opacity-70 mr-1">{"//"}</span>
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: 4 Theme Switcher Dots & Resume Button */}
        <div className="flex items-center space-x-3">
          {/* 4 Theme Switcher Options */}
          {mounted && (
            <div className="flex items-center space-x-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] p-1.5 rounded-full shadow-inner">
              <button
                title="Cyber Purple Theme"
                onClick={() => changeTheme("purple")}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  currentTheme === "purple"
                    ? "bg-purple-500 ring-2 ring-purple-300 scale-110 shadow-[0_0_10px_#a855f7]"
                    : "bg-purple-900/60 hover:bg-purple-500/80"
                }`}
              />
              <button
                title="Neon Matrix Theme"
                onClick={() => changeTheme("green")}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  currentTheme === "green"
                    ? "bg-emerald-400 ring-2 ring-emerald-200 scale-110 shadow-[0_0_10px_#4ade80]"
                    : "bg-emerald-950 hover:bg-emerald-400/80"
                }`}
              />
              <button
                title="Hyper Blue Theme"
                onClick={() => changeTheme("blue")}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  currentTheme === "blue"
                    ? "bg-sky-400 ring-2 ring-sky-200 scale-110 shadow-[0_0_10px_#38bdf8]"
                    : "bg-sky-950 hover:bg-sky-400/80"
                }`}
              />
              <button
                title="Clean Light Theme"
                onClick={() => changeTheme("light")}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  currentTheme === "light"
                    ? "bg-amber-400 ring-2 ring-amber-200 scale-110 shadow-[0_0_10px_#f59e0b]"
                    : "bg-amber-100 hover:bg-amber-300 border border-amber-400/50"
                }`}
              />
            </div>
          )}

          <button
            onClick={() => router.push("/resume")}
            className="hidden sm:inline-flex items-center space-x-1.5 border border-[var(--border-color)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 shadow-lg"
          >
            <span>📄</span>
            <span>Resume</span>
          </button>

          {/* Mobile Navigation Popover (100% Solid Opaque Theme Background) */}
          <Popover className="md:hidden">
            {({ open, close }) => (
              <>
                <Popover.Button className="p-2 text-[var(--text-main)] hover:text-[var(--accent-primary)] focus:outline-none">
                  <span className="sr-only">Open menu</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {open ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </Popover.Button>

                <Popover.Panel
                  style={{
                    backgroundColor: "var(--bg-drawer)",
                    opacity: 1,
                    zIndex: 100,
                  }}
                  className="absolute top-16 right-4 left-4 border border-[var(--border-color)] text-[var(--text-main)] rounded-2xl p-5 shadow-2xl shadow-black"
                >
                  <div className="flex flex-col space-y-2">
                    {/* Theme Switcher inside Mobile Menu */}
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)] px-2 mb-1">
                      <span className="text-xs font-mono text-[var(--accent-primary)] font-bold">Select Theme:</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => changeTheme("purple")}
                          className={`w-5 h-5 rounded-full ${currentTheme === "purple" ? "bg-purple-500 ring-2 ring-purple-300" : "bg-purple-900"}`}
                        />
                        <button
                          onClick={() => changeTheme("green")}
                          className={`w-5 h-5 rounded-full ${currentTheme === "green" ? "bg-emerald-400 ring-2 ring-emerald-200" : "bg-emerald-950"}`}
                        />
                        <button
                          onClick={() => changeTheme("blue")}
                          className={`w-5 h-5 rounded-full ${currentTheme === "blue" ? "bg-sky-400 ring-2 ring-sky-200" : "bg-sky-950"}`}
                        />
                        <button
                          onClick={() => changeTheme("light")}
                          className={`w-5 h-5 rounded-full ${currentTheme === "light" ? "bg-amber-400 ring-2 ring-amber-200" : "bg-amber-100"}`}
                        />
                      </div>
                    </div>

                    {/* Fully Functional Nav Items */}
                    {navLinks.map((link) => (
                      <Popover.Button
                        key={link.label}
                        as="button"
                        onClick={() => {
                          link.onClick();
                          close();
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl font-mono text-sm text-[var(--text-main)] hover:text-[var(--accent-primary)] hover:bg-[var(--badge-bg)] transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span className="text-[var(--accent-primary)] mr-2 font-bold">&gt;</span>
                          <span>{link.label}</span>
                        </div>
                        <span className="text-xs text-[var(--accent-primary)] opacity-60">↵</span>
                      </Popover.Button>
                    ))}

                    <div className="pt-2 border-t border-[var(--border-color)] mt-1">
                      <Popover.Button
                        as="button"
                        onClick={() => {
                          router.push("/resume");
                          close();
                        }}
                        className="w-full py-3 border border-[var(--border-color)] text-[var(--accent-primary)] rounded-xl font-mono font-bold text-sm text-center block hover:bg-[var(--accent-primary)] hover:text-white transition-all shadow-sm"
                      >
                        📄 Resume
                      </Popover.Button>
                    </div>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
