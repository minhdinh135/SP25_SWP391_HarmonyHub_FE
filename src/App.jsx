import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/error/Unauthorized";
import NotFound from "./pages/error/NotFound";
import { Roles } from "./constants/role";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Accounts from "./pages/admin/Accounts";
import CommonLayout from "./layouts/CommonLayout";
import Homepage from "./pages/common/Homepage";
import Login from "./pages/common/Login";
import SignUp from "./pages/common/SignUp";
import { BlogList } from "./pages/common/BlogList";
import { BlogPost } from "./pages/common/BlogDetails";
import TherapistList from "./pages/common/TherapistList";
import TherapistDetails from "./pages/common/TherapistDetails";
import AboutUsPage from "./pages/common/About";
function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Toaster position="top-right" />
      </div>
      <Routes>
        {/* <Route index path="/" element={<Homepage />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/sign-up" element={<SignUpPage />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}

        <Route element={<CommonLayout />}>
          <Route index path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/therapists" element={<TherapistList />} />
          <Route path="/therapists/:id" element={<TherapistDetails />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[Roles.Admin]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="accounts" element={<Accounts />} />
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
