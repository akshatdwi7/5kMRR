import React from "react";

// Inline keyframes for gradient and text shine animations
const styles = `
@keyframes pill-gradient-animate {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
@keyframes text-glow-animate {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

export default function GlowingPill() {
  React.useEffect(() => {
    if (!document.getElementById("glow-style")) {
      const style = document.createElement("style");
      style.id = "glow-style";
      style.innerHTML = styles;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      className="inline-flex items-center px-2.5 py-0.5 rounded-full"
      style={{
        background:
          "linear-gradient(90deg, rgba(49,34,90,0.45) 0%, rgba(82,60,139,0.40) 25%, rgba(161,111,247,0.30) 50%, rgba(82,60,139,0.40) 75%, rgba(49,34,90,0.45) 100%)",
        backgroundSize: "300% 100%",
        animation: "pill-gradient-animate 2.5s linear infinite",
        boxShadow: "0 2px 12px 0 rgba(60,60,120,0.08)",
        minHeight: 36,
        minWidth: 150,
        borderRadius: 9999,
        // This adds an overall transparency
        backdropFilter: "blur(2px)",
      }}
    >
      <span
        className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 mr-2 shadow"
        style={{
          borderRadius: 9999,
          minWidth: 28,
          textAlign: "center",
          fontWeight: 600,
          boxShadow: "0 2px 6px 0 rgba(60,120,255,0.14)",
          opacity: 0.92, // adds slight transparency to badge
        }}
      >
        New
      </span>
      <span
        className="text-xs"
        style={{
          background: "linear-gradient(90deg, #fff 30%, #e7dafc 50%, #fff 70%)",
          backgroundSize: "400% 100%",
          animation: "text-glow-animate 1.75s linear infinite",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 200,
          letterSpacing: 0.1,
          transition: "background 0.2s",
        }}
      >
        See how <span style={{ fontWeight: 200 }}>Screeno Works :)</span>
      </span>
      <svg
        className="ml-2 w-3.5 h-3.5"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
        style={{ opacity: 0.8 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}
