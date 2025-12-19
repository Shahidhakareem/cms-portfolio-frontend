import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "./components/AdminLayout";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    image: "",
  });

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  const saveProject = async () => {
    const payload = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (editingId) {
      const res = await api.put(`/projects/${editingId}`, payload);
      setProjects(
        projects.map((p) => (p._id === editingId ? res.data : p))
      );
      setEditingId(null);
    } else {
      const res = await api.post("/projects", payload);
      setProjects([...projects, res.data]);
    }

    setForm({
      title: "",
      description: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      image: "",
    });
  };

  const editProject = (p) => {
    setEditingId(p._id);
    setForm({
      ...p,
      technologies: p.technologies.join(", "),
    });
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    setProjects(projects.filter((p) => p._id !== id));
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* Project List */}
      <div className="space-y-4 mb-8">
        {projects.map((p) => (
          <div
            key={p._id}
            className="border rounded p-4 flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {p.description}
              </p>
            </div>
            <div className="space-x-3">
              <button
                onClick={() => editProject(p)}
                className="text-blue-600 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(p._id)}
                className="text-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Form */}
      <div className="bg-white p-6 rounded shadow max-w-2xl space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Project Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="Technologies (comma separated)"
          value={form.technologies}
          onChange={(e) =>
            setForm({ ...form, technologies: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="Live URL"
          value={form.liveUrl}
          onChange={(e) =>
            setForm({ ...form, liveUrl: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="GitHub URL"
          value={form.githubUrl}
          onChange={(e) =>
            setForm({ ...form, githubUrl: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <button
          onClick={saveProject}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </div>
    </AdminLayout>
  );
}
