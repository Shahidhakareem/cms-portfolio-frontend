import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "./components/AdminLayout";

export default function AdminContact() {
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  });

  useEffect(() => {
    api.get("/contact").then((res) => {
      if (res.data) setContact(res.data);
    });
  }, []);

  const saveContact = async () => {
    const res = await api.post("/contact", contact);
    setContact(res.data);
    alert("Contact updated successfully");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Contact Details</h1>

      <div className="bg-white p-6 rounded shadow space-y-3 max-w-xl">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={contact.email}
          onChange={(e) =>
            setContact({ ...contact, email: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="Phone"
          value={contact.phone}
          onChange={(e) =>
            setContact({ ...contact, phone: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="Location"
          value={contact.location}
          onChange={(e) =>
            setContact({ ...contact, location: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="LinkedIn URL"
          value={contact.linkedin}
          onChange={(e) =>
            setContact({ ...contact, linkedin: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="GitHub URL"
          value={contact.github}
          onChange={(e) =>
            setContact({ ...contact, github: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="Portfolio Website"
          value={contact.website}
          onChange={(e) =>
            setContact({ ...contact, website: e.target.value })
          }
        />

        <button
          onClick={saveContact}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          Save Contact
        </button>
      </div>
    </AdminLayout>
  );
}
