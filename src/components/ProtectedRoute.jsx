import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "./Loader"

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // Wait until localStorage is checked
  if (loading) {
    return <Loader />; // or spinner component
  }

  // If no user after loading, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
