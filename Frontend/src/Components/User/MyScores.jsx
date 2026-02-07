import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "../../CSS/scores.css";

export default function MyScores() {

  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    api.get(`/user/scores/${user.id}`)
      .then(res => setScores(res.data || []))
      .catch(err => console.error(err));

  }, [user, navigate]);

  return (
    <div className="scores-page">

      {/* 🔝 TOP BAR */}
      <div className="scores-top">
        <h2>📊 My Scores</h2>
        <button onClick={() => navigate("/user/dashboard")}>
          ⬅ User Dashboard
        </button>
      </div>

      {/* 🧱 SCORE CARDS */}
      <div className="scores-grid">
        {scores.map(s => (
          <div key={s.id} className="score-card">
            <h3>{s.topicName}</h3>

            <div className="score-value">
              {s.score} / {s.totalQuestions}
            </div>

            <p className="score-date">
              {new Date(s.attemptedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {scores.length === 0 && (
        <p className="no-score">No scores found</p>
      )}

    </div>
  );
}
