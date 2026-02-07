import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "../../CSS/admin.css";

export default function AdminUsers() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/admin/users")
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="admin">

            {/* BACK */}
            <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>
                ⬅ Admin Dashboard
            </button>

            <h3>Users</h3>

            <div className="user-list">
                {users.map(u => (
                    <div key={u.id} className="user-card clickable-card" onClick={() =>
                        navigate(`/admin/users/${u.id}/scores`, {
                            state: { username: u.username }
                        })
                    }>
                        <p><strong>ID:</strong> {u.id}</p>
                        <p><strong>Name:</strong> {u.username}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}