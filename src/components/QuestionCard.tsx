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
    <div className="w-full max-w-lg p-6 m-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Question: {questionNumber} / {totalQuestions}
      </h2>
      <h3 className="text-lg mb-6">{question}</h3>
      <div className="grid grid-cols-2 gap-4">
        {cities.map((city, index) => (
          <button
            key={index}
            className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            disabled={userAnswer ? true : false}
            value={city}
            onClick={callback}
          >
            <span>{city}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
