import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentPage(){

const [subject,setSubject] = useState("");
const [questions,setQuestions] = useState([]);
const [questionId,setQuestionId] = useState("");
const [studentAnswer,setStudentAnswer] = useState("");
const [result,setResult] = useState(null);

const navigate = useNavigate();

const username = localStorage.getItem("username");
const rollNumber = localStorage.getItem("rollNumber");


const logout = () => {
localStorage.removeItem("username");
localStorage.removeItem("role");
localStorage.removeItem("rollNumber");
navigate("/login");
};


const loadQuestions = async (sub) => {

setSubject(sub);

try{

const res = await axios.get(`http://localhost:8080/api/questions/${sub}`);

setQuestions(res.data);

}catch(error){
console.log(error);
}

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

<div style={{ padding:"30px" }}>

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

{/* SUBJECT DROPDOWN */}

<select onChange={e=>loadQuestions(e.target.value)}>

<option>Select Subject</option>
<option>Artificial Intelligence</option>
<option>Machine Learning</option>
<option>Data Science</option>
<option>Python</option>
<option>Information Retrieval System</option>

</select>

<br/><br/>


{/* QUESTION DROPDOWN */}

{questions.length > 0 && (

<select onChange={e=>setQuestionId(e.target.value)}>

<option>Select Question</option>

{questions.map((q)=>(
<option key={q.id} value={q.id}>
{q.questionText}
</option>
))}

</select>

)}

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