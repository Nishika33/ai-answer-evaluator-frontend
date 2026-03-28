import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function FacultyPage(){

const navigate = useNavigate();

const [subject,setSubject] = useState("");
const [question,setQuestion] = useState("");
const [modelAnswer,setModelAnswer] = useState("");
const [maxScore,setMaxScore] = useState(10);

const [prompt,setPrompt] = useState("");
const [results,setResults] = useState([]);
const [showTable,setShowTable] = useState(false);

const logout = () => {

localStorage.clear();
navigate("/login");

};

const addQuestion = async () => {

await axios.post("https://ai-answer-evaluator-backend.onrender.com/api/question",{
subject,
questionText:question,
modelAnswer,
maxScore
});

alert("Question Added");

};

const searchResults = async () => {

const res = await axios.post(
"https://ai-answer-evaluator-backend.onrender.com/api/results/prompt",
prompt,
{headers:{"Content-Type":"text/plain"}}
);

setResults(res.data);
setShowTable(true);

};

const viewAllResults = async () => {

const res = await axios.get("https://ai-answer-evaluator-backend.onrender.com/api/results");

setResults(res.data);
setShowTable(true);

};

return(

<div className="dashboard">

<div className="header">

<h2>Faculty Dashboard</h2>

<button className="logout" onClick={logout}>
Logout
</button>

</div>

<div className="section">

<h3>Add Question</h3>

<select onChange={e=>setSubject(e.target.value)}>

<option>Select Subject</option>
<option>Artificial Intelligence</option>
<option>Machine Learning</option>
<option>Data Science</option>
<option>Python</option>
<option>Information Retrieval System</option>

</select>

<textarea
placeholder="Enter Question"
onChange={e=>setQuestion(e.target.value)}
/>

<textarea
placeholder="Enter Model Answer"
onChange={e=>setModelAnswer(e.target.value)}
/>

<input
type="number"
value={maxScore}
onChange={e=>setMaxScore(e.target.value)}
/>

<button onClick={addQuestion}>
Save Question
</button>

</div>

<div className="section">

<h3>Search Results</h3>

<input
placeholder="Example: show roll 21 result"
onChange={e=>setPrompt(e.target.value)}
/>

<button onClick={searchResults}>
Search
</button>

<button onClick={viewAllResults}>
View All Results
</button>

</div>

{showTable && (

<table className="table">

<thead>

<tr>
<th>ID</th>
<th>Subject</th>
<th>Question</th>
<th>Student</th>
<th>Roll</th>
<th>Marks</th>
<th>Similarity</th>
<th>Feedback</th>
</tr>

</thead>

<tbody>

{results.map(r=>(

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