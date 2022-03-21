import React, { useState } from 'react';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { Link } from "react-router-dom";

import Page1 from './page1'; 
import Page2 from './page2';
import Page3 from './page3';

import "../style/projectselector.css";
import "../style/pageselector_options.css";

function PageSelector() {

  return (
	  <body>
		  <div id="projects_header">
			<div>Personal Projects</div>
			<div class="bg"></div>
				<div class="star-field">
				<div class="layer"></div>
				<div class="layer"></div>
				<div class="layer"></div>
			</div>
		  </div>
		  <div id="container">
			<a className="animated zoomInLeft box red" href="/pokemondb/">Pokémon Database</a>
			<a className="animated zoomInRight box blue" href="/sudoku/">Sudoku</a>
			<a className="animated zoomInLeft box green" href="/cellml/">CellML Editor</a>
			<a className="animated zoomInRight box black" href="/">Home</a>
		</div>
	  </body>
	
  );
}

export default PageSelector;
