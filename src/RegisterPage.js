import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function RegisterPage(){

const [showPassword,setShowPassword] = useState(false);

const navigate=useNavigate();

const register=async()=>{

try{

await axios.post("https://ai-answer-evaluator-backend.onrender.com/api/auth/register",user);

alert("Registration Successful");

navigate("/login");

}catch(e){

alert("Registration Failed");

}

};

return(

<div className="container">

<div className="card">

<h2 className="title">Create Account</h2>

<input
placeholder="Username"
onChange={e=>setUser({...user,username:e.target.value})}
/>

<div className="password-container">

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
onChange={e=>setUser({...user,password:e.target.value})}
/>

<span
className="eye-icon"
onClick={()=>setShowPassword(!showPassword)}
>
👁
</span>

</div>

<select
onChange={e=>setUser({...user,role:e.target.value})}
>

<option value="">Select Role</option>
<option value="STUDENT">Student</option>
<option value="FACULTY">Faculty</option>

</select>

{user.role==="STUDENT" && (

<input
placeholder="Roll Number"
onChange={e=>setUser({...user,rollNumber:e.target.value})}
/>

)}

<button onClick={register}>
Register
</button>

</div>

</div>

);

}