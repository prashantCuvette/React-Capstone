import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useContext } from "react";
import { useNavigate, Link } from "react-router";

const Header = () => {
  // const { user, logout } = useAuth();
  const user = true;

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const headerStyle = {
    backgroundColor: "#282c34",
    padding: "1rem",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const leftSectionStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: 0,
  };

  const rightSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const userEmailStyle = {
    fontSize: "0.9rem",
    color: "#ccc",
  };

  const logoutButtonStyle = {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s ease",
  };

  const handleLogout = () => {
    auth.logout();
    toast.success("User Logged Out Successfully");
    navigate("/login");
  };

  return (
    <div style={headerStyle}>
      <h1 style={leftSectionStyle}>MyTasks</h1>
      <div style={rightSectionStyle}>
        {user && (
          <>
            <span style={userEmailStyle}>{auth.user.email}</span>
            <Link to="/profile">
              <button style={logoutButtonStyle}>Profile</button>
            </Link>
            <button
              style={logoutButtonStyle}
              onClick={handleLogout}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
