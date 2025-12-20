import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", { email, password });
    console.log("LOGIN SUCCESS:", res.data);
    localStorage.setItem("token", res.data.token);
    navigate("/admin/home");
  } catch (err) {
    console.error("LOGIN FAILED:", err);
    alert(err.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 border rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-2 w-full cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
