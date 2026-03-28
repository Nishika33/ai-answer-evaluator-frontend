import { useNavigate } from "react-router-dom";
import "./styles.css";

function Home() {

const navigate = useNavigate();

return (

<div className="container">

<div className="card">

<h1 className="title">AI Answer Evaluator</h1>

<button onClick={()=>navigate("/register")}>
Register
</button>

<br/><br/>

<button onClick={()=>navigate("/login")}>
Login
</button>

</div>

</div>

);

}

export default Home;