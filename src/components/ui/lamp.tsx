"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

// Import logos
import angel1 from "../../assets/logos/angel1.png";
import hdfc1 from "../../assets/logos/hdfc1.png";
import zerodha1 from "../../assets/logos/zerodha1.png";
import upstocks1 from "../../assets/logos/upstocks1.png";
import groww from "../../assets/logos/groww.png";
import kotak from "../../assets/logos/kotak.png";
import icici1 from "../../assets/logos/icici1.png";

export default function LampDemo() {
  const logos = [
    { src: angel1, alt: "Angel One", name: "Angel One" },
    { src: hdfc1, alt: "HDFC Securities", name: "HDFC Securities" },
    { src: zerodha1, alt: "Zerodha", name: "Zerodha" },
    { src: upstocks1, alt: "Upstox", name: "Upstox" },
    { src: groww, alt: "Groww", name: "Groww" },
    { src: kotak, alt: "Kotak Securities", name: "Kotak Securities" },
    { src: icici1, alt: "ICICI Direct", name: "ICICI Direct" },
  ];

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-200 to-slate-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Connect your <br /> favorite brokerssssss
      </motion.h1>

      {/* Company Logos - Smooth Moving Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.5,
          duration: 0.6,
          ease: "easeOut",
        }}
        className="mt-16 w-full max-w-6xl overflow-hidden"
      >
        <div className="relative">
          <div
            className="flex items-center gap-16 animate-scroll"
            style={{
              width: "calc(200px * 14)", // 7 logos * 2 sets * ~200px each
              animation: "scroll 25s linear infinite",
            }}
          >
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center px-8 transition-all duration-300 hover:scale-110 flex-shrink-0"
                style={{ minWidth: "120px" }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-10 lg:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  title={logo.name}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center px-8 transition-all duration-300 hover:scale-110 flex-shrink-0"
                style={{ minWidth: "120px" }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-10 lg:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  title={logo.name}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CSS Animation Styles */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 25s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </motion.div>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-black  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-black  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black "></div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
