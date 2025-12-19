import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";

export function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    api.get("/contact").then((res) => setContact(res.data));
  }, []);

  if (!contact) {
    return <p className="text-center text-gray-500">No contact info added.</p>;
  }

  return (
    <section className="max-w-4xl mx-auto py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">Contact</h2>

      <div className="space-y-4 text-lg">
        <div className="flex  justify-center items-center gap-2">
          <FiMail className="h-5 w-5 text-slate-600" />
          <p> {contact.email}</p>
        </div>
        <div className="flex  justify-center items-center gap-2">
          <FiPhone className="h-4 w-4 text-green-500" />

          <p> {contact.phone}</p>
          <IoLogoWhatsapp className="h-5 w-5 text-green-500" />
        </div>
        <div className="flex  justify-center items-center gap-2">
          <FiMapPin className="h-5 w-5 text-slate-600" />
          <p>{contact.location}</p>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <div className="flex justify-center gap-2">
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                className="text-blue-600"
              >
                LinkedIn
              </a>
            )}
            <FiLinkedin className="h-6 w-6 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer" />
          </div>

          <div className="flex justify-center gap-2">
             {contact.github && (
            <a href={contact.github} target="_blank" className="text-gray-800">
              GitHub
            </a>
          )}
            <FiGithub className="h-6 w-6 text-slate-800 hover:text-black transition-colors cursor-pointer" />
          </div>
         
          {contact.website && (
            <a href={contact.website} target="_blank" className="text-black">
              Website
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
