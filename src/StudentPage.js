import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

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

localStorage.clear();
navigate("/login");

};

const loadQuestions = async (sub) => {

setSubject(sub);

const res = await axios.get(`https://ai-answer-evaluator-backend.onrender.com/api/questions/${sub}`);

setQuestions(res.data);

};

const submitAnswer = async () => {

const res = await axios.post(

`https://ai-answer-evaluator-backend.onrender.com/api/submit/${questionId}`,

{
studentUsername: username,
rollNumber: rollNumber,
studentAnswer: studentAnswer,
subject: subject
}

);

setResult(res.data);

};

return(

<div className="dashboard">

<div className="header">

<h2>Student Dashboard</h2>

<button className="logout" onClick={logout}>
Logout
</button>

</div>

<h4>Welcome {username}</h4>

<div className="section">

<select onChange={e=>loadQuestions(e.target.value)}>

<option>Select Subject</option>
<option>Artificial Intelligence</option>
<option>Machine Learning</option>
<option>Data Science</option>
<option>Python</option>
<option>Information Retrieval System</option>

</select>

</div>

{questions.length>0 &&(

<select onChange={e=>setQuestionId(e.target.value)}>

<option>Select Question</option>

{questions.map(q=>(

<option key={q.id} value={q.id}>
{q.questionText}
</option>

))}

</select>

)}

<textarea
rows="6"
placeholder="Write Your Answer"
onChange={e=>setStudentAnswer(e.target.value)}
/>

<button onClick={submitAnswer}>
Submit Answer
</button>

{result && (

<div className="section">

<h3>Evaluation Result</h3>

<p><b>Marks:</b> {result.predictedMarks}</p>
<p><b>Similarity:</b> {result.similarityScore}</p>
<p><b>Feedback:</b> {result.feedback}</p>

</div>

)}

</div>

);

}