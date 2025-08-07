import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <form>
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Don't have an account? Signup</Link>
    </div>
  );
};

export default Login;
