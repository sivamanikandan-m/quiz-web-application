import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../Services/api";
import "../../CSS/scores.css";

export default function AdminScoresByUser() {

  const { userId } = useParams();
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  const location = useLocation();
  const username = location.state?.username || "User";

  useEffect(() => {
    api.get(`/user/scores/${userId}`)
      .then(res => setScores(res.data || []))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div className="scores-page">

      <div className="scores-top">
        <h2>📊 {username}'s Quiz History</h2>
        <button onClick={() => navigate("/admin/users")}>
          ⬅ Back to Users
        </button>
      </div>

      <div className="scores-grid">
        {scores.map((s, i) => (
          <div key={i} className="score-card">
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
        <p className="no-score">No quizzes attempted</p>
      )}
    </div>
  );
}
