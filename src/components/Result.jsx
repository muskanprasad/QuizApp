import React from 'react';

function Result({ score, totalQuestions, handleRestartQuiz, questions, selectedAnswers }) {
    return (
        <div className='score-section'>
            <h2>You scored {score} out of {totalQuestions}</h2>
            <button onClick={handleRestartQuiz}>Restart Quiz</button>

            <div className="feedback-container">
                <h3>Review Your Answers:</h3>
                <ul className="feedback-list">
                    {questions.map((question, qIndex) => {
                        const userAnswer = selectedAnswers[qIndex];
                        const correctAnswer = question.answerOptions.find(option => option.isCorrect);
                        const isCorrectlyAnswered = userAnswer && userAnswer.isCorrect;

                        return (
                            <li key={qIndex} className={`feedback-item ${isCorrectlyAnswered ? 'correct-feedback' : 'wrong-feedback'}`}>
                                <p className="feedback-question">
                                    Q{qIndex + 1}: {question.questionText}
                                </p>
                                <p className="feedback-user-answer">
                                    Your Answer: {userAnswer ? userAnswer.answerText : 'Not answered'}
                                </p>
                                <p className="feedback-correct-answer">
                                    Correct Answer: {correctAnswer ? correctAnswer.answerText : 'N/A'}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Result;