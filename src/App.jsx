import Homepage from "./pages/HomePage";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/error/Unauthorized";
import NotFound from "./pages/error/NotFound";
import { Roles } from "./constants/role";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Toaster position="top-right" />
      </div>
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route element={<ProtectedRoute allowedRoles={[Roles.Admin]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
