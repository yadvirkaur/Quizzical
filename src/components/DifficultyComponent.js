import React from 'react'
import PropTypes from 'prop-types'

export default function DifficultyComponent({ value, onChange }) {
  return (
    <div className="option-wrapper">
      <label htmlFor="Difficulty">
        Choose quiz difficulty
        <select
          id="Difficulty"
          value={value}
          onChange={onChange}
          name="Difficulty"
          className="Difficulty options"
        >
          <option value="">Any Difficulty</option>
          <option value="difficulty=easy">Easy</option>
          <option value="difficulty=medium">Medium</option>
          <option value="difficulty=hard">Hard</option>
        </select>
      </label>
    </div>
  )
}

DifficultyComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
