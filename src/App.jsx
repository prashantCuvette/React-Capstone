import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

const App = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <div>
      Dashboard
    </div>
  )
}

export default App
