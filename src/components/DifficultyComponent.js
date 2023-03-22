import React from "react"

export default function DifficultyComponent(props) {
    return (
        <div className='option-wrapper'>
            <label htmlFor="Difficulty">Choose quiz difficulty</label>
            <select 
                id="Difficulty" 
                value={props.value}
                onChange={props.onChange}
                name="Difficulty"
                className="Difficulty options"
            >
                 <option value=''>Any Difficulty</option>
                <option value='difficulty=easy'>Easy</option>
                <option value='difficulty=medium'>Medium</option>
                <option value='difficulty=hard'>Hard</option>
            </select>
        </div>
    );
}


