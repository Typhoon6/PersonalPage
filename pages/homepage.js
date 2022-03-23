import '../App.css';
import React, { useState } from 'react';

import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { Link } from "react-router-dom";
import Page1 from '../pages/page1'; 
import Page2 from '../pages/page2';
import Page3 from '../pages/page3';

import "../style/projectselector.css";

import mario_ground from '../images/mario_ground.png';
import mario_pipe from '../images/mario_pipe.png';

import mario_sprite from '../images/mario_character_sprites/mario_idle.png';
import mario_walk1 from '../images/mario_character_sprites/mario_walk.png';
import mario_walk2 from '../images/mario_character_sprites/mario_walk2.png';
import mario_jump from '../images/mario_character_sprites/mario_jump.png';
import mario_fall from '../images/mario_character_sprites/mario_fall.png';
import mario_run from '../images/mario_character_sprites/mario_run.png';
import mario_run2 from '../images/mario_character_sprites/mario_run2.png';
import mario_run3 from '../images/mario_character_sprites/mario_run3.png';

import coin1 from '../images/mario_coin_1.png';
import coin2 from '../images/mario_coin_2.png';
import coin3 from '../images/mario_coin_3.png';
import coin4 from '../images/mario_coin_4.png';
import coin5 from '../images/mario_coin_5.png';
import coin6 from '../images/mario_coin_6.png';

import dust1 from '../images/coin_dust_1.png';
import dust2 from '../images/coin_dust_2.png';
import dust3 from '../images/coin_dust_3.png';
import dust4 from '../images/coin_dust_4.png';
import dust5 from '../images/coin_dust_5.png';
import dust6 from '../images/coin_dust_6.png';

import block_brick from '../images/mario_blocks.png';
import block_empty from '../images/mario_block_empty2.png';
import end1 from '../images/end_of_stage1.png';
import end2 from '../images/end_of_stage2.png';


// Another Page
import PokemonPage from '../pages/pokemon_test';
import PageSelector from '../pages/pageselector';


