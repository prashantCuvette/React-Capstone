import { Link } from "react-router";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";


const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const auth = useContext(AuthContext);
  // console.log(auth);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signup(formData);
      console.log(result)
      if (!result.success) {
        toast.error(result.error)
        navigate("/signup");
      } else {
        navigate("/login");
        toast.success("User Created Successfully");
      }
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(auth.error); // for user
      console.log(error.message); // for dev
    }
  };

  return (
    <div className="page-section active">
      <form className="auth-form active" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            type="text"
            id="username"
            name="username"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit">Signup</button>
      <Link style={{textAlign:"center"}} to="/login">Already have an account? Login</Link>

      </form>
    </div>
  );
};

export default Signup;
