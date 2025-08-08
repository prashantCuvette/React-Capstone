
import { Outlet, Navigate } from "react-router";

const ProtectedRoute = ({children}) => {
    // const { user } = useContext(AuthContext);

    const user = true;

  return user ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoute;
