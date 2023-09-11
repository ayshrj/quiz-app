import React, { useState } from "react";
import { QuizBox } from "./QuizBox";
import "./Quiz.css";

export const Quiz = (prop) => {
  const quizData = JSON.parse(prop.result);
  const totalQuestions = quizData.length;
  const [currentPage, setCurrentPage] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));

  const handleCorrectAnswer = () => {
    setCorrectCount(correctCount + 1);
  };

  const handleAnswer = (index, isCorrect) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage] = { index, isCorrect };
    setAnswers(updatedAnswers);
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
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentPage]}
        />
      )}
      <div className="counter-block">
        <span className="counter-number">{correctCount}/{totalQuestions}</span>
      </div>
      <div className="pagination">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className={`page-change-button search-button ${
            currentPage === 0 ? "disabled" : ""
          }`}
        >
          Prev
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalQuestions - 1}
          className={`page-change-button search-button ${
            currentPage === totalQuestions - 1 ? "disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
