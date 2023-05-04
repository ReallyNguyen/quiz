import { useState } from 'react'
import quizData from '/data/quizData.json'

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0])

  const handleOptionSelect = (optionIndex) => {
    const updatedPoints = [...points]
    updatedPoints[questionIndex] = quizData[questionIndex].options[optionIndex].point
    setPoints(updatedPoints)
  }

  const handleNextClick = () => {
    if (questionIndex < quizData.length - 1) {
      setQuestionIndex(questionIndex + 1)
    }
  }

  const handleBackClick = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1)
    }
  }

  const handleReset = () => {
    setQuestionIndex(0)
    setPoints([0, 0, 0, 0])
  }

  const handleSubmit = () => {
    const totalPoints = points.reduce((sum, point) => sum + point, 0)
    const summary = quizData.map((question, index) => {
      const optionIndex = question.options.findIndex(option => option.point === points[index])
      return `${question.question}: ${question.options[optionIndex].option}`
    })
    const result = `Score: ${totalPoints} out of 6.`
    alert(`${summary.join('\n')}\n\n${result}`)
    handleReset()
  }

  const { question, options, img } = quizData[questionIndex]
  const isLastQuestion = questionIndex === quizData.length - 1

  return (
    <div>
      <img src={Array.isArray(img) ? img[0] : img} alt={question} />
      <h2>{question}</h2>
      <ul>
      {options.map((option, index) => (
        <li key={index} onClick={() => handleOptionSelect(index)}>
          <button type="button">
            {option.option} {option.outcome}
          </button>
        </li>
      ))}
      </ul>
      <div>
        {questionIndex > 0 && <button onClick={handleBackClick}>Back</button>}
        {isLastQuestion ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button onClick={handleNextClick}>Next</button>
        )}
      </div>
    </div>
  )
}
