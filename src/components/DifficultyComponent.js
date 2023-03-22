import React from "react"

export default function DifficultyComponent(props) {
    return (
        <div className='option-wrapper'>
            <label htmlFor="Difficulty">Choose quiz difficulty</label>
            <select 
                id="Difficulty" 
                value={props.quizDifficulty}
                onChange={props.handleDifficultyChange}
                name="Difficulty"
                className="Difficulty options"
            >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
        </div>
    );
}


