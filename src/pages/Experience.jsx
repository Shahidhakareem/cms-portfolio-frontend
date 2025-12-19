import { useEffect, useState } from "react";
import api from "../api/axios";

export function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    api.get("/experience").then(res => setExperiences(res.data));
  }, []);

  return (
    <section className="max-w-5xl mx-auto  px-6">
      <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>

      <div className="space-y-10">
        {experiences.map(exp => (
          <div key={exp._id} className="border-l-4 border-white pl-6">
            <h3 className="text-xl font-semibold">
              {exp.role} – {exp.company}
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              {exp.startDate} – {exp.endDate} • {exp.type}
            </p>

            <ul className="list-disc ml-5 space-y-1">
              {exp.description.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
