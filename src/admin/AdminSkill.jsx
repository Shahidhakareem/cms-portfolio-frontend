import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";

export default function AdminSkill() {
  const navigate = useNavigate();

  // -------------------- STATE --------------------
  const [techskills, setTechSkills] = useState([]);
  const [softskills, setSoftSkills] = useState([]);

  const [newTechSkill, setNewTechSkill] = useState({ name: "", level: "" });
  const [newSoftSkill, setNewSoftSkill] = useState({ name: "", level: "" });

  const [editingTechId, setEditingTechId] = useState(null);
  const [editingSoftId, setEditingSoftId] = useState(null);

  const [editTech, setEditTech] = useState({ name: "", level: "" });
  const [editSoft, setEditSoft] = useState({ name: "", level: "" });

  // -------------------- FETCH --------------------
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const techRes = await api.get("/skills/tech");
        const softRes = await api.get("/skills/soft");

        setTechSkills(techRes.data || []);
        setSoftSkills(softRes.data || []);
      } catch (err) {
        console.error("Failed to fetch skills", err);
      }
    };

    fetchSkills();
  }, []);

  // -------------------- AUTH --------------------
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // -------------------- TECH SKILLS --------------------
  const addTechSkill = async () => {
    if (!newTechSkill.name || !newTechSkill.level) return;

    const res = await api.post("/skills/tech", {
      name: newTechSkill.name,
      level: Number(newTechSkill.level),
    });

    setTechSkills([...techskills, res.data]);
    setNewTechSkill({ name: "", level: "" });
  };

  const deleteTechSkill = async (id) => {
    await api.delete(`/skills/tech/${id}`);
    setTechSkills(techskills.filter((s) => s._id !== id));
  };

  const startEditTech = (skill) => {
    setEditingTechId(skill._id);
    setEditTech({ name: skill.name, level: skill.level });
   
  };

  const updateTechSkill = async (id) => {
    const res = await api.put(`/skills/tech/${id}`, editTech);

    setTechSkills(
      techskills.map((s) => (s._id === id ? res.data : s))
    );
    setEditingTechId(null);
    alert("Tech Skills Updated")
  };

  // -------------------- SOFT SKILLS --------------------
  const addSoftSkill = async () => {
    if (!newSoftSkill.name || !newSoftSkill.level) return;

    const res = await api.post("/skills/soft", {
      name: newSoftSkill.name,
      level: Number(newSoftSkill.level),
    });

    setSoftSkills([...softskills, res.data]);
    setNewSoftSkill({ name: "", level: "" });
  };

  const deleteSoftSkill = async (id) => {
    await api.delete(`/skills/soft/${id}`);
    setSoftSkills(softskills.filter((s) => s._id !== id));
  };

  const startEditSoft = (skill) => {
    setEditingSoftId(skill._id);
    setEditSoft({ name: skill.name, level: skill.level });
  };

  const updateSoftSkill = async (id) => {
    const res = await api.put(`/skills/soft/${id}`, editSoft);

    setSoftSkills(
      softskills.map((s) => (s._id === id ? res.data : s))
    );
    setEditingSoftId(null);
    alert("Soft Skills Updated")
  };

  // -------------------- UI --------------------
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <section className="bg-white p-6 rounded shadow space-y-8">
        {/* TECH SKILLS */}
        <div>
          <h3 className="font-semibold mb-3">Technical Skills</h3>

          {techskills.map((s) => (
            <div
              key={s._id}
              className="flex justify-between items-center border p-3 rounded mb-2"
            >
              {editingTechId === s._id ? (
                <>
                  <input
                    className="border p-1 mr-2"
                    value={editTech.name}
                    onChange={(e) =>
                      setEditTech({ ...editTech, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="border p-1 w-20 mr-2"
                    value={editTech.level}
                    onChange={(e) =>
                      setEditTech({ ...editTech, level: e.target.value })
                    }
                  />
                  <button
                    onClick={() => updateTechSkill(s._id)}
                    className="text-green-600 mr-2 cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTechId(null)}
                    className="text-gray-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>
                    {s.name} ({s.level}%)
                  </span>
                  <div className="space-x-3">
                    <button
                      onClick={() => startEditTech(s)}
                      className="text-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTechSkill(s._id)}
                      className="text-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Add Tech */}
          <div className="mt-4">
            <input
              className="border p-2 w-full mb-2"
              placeholder="Tech skill name"
              value={newTechSkill.name}
              onChange={(e) =>
                setNewTechSkill({ ...newTechSkill, name: e.target.value })
              }
            />
            <input
              type="number"
              className="border p-2 w-full mb-2"
              placeholder="Level (0–100)"
              value={newTechSkill.level}
              onChange={(e) =>
                setNewTechSkill({ ...newTechSkill, level: e.target.value })
              }
            />
            <button
              onClick={addTechSkill}
              className="bg-black cursor-pointer text-white px-4 py-2 rounded"
            >
              Add Tech Skill
            </button>
          </div>
        </div>

        {/* SOFT SKILLS */}
        <div>
          <h3 className="font-semibold mb-3">Soft Skills</h3>

          {softskills.map((s) => (
            <div
              key={s._id}
              className="flex justify-between items-center border p-3 rounded mb-2"
            >
              {editingSoftId === s._id ? (
                <>
                  <input
                    className="border p-1 mr-2"
                    value={editSoft.name}
                    onChange={(e) =>
                      setEditSoft({ ...editSoft, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="border p-1 w-20 mr-2"
                    value={editSoft.level}
                    onChange={(e) =>
                      setEditSoft({ ...editSoft, level: e.target.value })
                    }
                  />
                  <button
                    onClick={() => updateSoftSkill(s._id)}
                    className="text-green-600 mr-2 cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingSoftId(null)}
                    className="text-gray-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>
                    {s.name} ({s.level}%)
                  </span>
                  <div className="space-x-3">
                    <button
                      onClick={() => startEditSoft(s)}
                      className="text-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSoftSkill(s._id)}
                      className="text-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Add Soft */}
          <div className="mt-4">
            <input
              className="border p-2 w-full mb-2"
              placeholder="Soft skill name"
              value={newSoftSkill.name}
              onChange={(e) =>
                setNewSoftSkill({ ...newSoftSkill, name: e.target.value })
              }
            />
            <input
              type="number"
              className="border p-2 w-full mb-2"
              placeholder="Level (0–100)"
              value={newSoftSkill.level}
              onChange={(e) =>
                setNewSoftSkill({ ...newSoftSkill, level: e.target.value })
              }
            />
            <button
              onClick={addSoftSkill}
              className="bg-black cursor-pointer text-white px-4 py-2 rounded"
            >
              Add Soft Skill
            </button>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
