import React, { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTheme, setActiveTheme] = useState("purple");

  useEffect(() => {
    // Sync current active theme from document attribute or localStorage
    const updateThemeState = () => {
      const theme = document.documentElement.getAttribute("data-theme") || "purple";
      setActiveTheme(theme);
    };

    updateThemeState();
    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });

      // Generate bright spark particle trail
      setTrail((prev) => [
        { x, y, id: Math.random(), size: Math.random() * 6 + 3, opacity: 1 },
        ...prev.slice(0, 7),
      ]);

      // Check if hovering interactive elements
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const getSparkColor = () => {
    if (activeTheme === "green") return "#4ade80";
    if (activeTheme === "blue") return "#38bdf8";
    if (activeTheme === "light") return "#7c3aed";
    return "#c084fc"; // default purple
  };

  const sparkColor = getSparkColor();

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Spark Trail Particles */}
      {trail.map((spark, idx) => (
        <div
          key={spark.id}
          className="absolute rounded-full transition-all duration-300 ease-out"
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            transform: `translate(-50%, -50%) scale(${1 - idx * 0.12})`,
            backgroundColor: sparkColor,
            opacity: 1 - idx * 0.14,
            boxShadow: `0 0 10px ${sparkColor}, 0 0 20px #ffffff`,
          }}
        />
      ))}

      {/* Main Bright Core Spark */}
      <div
        className="absolute transition-transform duration-75 ease-out rounded-full flex items-center justify-center"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.8 : 1})`,
        }}
      >
        {/* Core Intense White Hot Point */}
        <div
          className="w-3 h-3 rounded-full bg-white shadow-lg"
          style={{
            boxShadow: `0 0 12px #ffffff, 0 0 24px ${sparkColor}, 0 0 36px ${sparkColor}`,
          }}
        />

        {/* Outer Pulsing Neon Spark Ring */}
        <div
          className="absolute w-9 h-9 rounded-full border-2 transition-all duration-300"
          style={{
            borderColor: sparkColor,
            boxShadow: `0 0 15px ${sparkColor}, inset 0 0 10px ${sparkColor}`,
            transform: isHovered ? "scale(1.4)" : "scale(1)",
            opacity: isHovered ? 0.9 : 0.6,
          }}
        />
      </div>
    </div>
  );
};

export default Cursor;
