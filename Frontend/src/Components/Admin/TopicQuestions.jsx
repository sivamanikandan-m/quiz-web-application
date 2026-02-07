import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useParams, useNavigate } from "react-router-dom";
import UpdateQuestion from "./UpdateQuestion";
import "../../CSS/admin.css";

export default function TopicQuestions() {

  const { id } = useParams(); // topicId
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [editQ, setEditQ] = useState(null);

  const [newQ, setNewQ] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: ""
  });

  const load = () => {
    api.get(`/admin/questions/${id}`)
      .then(res => setQuestions(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const addQuestion = () => {
    const { question, optionA, optionB, optionC, optionD, correctAnswer } = newQ;

    if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      alert("All fields required");
      return;
    }

    api.post(`/admin/add-question/${id}`, newQ)
      .then(() => {
        setNewQ({
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: ""
        });
        load();
      });
  };

  const deleteQ = (qid) => {
    if (!window.confirm("Delete this question?")) return;

    api.delete(`/admin/delete-question/${qid}`)
      .then(() => load());
  };

  return (
    <div className="admin">

      {/* BACK */}
      <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>
        ⬅ Admin Dashboard
      </button>

      {/* ADD QUESTION */}
      <div className="card add-question-card">
        <h3>Add Question</h3>

        <input
          placeholder="Question"
          value={newQ.question}
          onChange={e => setNewQ({ ...newQ, question: e.target.value })}
        />

        <input
          placeholder="Option A"
          value={newQ.optionA}
          onChange={e => setNewQ({ ...newQ, optionA: e.target.value })}
        />

        <input
          placeholder="Option B"
          value={newQ.optionB}
          onChange={e => setNewQ({ ...newQ, optionB: e.target.value })}
        />

        <input
          placeholder="Option C"
          value={newQ.optionC}
          onChange={e => setNewQ({ ...newQ, optionC: e.target.value })}
        />

        <input
          placeholder="Option D"
          value={newQ.optionD}
          onChange={e => setNewQ({ ...newQ, optionD: e.target.value })}
        />

        <select
          value={newQ.correctAnswer}
          onChange={e => setNewQ({ ...newQ, correctAnswer: e.target.value })}
        >
          <option value="">Correct Answer</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <button className="primary" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      {/* QUESTION LIST */}
      <h3>Questions</h3>

      {questions.map((q, index) => (
        <div key={q.id} className="question-card">
          <p>
            <b>{index + 1}. {q.question}</b>
          </p>

          <p>A. {q.optionA}</p>
          <p>B. {q.optionB}</p>
          <p>C. {q.optionC}</p>
          <p>D. {q.optionD}</p>

          <p><b>Answer:</b> {q.correctAnswer}</p>

          <button onClick={() => setEditQ(q)}>Edit</button>
          <button className="danger" onClick={() => deleteQ(q.id)}>Delete</button>
        </div>
      ))}


      {/* 🔥 UPDATE MODAL */}
      {editQ && (
        <UpdateQuestion
          question={editQ}
          refresh={load}
          onClose={() => setEditQ(null)}
        />
      )}
    </div>
  );
}
