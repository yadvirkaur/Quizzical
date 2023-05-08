import React from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

export default function Question({ q, selectedAnswer, id }) {
  const answersElement = q.answers.map((answer) => {
    let answerid = null
    if (q.checked) {
      // for giving an id to each button when user clicks check answers, this to display the answers acc to color schemes.
      if (q.correct === answer) {
        answerid = 'correct'
      } else if (q.selected === answer) {
        answerid = 'incorrect'
      } else {
        answerid = 'not-selected'
      }
    }
    return (
      <button
        type="button"
        onClick={() => selectedAnswer(id, answer)}
        key={nanoid()}
        id={answerid}
        className={answer === q.selected ? 'answer selected' : 'answer'}
      >
        {atob(answer)}
      </button>
    )
  })

  // We used Base64 encoding while generating API URL, so we are using "atob" for decoading purpose

  return (
    <div className="question-block">
      <div className="question">{atob(q.question)}</div>
      <div>{answersElement}</div>
      <div className="line" />
    </div>
  )
}

Question.propTypes = {
  q: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    correct: PropTypes.string.isRequired,
    selected: PropTypes.string,
    checked: PropTypes.bool.isRequired
  }).isRequired,
  selectedAnswer: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}
