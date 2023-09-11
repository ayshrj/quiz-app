import React, { useState } from "react";
import { QuizBox } from "./QuizBox";
import "./Quiz.css";

export const Quiz = (prop) => {
  const quizData = JSON.parse(prop.result);
  const totalQuestions = quizData.length;
  const [currentPage, setCurrentPage] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const handleCorrectAnswer = () => {
    setCorrectCount(correctCount + 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalQuestions - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="quiz-container">
      {quizData.length > 0 && (
        <QuizBox
          key={currentPage}
          {...quizData[currentPage]}
          onCorrectAnswer={handleCorrectAnswer}
        />
      )}
      <div className="counter-block">
        <span className="counter-number">{correctCount}/{totalQuestions}</span>
      </div>
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 0}>
          Prev
        </button>
        <button onClick={goToNextPage} disabled={currentPage === totalQuestions - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
