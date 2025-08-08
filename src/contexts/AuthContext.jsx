import { createContext, useEffect, useState, useContext } from "react";


const API_URL = import.meta.VITE_API_URL || "http://localhost:3000";

// create a context
export const AuthContext = createContext();

// create a provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // undefined
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // login
  //   db operation => takes time thus async await
  // db operation => no guranteed result thus try catch
  const login = async (email, password) => {
    try {
        const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
        const data = await res.json();

        // [ user1, user2 user3]

        if(data.length > 0) {
            setUser(data[0]);
            localStorage.setItem("user", JSON.stringify(data[0]));
        }

        if(user) {
            // navigate to dashboard
        }
        
    } catch (error) {
        console.log("Login failed", error);
    }
  };

  // signup
  const signup = () => {};

  // logout
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// create a customHook
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   return context;
// };


// logout