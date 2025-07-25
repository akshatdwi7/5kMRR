import React from "react";

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

export function Aboutit() {
  return (
    <section className="min-h-screen flex flex-col bg-gray-50 px-6 py-12 items-center">
      <div className="max-w-3xl text-center mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
          Meet the Creators of <span className="text-blue-600">Screeno.in</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          We’re two friends on a mission to help you capture, share, and
          collaborate on your screen like never before. Screeno.in is built for
          everyone who loves simplicity and productivity.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 mt-4">
        {creators.map((creator) => (
          <div
            key={creator.name}
            className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center"
          >
            <img
              src={creator.image}
              alt={creator.name}
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-200"
            />
            <h2 className="text-2xl font-semibold text-gray-900">
              {creator.name}
            </h2>
            <p className="text-blue-600 mb-2">{creator.role}</p>
            <p className="text-gray-600 mb-4 text-center">{creator.bio}</p>
            <div className="flex gap-5">
              <a
                href={creator.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-blue-500"
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
              >
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.47 6c0-1.38-1.12-2.5-2.5-2.5zM2 21h6V8H2v13zM8.59 13.75V21h5.99v-4.16c0-2.2 2.58-2.4 2.58 0V21h5.98v-6.11c0-6.13-7.49-5.9-7.49 0z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Why Screeno.in?
        </h3>
        <p className="text-gray-600">
          We built Screeno.in to empower everyone—students, creators, remote
          teams, and more—to visualize, organize, and share their ideas with
          ease. Join our growing community and make the most of your screen!
        </p>
      </div>
    </section>
  );
}
