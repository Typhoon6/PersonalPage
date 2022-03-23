import React from 'react';
import { useSudokuContext } from '../context/SudokuContext';

// Difficult Drop Down [Easy, Medium, Hard]
export function Difficulty (props) {
  let { difficulty } = useSudokuContext();

  return (
    <div id="status_section">
      <label htmlFor="difficulty_options" id="difficulty_header">Difficulty:&nbsp;&nbsp;</label>
      <select name="difficulty_options" id="difficulty_options" defaultValue={difficulty} onChange={props.onChange}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  )
}
