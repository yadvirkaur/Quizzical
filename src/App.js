import React from "react"
import Question from "./components/Question"
import {nanoid} from "nanoid"

export default function App() {
    const [questions, setQuestions] = React.useState([])
    const [score, setScore] = React.useState(0);
    const [start, setStart] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [count, setCount] = React.useState(0);
   
    React.useEffect(() => {
      async function getQuestions() {
          const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy")
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
  }, [count]) //count's value will change when user will choose to play again, hence new set of questions will be fetched.
  

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
        <img src="./blobBlue.svg"></img>
      </div>
      <div className="tk-blob lime-blob">
        <img src="./limeBlob.svg"></img>
      </div>
     </div>

    :
     <div className="startpage">
      <div className="start-block">
        <div className="quizzical">Quizzical</div>
        <button className="start-quiz-btn" onClick={startQuiz}>Start Quiz</button>
      </div>

      <div className="tk-blob blue-blob">
        <img src="./blobBlue.svg"></img>
      </div>
      <div className="tk-blob lime-blob">
        <img src="./limeBlob.svg"></img>
      </div>
     </div>    
  }
  </main>
)
}
