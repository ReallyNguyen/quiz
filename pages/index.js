import { useState } from 'react'
import quizData from '/data/quizData.json'
import styles from '@/styles/Home.module.css' 

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0])
  const [poor, setPoor] = useState(false)
  const [good, setGood] = useState(false)
  const [great, setGreat] = useState(false)

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
    setPoor(false)
    setGood(false)
    setGreat(false)
  }

  const handleSubmit = () => {
    const totalPoints = points.reduce((sum, point) => sum + point, 0);
    const summary = quizData.map((question, index) => {
      const optionIndex = question.options.findIndex(option => option.point === points[index]);
      return `${question.question}: ${question.options[optionIndex].option}`;
    });
  
    if (totalPoints === 6) {
      setGreat(true);
    } else if (totalPoints >= 3 && totalPoints <= 5) {
      setGood(true);
    } else if (totalPoints >= 0 && totalPoints <= 2) {
      setPoor(true);
    }
  };
  
  if (great) {
    const totalPoints = points.reduce((sum, point) => sum + point, 0);
    const summary = quizData.map((question, index) => {
      const optionIndex = question.options.findIndex(option => option.point === points[index])
      return `${question.options[optionIndex].option}`
    })
  
    return (
      <div className={styles.result_container_great}>
        <div className={styles.great_background}>
          <div className={styles.header}>
            {/* <NavBar page="quiz" />  */}
          </div>
          <div>
            <Image src="/results/great/great.svg" width={369} height={320} />
          </div>
        </div>
        <div className={styles.group}>
          <Image src="/results/great/three star.svg" width={143} height={36} />
          <h1>stellarknight</h1>
          <h3>Great Progress</h3>
          <p className={styles.desc}>
            Congratulations! Based on your quiz results, you have been identified and placed on team StellarKnight. It looks like you are successfully making a positive change on the planet! Keep it up and inspire others to also make an impact on the planet.
          </p>
        </div>
        <div className={styles.main_results}>
          <h1 className={styles.answer}>Your Answer</h1>
          
  
          <div className={styles.quest_great}>
            <h1 className={styles.quest}>Your Quest</h1>
            <div className={styles.improve_great}>
              <h2>How to improve</h2>



              {summary}



            </div>
          </div>
  
          <div className={styles.result_buttons_great}>
            <button onClick={handleIntro}>Redo the journey?</button>
            <button onClick={handleHome}>Go back to home</button>
          </div>
        </div>
      </div>
    );
  }
  


  if (good) {
    const totalPoints = points.reduce((sum, point) => sum + point, 0);
    const summary = quizData.map((question, index) => {
      const optionIndex = question.options.findIndex(option => option.point === points[index]);
      return `${question.options[optionIndex].option}`;
    });

    return (
      <div>
        <p>{summary.join('\n')}</p>
        <p>Score: {totalPoints} out of 60.</p>
        <button onClick={handleReset}>Restart Quiz</button>
      </div>
    );
  }

  if (poor) {
    const totalPoints = points.reduce((sum, point) => sum + point, 0);
    const summary = quizData.map((question, index) => {
      const optionIndex = question.options.findIndex(option => option.point === points[index]);
      return `${question.question}: ${question.options[optionIndex].option}`;
    });

    return (
      <div>
        <p>{summary.join('\n')}</p>
        <p>Score: {totalPoints} out of 6.</p>
        <button onClick={handleReset}>Restart Quiz</button>
      </div>
    );
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
