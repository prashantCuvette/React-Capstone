import { Link } from "react-router";
import "../styles.css"
import { useState } from "react";

import { useNavigate } from "react-router";
// import Header from "./Header";
const Login = () => {
    const[formData,setFormData] = useState ({
        email:"",
        password:"",
    });

    const navigate= useNavigate();

    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(formData);
        navigate("/signup")
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
