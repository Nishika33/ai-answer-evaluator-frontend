import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    role: ""
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", user);
      alert("Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={e => setUser({ ...user, email: e.target.value })}
      />

      <br/><br/>

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

      <select onChange={e => setUser({ ...user, role: e.target.value })}>
        <option value="">Select Role</option>
        <option value="STUDENT">STUDENT</option>
        <option value="FACULTY">FACULTY</option>
      </select>

      <br/><br/>

      <button onClick={register}>Register</button>
    </div>
  );
}