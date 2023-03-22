import React from "react"
import Question from "./components/Question"
import CategoryComponent from "./components/CategoryComponent"
import DifficultyComponent from "./components/DifficultyComponent"
import {nanoid} from "nanoid"
import blueBlob from "./images/blueBlob.svg"
import limeBlob from "./images/limeBlob.svg"

export default function App() {
    const [questions, setQuestions] = React.useState([])
    const [score, setScore] = React.useState(0);
    const [start, setStart] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [quizCategory, setQuizCategory] =React.useState('');
    const [quizDifficulty, setQuizDifficulty] =React.useState('');
   
    React.useEffect(() => {
      async function getQuestions() {
          const res = await fetch(`https://opentdb.com/api.php?amount=5&encode=base64&${quizCategory}`)
          const data = await res.json()
          
          const q= []
          data.results.forEach((i)=> {
            q.push({
              id: nanoid(),
              question: i.question,
              correct: i.correct_answer,
              answers: ([...i.incorrect_answers, i.correct_answer]),
              selected: null,
              checked:false
            })
          })
          setQuestions(q)
      }
      getQuestions()
  }, [count,quizCategory]) //count's value will change when user will choose to play again, hence new set of questions will be fetched.
  

function selectedAnswer(id,answer){
 setQuestions(Questions => Questions.map(question => {
  return (question.id === id) ?
     {...question, selected: answer } : question
 }))
}

function calculateScore(){
  let count=0
  questions.forEach(question => {
    if(question.selected === question.correct){
      count +=1
      }
  })
  setScore(count)
  
  setQuestions(Questions => Questions.map(question => {
    return {...question, checked: true} // for updating the checked property of questions when user clicks the check answers btn
  }))
  setChecked(true)
} 

function playAgain(){
  setChecked(false)
  setCount(count+1)
}

const questionElements = questions.map(question => (
  <Question 
      id={question.id} 
      key={question.id}
      q={question} 
      selectedAnswer={selectedAnswer} 
  />
))

function startQuiz(){
  setStart(!start)  //for deciding which page to display: start/game page
}

function changeCategory(e) {
  setQuizCategory( e.target.value);
}

function handleDifficultyChange(e){
 setQuizDifficulty(e.target.value)
}


return (
  <main>
    {
    start ?
     <div className="gamepage">
      <div className="game-block"> {questionElements}</div>
      <div className="score-block">
        {checked && <span className="score" >You scored {score} /5 correct answers</span>}
        <button className="check" onClick={checked? playAgain :calculateScore}> {checked ? "Play Again" : "Check Answers" } </button>
      </div>

      <div class="tk-blob blue-blob">
       <img src={blueBlob} />
      </div>
      <div className="tk-blob lime-blob">
        <img src={limeBlob} />
      </div>
     </div>

    :
     <div className="startpage">
      <div className="start-block">
        <div className="quizzical">Quizzical</div>
        <div className='quiz-options-container'>
          <CategoryComponent value={quizCategory} onChange={changeCategory} />
          <DifficultyComponent value={quizDifficulty} onChange={handleDifficultyChange} />
        </div>

        <button className="start-quiz-btn" onClick={startQuiz}>Start Quiz</button>
      </div>

      <div className="tk-blob blue-blob">
        <img src={blueBlob} />
      </div>
      <div className="tk-blob lime-blob">
        <img src={limeBlob} />
      </div>
     </div>    
  }
  </main>
)
}