import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>AI Answer Evaluator</h1>

      <button onClick={() => navigate("/register")}>Register</button><br />
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default Home;