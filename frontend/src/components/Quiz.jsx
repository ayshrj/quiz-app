import React, { useState } from "react";
import { QuizBox } from "./QuizBox";
import "./Quiz.css";

export const Quiz = (prop) => {
  const quizData = JSON.parse(prop.result);
  const [totalQuestions, setTotalQuestions] = useState(quizData.length);
  const [currentPage, setCurrentPage] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));
  const maxPage = 25;

  const handleCorrectAnswer = () => {
    setCorrectCount(correctCount + 1);
  };

  const handleAnswer = (index, isCorrect) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage] = { index, isCorrect };
    setAnswers(updatedAnswers);
  };

  const goToNextPage = () => {
    console.log("Next Page")
    if (currentPage < quizData.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    console.log("Prev Page")
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const loadMoreData = (currentPage, totalQuestions) => {
    if(currentPage !== totalQuestions - 1){
      goToNextPage()
    } else if (currentPage < maxPage) {
      console.log("Load More") 
    } else {
      console.log("End") 
    }
  }

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
          onClick={loadMoreData.bind(this, currentPage, totalQuestions)}
          disabled={(currentPage === totalQuestions - 1 && currentPage === maxPage - 1)}
          className={`page-change-button search-button ${
            (currentPage === totalQuestions - 1 && currentPage === maxPage - 1) ? "disabled" : ""
          }`}
        >
          { (currentPage === totalQuestions - 1 && currentPage === maxPage - 1) ? "End" : (currentPage === totalQuestions - 1) ? "Load" : "Next" }
        </button>
      </div>
    </div>
  );
};

export default Quiz;