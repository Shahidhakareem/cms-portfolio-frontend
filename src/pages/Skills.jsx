import { useEffect, useState } from "react";
import api from "../api/axios";

export function Skills() {
  const [techskills, setTechSkills] = useState([]);
  const [softskills, setSoftSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const [techRes, softRes] = await Promise.all([
          api.get("/skills/tech"),
          api.get("/skills/soft"),
        ]);

        setTechSkills(techRes.data || []);
        setSoftSkills(softRes.data || []);
      } catch (err) {
        console.error("Failed to fetch skills", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section className="max-w-7xl mx-auto  px-6">
      <h3 className="text-3xl font-bold text-center mb-20">Skills</h3>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading skills...</p>
      )}

      {/* Empty State */}
      {!loading && techskills.length === 0 && softskills.length === 0 && (
        <p className="text-center text-gray-500">
          No skills added yet.
        </p>
      )}

      {/* Skills */}
      {!loading && (techskills.length > 0 || softskills.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Technical Skills */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>

            <div className="space-y-4">
              {techskills.map((t) => (
                <div
                  key={t._id}
                  className="bg-gray-900 shadow-xl animate-float shadow-gray-200 border rounded-lg p-4 "
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium  text-gray-100">{t.name}</span>
                    <span className="text-sm text-gray-100">
                      {t.level}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${t.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Soft Skills</h2>

            <div className="space-y-4">
              {softskills.map((s) => (
                <div
                  key={s._id}
                  className="bg-gray-900 shadow-xl animate-float shadow-gray-200 border rounded-lg p-4 "
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-100">{s.name}</span>
                    <span className="text-sm text-gray-100">
                      {s.level}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
