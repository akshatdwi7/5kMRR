import React from "react";

const NUM_STARS = 80;

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export const GalaxyHeroBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden -z-10">
    {/* Space gradient */}
    <div className="absolute inset-0 bg-black" />
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 40% at 50% 90%, #5f6fff 0%, #1a1a2e 60%, #000 100%)",
        opacity: 0.8,
      }}
    />
    {/* Stars */}
    {Array.from({ length: NUM_STARS }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          top: `${randomBetween(0, 80)}%`,
          left: `${randomBetween(0, 100)}%`,
          width: `${randomBetween(1, 2.5)}px`,
          height: `${randomBetween(1, 2.5)}px`,
          opacity: randomBetween(0.3, 0.9),
        }}
      />
    ))}
    {/* Planet horizon */}
    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[120vw] h-[30vw] pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 1200 300" fill="none">
        <ellipse
          cx="600"
          cy="300"
          rx="600"
          ry="80"
          fill="url(#galaxy-horizon)"
          opacity="0.8"
        />
        <defs>
          <radialGradient
            id="galaxy-horizon"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(600 300) scale(600 80)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" stopOpacity="0.8" />
            <stop offset="0.6" stopColor="#5f6fff" stopOpacity="0.3" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </div>
);
