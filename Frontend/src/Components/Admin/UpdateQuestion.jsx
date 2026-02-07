import React, { useState } from "react";
import api from "../../Services/api";
import "../../CSS/admin.css";
import "../../CSS/form.css";

export default function UpdateQuestion({ question, refresh, onClose }) {

  const [q, setQ] = useState({ ...question });

  const update = () => {
    api.put(`/admin/update-question/${q.id}`, q)
      .then(res => {
        alert(res.data);
        refresh();
        onClose(); // 🔥 CLOSE POPUP
      });
  };

  return (
    <div className="modal-overlay">
      <div className="card modal-card">

        <h3>Update Question</h3>

        <input
          value={q.question}
          onChange={e => setQ({ ...q, question: e.target.value })}
        />

        <input
          value={q.optionA}
          onChange={e => setQ({ ...q, optionA: e.target.value })}
        />

        <input
          value={q.optionB}
          onChange={e => setQ({ ...q, optionB: e.target.value })}
        />

        <input
          value={q.optionC}
          onChange={e => setQ({ ...q, optionC: e.target.value })}
        />

        <input
          value={q.optionD}
          onChange={e => setQ({ ...q, optionD: e.target.value })}
        />

        <select
          value={q.correctAnswer}
          onChange={e => setQ({ ...q, correctAnswer: e.target.value })}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <button className="primary" onClick={update}>Update</button>
        <button className="danger" onClick={onClose}>Cancel</button>

      </div>
    </div>
  );
}
