import React, { useState } from "react";
import { QuizBox } from "./QuizBox";
import "./Quiz.css";
import data from "../dataset/Data";

const quizData = JSON.parse(data);

export const Quiz = () => {
  const [correctCount, setCorrectCount] = useState(0);

  const handleCorrectAnswer = () => {
    setCorrectCount(correctCount + 1);
  };

  return (
    <div className="quiz-container">
      {quizData.map((question, index) => (
        <QuizBox
          key={index}
          {...question}
          onCorrectAnswer={handleCorrectAnswer}
        />
      ))}
      <div className="counter-block">
        <span className="counter-text">Correct Answers:</span>
        <span className="counter-number">{correctCount}</span>
      </div>
    </div>
  );
};

export default Quiz;