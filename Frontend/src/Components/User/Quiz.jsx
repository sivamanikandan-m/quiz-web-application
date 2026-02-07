import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../CSS/quiz.css";

export default function Quiz() {

  const { topicId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const topicName = location.state?.topicName || "Quiz";

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Redirect logic MUST be inside useEffect
  useEffect(() => {
    if (!user) {
      alert("User not logged in");
      navigate("/login");
      return;
    }

    api.get(`/quiz/${topicId}`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));

  }, [topicId, user, navigate]);

  const submitQuiz = async () => {
    try {
      console.log("Submitting quiz...");
      console.log("Answers:", answers);

      const res = await api.post(
        `/quiz/submit/${topicId}/${user.id}`,
        answers
      );

      console.log("Response:", res.data);

      setResult(res.data);
      setShowModal(true);

    } catch (err) {
      console.error("Submit quiz error:", err);
      alert("Error submitting quiz. Check console.");
    }
  };

  return (
    <div className="quiz">

      <button className="back-btn" onClick={() => navigate("/user/dashboard")}>
        ⬅ User Dashboard
      </button>

      <h2>Quiz - {topicName}</h2>

      {questions.map((q, index) => (
        <div key={q.id} className="question">

          <p className="question-title">
            {index + 1}. {q.question}
          </p>

          {["A", "B", "C", "D"].map(opt => (
            <div key={opt} className="option-row">
              <input
                type="radio"
                name={q.id}
                checked={answers[q.id] === opt}
                onChange={() =>
                  setAnswers({ ...answers, [q.id]: opt })
                }
              />

              <label
                className="option-text"
                onClick={() =>
                  setAnswers({ ...answers, [q.id]: opt })
                }
              >
                {opt}) {q["option" + opt]}
              </label>
            </div>
          ))}
        </div>
      ))}

      <button onClick={submitQuiz}>Submit</button>

      {/* ✅ SAFE MODAL */}
      {showModal && result && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>🎉 Quiz Completed</h3>
            <p>
              Hi <b>{user.username}</b>,<br />
              You scored <b>{result.score}</b> /
              <b>{result.totalQuestions}</b> in
              <b> {result.topicName}</b>
            </p>

            <button onClick={() => navigate("/user/dashboard")}>
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
