import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import "../../CSS/admin.css";

export default function AdminUserScores() {

  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/topics")
      .then(res => setTopics(res.data));
  }, []);

  return (
    <div className="admin">

      <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>
        ⬅ Admin Dashboard
      </button>

      <h1>User Scores</h1>

      <h3>Select Topic</h3>

      <div className="topic-list">
        {topics.map(t => (
          <div
            key={t.id}
            className="topic-card"
            onClick={() => 
              navigate(`/admin/topic-scores/${t.id}`, {
                state: { topicName: t.name}
              })
            }
          >
            {t.name}
          </div>
        ))}
      </div>

    </div>
  );
}
