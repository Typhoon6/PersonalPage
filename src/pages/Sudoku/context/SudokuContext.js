import React, { createContext, useContext, useState } from 'react';
import moment from 'moment';

// Set the Default Values of the Sudoku Game
const SudokuContext = createContext({
  numberSelected: ' ', setNumberSelected: () => {},
  gameArray: [], setGameArray: () => {},
  cellSelected: -1, setCellSelected: () => {},
  initArray: [], setInitArray: () => {},
  difficulty: 'Easy', setDifficulty: () => {},
  timeGameStarted: moment(), setTimeGameStarted: () => {},
  won: false, setWon: () => {}, 
  fastMode: false, setFastMode: () => {},
});


export function SudokuProvider ({ children }) {
  let [ numberSelected, setNumberSelected ] = useState(' ');
  let [ gameArray, setGameArray ] = useState([]);
  let [ cellSelected, setCellSelected ] = useState(-1);
  let [ initArray, setInitArray ] = useState([]);

  let [ difficulty,setDifficulty ] = useState('Easy');
  let [ timeGameStarted, setTimeGameStarted ] = useState(moment());
  
  let [ won, setWon ] = useState(false);
  let [ fastMode, setFastMode ] = useState(false);

  return (
    <SudokuContext.Provider value={
      {
        numberSelected, setNumberSelected,
        gameArray, setGameArray,
        initArray, setInitArray,
        cellSelected, setCellSelected,
        
        difficulty, setDifficulty,
        timeGameStarted, setTimeGameStarted,
      
        won, setWon,
        fastMode, setFastMode
      }
    }>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudokuContext = () => useContext(SudokuContext);