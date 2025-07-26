import React from "react";
import { motion } from "framer-motion";

const creators = [
  {
    name: "Your Name",
    role: "Co-founder & Developer",
    image: "/images/you.jpg", // Replace with your image
    bio: "Passionate about making digital experiences seamless. Handles backend magic and loves good coffee.",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Friend's Name",
    role: "Co-founder & Designer",
    image: "/images/friend.jpg", // Replace with your friend's image
    bio: "Believer in minimal yet impactful design. Creates stunning UI that users love.",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

export function Aboutit() {
  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa] px-4 py-16 items-center overflow-hidden">
      {/* Decorative blurred background shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl z-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-200 rounded-full blur-2xl z-0"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-3xl text-center mx-auto z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900 leading-tight">
          Meet the{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Founders
          </span>
        </h1>
        <motion.p
          variants={fadeInUp}
          custom={2}
          className="text-xl text-gray-700 mb-10 font-medium"
        >
          We’re two friends on a mission to help you capture, share, and
          collaborate on your screen like never before.{" "}
          <span className="font-semibold text-blue-600">Screeno.in</span> is
          built for everyone who loves simplicity and productivity.
        </motion.p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12 mt-8 z-10">
        {creators.map((creator, idx) => (
          <motion.div
            key={creator.name}
            custom={idx + 2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 32px 0 rgba(80,80,180,0.15)",
            }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-10 w-full max-w-sm flex flex-col items-center border border-blue-100 transition-all duration-300"
          >
            <motion.img
              src={creator.image}
              alt={creator.name}
              className="w-32 h-32 rounded-full object-cover mb-5 border-4 border-blue-300 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 + idx * 0.2 }}
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {creator.name}
            </h2>
            <p className="text-blue-600 mb-2 font-medium">{creator.role}</p>
            <p className="text-gray-600 mb-4 text-center">{creator.bio}</p>
            <div className="flex gap-6 mt-2">
              <a
                href={creator.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6 text-gray-400 hover:text-blue-500 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.17 4.17 0 001.84-2.31c-.81.5-1.7.87-2.65 1.07A4.13 4.13 0 0015.5 4c-2.26 0-4.1 1.84-4.1 4.11 0 .32.04.64.1.95A11.72 11.72 0 013.09 5.15a4.05 4.05 0 00-.55 2.07c0 1.43.73 2.7 1.84 3.43a4.04 4.04 0 01-1.86-.51v.05c0 2 1.41 3.66 3.28 4.04a4.11 4.11 0 01-1.85.07c.52 1.63 2.02 2.81 3.8 2.85A8.31 8.31 0 012 19.54 11.72 11.72 0 008.29 21.5c7.55 0 11.68-6.26 11.68-11.69l-.01-.53A8.47 8.47 0 0024 4.6a8.23 8.23 0 01-2.36.65 4.12 4.12 0 001.8-2.27z" />
                </svg>
              </a>
              <a
                href={creator.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6 text-gray-400 hover:text-blue-700 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.47 6c0-1.38-1.12-2.5-2.5-2.5zM2 21h6V8H2v13zM8.59 13.75V21h5.99v-4.16c0-2.2 2.58-2.4 2.58 0V21h5.98v-6.11c0-6.13-7.49-5.9-7.49 0z" />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={4}
        className="mt-16 text-center max-w-2xl mx-auto z-10"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">
          Why <span className="text-blue-600">Screeno.in</span>?
        </h3>
        <p className="text-lg text-gray-700 font-medium">
          We built Screeno.in to empower everyone—students, creators, remote
          teams, and more—to visualize, organize, and share their ideas with
          ease.{" "}
          <span className="text-blue-600 font-semibold">
            Join our growing community and make the most of your screen!
          </span>
        </p>
      </motion.div>
    </section>
  );
}
