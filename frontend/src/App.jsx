import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contactpage from "./pages/Contactpage";
import Course from "./pages/Course";
import GalleryPage from "./pages/GalleryPage";
import Ourteam from "./pages/Ourteam";
import BecomeaMember from "./pages/BecomeaMember";
import Membership from "./pages/Membership";
import Adminpanel from './pages/Adminpanel';
import UserDashboard from "./pages/UserDashboard";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/forgot-password" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contactpage />} />
            <Route path="/course" element={<Course />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/ourteam" element={<Ourteam />} />
            <Route path="/becomeamember" element={<BecomeaMember />} />
            <Route path="/membership" element={<Membership />} />

            {/* Protected User Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admindashboard"
              element={
                <ProtectedRoute>
                  <Adminpanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminpanel"
              element={
                <ProtectedRoute>
                  <Adminpanel />
                </ProtectedRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Login />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;