function HomePage() {

  // moving will change the sprite appearance
  const [marioSprite, setMarioSprite] = useState(0);


  const start_game = () => {
    console.log('start resume');
    // pipe spawns
    document.getElementById("start_pipe").style.display = "block";
    // mario jumps and runs to the right
    document.getElementById("mario_sprite").style.display = "block";
    run_mario_animation();

  }

  const run_mario_animation = () => {
    console.log('run animation');
    const mario = document.getElementById("mario_sprite");
    mario.style.bottom = "128px";
    mario.style.height = "120px";

    const coin = document.getElementById("start_coin");
    coin.style.bottom = "440px";
    coin.style.display = "none";
    const coinL = document.getElementById("start_coin_l");
    coinL.style.bottom = "440px";
    coinL.style.display = "none";
    const coinR = document.getElementById("start_coin_r");
    coinR.style.bottom = "440px";
    coinR.style.display = "none";

    const block = document.getElementById("interactive_start");
    block.style.backgroundImage = "url(" + block_brick + ")";
    block.innerText = "Starting";

    let pos = 0;
    let id = null;
    let jumped_height = 0;
    
    let coin_height = 440;

    let run_animation = 0;

    clearInterval(id);
    id = setInterval(frame, 7);
    function frame() {
      if (pos < 320) {
        if (pos>=0 && pos<120) mario.src = mario_sprite;
        else if (pos >=120 && pos <160) mario.src = mario_walk1;
        else if (pos >=160 && pos <200) mario.src = mario_walk2;
        else if (pos >=200 && pos <240) mario.src = mario_walk1;
        else if (pos >=240 && pos <280) mario.src = mario_walk2;
        else {mario.src = mario_walk2;}
        pos = pos + 2;
        mario.style.left = pos + 'px';
      }
      // jump animation
      else if (pos >= 250 && pos < 400) {
        mario.src = mario_jump;
        mario.style.left = pos + 'px';
        const from_btm = 128 + jumped_height;
        mario.style.bottom = from_btm + 'px';
        jumped_height += 3;
        pos = pos + 2;
      }
      // fall animation
      else if (pos >= 400 && pos < 490) {
        block.style.backgroundImage = "url(" + block_empty + ")";
        block.innerText = "";
        mario.src = mario_fall;
        mario.style.left = pos + 'px';
        const from_btm = 128 + jumped_height;
        mario.style.bottom = from_btm + 'px';
        jumped_height -= 3;
        pos = pos + 2;
      }
      else if (pos >= 490 && pos < 500) {
        mario.src = mario_sprite;
        pos = pos + 2;
        mario.style.bottom = "128px";
        mario.style.left = pos + 'px';
      }
      else if (pos >= 500 && pos < window.innerWidth - 100) {
        run_animation += 2;
        mario.style.height = "100px";
        if (run_animation >= 0 && run_animation < 50) mario.src = mario_run;
        else if (run_animation >= 50 && run_animation < 100) mario.src = mario_run2;
        else if (run_animation >= 100 && run_animation < 150) {mario.src = mario_run3;}
        else {run_animation = 0}
        pos += 5;
        mario.style.left = pos + 'px';
      }
      else {
        clearInterval(id);
      }

      // spawn coin on top of the box
      if (pos >= 400 && pos <= 500) {
        coin_height += 1.5;
        coin.style.bottom = (coin_height) + "px";
        coin.style.display = "block";
        coinL.style.bottom = (coin_height) + "px";
        coinL.style.display = "block";
        coinR.style.bottom = (coin_height) + "px";
        coinR.style.display = "block";
        // coin animation (spin)
        if (pos>=400 && pos<415) {coin.src = coin1; coinL.src = coin1; coinR.src = coin1; }
        else if (pos>=415 && pos<430) {coin.src = coin2; coinL.src = coin2; coinR.src = coin2; }
        else if (pos>=430 && pos<445) {coin.src = coin3; coinL.src = coin3; coinR.src = coin3; }
        else if (pos>=445 && pos<460) {coin.src = coin4; coinL.src = coin4; coinR.src = coin4; }
        else if (pos>=460 && pos<475) {coin.src = coin5; coinL.src = coin5; coinR.src = coin5; }
        else if (pos>=475 && pos<490) {coin.src = coin6; coinL.src = coin6; coinR.src = coin6; }
        else {coin.src = coin1; coinL.src = coin1; coinR.src = coin1; }
      }
      // Dust after coin spin
      if (pos >= 500 && pos <= 600) {
        if (pos>=495 && pos<500) {coin.src = dust1; coinL.src = dust1; coinR.src = dust1 }
        else if (pos>=500 && pos<515) {coin.src = dust2; coinL.src = dust2; coinR.src = dust2 }
        else if (pos>=515 && pos<530) {coin.src = dust3; coinL.src = dust3; coinR.src = dust3 }
        else if (pos>=530 && pos<545) {coin.src = dust4; coinL.src = dust4; coinR.src = dust4 }
        else if (pos>=545 && pos<560) {coin.src = dust5; coinL.src = dust5; coinR.src = dust5 }
        else if (pos>=560 && pos<575) {coin.src = dust6; coinL.src = dust6; coinR.src = dust6 }
        else {
          coin.src = dust1; coinL.src = dust1; coinR.src = dust1; 
          coin.style.display = "none";
          coinL.style.display = "none";
          coinR.style.display = "none";
        }
      }
    }

    

  }


  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);

  const change_to_pokemon = () => {
    document.getElementsByClassName("parent")[0].style.display = "none";
    document.getElementsByClassName("parent")[1].style.display = "block";
  }

  return (
    <div className="App">

      <div className="parent">

        <div id="page_menu">
          DAVID LEYDON
          <Link to="/"><button className="home_button gold_home" ></button></Link>
          
        </div>
        <div id="page_content">
          <div id="interactive_text">
            <span>I</span>
            <span>n</span>
            <span>t</span>
            <span>e</span>
            <span>r</span>
            <span>a</span>
            <span>c</span>
            <span>t</span>
            <span>i</span>
            <span>v</span>
            <span>e</span>
            <span> </span>
            <span>R</span>
            <span>e</span>
            <span>s</span>
            <span>u</span>
            <span>m</span>
            <span>e</span>
          </div>
          <div id="interactive_small_text">
            The website is an interactive application, displaying both my portfolio & some skills I've learned along the way.
          </div>
          <div id="interactive_notice_board">
            <div className='notice_board_title'>Notice</div>
            <div className='notice_board_text'>This is early development of my future home page with the intention to be more interactive and responsive</div>
          </div>

          <button id="interactive_start" onClick={start_game}>
            Play
          </button>

          

        </div>
        <div>
          <img id="mario_sprite" src={mario_sprite} alt="mario character sprite"></img>

          <img id="start_coin_l" className='coin' src={coin1} alt="left coin"></img>
          <img id="start_coin" className='coin' src={coin1} alt="hit block for coin"></img>
          <img id="start_coin_r" className='coin' src={coin1} alt="right coin"></img>

          <img id="start_pipe" src={mario_pipe} alt="spawn pipe"/>
          <img id="end_stage_poles1" className='endPoles' src={end1} alt="end of stage poles"/>
          <img id="end_stage_poles2" className='endPoles' src={end2} alt="end of stage poles"/>
          <img id="ground" src={mario_ground} alt="ground"/>
         
        </div>
        
      </div>


    </div>
  );
}

export default HomePage;
