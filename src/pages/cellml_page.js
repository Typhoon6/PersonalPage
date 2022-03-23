import React, { useState } from 'react';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactFullpage from '@fullpage/react-fullpage';

import "../style/cellml.css";


function CellMLPage () {

  const SEL = 'custom-section';
  const SECTION_SEL = `.${SEL}`;


  const
  originalColors = ['rgb(230,230,230)', '#0798ec', '#fc6c7c', '#435b71', 'orange', 'blue', 'purple', 'yellow'],
  originalPages = [{ title: "CellML Editor", text: "Development of a CellML Editor for Biological Models", color: "cellmlred" }, 
  				   { title: "", text: "Section 2", color: "cellmlred" }, 
				   { title: "", text: "Section 3", color: "cellmlblack" }];

  const
    [sectionsColor, setsectionsColor] = useState([...originalColors]),
    [fullpages, setfullpages] = useState([...originalPages]);

  const
    onLeave = (origin, destination, direction) => {
      console.log("onLeave", { origin, destination, direction });
      // arguments are mapped in order of fullpage.js callback arguments do something
      // with the event
    },

    handleChangeColors = () => {
      const newColors =
        sectionsColor[0] === "yellow"
          ? [...originalColors]
          : ["yellow", "blue", "white"];
      return setsectionsColor(newColors);
    },

    handleAddSection = () => {
      const { length } = fullpages;
      fullpages.push({
        text: `section ${length + 1}`,
        id: Math.random()
      });
      return setfullpages([...fullpages])
    },

    handleRemoveSection = () => {
      const newPages = [...fullpages];
      newPages.pop();
      return setfullpages(newPages)
    }


  const Menu = () => (
    <div
      className="menu"
      style={{
        position: "fixed",
        top: 0,
        zIndex: 100
      }}
    >
      <ul className="actions">
        <li>
          <button onClick={handleAddSection}> Add Section </button>
          <button onClick={handleRemoveSection}> Remove Section </button>
          <button onClick={handleChangeColors}> Change background colors </button>
        </li>
      </ul>
    </div>
  );

	  const cellml_logo = "https://www.cellml.org/++theme++cellml.theme/assets/images/logo-cellml.png";
	  const github_logo = "https://cdn1.iconfinder.com/data/icons/smallicons-logotypes/32/github-512.png";
	  const down_arrow = "https://th.bing.com/th/id/R.61a4048f1a23ab71c322132dcaec7d51?rik=ZAHWETlAzSynPw&riu=http%3a%2f%2fwww.freepngimg.com%2fdownload%2fweb_design%2f24744-4-down-arrow-transparent-background.png&ehk=Zia%2fbXfTV%2fDyrS%2fWps0nMysjBUW0ZyfPiUbyktKJJyM%3d&risl=&pid=ImgRaw&r=0";
  
  
  
  const github_link = () => {
    var url =  'https://github.com/nathan-xiao1/cellml-editor';
    window.open(url, '_blank');
  }

  const cellml_site_link = () => {
    var url =  'https://www.cellml.org/';
    window.open(url, '_blank');
  }
  
  const change_page = (id) => {
    document.getElementById("PAGESELECTOR").style.display = "none";
    document.getElementById("HOMEPAGE").style.display = "none";
    document.getElementById("CELLMLPAGE").style.display = "none";
    document.getElementById("SUDOKUGAME").style.display = "none";
    document.getElementById("PKMDBPAGE").style.display = "none";
    document.getElementById(id).style.display = "block";
  }
  
  return (
    <div id="CELLMLPAGE" className='cellml_page'>
      <div id="cellml_header">
        <div className='cellml_icon_pos'>
          <img id="cellml_icon" src={cellml_logo} alt="cellml logo"/>
          {/*<Link className='cellml_links underline extra_left_pad' to="/cellml/">Home</Link>
          <Link className='cellml_links underline' to="/pokemondb/">Pokémon DB</Link>
          <Link className='cellml_links underline' to="/sudoku/">Sudoku</Link>
          <Link className='cellml_links underline' to="/">Projects</Link>*/}
          <button className='cellml_links underline extra_left_pad' onClick={() => change_page("HOMEPAGE")}>Home</button>
          <button className='cellml_links underline' onClick={() => change_page("PKMDBPAGE")}>Pokémon DB</button>
          <button className='cellml_links underline' onClick={() => change_page("SUDOKUGAME")}>Sudoku</button>
          <button className='cellml_links underline' onClick={() => change_page("PAGESELECTOR")}>Projects</button>
        </div>
        
      </div>  

      <div className="section section-hero section-cellml_circd">
        {/* Background Bubbles */}
        <div className="cellml_circ cellml_circ_style1 cellml_circ_primary">
          <span className="span-150"/>
          <span className="span-50"/>
          <span className="span-50"/>
          <span className="span-75"/>
          <span className="span-100"/>
          <span className="span-75"/>
          <span className="span-50"/>
          <span className="span-100"/>
          <span className="span-50"/>
          <span className="span-100"/>
        </div>
        {/* Middle Text */}
        <div className="cellml_page_header">
          <div className='cellml_page_inner'>
            <img src={cellml_logo} alt="cellml logo"/>
            <div id="cellml_middle_text">Development of a CellML Editor for Biological Models</div>
            <button className='website_link git_img' id="link_git" onClick={github_link}>GitHub</button>
					  <button className='website_link' id="link_cell" onClick={cellml_site_link}>CellML</button>
          </div>
        </div>
        {/* Bottom Triangle */}
        <div className="cellml_separator cellml_separator-bottom cellml_separator-skew zindex-100"> 
          <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon className="fill-white" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>

      </div>
      <div className='temp_padding'>

      </div>
      {/* 
      <div className='cellml_info'>
        <div className='cellml_section'>
          <div>The Project:</div>
          <div className='cellml_project_scope'>
            <div>A</div>
            <div>
              CellML is a suitable markup language for describing biological models 
              and the mathematical models behind them. Despite providing a decent 
              experience for veteran CellML users, the tools currently available 
              for creating and editing CellML files are lacking both an intuitive 
              user experience and support for the latest version of CellML
            </div>         
          </div>
          <div className='cellml_project_problems'>
            <div className='problem_circle'>A</div>
            <div className='problem_text'>To facilitate the exchange of models between biomedical scientists, an XML model is needed.</div>
          </div>
        </div>




        <div className='cellml_section'>
          Hello2
        </div>

        <div className='cellml_section'>
          Hello3
        </div>

        <div className='cellml_section'>
          Hello4
        </div>
      </div>

      */}

      {/*  
      <Menu />
      
      <ReactFullpage
        debug 
        navigation
        anchors={['firstPage', 'secondPage', 'thirdPage']}
        sectionSelector={SECTION_SEL}
        onLeave={onLeave}
        sectionsColor={sectionsColor}

        render={() => (
          <ReactFullpage.Wrapper>
			  
            {fullpages.map(({title, text, color }) => (
              <div key={text} className={SEL}>
                
				<div id="cellml_box">
          
					
				  <div id="cellml_logo"> {title} </div>
				  <div className={color}> {text} </div>

				  <div id="btns_div">
					  <button className='website_link git_img' id="link_git">
						  GitHub
					  </button>
					  <button className='website_link' id="link_cell">CellML</button>
				  </div>
				</div>
					<div class="contentDiv">
						<img class="next_arrow" src={down_arrow} alt="bottom"/>
					</div>
              </div>
			  
            ))}
			
          </ReactFullpage.Wrapper>
        )}
      />*/}
    </div>
  );
}

export default CellMLPage;
