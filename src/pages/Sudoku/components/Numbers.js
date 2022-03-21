import React from 'react';
import { useSudokuContext } from '../context/SudokuContext';

// The 9 numbers used in sudoku
export function Numbers({ onClickNumber }) {
  let  num  = useSudokuContext();

  // Click on the number
  function select_number (number) {
    onClickNumber(number.toString())
    let numbers = document.getElementsByClassName("number_option");
    for(let i=0; i< numbers.length; i++) {
      // Clear the colours for non selected
      numbers[i].style.backgroundColor='rgb(18, 24, 44)';
      numbers[i].style.color='rgb(178, 204, 229)';
      numbers[i].selected = false;
      // Change the selected colours to highlighted
      if (parseInt(number) === i+1) {
        numbers[i].style.backgroundColor='rgb(178, 204, 229)';
        numbers[i].style.color='rgb(18, 24, 44)';
        numbers[i].selected = true;
      }
    }
  }

  // Highlight on hovering other options
  function hover_option(number) {
    let numbers = document.getElementsByClassName("number_option");
    for(let i=0; i< numbers.length; i++) {
      if (!numbers[i].selected) {
        numbers[i].style.backgroundColor='rgb(18, 24, 44)';
        numbers[i].style.color='rgb(178, 204, 229)';
      }
      if (parseInt(number) === i+1 && !numbers[i].selected) {
        numbers[i].style.backgroundColor='rgba(178, 204, 229, 0.7)';
        numbers[i].style.color='rgba(18, 24, 44, 0.7)';
      }
    }
  }

  // Remove hover
  function hover_out_option() {
    let numbers = document.getElementsByClassName("number_option");
    for(let i=0; i< numbers.length; i++) {
      if (!numbers[i].selected) {
        numbers[i].style.backgroundColor='rgb(18, 24, 44)';
        numbers[i].style.color='rgb(178, 204, 229)';
      }
    }
  }

  return (
    <div id="number_section">
      {[1,2,3,4,5,6,7,8,9].map((number) => {
          if (num === number.toString()) {
            return (
              <div className="number_option" key={number} selected={false} 
                   onMouseOver={()=>hover_option(number)} onMouseOut={hover_out_option} 
                   onClick={()=>select_number(number)}> {number}</div>
            )
          } else {
            return (
              <div className="number_option" key={number} selected={false} 
                   onMouseOver={()=>hover_option(number)} onMouseOut={hover_out_option}
                   onClick={()=>select_number(number)}>{number}</div>
            )
          }
        })}
    </div>
  )
}
