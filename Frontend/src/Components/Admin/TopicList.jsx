import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import "../../CSS/admin.css";

export default function TopicList({ refresh }) {

  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const loadTopics = () => {
    api.get("/admin/topics")
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadTopics();
  }, [refresh]);

  const deleteTopic = (id) => {
    if (!window.confirm("Delete this topic?")) return;

    api.delete(`/admin/topic/${id}`)
      .then(() => loadTopics())
      .catch(() => alert("Failed to delete topic"));
  };

  return (
    <div className="topic-list">
      {topics.map(t => (
        <div key={t.id} className="topic-card admin-topic-card">

          {/* TOPIC NAME */}
          <span className="topic-name">{t.name}</span>

          {/* ACTION BUTTONS */}
          <div className="topic-actions">
            <button
              className="primary small"
              onClick={() => navigate(`/admin/questions/${t.id}`)}
            >
              View / Edit
            </button>

            <button
              className="danger small"
              onClick={() => deleteTopic(t.id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
