import {BrowserRouter as Router, Routes, Route} from "react-router"
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"

createRoot(document.getElementById('root')).render(
  <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  </>
)


// useNavigate
// Navigate
