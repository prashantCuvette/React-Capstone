import { createContext, useEffect, useState, useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ start true
  const [error, setError] = useState(null);

  // Restore user from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false); // ✅ mark done after reading
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_URL}/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const userData = data[0];
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setLoading(false);
        return { success: true, user: userData };
      } else {
        setError("Invalid email or password");
        setLoading(false);
        return { success: false, error: "Invalid email or password" };
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please try again.");
      setLoading(false);
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const signup = async (userdata) => {
    setLoading(true);
    setError(null);
    try {
      const existingUserRes = await fetch(
        `${API_URL}/users?email=${userdata.email}`
      );
      const existingUsers = await existingUserRes.json();

      if (existingUsers.length > 0) {
        setError("User with this email already exists");
        setLoading(false);
        return { success: false, error: "User with this email already exists" };
      }
      const newUser = { ...userdata };

      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setLoading(false);
        return { success: true, user: data };
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      console.error("Signup failed", error);
      setError("Signup failed. Please try again.");
      setLoading(false);
      return { success: false, error: "Signup failed. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = () => user !== null;

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading, // ✅ now exposed
        error,
        login,
        signup,
        logout,
        isAuthenticated,
        updateUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
