import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import QuizList from "./pages/common/QuizList";
import QuizDetails from "./pages/common/QuizDetails";
import QuizResults from "./pages/common/QuizResults";
import TakeQuiz from "./pages/common/TakeQuizPage";
import BookAppointmentForm from "./pages/common/BookAppointmentForm";
import MemberProfile from "./pages/member/MemberProfile";
import TherapistProfile from "./pages/therapist/TherapistProfile";
import MemberAppointmentList from "./pages/member/MemberAppointmentList";
import MemberSchedule from "./pages/member/MemberSchedule";
import TherapistAppointmentList from "./pages/therapist/TherapistAppointmentList";
import TherapistSchedule from "./pages/therapist/TherapistSchedule";
import MemberTransactionManagement from "./pages/member/MemberTransactionManagement";
import TherapistTransactionManagement from "./pages/therapist/TherapistTransactionManagement";
import AppointmentDetails from "./pages/common/AppointmentDetails";
import TherapistBlogManagement from "./pages/therapist/TherapistBlogManagement";
import TherapistQuizManagement from "./pages/therapist/TherapistQuizManagement";
import TherapistPackageManagement from "./pages/therapist/TherapistPackageManagement";
import TherapistBlogList from "./pages/therapist/TherapistBlogList";
import TherapistBlogDetails from "./pages/therapist/TherapistBlogDetails";
import AdminQuizManagement from "./pages/admin/AdminQuizManagement";
import AdminBlogManagement from "./pages/admin/AdminBlogManagement";
import AdminReportManagement from "./pages/admin/AdminReportManagement";
import PaymentResult from "./pages/common/PaymentResult"; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route index path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/quizzes/:id" element={<QuizDetails />} />
          <Route path="/quizzes/:id/questions" element={<TakeQuiz />} />
          <Route path="/quizzes/:id/result" element={<QuizResults />} />
          <Route path="/therapists" element={<TherapistList />} />
          <Route path="/therapists/:id" element={<TherapistDetails />} />
          <Route
            path="/therapists/:id/appointment-booking"
            element={<BookAppointmentForm />}
          />
          {/* Add the payment result route here so it's accessible without authentication */}
          <Route path="/payment/result" element={<PaymentResult />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[Roles.Admin]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="quizzes" element={<AdminQuizManagement />} />
            <Route path="blogs" element={<AdminBlogManagement />} />
            <Route path="reports" element={<AdminReportManagement />} />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={[Roles.Member, Roles.Therapist]} />
          }
        >
          <Route path="appointments/:id" element={<AppointmentDetails />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[Roles.Member]} />}>
          <Route path="/member" element={<CommonLayout />}>
            <Route path="profile" element={<MemberProfile />} />
            <Route
              path="transactions"
              element={<MemberTransactionManagement />}
            />
            <Route path="appointments" element={<MemberAppointmentList />} />
            <Route path="appointments/:id" element={<AppointmentDetails />} />
            <Route path="schedule" element={<MemberSchedule />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[Roles.Therapist]} />}>
          <Route path="/therapist" element={<CommonLayout />}>
            <Route path="profile" element={<TherapistProfile />} />
            <Route
              path="transactions"
              element={<TherapistTransactionManagement />}
            />
            <Route path="appointments" element={<TherapistAppointmentList />} />
            <Route path="appointments/:id" element={<AppointmentDetails />} />
            <Route path="schedule" element={<TherapistSchedule />} />
            <Route path="packages" element={<TherapistPackageManagement />} />
            <Route path="blogs" element={<TherapistBlogList />} />
            <Route path="blogs/:id" element={<TherapistBlogDetails />} />
            <Route path="new-blog" element={<TherapistBlogManagement />} />
            <Route path="quizzes" element={<TherapistQuizManagement />} />
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
