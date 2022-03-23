import React from 'react';
import { Link } from "react-router-dom";
// Header Conssistent with portfolio
export const Header = () => {

  const change_page = () => {
    document.getElementById("SUDOKUGAME").style.display = "none";
    document.getElementById("PAGESELECTOR").style.display = "block";
  }

  return (
    <div id="sudoku_header">
      <div>
        Sudoku
        {/*<Link to="/"><button className="home_button sudoku_home_btn" ></button></Link>*/}
        <button className="home_button sudoku_home_btn" onClick={change_page}></button>
      </div>
    </div>
  )
}
