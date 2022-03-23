import React, { useState } from 'react';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { Link } from "react-router-dom";

import Page1 from './page1'; 
import Page2 from './page2';
import Page3 from './page3';

import "../style/projectselector.css";
import "../style/pageselector_options.css";

function PageSelector() {

  const change_page = (id) => {
	document.getElementById("PAGESELECTOR").style.display = "none";
	document.getElementById("HOMEPAGE").style.display = "none";
	document.getElementById("CELLMLPAGE").style.display = "none";
	document.getElementById("SUDOKUGAME").style.display = "none";
	document.getElementById("PKMDBPAGE").style.display = "none";
	document.getElementById(id).style.display = "block";
  }

  return (
	  <div id="PAGESELECTOR">
		  <div id="projects_header">
			<div>Personal Projects</div>
			<div className="bg"></div>
				<div className="star-field">
				<div className="layer"></div>
				<div className="layer"></div>
				<div className="layer"></div>
			</div>
		  </div>
		  <div id="container">
			{/* Changing to Single Page Application
			<a className="animated zoomInLeft box red" href="/pokemondb/">Pokémon Database</a>
			<a className="animated zoomInRight box blue" href="/sudoku/">Sudoku</a>
			<a className="animated zoomInLeft box green" href="/cellml/">CellML Editor</a>
			<a className="animated zoomInRight box gold" href="/home/">Home (WIP)</a>*/}

			<button className="animated zoomInLeft box red" onClick={() => change_page("PKMDBPAGE")}>Pokémon Database</button>
			<button className="animated zoomInRight box blue" onClick={() => change_page("SUDOKUGAME")}>Sudoku</button>
			<button className="animated zoomInLeft box green" onClick={() => change_page("CELLMLPAGE")}>CellML Editor</button>
			<button className="animated zoomInRight box gold" onClick={() => change_page("HOMEPAGE")}>Home (WIP)</button>
		</div>
	  </div>
	
  );
}

export default PageSelector;
