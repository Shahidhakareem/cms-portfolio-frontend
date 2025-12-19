import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./admin/AdminHome";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminHome from "./admin/AdminHome";
import AdminProject from "./admin/AdminProjects";
import AdminAbout from "./admin/AdminAbout";
import AdminSkill from "./admin/AdminSkill";
import AdminExperience from "./admin/AdminExperience";
import AdminContact from "./admin/AdminContact";
import AdminEducation from "./admin/AdminEducation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/project" element={<AdminProject />} />
        <Route path="/admin/about" element={<AdminAbout />} />
        <Route path="/admin/skill" element={<AdminSkill />} />
        <Route path="/admin/experience" element={<AdminExperience />} />
        <Route path="/admin/education" element={<AdminEducation />} />
        <Route path="/admin/contact" element={<AdminContact />} />
      </Routes>
    </Router>
  );
}

export default App;
