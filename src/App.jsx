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
  <Route path="/login" element={<Login />} />

  <Route
    path="/admin/home"
    element={
      <ProtectedRoute>
        <AdminHome />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/project"
    element={
      <ProtectedRoute>
        <AdminProject />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/about"
    element={
      <ProtectedRoute>
        <AdminAbout />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/skill"
    element={
      <ProtectedRoute>
        <AdminSkill />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/experience"
    element={
      <ProtectedRoute>
        <AdminExperience />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/education"
    element={
      <ProtectedRoute>
        <AdminEducation />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/contact"
    element={
      <ProtectedRoute>
        <AdminContact />
      </ProtectedRoute>
    }
  />
</Routes>

    </Router>
  );
}

export default App;
