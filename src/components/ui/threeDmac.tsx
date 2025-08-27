"use client";
import { ThreeDMarquee } from "./3d-marquee";

export default function ThreeDMarqueeDemo() {
  // Use S3 hosted images for faster loading
  const s3BaseUrl = "https://5kmrr-images-2025.s3.amazonaws.com/screenshots";

  const images = [
    `${s3BaseUrl}/s1.png`,
    `${s3BaseUrl}/s2.png`,
    `${s3BaseUrl}/s3.png`,
    `${s3BaseUrl}/s4.png`,
    `${s3BaseUrl}/s5.png`,
    `${s3BaseUrl}/s1.png`, // Repeat some images to ensure smooth loop
    `${s3BaseUrl}/s2.png`,
    `${s3BaseUrl}/s3.png`,
    `${s3BaseUrl}/s4.png`,
    `${s3BaseUrl}/s5.png`,
    `${s3BaseUrl}/s1.png`,
    `${s3BaseUrl}/s2.png`,
    `${s3BaseUrl}/s3.png`,
    `${s3BaseUrl}/s4.png`,
    `${s3BaseUrl}/s5.png`,
    `${s3BaseUrl}/s1.png`,
    `${s3BaseUrl}/s2.png`,
    `${s3BaseUrl}/s3.png`,
    `${s3BaseUrl}/s4.png`,
    `${s3BaseUrl}/s5.png`,
    `${s3BaseUrl}/s1.png`,
    `${s3BaseUrl}/s2.png`,
    `${s3BaseUrl}/s3.png`,
    `${s3BaseUrl}/s4.png`,
    `${s3BaseUrl}/s5.png`,
  ];

  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
