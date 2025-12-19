import { useEffect, useState } from "react";
import api from "../api/axios";

export function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <section className="max-w-7xl mx-auto  px-6">
      <h2 className="text-3xl font-bold text-center text-white mb-12">Projects</h2>

      {projects.length === 0 && (
        <p className="text-center text-gray-500">No projects added.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-gray-900 shadow-xl animate-float shadow-gray-200 border-3 border-gray-100 rounded-xl  hover:shadow-lg transition overflow-hidden"
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="h-40 w-full object-cover"
              />
            )}

            <div className="p-5 space-y-3">
              <h3 className="text-xl text-gray-100 font-semibold">{p.title}</h3>
              <p className="text-gray-100 text-sm">{p.description}</p>

              <div className="flex flex-wrap gap-2">
                {p.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-3">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    className="text-blue-600 text-sm"
                  >
                    Live
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    className="text-gray-100 text-sm"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
