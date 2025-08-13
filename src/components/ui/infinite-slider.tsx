"use client";
import { cn } from "../../lib/utils";
import React from "react";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
};

export function InfiniteSlider({
  children,
  speed = 8, // Slower speed (pixels per second)
  direction = "left",
  className,
}: InfiniteSliderProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-4 [--gap:1rem] [--duration:20s] [gap:var(--gap)]",
        className
      )}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 animate-scroll items-center justify-around [gap:var(--gap)]",
          {
            "[animation-direction:reverse]": direction === "right",
          }
        )}
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 animate-scroll items-center justify-around [gap:var(--gap)]",
          {
            "[animation-direction:reverse]": direction === "right",
          }
        )}
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
