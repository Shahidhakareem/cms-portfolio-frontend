import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
//import AdminLayout from "../components/AdminLayout";

export default function AdminAbout() {
  const navigate = useNavigate();

  const [about, setAbout] = useState({
    bioText: "",
  });

  // Fetch intro
  useEffect(() => {
    api.get("/about").then((res) => {
      if (res.data) setAbout(res.data);
    });
  }, []);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Update intro
  const updateAbout = async () => {
    await api.post("/about", about);
    alert("About updated successfully");
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Intro Section */}
      <section className="bg-white p-6 rounded shadow mb-10">
        <h2 className="font-semibold mb-4 text-lg">About Section</h2>

        <textarea
          className="border p-2 w-full h-50 mb-3"
          placeholder="Bio Text"
          value={about.bioText}
          onChange={(e) => setAbout({ ...about, bioText: e.target.value })}
        />

        <button
          onClick={updateAbout}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          Update About
        </button>
      </section>
    </AdminLayout>
  );
}
