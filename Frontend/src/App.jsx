import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/User/Home";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import UserDashboard from "./Components/User/UserDashboard";
import Quiz from "./Components/User/Quiz";
import MyScores from "./Components/User/MyScores";

import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import TopicQuestions from "./Components/Admin/TopicQuestions";
import AdminUserScores from "./Components/Admin/AdminUserScores";
import TopicScoreList from "./Components/Admin/TopicScoreList";
import AdminUsers from "./Components/Admin/AdminUsers";
import AdminScoresByUser from "./Components/Admin/AdminScoresByUser";

function App() {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<Home />} />

      {/* USER */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/quiz/:topicId" element={<Quiz />} />
      <Route path="/user/scores" element={<MyScores />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/questions/:id" element={<TopicQuestions />} />
      <Route path="/admin/user-scores" element={<AdminUserScores />} />
      <Route path="/admin/topic-scores/:topicId" element={<TopicScoreList />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/users/:userId/scores" element={<AdminScoresByUser />} />

    </Routes>
  );
}

export default App;
