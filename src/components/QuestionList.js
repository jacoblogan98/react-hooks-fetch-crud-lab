import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {fetch('http://localhost:4000/questions')
  .then(resp => resp.json())
  .then(data => setQuestions(data))}, [])

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(() => {
      const updatedQs = questions.filter(question => question.id !== id)

      setQuestions(updatedQs)
    })
  }

  function handleAnswerChange(id, newIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": newIndex
      })
    })
    .then(resp => resp.json())
    .then(updatedQ => {
      const updatedQs = questions.map(question => {
        if (question.id === updatedQ.id) {
          return updatedQ
        } else {
          return question
        }
      })
      
      setQuestions(updatedQs)
    })
  }

  const questionItems = questions.map((question) => {
    return <QuestionItem 
    key={question.id}
    question={question}
    onDelete={handleDelete}
    onAnswerChange={handleAnswerChange}
    />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
