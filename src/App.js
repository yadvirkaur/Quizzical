import React from 'react'
import { nanoid } from 'nanoid'
import Question from './components/Question'
import CategoryComponent from './components/CategoryComponent'
import DifficultyComponent from './components/DifficultyComponent'
import blueBlob from './images/blueBlob.svg'
import limeBlob from './images/limeBlob.svg'

export default function App() {
  const [questions, setQuestions] = React.useState([])
  const [score, setScore] = React.useState(0)
  const [start, setStart] = React.useState(false)
  const [checked, setChecked] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [quizCategory, setQuizCategory] = React.useState('')
  const [quizDifficulty, setQuizDifficulty] = React.useState('')

  React.useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=5&encode=base64&${quizCategory}&${quizDifficulty}`
      )
      const data = await res.json()

      const q = []
      data.results.forEach((i) => {
        q.push({
          id: nanoid(),
          question: i.question,
          correct: i.correct_answer,
          answers: [...i.incorrect_answers, i.correct_answer].sort(
            () => Math.random() - 0.5
          ),
          selected: null,
          checked: false
        })
      })
      setQuestions(q)
    }
    getQuestions()
  }, [count, quizCategory, quizDifficulty]) // count's value will change when user will choose to play again, hence new set of questions will be fetched.

  // alert(`https://opentdb.com/api.php?amount=5&encode=base64&${quizCategory}&${quizDifficulty}`)

  function selectedAnswer(id, answer) {
    setQuestions((Questions) =>
      Questions.map((question) => {
        return question.id === id ? { ...question, selected: answer } : question
      })
    )
  }

  function calculateScore() {
    let correctCount = 0
    questions.forEach((question) => {
      if (question.selected === question.correct) {
        correctCount += 1
      }
    })
    setScore(correctCount)

    setQuestions((Questions) =>
      Questions.map((question) => {
        return { ...question, checked: true } // for updating the checked property of questions when user clicks the check answers btn
      })
    )
    setChecked(true)
  }

  function playAgain() {
    setChecked(false)
    setCount(count + 1)
  }

  const questionElements = questions.map((question) => (
    <Question
      id={question.id}
      key={question.id}
      q={question}
      selectedAnswer={(id, answer) => selectedAnswer(id, answer)}
    />
  ))

  function startQuiz() {
    setStart(!start) // for deciding which page to display: start/game page
  }

  function changeCategory(e) {
    setQuizCategory(e.target.value)
  }

  function handleDifficultyChange(e) {
    setQuizDifficulty(e.target.value)
  }

  return (
    <main>
      {start ? (
        <div className="gamepage">
          <div className="game-block"> {questionElements}</div>
          <div className="score-block">
            {checked && (
              <span className="score">
                You scored {score} /5 correct answers
              </span>
            )}
            <button
              type="button"
              className="check"
              onClick={checked ? playAgain : calculateScore}
            >
              {' '}
              {checked ? 'Play Again' : 'Check Answers'}{' '}
            </button>
          </div>
        </div>
      ) : (
        <div className="startpage">
          <div className="start-block">
            <div className="quizzical">Quizzical</div>
            <div className="quiz-options-container">
              <CategoryComponent
                value={quizCategory}
                onChange={(e) => changeCategory(e)}
              />
              <DifficultyComponent
                value={quizDifficulty}
                onChange={(e) => handleDifficultyChange(e)}
              />
            </div>
            <button
              type="button"
              className="start-quiz-btn"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}
      <div className="tk-blob blue-blob">
        <img src={blueBlob} alt="blob" />
      </div>
      <div className="tk-blob lime-blob">
        <img src={limeBlob} alt="blob" />
      </div>
    </main>
  )
}
