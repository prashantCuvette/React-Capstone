import { Link } from "react-router";
import "../styles.css"
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useContext } from "react";

import { useNavigate } from "react-router";
// import Header from "./Header";
const Login = () => {
    const[formData,setFormData] = useState ({
        email:"",
        password:"",
    });

    const auth = useContext(AuthContext);

    const navigate= useNavigate();

    const handleSubmit= async (e) => {
        e.preventDefault();
        try {
           const result = await auth.login(formData.email, formData.password);
           if(result.success) {
            toast.success("Sign in Successful");
            navigate("/");
           } else {
            toast.error(result.error);
            navigate("/login");
           }
        } catch (error) {
          toast.error(auth.error);
          console.log(error);
        }

        setFormData({
          email: "",
          password: "",
        });
    };
  
  return (
    <div className="page-section active">
      {/* <Header/> */}
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
          value={formData.email}
          onChange={(e)=>
            setFormData({...formData,email:e.target.value})
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
          onChange={(e)=>
          setFormData({...formData,password:e.target.value})
          } 
          type="password" 
          id="password" 
          name="password" 
          required />
        </div>
        <button type="submit">Login</button>
      <Link style={{textAlign:"center"}} to="/signup">Don't have an account? Signup</Link>
      </form>
    </div>
  );
};

export default Login;
