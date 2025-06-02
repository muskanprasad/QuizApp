import React, { useState, useEffect, useRef } from 'react';
import questions from './data/questions';
import Result from './components/Result';
import './App.css';

const QUIZ_DURATION_SECONDS = 120;

function App() {
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const timerRef = useRef(null);

    useEffect(() => {
        if (!showScore) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        handleSubmitQuiz();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [showScore]);

    const handleAnswerSelection = (questionIndex, answerText, isCorrect) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: { answerText, isCorrect }
        }));
    };

    const handleSubmitQuiz = () => {
        let finalScore = 0;
        questions.forEach((question, index) => {
            const selected = selectedAnswers[index];
            if (selected && selected.isCorrect) {
                finalScore += 1;
            }
        });
        setScore(finalScore);
        setShowScore(true);
        clearInterval(timerRef.current);
    };

    const handleRestartQuiz = () => {
        setScore(0);
        setShowScore(false);
        setTimeLeft(QUIZ_DURATION_SECONDS);
        setSelectedAnswers({});
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="quiz-page-container">
            <h1 className="page-title">Quiz Master</h1>

            <div className='app'>
                {!showScore && (
                    <div className={`timer-section ${timeLeft <= 20 ? 'warning' : ''}`}>
                        Time Left: {formatTime(timeLeft)}
                    </div>
                )}
                
                {showScore ? (
                    <Result
                        score={score}
                        totalQuestions={questions.length}
                        handleRestartQuiz={handleRestartQuiz}
                        questions={questions} // Pass questions array
                        selectedAnswers={selectedAnswers} // Pass selected answers
                    />
                ) : (
                    <div className="quiz-form-container">
                        {questions.map((question, qIndex) => (
                            <div className="question-card" key={qIndex}>
                                <div className="question-number">Question {qIndex + 1}</div>
                                <div className="question-text">{question.questionText}</div>
                                <div className="answer-options">
                                    {question.answerOptions.map((option, oIndex) => (
                                        <label key={oIndex} className="answer-option-label">
                                            <input
                                                type="radio"
                                                name={`question-${qIndex}`}
                                                value={option.answerText}
                                                checked={selectedAnswers[qIndex]?.answerText === option.answerText}
                                                onChange={() => handleAnswerSelection(qIndex, option.answerText, option.isCorrect)}
                                            />
                                            <span className="radio-custom"></span>
                                            {option.answerText}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button className="submit-quiz-button" onClick={handleSubmitQuiz} disabled={timeLeft === 0}>
                            Submit Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;