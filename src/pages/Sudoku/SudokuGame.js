import React from 'react';

import { Game } from './Game';
import { SudokuProvider } from './context/SudokuContext';

import './Sudoku.css';
import { Header } from './components/Header';

export function SudokuGame() {
  return (
    <div id="SUDOKUGAME" className='sudoku_wrapper'>
      <Header/>
      <SudokuProvider>
        <Game />
      </SudokuProvider>
      {/* Background Lights that go up */}
      <div className='light x1'></div>
      <div className='light x2'></div>
      <div className='light x3'></div>
      <div className='light x4'></div>
      <div className='light x5'></div>
      <div className='light x6'></div>
      <div className='light x7'></div>
      <div className='light x8'></div>
      <div className='light x9'></div>
    </div>
  );
}