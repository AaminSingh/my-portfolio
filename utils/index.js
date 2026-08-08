import { useLayoutEffect, useEffect } from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ISOToDate(date) {
  if (date) {
    let convertDate = new Date(date);
    return (
      convertDate.getFullYear() +
      "-" +
      (convertDate.getMonth() + 1) +
      "-" +
      convertDate.getDate()
    );
  }
}

export function getRandomImage() {
  const randomImageUrl = [
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1638742385167-96fc60e12f59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    "https://images.unsplash.com/photo-1618367588411-d9a90fefa881?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1657295791913-5074c912398e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=996&q=80",
  ];
  return randomImageUrl[Math.floor(Math.random() * randomImageUrl.length)];
}

export const FALLBACK_PROJECT_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="350" viewBox="0 0 600 350">
  <rect width="600" height="350" fill="#0d0d14"/>
  <rect width="600" height="350" fill="url(#grad)" opacity="0.2"/>
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>
  </defs>
  <rect x="250" y="100" width="100" height="100" rx="16" fill="#1e1b4b" stroke="#a855f7" stroke-width="2"/>
  <path d="M280 140 L300 120 L320 140 M300 120 L300 180" fill="none" stroke="#c084fc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="300" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#e2e8f0" text-anchor="middle" font-weight="bold">System Architecture</text>
  <text x="300" y="265" font-family="monospace" font-size="12" fill="#a855f7" text-anchor="middle">Project Preview</text>
</svg>
`)}`;

export const FALLBACK_CERT_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="350" viewBox="0 0 600 350">
  <rect width="600" height="350" fill="#0f172a"/>
  <rect width="600" height="350" fill="url(#certGrad)" opacity="0.25"/>
  <defs>
    <linearGradient id="certGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
  </defs>
  <circle cx="300" cy="140" r="45" fill="#1e1b4b" stroke="#7c3aed" stroke-width="2"/>
  <path d="M285 140 L295 150 L315 130" fill="none" stroke="#a78bfa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="300" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#f8fafc" text-anchor="middle" font-weight="bold">Verified Credential</text>
  <text x="300" y="260" font-family="monospace" font-size="12" fill="#818cf8" text-anchor="middle">Certification Achievement</text>
</svg>
`)}`;

export function getImageUrl(src, fallback = FALLBACK_PROJECT_IMAGE) {
  if (!src) return fallback;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanSrc = src.startsWith("/") ? src : `/${src}`;
  return `${basePath}${cleanSrc}`;
}

