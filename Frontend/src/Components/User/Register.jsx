import React, { useState } from "react";
import api from "../../Services/api";
import "../../CSS/form.css";
import { Link } from "react-router-dom";

export default function Register() {

  const [user, setUser] = useState({});

  const register = () => {
    api.post("/auth/register", user)
      .then(() => alert("Registered Successfully"))
      .catch(() => alert("Error"));
  };

  return (
    <div className="center-page">
      <div className="card">
        <h3>User Registration</h3>

        <input
          placeholder="Username"
          onChange={e => setUser({ ...user, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setUser({ ...user, password: e.target.value })}
        />

        <button className="primary" onClick={register}>
          Register
        </button>

        {/* 🔗 LOGIN LINK */}
        <p className="switch-text">
          Already registered?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
