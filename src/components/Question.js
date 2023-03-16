import React from "react"
import { nanoid } from 'nanoid'

export default function Question(props) {
  const answers=props.q.answers

  const answersElement = answers.map(answer =>{
    let id= null
    if(props.q.checked){        //for giving an id to each button when user clicks check answers, this to display the answers acc to color schemes.
        if(props.q.correct===answer){ id= "correct"}
        else if(props.q.selected===answer){ id= "incorrect"}
        else { id= "not-selected"}
    }
    return (
            <button 
                onClick= { () => props.selectedAnswer(props.id, answer)}
                key={nanoid()} id={id}
                className={answer === props.q.selected ? 'answer selected' : 'answer'} 
                >
                {atob(answer)} 
            </button>
    )
  })

  // We used Base64 encoding while generating API URL, so we are using "atob" for decoading purpose

    return(
        <div className="question-block">
        <div className="question">{atob(props.q.question)}</div>
        <div>{answersElement}</div>
        <div className="line"></div>
        </div>
    )
}
