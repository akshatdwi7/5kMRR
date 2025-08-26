"use client";
import { ThreeDMarquee } from "./3d-marquee";

// Import local images from AS3 folder
import s1 from "../../assets/AS3/s1.png";
import s2 from "../../assets/AS3/s2.png";
import s3 from "../../assets/AS3/s3.png";
import s4 from "../../assets/AS3/s4.png";
import s5 from "../../assets/AS3/s5.png";

export default function ThreeDMarqueeDemo() {
  const images = [
    s1,
    s2,
    s3,
    s4,
    s5,
    s1, // Repeat some images to ensure smooth loop
    s2,
    s3,
    s4,
    s5,
    s1,
    s2,
    s3,
    s4,
    s5,
    s1,
    s2,
    s3,
    s4,
    s5,
    s1,
    s2,
    s3,
    s4,
    s5,
  ];
  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
