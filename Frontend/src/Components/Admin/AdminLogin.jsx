import React, { useState } from "react";
import api from "../../Services/api";
import "../../CSS/form.css";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const [admin, setAdmin] = useState({});
  const navigate = useNavigate();

  const login = () => {
    api.post("/auth/login", admin)
      .then(res => {
        if (res.data.role === "ADMIN") {
          localStorage.setItem("username", res.data.username);
          navigate("/admin/dashboard");
        } else {
          alert("Not an Admin");
        }
      });
  };

  return (
    <div className="center-page">
      <div className="card">
        <h3>Admin Login</h3>

        <input
          placeholder="Username"
          onChange={e => setAdmin({ ...admin, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setAdmin({ ...admin, password: e.target.value })}
        />

        <button className="primary" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
