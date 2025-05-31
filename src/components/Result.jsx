import React from 'react';

function Result({ score, totalQuestions, handleRestartQuiz }) {
    return (
        <div className='score-section'>
            You scored {score} out of {totalQuestions}
            <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
    );
}

export default Result;