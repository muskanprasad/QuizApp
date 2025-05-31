import React from 'react';

const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

function Question({ question, handleAnswerOptionClick }) {
    const shuffledAnswerOptions = React.useMemo(() => 
        shuffleArray(question.answerOptions), 
        [question.answerOptions]
    );

    return (
        <div className='question-section'>
            <div className='question-count'>
                <span>Question {question.index + 1}</span>/{question.totalQuestions}
            </div>
            <div className='question-text'>{question.questionText}</div>
            <div className='answer-section'>
                {shuffledAnswerOptions.map((answerOption) => (
                    <button
                        key={answerOption.answerText}
                        onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                    >
                        {answerOption.answerText}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Question;