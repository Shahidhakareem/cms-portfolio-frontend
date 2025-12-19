import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "./components/AdminLayout";

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);

  const [newExp, setNewExp] = useState({
    company: "",
    role: "",
    type: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editExp, setEditExp] = useState({
    company: "",
    role: "",
    type: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // FETCH
  useEffect(() => {
    api.get("/experience").then((res) => setExperiences(res.data));
  }, []);

  // ADD
  const addExperience = async () => {
    if (!newExp.company || !newExp.role) return;

    const payload = {
      ...newExp,
      description: newExp.description.split("\n"),
    };

    const res = await api.post("/experience", payload);
    setExperiences([...experiences, res.data]);

    setNewExp({
      company: "",
      role: "",
      type: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  // DELETE
  const deleteExperience = async (id) => {
    await api.delete(`/experience/${id}`);
    setExperiences(experiences.filter((e) => e._id !== id));
  };

  // START EDIT
  const startEdit = (exp) => {
    setEditingId(exp._id);
    setEditExp({
      company: exp.company,
      role: exp.role,
      type: exp.type,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description.join("\n"),
    });
  };

  // UPDATE
  const updateExperience = async (id) => {
    const payload = {
      ...editExp,
      description: editExp.description.split("\n"),
    };

    const res = await api.put(`/experience/${id}`, payload);

    setExperiences(experiences.map((e) => (e._id === id ? res.data : e)));

    setEditingId(null);
    alert("Experience Updated");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-8">Experience</h1>

      {/* LIST */}
      <div className="space-y-4 mb-10">
        {experiences.map((exp) => (
          <div key={exp._id} className="border p-4 rounded">
            {editingId === exp._id ? (
              <>
                <input
                  className="border p-2 w-full mb-2"
                  placeholder="Company"
                  value={editExp.company}
                  onChange={(e) =>
                    setEditExp({ ...editExp, company: e.target.value })
                  }
                />
                <input
                  className="border p-2 w-full mb-2"
                  placeholder="Role"
                  value={editExp.role}
                  onChange={(e) =>
                    setEditExp({ ...editExp, role: e.target.value })
                  }
                />
                <input
                  className="border p-2 w-full mb-2"
                  placeholder="Type"
                  value={editExp.type}
                  onChange={(e) =>
                    setEditExp({ ...editExp, type: e.target.value })
                  }
                />
                <input
                  className="border p-2 w-full mb-2"
                  placeholder="Start Date"
                  value={editExp.startDate}
                  onChange={(e) =>
                    setEditExp({ ...editExp, startDate: e.target.value })
                  }
                />
                <input
                  className="border p-2 w-full mb-2"
                  placeholder="End Date / Present"
                  value={editExp.endDate}
                  onChange={(e) =>
                    setEditExp({ ...editExp, endDate: e.target.value })
                  }
                />
                <textarea
                  className="border p-2 w-full mb-3"
                  placeholder="One point per line"
                  value={editExp.description}
                  onChange={(e) =>
                    setEditExp({
                      ...editExp,
                      description: e.target.value,
                    })
                  }
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => updateExperience(exp._id)}
                    className="text-green-600 cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-semibold">
                  {exp.role} – {exp.company}
                </h3>
                <p className="text-sm text-gray-600">
                  {exp.startDate} – {exp.endDate} • {exp.type}
                </p>

                <ul className="list-disc ml-5 mt-2">
                  {exp.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => startEdit(exp)}
                    className="text-blue-600 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExperience(exp._id)}
                    className="text-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ADD EXPERIENCE */}
      <div className="border-t pt-6 space-y-3">
        <h2 className="font-semibold">Add Experience</h2>

        <input
          className="border p-2 w-full"
          placeholder="Company"
          value={newExp.company}
          onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Role"
          value={newExp.role}
          onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Type (Internship / Full-time)"
          value={newExp.type}
          onChange={(e) => setNewExp({ ...newExp, type: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Start Date"
          value={newExp.startDate}
          onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="End Date / Present"
          value={newExp.endDate}
          onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description (one point per line)"
          value={newExp.description}
          onChange={(e) =>
            setNewExp({ ...newExp, description: e.target.value })
          }
        />

        <button
          onClick={addExperience}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          Add Experience
        </button>
      </div>
    </AdminLayout>
  );
}
