import { useEffect, useState } from "react";
import api from "../api/axios";

export function About() {
  const [about, setAbout] = useState(null);

 fetch("https://cms-portfolio-backend.onrender.com/api/about")
    .then((res) => res.json())
    .then((data) => console.log("FETCH DATA:", data))
    .catch((err) => console.error("FETCH ERROR:", err));
}, []);

  if (!about) return null;

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-6 font-serif italic ">About Me</h1>
          <p className="text-lg text-gray-300 leading-relaxed font-serif italic">
            {about.bioText}
          </p>
        </div>
      </section>
    </div>
  );
}
