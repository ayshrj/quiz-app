import React from "react";
import "./QuizBox.css";

const convertDataToState = (parsedData) => {
  const options = parsedData.options.map((option, index) => {
    return {
      text: option,
      isCorrect: index === parseInt(parsedData.correct),
      clicked: false,
    };
  });

  return options;
};

export const QuizBox = ({ question, options, correct, onCorrectAnswer, onAnswer, selectedAnswer }) => {
  const checkAnswer = (index) => {
    if (!selectedAnswer) {
      const isCorrect = index === parseInt(correct);
      onAnswer(index, isCorrect);
      if (isCorrect) {
        onCorrectAnswer();
      }
    }
  };

  return (
    <div className="quiz">
      <div className="question">{question}</div>
      {options.map((option, index) => (
        <div
          key={index}
          className={`answer ${
            selectedAnswer
              ? selectedAnswer.index === index
                ? selectedAnswer.isCorrect
                  ? "selected-correct"
                  : "selected-incorrect"
                : selectedAnswer.isCorrect && index === parseInt(correct)
                ? "correct"
                : ""
              : ""
          }
          ${
            (selectedAnswer && selectedAnswer.index === index && selectedAnswer.isCorrect) ||
            (selectedAnswer && selectedAnswer.index !== index && index === parseInt(correct))
            ? "correct"
            : ""
          } ${
            selectedAnswer &&
            selectedAnswer.index === index &&
            !selectedAnswer.isCorrect
              ? "incorrect"
              : ""
          }
          `}
          onClick={() => checkAnswer(index)}
          style={{ pointerEvents: selectedAnswer ? "none" : "auto" }}
        >
          <div
            className={`answer-circle ${
              (selectedAnswer && selectedAnswer.index === index && selectedAnswer.isCorrect) ||
              (selectedAnswer && selectedAnswer.index !== index && index === parseInt(correct))
                ? "correct-circle"
                : ""
            } ${
              selectedAnswer &&
              selectedAnswer.index === index &&
              !selectedAnswer.isCorrect
                ? "incorrect-circle"
                : ""
            }`}
          >
            {String.fromCharCode(65 + index)}
          </div>
          <div className="answer-text">{option}</div>
        </div>
      ))}
    </div>
  );
};
