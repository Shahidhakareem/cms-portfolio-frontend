import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
//import AdminLayout from "../components/AdminLayout";

export default function AdminHome() {
  const navigate = useNavigate();

  const [intro, setIntro] = useState({
    welcomeText: "",
    nameText: "",
    description: "",
    image: "",
  });

  // Fetch intro
  useEffect(() => {
    api.get("/intro").then((res) => {
      if (res.data) setIntro(res.data);
    });
  }, []);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Update intro
  const updateIntro = async () => {
    await api.post("/intro", intro);
    alert("Intro updated successfully");
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
        <h2 className="font-semibold mb-4 text-lg">Intro Section</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Welcome Text"
          value={intro.welcomeText}
          onChange={(e) => setIntro({ ...intro, welcomeText: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          value={intro.nameText}
          onChange={(e) => setIntro({ ...intro, nameText: e.target.value })}
        />

        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Description"
          value={intro.description}
          onChange={(e) => setIntro({ ...intro, description: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Upload Image"
          value={intro.image}
          onChange={(e) => setIntro({ ...intro, image: e.target.value })}
        />

        <button
          onClick={updateIntro}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          Update Intro
        </button>
      </section>
    </AdminLayout>
  );
}
