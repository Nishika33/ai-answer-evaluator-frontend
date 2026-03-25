import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = () => {

    axios.post("http://localhost:8080/api/auth/login", user)

      .then(res => {

        
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);

        if (res.data.role === "STUDENT") {
          navigate("/student");
        } else {
          navigate("/faculty");
        }

      })

      .catch(error => {
        alert("Invalid Credentials");
        console.log(error);
      });

  };


  return (

    <div>

      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={e => setUser({ ...user, username: e.target.value })}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={e => setUser({ ...user, password: e.target.value })}
      />

      <br/><br/>

      <button onClick={login}>Login</button>

      <p style={{ marginTop: "15px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

    </div>

  );
}