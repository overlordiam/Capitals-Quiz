import React, { useState } from 'react';
import { fetchData, finalDataObject } from './API';
import { QuestionCard } from './components/QuestionCard';
import './App.css';
import { shuffleArray } from './utils';

export type answerObject = {
  question: string,
  userAnswer: string,
  correctAnswer: string,
  isCorrect: boolean
}

const App: React.FC = () => {
  const TOTAL_QUESTIONS = 10;

  const [data, setData] = useState<finalDataObject[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<answerObject[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const handleStart = async () => {
    setGameOver(false);
    setLoading(true);
    const dataFromAPI = await fetchData();
    const shuffledData = shuffleArray(dataFromAPI);
    setData([...shuffledData]);
    setScore(0);
    setQuestionNumber(0);
    setUserAnswers([]);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const isCorrect = answer === data[questionNumber].capital;
      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      const answerOb = {
        question: data[questionNumber].question,
        userAnswer: answer,
        correctAnswer: data[questionNumber].capital,
        isCorrect
      };

      setUserAnswers((prev) => [...prev, answerOb]);
    }
  };

  const handleNext = () => {
    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-300">
      <h1 className="text-3xl font-bold mb-6">WELCOME TO THE CAPITALS QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleStart}
        >
          {!gameOver ? "New Game" : "Start"}
        </button>
      ) : null}
      <br />
      {loading && <h3>Loading.....</h3>}
      {!loading && !gameOver && <h3 className="mb-4 text-xl font-bold">Score: {score}</h3>}
      {!gameOver && !loading && (
        <QuestionCard
          questionNumber={questionNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
          callback={checkAnswer}
          question={data[questionNumber].question}
          cities={data[questionNumber].cities}
          userAnswer={userAnswers[questionNumber]}
        />
      )}
      {!gameOver && !loading && userAnswers.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTIONS - 1 && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4"
          onClick={handleNext}
        >
          Next Question
        </button>
      )}
    </div>
  );
}

export default App;
