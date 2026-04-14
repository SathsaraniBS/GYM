import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";   // ✅ import ToastProvider

import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";  // ✅ import your protected page
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import the route wrapper
// import your other pages here...

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,   // ✅ silences the React Router future-flag warning
      }}
    >
      <AuthProvider>
        <ToastProvider>              {/* ✅ wrap everything so useToast works anywhere */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ResetPassword />} />


            {/* Profile Route (profile only) */}
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />

            {/* add your other routes here */}
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;