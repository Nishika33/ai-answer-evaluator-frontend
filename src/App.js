import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "./styles.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import FacultyPage from "./FacultyPage";
import StudentPage from "./StudentPage";

export default function App() {

  //const [role, setRole] = useState(null);

  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}
