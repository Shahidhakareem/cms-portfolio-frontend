import { useEffect, useState } from "react";
import api from "../api/axios";

export function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("About component mounted");

    api
      .get("/about")
      .then((res) => {
        console.log("API DATA:", res.data);
        setAbout(res.data);   // ✅ THIS WAS MISSING
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!about) return <p>No data found</p>;

  return (
    <div>
      <section className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 font-serif italic">
            About Me
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed font-serif italic">
            {about.bioText}
          </p>
        </div>
      </section>
    </div>
  );
}
