import React, { useState } from "react";
import api from "../../Services/api";
import "../../CSS/form.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [user, setUser] = useState({});
  const navigate = useNavigate();



  const login = () => {
    api.post("/auth/login", user)
      .then(res => {

        if (res.data.role === "USER") {

          localStorage.setItem(
            "user",
            JSON.stringify({
              id: res.data.id,
              username: res.data.username,
              role: res.data.role
            })
          );

          navigate("/user/dashboard");

        } else {
          alert("Not a User account");
        }

      })
      .catch(() => alert("Invalid Credentials"));
  };

  return (
    <div className="center-page">
      <div className="card">
        <h3>Login User</h3>

        <input
          placeholder="Username"
          onChange={e => setUser({ ...user, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setUser({ ...user, password: e.target.value })}
        />

        <button className="primary" onClick={login}>
          Login
        </button>

        {/* 🔗 REGISTER LINK */}
        <p className="switch-text">
          New user?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
