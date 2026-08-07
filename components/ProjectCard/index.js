import React from "react";

const ProjectCard = ({ project, onViewDetails }) => {
  return (
    <div className="glass-card border border-purple-500/25 hover:border-purple-500/50 rounded-2xl p-0 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl bg-[#0d0d14] group">
      <div>
        {/* Prominent Project Image */}
        <div className="project-image-wrapper relative w-full h-52 sm:h-56 bg-[#0a0a0f] overflow-hidden border-b border-purple-500/20">
          <img
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={project.imageSrc}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/600x350/0d0d14/c084fc?text=System+Deployment";
            }}
          />
          {project.category && (
            <div className="absolute top-3 left-3">
              <span className="bg-[#0a0a0d]/90 text-purple-300 border border-purple-500/40 font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                {project.category}
              </span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 font-sans tracking-tight group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack Array Badges (Monospace + Purple Accent Text) */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-purple-950/60 text-purple-300 border border-purple-500/35 font-mono text-xs px-2.5 py-1 rounded-md shadow-sm hover:border-purple-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Two Purple Outline-Styled Action Buttons */}
      <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3 mt-auto">
        <a
          href={project.github || "#"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!project.github) e.preventDefault();
          }}
          className={`flex-1 flex items-center justify-center space-x-2 border border-slate-700 hover:border-purple-400 text-slate-300 hover:text-purple-300 hover:bg-purple-500/10 py-2.5 px-4 rounded-xl font-mono text-xs font-semibold transition-all duration-200 text-center ${
            !project.github ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span>Source Code</span>
        </a>

        {project.liveLink ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 border border-purple-500 text-purple-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-all duration-200 shadow-md shadow-purple-500/20 text-center"
          >
            <span>⚡ Live Demo</span>
          </a>
        ) : (
          <button
            onClick={() => onViewDetails && onViewDetails(project)}
            className="flex-1 flex items-center justify-center space-x-2 border border-purple-500 text-purple-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-all duration-200 shadow-md shadow-purple-500/20 text-center"
          >
            <span>📐 View Architecture</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
