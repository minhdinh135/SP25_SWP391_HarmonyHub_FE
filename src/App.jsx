import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Roles } from "./constants/role";
import AdminLayout from "./layouts/AdminLayout";
import CommonLayout from "./layouts/CommonLayout";
import Accounts from "./pages/admin/Accounts";
import AdminBlogManagement from "./pages/admin/AdminBlogManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminQuizManagement from "./pages/admin/AdminQuizManagement";
import AdminReportManagement from "./pages/admin/AdminReportManagement";
import AboutUsPage from "./pages/common/About";
import AppointmentDetails from "./pages/common/AppointmentDetails";
import { BlogPost } from "./pages/common/BlogDetails";
import { BlogList } from "./pages/common/BlogList";
import BookAppointmentForm from "./pages/common/BookAppointmentForm";
import Homepage from "./pages/common/Homepage";
import Login from "./pages/common/Login";
import PaymentResult from "./pages/common/PaymentResult"; // Import the new component
import QuizDetails from "./pages/common/QuizDetails";
import QuizList from "./pages/common/QuizList";
import QuizResults from "./pages/common/QuizResults";
import ReportManagement from "./pages/common/ReportManagement";
import SignUp from "./pages/common/SignUp";
import TakeQuiz from "./pages/common/TakeQuizPage";
import TherapistDetails from "./pages/common/TherapistDetails";
import TherapistList from "./pages/common/TherapistList";
import NotFound from "./pages/error/NotFound";
import Unauthorized from "./pages/error/Unauthorized";
import MemberAppointmentList from "./pages/member/MemberAppointmentList";
import MemberProfile from "./pages/member/MemberProfile";
import MemberSchedule from "./pages/member/MemberSchedule";
import MemberTransactionManagement from "./pages/member/MemberTransactionManagement";
import TherapistAppointmentList from "./pages/therapist/TherapistAppointmentList";
import TherapistBlogDetails from "./pages/therapist/TherapistBlogDetails";
import TherapistBlogList from "./pages/therapist/TherapistBlogList";
import TherapistBlogManagement from "./pages/therapist/TherapistBlogManagement";
import TherapistPackageManagement from "./pages/therapist/TherapistPackageManagement";
import TherapistProfile from "./pages/therapist/TherapistProfile";
import TherapistQuizManagement from "./pages/therapist/TherapistQuizManagement";
import TherapistSchedule from "./pages/therapist/TherapistSchedule";
import TherapistTransactionManagement from "./pages/therapist/TherapistTransactionManagement";
import TherapistProfileDetails from "./pages/common/TherapistProfileDetails";
import MemberProfileDetails from "./pages/common/MemberProfileDetails";

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
            <Route
              path="therapists/:id"
              element={<TherapistProfileDetails />}
            />

            <Route path="members/:id" element={<MemberProfileDetails />} />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={[Roles.Member, Roles.Therapist]} />
          }
        >
          <Route element={<CommonLayout />}>
            <Route path="appointments/:id" element={<AppointmentDetails />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[Roles.Member]} />}>
          <Route path="/member" element={<CommonLayout />}>
            <Route path="profile" element={<MemberProfile />} />
            <Route
              path="transactions"
              element={<MemberTransactionManagement />}
            />
            <Route path="appointments" element={<MemberAppointmentList />} />
            <Route path="schedule" element={<MemberSchedule />} />
            <Route
              path="reports"
              element={<ReportManagement role="member" />}
            />
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
            <Route path="schedule" element={<TherapistSchedule />} />
            <Route path="packages" element={<TherapistPackageManagement />} />
            <Route path="blogs" element={<TherapistBlogList />} />
            <Route path="blogs/:id" element={<TherapistBlogDetails />} />
            <Route path="new-blog" element={<TherapistBlogManagement />} />
            <Route path="quizzes" element={<TherapistQuizManagement />} />
            <Route
              path="reports"
              element={<ReportManagement role="therapist" />}
            />
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
