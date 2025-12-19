import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-[384px] min-w-[384px] shrink-0 h-screen bg-gray-900 text-white  sticky top-0">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="p-4 space-y-2">
        <NavLink
          to="/admin/home"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Introduction
        </NavLink>
        <NavLink
          to="/admin/about"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/admin/education"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Education
        </NavLink>

        <NavLink
          to="/admin/skill"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Skills
        </NavLink>

        <NavLink
          to="/admin/experience"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Experience
        </NavLink>

        <NavLink
          to="/admin/project"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Projects
        </NavLink>

        <NavLink
          to="/admin/contact"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Contact
        </NavLink>
      </nav>
    </aside>
  );
}
