import { createContext, useEffect, useState, useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// create a context
export const AuthContext = createContext();

// create a provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // msg

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("Error parsing stored user data", error);
        localStorage.removeItem("user"); // Remove corrupted data
      }
    }
  }, []);

  // Helper function to generate unique user ID
  const generateUserId = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      const users = await res.json();
      return users.length > 0
        ? Math.max(...users.map((u) => u.userId || u.id)) + 1
        : 1;
    } catch (error) {
      return Date.now(); // Fallback to timestamp
    }
  };

  // login
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
      console.log("Login failed", error);
      setError("Login failed. Please try again.");
      setLoading(false);
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  // signup
  const signup = async (userdata) => {
    setLoading(true);
    setError(null);

    try {
      // Check if user already exists
      const existingUserRes = await fetch(
        `${API_URL}/users?email=${userdata.email}`
      );
      const existingUsers = await existingUserRes.json();

      if (existingUsers.length > 0) {
        setError("User with this email already exists");
        setLoading(false);
        return { success: false, error: "User with this email already exists" };
      }

      // Generate unique user ID
      const userId = await generateUserId();
      const newUser = { ...userdata, userId }; //name, email, pass, userId

      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      console.log("Signup failed", error);
      setError("Signup failed. Please try again.");
      setLoading(false);
      return { success: false, error: "Signup failed. Please try again." };
    }
  };

  // logout
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
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

// create a customHook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
