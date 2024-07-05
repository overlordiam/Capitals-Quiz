import React from 'react';
import { answerObject } from '../App';


type Props = {
  question: string;
  cities: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: answerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

export const QuestionCard: React.FC<Props> = ({
  question,
  cities,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div key={questionNumber}>
      <h2>Question: {questionNumber} / {totalQuestions}</h2>
      <h3>{question}</h3>
      {
        cities.map((city) => (
          <button disabled={userAnswer ? true : false} value={city} onClick={callback}>
            <span>{city}</span> 
          </button>

        ))
      }
    </div>
  )
}

export default QuestionCard;