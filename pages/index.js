import React, { useState } from 'react'
import quizData from '@/data/quiz.json'

export default function Quiz() {
  // state to keep track of the user's score and the current question index
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // function to add or subtract points based on user selection
  const handleSelection = (questionID, optionPoint) => {
    const previousSelection = localStorage.getItem(`question${questionID}`)
    if (!previousSelection) {
      setScore(score + optionPoint)
      // store the user's selection in local storage for later use
      localStorage.setItem(`question${questionID}`, optionPoint)
    } else if (previousSelection != optionPoint) {
      setScore(score - previousSelection + optionPoint)
      localStorage.setItem(`question${questionID}`, optionPoint)
    }
  }

  // function to go back and subtract points if the user navigates back to a previous question
  const handleBack = (questionID) => {
    const previousSelection = localStorage.getItem(`question${questionID}`);
    if (previousSelection) {
      const currentOption = quizData[currentQuestionIndex].options.find(
        (option) => option.point === parseInt(previousSelection)
      );
      setScore(score - parseInt(previousSelection));
    }
    // update the current question index to go back to the previous question
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };




  // function to go to the next question and reset the score for that question
  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    localStorage.removeItem(`question${quizData[currentQuestionIndex].questionID}`)
  }

  // function to show the results of the quiz
  const showResults = () => {
    const result = quizData.reduce((acc, question) => {
      const selectedOption = localStorage.getItem(`question${question.questionID}`)
      if (selectedOption) {
        acc.score += question.options[selectedOption - 1].point
      }
      return acc
    }, { score: 0, responses: [] })

    let resultMessage = ''
    if (result.score <= 5) {
      resultMessage = 'You need to work harder!'
    } else if (result.score <= 10) {
      resultMessage = 'Not bad, but you can do better!'
    } else {
      resultMessage = 'Great job!'
    }

    return (
      <div>
        <h1>Quiz Results</h1>
        <p>Your final score is {score}.</p>
        <p>{resultMessage}</p>
        {quizData.map((question, index) => {
          const selectedOption = localStorage.getItem(`question${question.questionID}`)
          result.responses.push({ question: question.question, selectedOption: selectedOption ? question.options[selectedOption - 1].option : 'No answer given.' })
          return (
            <div key={question.questionID}>
              <h3>{question.question}</h3>
              <p>{selectedOption ? `Your answer: ${question.options[selectedOption - 1].option}` : 'No answer given.'}</p>
            </div>
          )
        })}
        <button
          onClick={() => {
            setCurrentQuestionIndex(0)
            setScore(0)
            localStorage.clear()
          }}
        >
          Retake Quiz
        </button>
      </div>
    )
  }

  return (
    <div>
      {currentQuestionIndex === quizData.length ? (
        showResults()
      ) : (
        <div>
          <h1>Quiz</h1>
          <h2>{quizData[currentQuestionIndex].question}</h2>
          {quizData[currentQuestionIndex].options.map((option, index) => (
            <div key={option.option}>
              <button
                onClick={() => {
                  if (localStorage.getItem(`question${quizData[currentQuestionIndex].questionID}`) !== option.point) {
                    handleSelection(
                      quizData[currentQuestionIndex].questionID,
                      option.point
                    );
                  }
                }}
              >
                {option.option}
              </button>
            </div>
          ))}

          {currentQuestionIndex > 0 && (
            <button onClick={() => handleBack(quizData[currentQuestionIndex].questionID)}>Back</button>
          )}
          {currentQuestionIndex === quizData.length - 1 ? (
            <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Submit</button>
          ) : (
            <button onClick={handleNext}>Next</button>
          )}
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  )

}
