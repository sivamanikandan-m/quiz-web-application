import React from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/home.css";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to the Quiz</h1>
      <p>Test your knowledge and improve your skills 🚀</p>

      <div className="home-buttons">
        <button onClick={() => navigate("/register")}>
          Register
        </button>

        <button onClick={() => navigate("/login")}>
          Login
        </button>

        <button className="start"
          onClick={() => navigate("/login")}>
          Let’s Start
        </button>
      </div>
    </div>
  );
}
