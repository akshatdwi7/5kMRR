import React from "react";

// Inline keyframes for gradient and text shine animations
const styles = `
@keyframes pill-gradient-animate {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes text-glow-animate {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
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
          "linear-gradient(90deg, #31225a 0%, #523c8b 25%, #a16ff7 50%, #523c8b 75%, #31225a 100%)",
        backgroundSize: "300% 100%",
        animation: "pill-gradient-animate 2.5s linear infinite",
        boxShadow: "0 2px 12px 0 rgba(60,60,120,0.13)",
        minHeight: 36,
        minWidth: 150,
        borderRadius: 9999,
      }}
    >
      {/* "New" badge */}
      <span
        className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 mr-2 shadow"
        style={{
          borderRadius: 9999,
          minWidth: 28,
          textAlign: "center",
          fontWeight: 600,
          boxShadow: "0 2px 6px 0 rgba(60,120,255,0.2)",
        }}
      >
        New
      </span>
      {/* Glowing main text */}
      <span
        className="text-xs"
        style={{
          background: "linear-gradient(90deg, #fff 30%, #e7dafc 50%, #fff 70%)",
          backgroundSize: "400% 100%",
          animation: "text-glow-animate 1.75s linear infinite",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 400,
          letterSpacing: 0.1,
          transition: "background 0.2s",
        }}
      >
        Book a free <span style={{ fontWeight: 700 }}>15 min demo</span>
      </span>
      {/* Arrow Icon */}
      <svg
        className="ml-2 w-3.5 h-3.5"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
        style={{ opacity: 0.9 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}
