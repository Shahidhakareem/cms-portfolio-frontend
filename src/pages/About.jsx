import { useEffect, useState } from "react";
import api from "../api/axios";

export function About() {
  const [about, setAbout] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/about")
      .then((res) => {
        console.log("ABOUT API RESPONSE:", res.data);

        // FIX response shape
        setAbout(res.data.about || res.data);
      })
      .catch((err) => {
        console.error("ABOUT API ERROR:", err);
        setError("Failed to load About section");
      });
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!about) return <p className="text-white">Loading...</p>;

  return (
    <section className="bg-gray-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 italic">About Me</h1>
        <p className="text-lg text-gray-300 leading-relaxed italic">
          {about.bioText}
        </p>
      </div>
    </section>
  );
}
