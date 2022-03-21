import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import Page1 from './pages/page1'; 
import Page2 from './pages/page2';
import Page3 from './pages/page3';
import HomePage from './pages/homepage';
import PageSelector from './pages/pageselector';
import PokemonPage from './pages/pokemon_test';
import CellMLPage from './pages/cellml_page';
import "./style/projectselector.css";

import { SudokuGame } from './pages/Sudoku/SudokuGame';

function App() {

  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="page1" element={<Page1 />} />
          <Route exact path="page2" element={<Page2 />} />
          <Route exact path="page3" element={<Page3 />} />
          <Route exact path="pageselector" element={<PageSelector/>}/>
          <Route exact path="pokemondb" element={<PokemonPage/>}/>
          <Route exact path="cellml" element={<CellMLPage/>}/>
          <Route exact path="sudoku" element={<SudokuGame/>}/>
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
