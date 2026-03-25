import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentPage(){

const [subject,setSubject] = useState("");
const navigate = useNavigate();
const [questionId,setQuestionId] = useState("");
const [rollNumber,setRollNumber] = useState("");
const [studentAnswer,setStudentAnswer] = useState("");
const [result,setResult] = useState(null);

const username = localStorage.getItem("username");

const logout = () => {
localStorage.removeItem("username");
localStorage.removeItem("role");
navigate("/login");
};

const submitAnswer = async () => {

try{

const res = await axios.post(
`http://localhost:8080/api/submit/${questionId}`,
{
studentUsername: username,
rollNumber: rollNumber,
studentAnswer: studentAnswer,
subject: subject
}
);

setResult(res.data);

}catch(error){
alert("Error submitting answer");
console.log(error);
}

};

return(

<div style={{padding:"30px"}}>

<div style={{
position:"relative",
textAlign:"center"
}}>

<h2>Student Dashboard</h2>


<button
onClick={logout}
style={{
position:"absolute",
right:"0",
top:"0",    
backgroundColor:"red",
color:"white",
border:"none",
padding:"5px 10px",
cursor:"pointer",
borderRadius:"5px",
fontWeight:"bold",
width:"80px"
}}
>
Logout
</button>

</div>

<h4>Welcome {username}</h4>

<br/>

<select onChange={e=>setSubject(e.target.value)}>
<option>Select Subject</option>
<option>Artificial Intelligence</option>
<option>Machine Learning</option>
<option>Data Science</option>
<option>Computer Networks</option>
<option>Operating Systems</option>
</select>

<br/><br/>

<input
placeholder="Enter Roll Number"
onChange={e=>setRollNumber(e.target.value)}
/>

<br/><br/>

<input
placeholder="Enter Question ID"
onChange={e=>setQuestionId(e.target.value)}
/>

<br/><br/>

<textarea
placeholder="Write Your Answer"
rows="6"
cols="50"
onChange={e=>setStudentAnswer(e.target.value)}
/>

<br/><br/>

<button onClick={submitAnswer}>Submit Answer</button>

<hr/>

{result && (

<div>

<h3>Evaluation Result</h3>

<p><b>Marks:</b> {result.predictedMarks}</p>
<p><b>Similarity Score:</b> {result.similarityScore}</p>
<p><b>Feedback:</b> {result.feedback}</p>

</div>

)}

</div>

);

}