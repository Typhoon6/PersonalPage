import React from 'react';
import { Link } from "react-router-dom";
// Header Conssistent with portfolio
export const Header = () => {
  return (
    <div id="sudoku_header">
      <div>
        Sudoku
         <Link to="/"><button className="home_button sudoku_home_btn" ></button></Link>
      </div>
    </div>
  )
}
