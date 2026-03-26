import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(){

const [user,setUser]=useState({
username:"",
password:"",
role:"",
rollNumber:""
});

const navigate=useNavigate();

const register=async()=>{

try{

await axios.post("http://localhost:8080/api/auth/register",user);

alert("Registration Successful");

navigate("/login");

}catch(e){

alert("Registration Failed");

}

};

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700">

<div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-96">

<h2 className="text-3xl font-bold text-white text-center mb-6">
Create Account
</h2>

<input
className="w-full p-3 mb-4 rounded-lg bg-white/80"
placeholder="Username"
onChange={e=>setUser({...user,username:e.target.value})}
/>

<input
type="password"
className="w-full p-3 mb-4 rounded-lg bg-white/80"
placeholder="Password"
onChange={e=>setUser({...user,password:e.target.value})}
/>

<select
className="w-full p-3 mb-4 rounded-lg bg-white/80"
onChange={e=>setUser({...user,role:e.target.value})}
>

<option value="">Select Role</option>
<option value="STUDENT">Student</option>
<option value="FACULTY">Faculty</option>

</select>

{user.role==="STUDENT" && (

<input
className="w-full p-3 mb-4 rounded-lg bg-white/80"
placeholder="Roll Number"
onChange={e=>setUser({...user,rollNumber:e.target.value})}
/>

)}

<button
className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
onClick={register}
>

Register

</button>

</div>

</div>

);

}