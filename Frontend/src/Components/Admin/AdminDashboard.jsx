import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicList from "./TopicList";
import api from "../../Services/api";
import "../../CSS/admin.css";

export default function AdminDashboard() {

  const navigate = useNavigate();
  const adminName = localStorage.getItem("username");

  const [topicName, setTopicName] = useState("");
  const [refresh, setRefresh] = useState(false);

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const addTopic = () => {
    if (!topicName.trim()) {
      alert("Topic name required");
      return;
    }

    api.post("/admin/add-topic", { name: topicName })
      .then(() => {
        setTopicName("");
        setRefresh(!refresh); // reload topic list
      });
  };

  return (
    <div className="admin">

      {/* TOP BAR */}
      <div className="top-bar">
        <h2>Hi, {adminName} 👋</h2>

        <div className="top-actions">

          <button
            className="primary"
            onClick={() => navigate("/admin/users")}
          >
            Users
          </button>

          <button
            className="primary"
            onClick={() => navigate("/admin/user-scores")}
          >
            User Scores
          </button>



          <button className="danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>


      {/* ADD TOPIC */}
      <div className="card add-topic-card">
        <h3>Add Topic</h3>

        <input
          placeholder="Enter topic name"
          value={topicName}
          onChange={e => setTopicName(e.target.value)}
        />

        <button className="primary" onClick={addTopic}>
          Add Topic
        </button>
      </div>

      {/* TOPIC LIST */}
      <TopicList refresh={refresh} />
    </div>
  );
}
