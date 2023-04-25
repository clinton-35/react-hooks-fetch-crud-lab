import { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswerChange = async (id, correctIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      });
      const updatedQuestion = await response.json();
      const updatedQuestions = questions.map((q) => {
        if (q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      });
      setQuestions(updatedQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
