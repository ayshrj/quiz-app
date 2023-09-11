import React, { useState } from "react";
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

export const QuizBox = ({ question, options, correct, onCorrectAnswer }) => {
  const initialState = convertDataToState({ options, correct });
  const [answers, setAnswers] = useState(initialState);
  const [answered, setAnswered] = useState(false);

  const checkAnswer = (index) => {
    if (!answered) {
      const updatedAnswers = answers.map((answer, i) => {
        if (i === index) {
          if (answer.isCorrect) {
            onCorrectAnswer();
          }
          return { ...answer, clicked: true };
        }
        if (answer.isCorrect) {
          return { ...answer, clicked: true };
        }
        return answer;
      });
      setAnswers(updatedAnswers);
      setAnswered(true);
    }
  };

  return (
    <div className="quiz">
      <div className="question">{question}</div>
      {answers.map((answer, index) => (
        <div
          key={index}
          className={`answer ${
            answer.clicked ? (answer.isCorrect ? "correct" : "incorrect") : ""
          }`}
          onClick={() => checkAnswer(index)}
          style={{ pointerEvents: answered ? "none" : "auto" }}
        >
          <div className="answer-circle">
            {String.fromCharCode(65 + index)}
          </div>
          <div className="answer-text">{answer.text}</div>
        </div>
      ))}
    </div>
  );
};
