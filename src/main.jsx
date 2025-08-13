import { BrowserRouter as Router, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
<<<<<<< ours
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Toaster position="top-right" reverseOrder={false} />
=======
import './styles.css';

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    
>>>>>>> theirs
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route index path="/" element={<App />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);

// useNavigate
// Navigate

/**
 *
 *
 *            / ProtectedRoute
 *            / App
 */
