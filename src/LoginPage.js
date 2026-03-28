import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function LoginPage(){

const [user,setUser]=useState({
username:"",
password:""
});

const navigate=useNavigate();

const login=()=>{

axios.post("https://ai-answer-evaluator-backend.onrender.com/api/auth/login",user)

.then(res=>{

localStorage.setItem("username",res.data.username);
localStorage.setItem("rollNumber",res.data.rollNumber);
localStorage.setItem("role",res.data.role);

if(res.data.role==="STUDENT"){
navigate("/student");
}else{
navigate("/faculty");
}

})

.catch(()=>alert("Invalid Credentials"));

};

return(

<div className="container">

<div className="card">

<h2 className="title">Login</h2>

<input
placeholder="Username"
onChange={e=>setUser({...user,username:e.target.value})}
/>
<div className="password-container">
<input
type="show password" ? "text" : "password"
placeholder="Password"
onChange={e=>setUser({...user,password:e.target.value})}
/>
<span className="eye-icon" onclick={()=>setShowPassword(!showPassword)}>👁</span>
</div>

<button onClick={login}>
Login
</button>

</div>

</div>

);

}