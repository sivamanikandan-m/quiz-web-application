import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import "../../CSS/admin.css";

export default function UserDashboard() {

  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("User not logged in");
      navigate("/login");
      return;
    }

    api.get("/admin/topics")
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));

  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem("user"); // ✅ FIXED
    navigate("/");
  };

  return (
    <div className="admin">
      <div className="top-bar">
        <h2>Hi, {user.username} 👋</h2>

        <button onClick={() => navigate("/user/scores")}>
          My Scores
        </button>

        <button onClick={logout}>Logout</button>
      </div>

      <p>Select a topic to start quiz</p>

      <div className="topic-list">
        {topics.map(t => (
          <div
            key={t.id}
            className="topic-card"
            onClick={() =>
              navigate(`/quiz/${t.id}`, {
                state: { topicName: t.name }
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
