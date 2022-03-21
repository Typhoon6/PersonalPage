import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { GameSection } from './components/GameSection';
import { StatusSection } from './components/StatusSection';
import { getUniqueSudoku } from './solver/UniqueSudoku';
import { useSudokuContext } from './context/SudokuContext';

import { getSudoku } from './solver/sudoku';

// The Sudoku Board + Gameplay
export function Game (){
  
  let { numberSelected, setNumberSelected,
        gameArray, setGameArray,
        initArray, setInitArray,
        cellSelected, setCellSelected,
        difficulty, setDifficulty,
        setTimeGameStarted,
        fastMode, setFastMode,
        setWon } = useSudokuContext();

  let [ mistakesMode, setMistakesMode ] = useState(false);
  let [ history, setHistory ] = useState([]);
  let [ solvedArray, setSolvedArray ] = useState([]);
  let [ overlay, setOverlay ] = useState(false);

  let [tempcell, setTempCell] = useState(-1)

  let nullArray = [ '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0',
                   '0', '0', '0', '0', '0', '0', '0', '0', '0' ];

  // New Game + Initialise Variables
  function createNewGame(e) {
    let [ temporaryInitArray, temporarySolvedArray ] = getUniqueSudoku(difficulty, e);
    setInitArray(temporaryInitArray);
    setGameArray(temporaryInitArray);
    setSolvedArray(temporarySolvedArray);
    setNumberSelected('0');
    setTimeGameStarted(moment());
    setCellSelected(-1);
    setHistory([]);
    setWon(false);
  }

  // Let the User enter a board of their choosing (no initial blocks)
  function user_input_board_mode() {
    setInitArray(nullArray);
    setSolvedArray(nullArray);
    setGameArray(nullArray);
  }

  // Solve their sudoku problem
  function user_input_solve() {
    let sudoku = getSudoku();
    const num_rows = document.getElementsByClassName("sudoku_row");
    let sudoku_string = '';
    let MIN_NUM = 17;
    let counter = 0;
    for (let i = 0; i < num_rows.length; i++) {
      const col = num_rows[i].getElementsByTagName("td");
      for (let j = 0; j < col.length; j++) {
        const num = col[j].innerText;
        if (num === "0") {
          sudoku_string += '.'
        } else {
          sudoku_string += num; 
          counter++;
        }
      }
    }
    if (counter < MIN_NUM) {
      alert('Need at least 17 Entries!')
    } else {
      setGameArray(sudoku.solve(sudoku_string));
    }
    
  }


  // Boolean to check if user has completed the Game
  function won_game(index, value) {
    if (gameArray.every((cell, cellIndex) => {
        if (cellIndex === index) {
          return value === solvedArray[cellIndex];
        } else {
          return cell === solvedArray[cellIndex];
        }
      })) {
      return true;
    }
    return false;
  }

  // Assign the cell (index) a value
  function cell_value(index, value) {
    if (initArray[index] === '0') {
      let tempArray = gameArray.slice();
      let tempHistory = history.slice();

      tempHistory.push(gameArray.slice());
      setHistory(tempHistory);

      tempArray[index] = value;
      setGameArray(tempArray);

      if (won_game(index, value)) {
        setOverlay(true);
        setWon(true);
      }
    }
  }

  // User sets the cell value with cell_value function
  function user_cell_value(index, value) {
    if (mistakesMode) {
      if (value === solvedArray[index]) {
        cell_value(index, value);
      }
    } else {
      cell_value(index, value);
    }
  }


  // ======================================================================
  // ======================== RIGHT SIDE FUNCTIONS ========================
  // ======================================================================

  // Clicking the Cell
  function onClickCell(indexOfArray) {
    if (fastMode && numberSelected !== '0') {
      user_cell_value(indexOfArray, numberSelected);
    }
    
    setCellSelected(indexOfArray);

    window.addEventListener('keypress', function (e) {user_type_number(e, indexOfArray)}, {once : true})
  }

  // Function to allow the user to manually type the numbers
  function user_type_number(event, index) {
    const value = event.key;
    if (is_valid_input_number(event.key)) {
      user_cell_value(index, value);
      setCellSelected(-1);
    }
  }

  // Change difficulty makes a new game with varying num tiles (less tiles = harder)
  function onChangeDifficulty(e) {
    setDifficulty(e.target.value);
    createNewGame(e);
  }

  // Selected number is the one the cell will change to
  function onClickNumber(number) {
    if (fastMode) {
      setNumberSelected(number)
    } 
    else if (cellSelected !== -1) {
      user_cell_value(cellSelected,number);
    }
  }

  // Goes back 1 move (using history)
  function undo_move() {
    if(history.length) {
      let hist = history.slice();
      let arr = hist.pop();
      setHistory(hist);
      if (arr !== undefined)
        setGameArray(arr);
    }
  }

  // Clear cell: only a typed in cell can be erased
  function clear_cell() {
    if(cellSelected !== -1 && gameArray[cellSelected] !== '0') {
      cell_value(cellSelected, '0');
    }
  }

  // Hint: the selected cell will just fill the cell to be the correct number
  function cell_hint() {
    if (cellSelected !== -1) {
      cell_value(cellSelected, solvedArray[cellSelected]);
    }
  }

  // Change mistake mode: mode that takes in only correct numbers (won't let human enter a wrong number)
  function change_mistakes_mode() {
    setMistakesMode(!mistakesMode);
  }

  // Annoying bug makes it so changing mode won't update instantly, requires reclick
  function clear_number_section() {
    const numsec = document.getElementById("number_section");
    const list_op = numsec.getElementsByClassName("number_option");
    for(let i =0; i < list_op.length; i++) {
      list_op[i].style.backgroundColor = "rgb(18, 24, 44)";
      list_op[i].style.color = "rgb(178, 204, 229)";
    }
  }
  // Fast mode: click on tile will change it to be last selected number
  function change_fast_mode() {
    clear_number_section();
    if (fastMode) {
      setNumberSelected('0');
    }
    setCellSelected(-1);
    setFastMode(!fastMode);
  }

  // ======================================================================
  // =========================== GAME MODALS: =============================
  // ======================================================================
  // New game starts
  function start_new_game() {
    createNewGame();
    close_new_game_modal();
  }
  // Won game opens a modal, clicking it will remove
  function onClickOverlay() {
    setOverlay(false);
    createNewGame();
  }
  // Modal Pop Up for starting a new game
  function close_new_game_modal() {
    document.getElementById("new_game_modal").style.visibility = "hidden";
  }
  function open_new_game_modal() {
    document.getElementById("new_game_modal").style.visibility = "visible";
  }
  
  // Complete Sudoku Board
  function complete_board() {
    let tempHistory = history.slice();
    tempHistory.push(gameArray.slice());
    setHistory(tempHistory);
    setGameArray(solvedArray);
  }
  
  // Change the mode between sudoku game and solver modes
  function change_sudoku_mode() {
    const mode = document.getElementById("sudoku_mode_options").value;
    console.log(mode);
    if (mode === "sudoku_solver_option") {
      start_new_game();
      user_input_board_mode();
      document.getElementById("sudoku_game_op_btns").style.display = "none";
      document.getElementById("sudoku_solver_op_btns").style.display = "block";
    } else {
      start_new_game();
      document.getElementById("sudoku_game_op_btns").style.display = "block";
      document.getElementById("sudoku_solver_op_btns").style.display = "none";
    }
  }

  function is_valid_input_number(key) {
    if (key === '1' || key === '2' || key === '3' || key === '4' || key === '5' || 
        key === '6' || key === '7' || key === '8' || key === '9' || key === '0') {
        return true;
      } else {
        return false;
      }
  }
  // Start a New Game
  useEffect(() => {
    
    // Have so if you click off the board then it removes selection
    window.addEventListener('click', function(e){   
      if(e.target !== document.getElementsByClassName('sudoku_game')[0] &&
        !e.target.className.includes("cell")) {
        setCellSelected(-1);
      } 
    });
    createNewGame();
  }, []);
  

  return (
    <div>
      <select id="sudoku_mode_options" name="sudoku_mode_options" defaultValue="Sudoku Game" onChange={change_sudoku_mode}>
        <option value="sudoku_game_option">Sudoku Game</option>
        <option value="sudoku_solver_option">Sudoku Solver</option>
      </select>

      <div className={overlay?"container blur":"container "}  >
        <div className="innercontainer center_div">
          <GameSection
            onClick={(indexOfArray) => onClickCell(indexOfArray)}
          />
          <StatusSection
            onClickNumber={(number) => onClickNumber(number)}
            onChange={(e) => onChangeDifficulty(e)}
            undo_move={undo_move}
            clear_cell={clear_cell}
            cell_hint={cell_hint}
            change_mistakes_mode={change_mistakes_mode}
            change_fast_mode={change_fast_mode}
          />
        </div>
      </div>
      
      <span id="sudoku_game_op_btns">
        <button className='new_game_btn' onClick={open_new_game_modal}>New Game</button>
        <button className='new_game_btn' onClick={complete_board}>Complete</button>
      </span>
      <span id="sudoku_solver_op_btns">
        <button className='new_game_btn' onClick={user_input_board_mode}>Start Over</button>
        <button className='new_game_btn' onClick={user_input_solve}>Solve</button>
      </span>
      
      <div className="new_game_modal" id="new_game_modal">
        <div className="ngm_container">
          <div className='nbm_text'>Do you wish to start a new game?</div>
          <button className='ngb' onClick={start_new_game}>Yes</button>
          <button className='ngb' onClick={close_new_game_modal}>No</button>
          <button className="ngm_close" onClick={close_new_game_modal}>X</button>
        </div>
      </div>

      <div className= { overlay ? "overlay o_block" : "overlay" } onClick={onClickOverlay} >
        <h2 className="gameover_text">
          <span className="gameover_col_2">You </span>
          <span className="gameover_col_1">Solved </span> 
          <span className="gameover_col_2">IT! </span>
        </h2>
      </div>
</div>
  );
}
