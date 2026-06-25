module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      mob: "375px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
      laptopl: "1440px",
    },
    extend: {
      colors: {
        accent: {
          primary: "#a855f7",
          secondary: "#6366f1",
          tertiary: "#ec4899",
          glow: "rgba(168, 85, 247, 0.4)",
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        fadeIn: "fadeIn 0.8s ease-out forwards",
        slideIn: "slideIn 0.5s ease-out forwards",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(168, 85, 247, 0.2), 0 0 20px rgba(168, 85, 247, 0.1)" },
          "100%": { boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)" },
        },
      },
    },
  },
  plugins: [],
};
