import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "./components/AdminLayout";

export default function AdminEducation() {
  const [education, setEducation] = useState([]);
  const [form, setForm] = useState({
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api.get("/education").then((res) => setEducation(res.data));
  }, []);

  const saveEducation = async () => {
    if (editingId) {
      const res = await api.put(`/education/${editingId}`, form);
      setEducation(
        education.map((e) => (e._id === editingId ? res.data : e))
      );
      setEditingId(null);
    } else {
      const res = await api.post("/education", form);
      setEducation([...education, res.data]);
    }

    setForm({
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
      description: "",
    });
  };

  const editEducation = (edu) => {
    setForm(edu);
    setEditingId(edu._id);
     alert("Education updated successfully");
  };

  const deleteEducation = async (id) => {
    await api.delete(`/education/${id}`);
    setEducation(education.filter((e) => e._id !== id));
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Education</h1>

      {/* List */}
      <div className="space-y-3 mb-6">
        {education.map((e) => (
          <div
            key={e._id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{e.degree}</h3>
              <p className="text-sm text-gray-600">
                {e.institution} ({e.startYear} - {e.endYear})
              </p>
            </div>

            <div className="space-x-3">
              <button
                onClick={() => editEducation(e)}
                className="text-blue-600 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => deleteEducation(e._id)}
                className="text-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow max-w-xl space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Degree"
          value={form.degree}
          onChange={(e) =>
            setForm({ ...form, degree: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="Institution"
          value={form.institution}
          onChange={(e) =>
            setForm({ ...form, institution: e.target.value })
          }
        />
        <div className="flex gap-3">
          <input
            className="border p-2 w-full"
            placeholder="Start Year"
            value={form.startYear}
            onChange={(e) =>
              setForm({ ...form, startYear: e.target.value })
            }
          />
          <input
            className="border p-2 w-full"
            placeholder="End Year"
            value={form.endYear}
            onChange={(e) =>
              setForm({ ...form, endYear: e.target.value })
            }
          />
        </div>
        <textarea
          className="border p-2 w-full"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button
          onClick={saveEducation}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          {editingId ? "Update Education" : "Add Education"}
        </button>
      </div>
    </AdminLayout>
  );
}
