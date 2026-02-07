import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../CSS/admin.css";

export default function TopicScoreList() {

  const { topicId } = useParams();
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  const location = useLocation();
  const topicName = location.state?.topicName || "Quiz";

  useEffect(() => {
    api.get(`/admin/scores/topic/${topicId}`)
      .then(res => setScores(res.data));
  }, [topicId]);

  return (
    <div className="admin">

      <button className="back-btn" onClick={() => navigate("/admin/user-scores")}>
        ⬅ Topics
      </button>

      <h1>{topicName} - User Scores</h1>

      {scores.map((s, index) => (
        <div key={s.id} className="question-card">
          <p>
            <b>{index + 1}. {s.username}</b>
          </p>
          <p>
            Score: <b>{s.score}</b> / {s.totalQuestions}
          </p>
          <p>
            {new Date(s.attemptedAt).toLocaleString()}
          </p>
        </div>
      ))}

      {scores.length === 0 && <p>No attempts yet</p>}
    </div>
  );
}
