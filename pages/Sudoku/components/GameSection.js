import React from 'react';
import { useSudokuContext } from '../context/SudokuContext';

// Sudoku Board
export function GameSection (props) {

  const rows = [0,1,2,3,4,5,6,7,8];
  let { numberSelected, gameArray, fastMode, cellSelected, initArray } = useSudokuContext();

  // Check all numbers on board to see if they match
  function check_cell_number(row, column) {
    if (fastMode) {
      if (numberSelected === gameArray[row * 9 + column]) return true;
      return false;
    } 
    else {
      if (cellSelected === row * 9 + column) return true;
      if (gameArray[cellSelected] === '0') return false;
      if (gameArray[cellSelected] === gameArray[row * 9 + column]) return true;
    }
  }

  // Highlight Cell
  function highlighted_cell(index, value, highlight) {
    if (value !== '0' && value !== '') {
      if (initArray[index] === '0' || initArray[index] === '') {
        if (highlight === 'highlight') {  
          return (<td className={`cell user_input_cell highlight_cell`} key={index} onClick={() => props.onClick(index)}>{value}</td>)
        } else {
          return (<td className={`cell user_input_cell selected_cell`} key={index} onClick={() => props.onClick(index)}>{value}</td>)
        }
        
      } else {
        if (highlight === 'highlight') { 
          return (<td className={`cell default_cell highlight_cell`} key={index} onClick={() => props.onClick(index)}>{value}</td>)
        } else {
          return (<td className={`cell default_cell selected_cell`} key={index} onClick={() => props.onClick(index)}>{value}</td>)
        }
        
      }
    } 
    else {
      if (highlight === 'highlight') {
        return (<td className={`cell highlight_cell`} key={index} onClick={() => props.onClick(index)}>{value}</td>)
      } else {
        return (<td className={`cell selected_cell`} key={index} onClick={() => props.onClick(index)}>{value}</td>)
      }
      
    }
  }

  // Default Cell: pre-generated cell
  function normal_cell(index, value) {
    if (value !== '0' && value !== '') {
      if (initArray[index] === '0' || initArray[index] === '') {
        return (<td className="cell user_input_cell" key={index} onClick={() => props.onClick(index)}>{value}</td>)
      } else {
        return (<td className="cell default_cell" key={index} onClick={() => props.onClick(index)}>{value}</td>)
      }
    } else {
      return (<td className="cell" key={index} onClick={() => props.onClick(index)}>{value}</td>)
    }
  }

  // Sudoku Board [9x9]
  return (
    <div className="sudoku_game">
      <table id="sudoku_board" >
        <tbody>{
          rows.map((row) => {
            return (
              <tr className="sudoku_row" key={row}>{
                  rows.map((column) => {
                    const index = (row * 9) + column;
                    const value = gameArray[index];

                    if (cellSelected === index) return highlighted_cell(index, value, 'highlight');
                      
                    if (fastMode) {
                      if (numberSelected !== '0' && check_cell_number(row, column)) {
                        return highlighted_cell(index, value, '');
                      } else {
                        return normal_cell(index, value);
                      }
                    } else {
                      if (cellSelected !== -1 && check_cell_number(row, column)) {
                        return highlighted_cell(index, value, '');
                      } else {
                        return normal_cell(index, value);
                      }
                    }
                  })
              }</tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
