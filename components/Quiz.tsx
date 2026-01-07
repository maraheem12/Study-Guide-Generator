'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface Question {
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
}

interface QuizProps {
    questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionClick = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        if (index === currentQuestion.correct_answer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
    };

    if (!questions || questions.length === 0) {
        return <div className="p-4 text-center text-gray-500">No quiz questions available.</div>;
    }

    if (showResults) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                <p className="text-xl mb-4">
                    You scored <span className="font-bold text-indigo-600">{score}</span> out of{' '}
                    <span className="font-bold text-gray-600">{questions.length}</span>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-6 max-w-md mx-auto">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(score / questions.length) * 100}%` }}></div>
                </div>

                <button
                    onClick={resetQuiz}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mx-auto transition-colors"
                >
                    <RefreshCw size={20} /> Retry Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </h3>
                <span className="text-sm font-medium text-indigo-500">
                    Score: {score}
                </span>
            </div>

            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                {currentQuestion.question}
            </h2>

            <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                    let optionStyle = "border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700";
                    if (isAnswered) {
                        if (index === currentQuestion.correct_answer) {
                            optionStyle = "border-2 border-green-500 bg-green-50 dark:bg-green-900/20";
                        } else if (index === selectedOption) {
                            optionStyle = "border-2 border-red-500 bg-red-50 dark:bg-red-900/20";
                        }
                    } else if (selectedOption === index) {
                        optionStyle = "border-2 border-indigo-500 bg-indigo-50";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(index)}
                            disabled={isAnswered}
                            className={`w-full text-left p-4 rounded-lg transition-all ${optionStyle} ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                            <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {isAnswered && index === currentQuestion.correct_answer && (
                                    <CheckCircle className="text-green-500" size={20} />
                                )}
                                {isAnswered && index === selectedOption && index !== currentQuestion.correct_answer && (
                                    <XCircle className="text-red-500" size={20} />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {isAnswered && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg">
                    <p className="font-semibold text-sm uppercase tracking-wide mb-1">Explanation</p>
                    <p>{currentQuestion.explanation}</p>
                </div>
            )}

            <div className="flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${!isAnswered
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                </button>
            </div>
        </div>
    );
};

export default Quiz;
