import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FacultyPage() {

const navigate = useNavigate();

const [subject, setSubject] = useState("");
const [question, setQuestion] = useState("");
const [modelAnswer, setModelAnswer] = useState("");
const [maxScore, setMaxScore] = useState(10);

const [prompt, setPrompt] = useState("");
const [results, setResults] = useState([]);
const [showTable, setShowTable] = useState(false);

const logout = () => {
localStorage.removeItem("username");
localStorage.removeItem("role");
navigate("/login");
};

const addQuestion = async () => {

await axios.post("http://localhost:8080/api/question", {
subject: subject,
questionText: question,
modelAnswer: modelAnswer,
maxScore: maxScore
});

alert("Question Added Successfully");

setSubject("");
setQuestion("");
setModelAnswer("");

};

const searchResults = async () => {

const res = await axios.post(
"http://localhost:8080/api/results/prompt",
prompt,
{ headers: { "Content-Type": "text/plain" } }
);

setResults(res.data);
setShowTable(true);

};

const viewAllResults = async () => {

const res = await axios.get("http://localhost:8080/api/results");

setResults(res.data);
setShowTable(true);

};

return(

<div style={{ padding:"30px" }}>

<div style={{
position:"relative",
textAlign:"center"
}}>

<h2>Faculty Dashboard</h2>

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

<hr/>

<h3>Add Question</h3>

<select onChange={e => setSubject(e.target.value)}>
<option>Select Subject</option>
<option>Artificial Intelligence</option>
<option>Machine Learning</option>
<option>Data Science</option>
<option>Computer Networks</option>
<option>Operating Systems</option>
</select>

<br/><br/>

<textarea
placeholder="Enter Question"
onChange={e => setQuestion(e.target.value)}
/>

<br/><br/>

<textarea
placeholder="Enter Model Answer"
onChange={e => setModelAnswer(e.target.value)}
/>

<br/><br/>

<input
type="number"
value={maxScore}
onChange={e => setMaxScore(e.target.value)}
/>

<br/><br/>

<button onClick={addQuestion}>Save Question</button>

<hr/>

<h3>Search Results (AI Prompt)</h3>

<div style={{ display:"flex", alignItems:"center", gap:"10px" }}>

<input
style={{ width:"700px", padding:"10px" }}
placeholder="Example: show roll 21 result"
onChange={e => setPrompt(e.target.value)}
/>

<button onClick={searchResults}>Search</button>

<button onClick={viewAllResults}>View All Results</button>

</div>

<hr/>

{showTable && (

<table border="1" width="100%" style={{ marginTop:"20px" }}>

<thead>

<tr>
<th>ID</th>
<th>Subject</th>
<th>Question ID</th>
<th>Student Name</th>
<th>Roll Number</th>
<th>Marks</th>
<th>Similarity</th>
<th>Feedback</th>
</tr>

</thead>

<tbody>

{results.map((r)=>(
<tr key={r.id}>

<td>{r.id}</td>
<td>{r.subject}</td>
<td>{r.questionId}</td>
<td>{r.studentUsername}</td>
<td>{r.rollNumber}</td>
<td>{r.predictedMarks}</td>
<td>{r.similarityScore}</td>
<td>{r.feedback}</td>

</tr>
))}

</tbody>

</table>

)}

</div>

);

}