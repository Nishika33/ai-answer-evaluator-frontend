import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage(){

const [user,setUser]=useState({
username:"",
password:""
});

const navigate=useNavigate();

const login=()=>{

axios.post("http://localhost:8080/api/auth/login",user)

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

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">

<div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-96">

<h2 className="text-3xl font-bold text-white text-center mb-6">
Login
</h2>

<input
className="w-full p-3 mb-4 rounded-lg bg-white/80"
placeholder="Username"
onChange={e=>setUser({...user,username:e.target.value})}
/>

<input
type="password"
className="w-full p-3 mb-6 rounded-lg bg-white/80"
placeholder="Password"
onChange={e=>setUser({...user,password:e.target.value})}
/>

<button
className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
onClick={login}
>

Login

</button>

</div>

</div>

);

}