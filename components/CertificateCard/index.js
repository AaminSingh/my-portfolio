import React from "react";
import { getImageUrl, FALLBACK_CERT_IMAGE } from "../../utils";

const CertificateCard = ({ cert, index = 0, heightClass = "h-full" }) => {
  return (
    <div className={`card ${heightClass} w-full relative group h-full`}>
      <div className="content h-full">
        {/* Back side = Initial Face (Before Hover) */}
        <div className="back">
          <div className="back-content">
            {/* Certificate Image Header */}
            <div className={`relative w-full ${cert.isTall ? "h-[58%]" : "h-[62%]"} overflow-hidden bg-slate-950 border-b border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors duration-300`}>
              <img
                src={getImageUrl(cert.imageSrc, FALLBACK_CERT_IMAGE)}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_CERT_IMAGE;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-85" />
              
              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <span className="bg-[#090d16]/90 text-emerald-400 border border-emerald-500/40 font-mono text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow-lg shadow-emerald-950/40">
                  {cert.badge || cert.issuer}
                </span>
                {cert.badge && (
                  <span className="bg-slate-900/90 text-slate-300 border border-slate-700/60 font-mono text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
                    {cert.issuer}
                  </span>
                )}
              </div>
            </div>

            {/* Title & Footer Details */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between w-full bg-[#0b0f19]">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight leading-snug group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2">
                  {cert.title}
                </h3>
                {cert.isTall && cert.description && (
                  <p className="mt-2 text-xs text-slate-400 line-clamp-4 font-sans opacity-85 leading-relaxed">
                    {cert.description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-emerald-500/20 font-mono text-xs text-slate-400 mt-2">
                <span className="text-emerald-400/90 font-semibold">{cert.date}</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-teal-300 font-bold group-hover:text-emerald-300 transition-colors duration-300">
                  <span>Hover to view</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-pulse">
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 11V9a4 4 0 014-4h14" />
                    <path d="M7 23l-4-4 4-4" />
                    <path d="M21 13v2a4 4 0 01-4 4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Front side = Revealed Face (On Hover) */}
        <div className="front">
          <div className="img">
            <div className="circle"></div>
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
          </div>
          <div className="front-content p-5 sm:p-6 overflow-y-auto">
            <div className="description h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-emerald-500/25 pb-3 mb-3 gap-2">
                  <span className="font-mono text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-500/40 shadow-sm">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-xs text-slate-300 font-semibold">{cert.date}</span>
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug font-sans">
                  {cert.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans opacity-95">
                  {cert.description}
                </p>
              </div>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-mono text-xs font-extrabold py-2.5 px-4 rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:scale-[1.02] text-center shrink-0"
              >
                <span>Verify Credential</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
