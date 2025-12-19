import { useEffect, useState } from "react";
import api from "../api/axios";

export function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    api.get("/education").then((res) => setEducation(res.data));
  }, []);

  return (
    <section className="max-w-5xl mx-auto  px-6">
      <h2 className="text-3xl text-gray-900 font-bold text-center mb-12">Education</h2>

      {education.length === 0 && (
        <p className="text-center text-gray-500">No education added.</p>
      )}

      <div className="space-y-6">
        {education.map((e) => (
          <div key={e._id} className="border shadow-xl animate-float shadow-gray-200 rounded-lg p-6 bg-gray-900 ">
            <h3 className="text-xl font-semibold text-white">{e.degree}</h3>
            <p className="text-gray-100">
              {e.institution} • {e.startYear} – {e.endYear}
            </p>
            {e.description && (
              <p className="mt-3 text-gray-100">{e.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
