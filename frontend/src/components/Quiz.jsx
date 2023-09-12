import React, { useState, useEffect } from "react";
import { QuizBox } from "./QuizBox";
import "./Quiz.css";
import axios from 'axios';

export const Quiz = (props) => {
  const quizData = JSON.parse(props.result);
  const [totalQuestions, setTotalQuestions] = useState(quizData.length);
  const [currentPage, setCurrentPage] = useState(0);
  const [result, setResult] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoadMoreDataClicked, setIsLoadMoreDataClicked] = useState(false)
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

  const loadMoreData = async () => {
  if (currentPage !== totalQuestions - 1) {
    goToNextPage()
  } else if (currentPage < maxPage) {
    setIsLoadMoreDataClicked(true)
    console.log("Load More");

    try {
      const res = await axios.post('http://localhost:5000/searchMore', { query: props.query });
      const newQuizData = JSON.parse(res.data.data.match(/\[.*\]/s));

      // Use props.setResult to update the result prop
      props.setResult(JSON.stringify([...quizData, ...newQuizData]));
      setTotalQuestions(quizData.length + newQuizData.length);
    } catch (error) {
      console.error('Error fetching more quiz data:', error);
    }
    setIsLoadMoreDataClicked(false)
  } else {
    console.log("End")
  }
}

  useEffect(() => {
    // Listen for changes in currentPage and trigger loadMoreData when "Load" button is clicked
    if (currentPage === totalQuestions - 1 && currentPage === maxPage - 1) {
      loadMoreData();
    }
  }, [currentPage, totalQuestions]);

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
          onClick={loadMoreData}
          disabled={(currentPage === totalQuestions - 1 && currentPage === maxPage - 1)}
          className={`page-change-button search-button ${
            ((currentPage === totalQuestions - 1 && currentPage === maxPage - 1) || isLoadMoreDataClicked) ? "disabled" : ""
          }`}
        >
          { (currentPage === totalQuestions - 1 && currentPage === maxPage - 1) ? "End" : (currentPage === totalQuestions - 1) ? "Load" : "Next" }
        </button>
      </div>
    </div>
  );
};
