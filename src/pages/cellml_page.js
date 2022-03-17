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
  return (
	<div className="App">
      <Menu />
      <ReactFullpage
        debug /* Debug logging */
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
				  <div>
					<img id="cellml_icon" src={cellml_logo} alt="cellml logo"/>
				  </div>
					
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
						<img class="arrow" src={down_arrow} alt="bottom"/>
					</div>
              </div>
			  
            ))}
			

          </ReactFullpage.Wrapper>
        )}
      />
    </div>
  );
}

export default CellMLPage;
