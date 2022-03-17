import React, { useState, useEffect } from 'react';
import Pokedex from 'pokedex-promise-v2';

import '../App.css';
import "../style/projectselector.css";
import '../style/pokemonpage.css';
import maginfy_glass from '../images/pkm/pkm_search.png';
import all_pkm_array from './all_pkm.txt';

function PokemonPage() {

    const P = new Pokedex();
    const NUM_ALL_POKEMON = 898;

    // All pokemon ID's into an array
    const list_of_all_pokemon_id = [];
    for (let i = 1; i <= NUM_ALL_POKEMON; i++) {
      list_of_all_pokemon_id.push(i);
    }
    useEffect(() => {
        fill_pokemon_db_table(list_of_all_pokemon_id);
     });


    // Read file of all pkm - less latency when requesting
    const showFile = (e) => {
      e.preventDefault();
      let pkm_ar = fetch(all_pkm_array);
      pkm_ar.then(response => {
        response.json().then(data => {
          // data is the array of pkm names
          console.log(data);
          let filtered_pkm = [];
          const substring = document.getElementById("pkm_search").value;

          for (let i = 0; i < data.length; i++) {
            if (data[i].includes(substring)) {
              filtered_pkm.push(data[i]);
            }
          }

          console.log(filtered_pkm);

        })
      }).catch((error) => {
        console.log('There was an ERROR: ', error);
      });
    };

    // Function to get all current pokemon names
    const test = async() => {
      console.log(list_of_all_pokemon_id); 
      const list_of_pkm_names = [];

      P.getPokemonByName(list_of_all_pokemon_id) // with Promise
      .then((response) => {         
        for (let i = 0; i < list_of_all_pokemon_id.length; i++) {
          list_of_pkm_names.push(response[i].name);
        }
      }).catch((error) => {
        console.log('There was an ERROR: ', error);
      })
    }


    const test2 = () => {
      
      // gives a lot

      P.getPokemonSpeciesByName([38]) // with Promise
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log('There was an ERROR: ', error);
      })

      const url = "https://pokeapi.co/api/v2/evolution-chain/1/";

      let pokemon_locations_promise = fetch(url);
      pokemon_locations_promise.then(response => {
        response.json().then(data => {console.log(data);})
        
      }).catch((error) => {
        console.log('There was an ERROR: ', error);
      });
    }



    const no_duplicate_version = (flavour_text) => {
      if (flavour_text.version.name === "blue") {
        return false;
      } else if (flavour_text.version.name === "sapphire") {
        return false;
      } else if (flavour_text.version.name === "diamond") {
        return false;
      } else if (flavour_text.version.name === "platinum") {
        return false;
      } else if (flavour_text.version.name === "black") {
        return false;
      } else if (flavour_text.version.name === "white-2") {
        return false;
      } else if (flavour_text.version.name === "black-2") {
        return false;
      } else if (flavour_text.version.name === "alpha-sapphire") {
        return false;
      } else if (flavour_text.version.name === "lets-go-eevee") {
        return false;
      } else if (flavour_text.version.name === "shining-pearl") {
        return false;
      } else {
        return true;
      }
    }


    // Set the 5 orbs to be the pokemon sprites which is infinite (i.e. 5 goes to 1)
    const set_spinner_images = (set_pkm_images) => {

      // only sprites that are not null
      let list_of_pkm_images = set_pkm_images.filter(function(pkm) {
        return pkm.src != null;
      });

      // Setting the default values to the original 5
      shift_pokemon_images(list_of_pkm_images, 2, 0);
            
      // Clicking will change the new center and shift the images
      let curr_num = 2;
      document.getElementById("pkm_modal_pkmimg_1").onclick = function() {
        if (curr_num - 2 === -2 || curr_num - 2 < -2) { curr_num = list_of_pkm_images.length - 2 }
        else if (curr_num - 2 === -1) { curr_num = list_of_pkm_images.length - 1 }
        else {curr_num = curr_num - 2;}
        shift_pokemon_images(list_of_pkm_images, curr_num, -2);
      };

      document.getElementById("pkm_modal_pkmimg_2").onclick = function() {
        if (curr_num - 1 === -1) {
          curr_num = list_of_pkm_images.length - 1;
        } else if (curr_num - 1 < -1) {
          curr_num = list_of_pkm_images.length - 2;
        } else {curr_num = curr_num - 1;}
        shift_pokemon_images(list_of_pkm_images, curr_num, -1);

      };
      document.getElementById("pkm_modal_pkmimg_4").onclick = function() {        
        if (curr_num + 1 === list_of_pkm_images.length) {
          curr_num = 0;
        } else if (curr_num + 1 > list_of_pkm_images.length) {
          curr_num = 1;
        } else {curr_num = curr_num + 1;}
        shift_pokemon_images(list_of_pkm_images, curr_num, 1);
      };
      document.getElementById("pkm_modal_pkmimg_5").onclick = function() {

        if (curr_num + 2 === list_of_pkm_images.length + 1) { curr_num = 1 }
        else if (curr_num + 2 === list_of_pkm_images.length) { curr_num = 0 }
        else {curr_num = curr_num + 2;}
        shift_pokemon_images(list_of_pkm_images, curr_num, 2);
        
      };

    }

    // Function to shift the pokemon
    const shift_pokemon_images = (list_of_pkm_images, curr_num, shift) => {

      // Update main image
      document.getElementById("pkm_modal_pkm_image").innerHTML = "";
      let new_img = document.createElement("img");
      new_img.src = list_of_pkm_images[curr_num].src;
      document.getElementById("pkm_modal_pkm_image").appendChild(new_img);

      // 1st Slot
      if (curr_num - 2 <= -2) { document.getElementById("pkm_modal_pkmimg_1").style.backgroundImage = "url("+ list_of_pkm_images[list_of_pkm_images.length - 2].src +")"; } 
      else if (curr_num - 2 === -1) { document.getElementById("pkm_modal_pkmimg_1").style.backgroundImage = "url("+ list_of_pkm_images[list_of_pkm_images.length - 1].src +")"; } 
      else { document.getElementById("pkm_modal_pkmimg_1").style.backgroundImage = "url("+ list_of_pkm_images[curr_num - 2].src +")"; }

      // 2nd Slot
      if (curr_num - 1 <= -1) { document.getElementById("pkm_modal_pkmimg_2").style.backgroundImage = "url("+ list_of_pkm_images[list_of_pkm_images.length - 1].src +")"; } 
      else if (curr_num - 1 === 0) { document.getElementById("pkm_modal_pkmimg_2").style.backgroundImage = "url("+ list_of_pkm_images[0].src +")"; } 
      else { document.getElementById("pkm_modal_pkmimg_2").style.backgroundImage = "url("+ list_of_pkm_images[curr_num - 1].src +")"; }

      // 3rd Slot
      document.getElementById("pkm_modal_pkmimg_3").style.backgroundImage = "url("+ list_of_pkm_images[curr_num].src +")";

      // 4th Slot
      if (curr_num + 1 === list_of_pkm_images.length) { document.getElementById("pkm_modal_pkmimg_4").style.backgroundImage = "url("+ list_of_pkm_images[0].src +")"; } 
      else { document.getElementById("pkm_modal_pkmimg_4").style.backgroundImage = "url("+ list_of_pkm_images[curr_num + 1].src +")"; }

      // 5th Slot
      if (curr_num + 2 === list_of_pkm_images.length + 1) { document.getElementById("pkm_modal_pkmimg_5").style.backgroundImage = "url("+ list_of_pkm_images[1].src +")"; } 
      else if (curr_num + 2 === list_of_pkm_images.length) { document.getElementById("pkm_modal_pkmimg_5").style.backgroundImage = "url("+ list_of_pkm_images[0].src +")"; } 
      else { document.getElementById("pkm_modal_pkmimg_5").style.backgroundImage = "url("+ list_of_pkm_images[curr_num + 2].src +")"; }

      document.getElementById("pkm_modal_pkm_game_name").innerText = list_of_pkm_images[curr_num].name;
    }



    
  


    
    // Function to allow the user to change the pokemon image
    function create_image_selection_option(sprite_src, game_name) {
      if (sprite_src != null) {

        let temp_pkm_img_div = document.createElement("div");
        let temp_pkm_img = document.createElement("img");
        temp_pkm_img.src = sprite_src;
        temp_pkm_img.style.height = "100px";
        temp_pkm_img_div.appendChild(temp_pkm_img);

        temp_pkm_img_div.onclick = function(){
          //console.log(game_name);
          document.getElementById("pkm_modal_pkm_image").innerHTML = "";
          let new_img = document.createElement("img");
          new_img.src = sprite_src;
          document.getElementById("pkm_modal_pkm_image").appendChild(new_img);
          document.getElementById("pkm_modal_pkm_game_name").innerText = game_name;
        } 

        document.getElementById("pkm_modal_image_selector").appendChild(temp_pkm_img_div); 
        
      }
    }

    const get_evolution_text = (evo_details) => {
      console.log(evo_details);
      
      let evo_string = "";

      if (evo_details.gender != null) {
        if (evo_details.gender === 1) evo_string += "Female \n";
        if (evo_details.gender === 2) evo_string += "Male \n";
      }

      if (evo_details.held_item != null) {
        let temp = evo_details.held_item.name.replace(/\b\w/g, (c) => c.toUpperCase());
        temp = temp.replace('-', ' ');
        evo_string += "Hold " + temp + "\n";
      }

      if (evo_details.item != null) {
        let temp = evo_details.item.name.replace(/\b\w/g, (c) => c.toUpperCase());
        temp = temp.replace('-', ' ');
        evo_string += " " + temp + "\n";
      }

      if (evo_details.known_move != null) {
        let temp = evo_details.known_move.name.replace(/\b\w/g, (c) => c.toUpperCase());
        temp = temp.replace('-', ' ');
        evo_string += "Learn " + temp + "\n";
      }

      if (evo_details.location != null) {
        let temp = evo_details.location.name.replace(/\b\w/g, (c) => c.toUpperCase());
        temp = temp.replace('-', ' ');
        evo_string += "at " + temp + "\n";
      }

      if (evo_details.min_happiness != null) {
        evo_string += " High Happiness (" + evo_details.min_happiness + ")\n";
      }
      if (evo_details.min_beauty != null) {
        evo_string += " High Beauty (" + evo_details.min_beauty + ")\n";
      }
      if (evo_details.min_affection != null) {
        evo_string += " High Affection (" + evo_details.min_affection + ")\n";
      }

      if (evo_details.min_level != null) {
        evo_string += " Min Level is " + evo_details.min_level + "\n";
      }

      if (evo_details.needs_overworld_rain === true)  {
        evo_string += " During Rain\n";
      }

      if (evo_details.party_species != null) {
        evo_string += " Must have Pokemon " + evo_details.party_species.name + "in party\n";
      }
      if (evo_details.party_type != null) {
        evo_string += " Must have type " + evo_details.party_type.name + "in party\n";
      }
      if (evo_details.relative_physical_stats != null) {
        if (evo_details.relative_physical_stats === 1) evo_string += "Attack > Defense\n";
        else if (evo_details.relative_physical_stats === 0) evo_string += "Attack = Defense\n";
        else if (evo_details.relative_physical_stats === -1) evo_string += "Attack < Defense\n";
        else evo_string += "\n";
      }

      if (evo_details.trade_species != null) {
        evo_string += " trade with a " + evo_details.trade_species.name +"\n";
      }

      if (evo_details.time_of_day !== "") {
        evo_string += " during " + evo_details.time_of_day +"\n";
      }

      if (evo_details.turn_upside_down === true) {
        evo_string += " upside down\n";
      }

      return evo_string;
    }





    function clear_all_loactions() {
      document.getElementById("loc_redblu_value").innerText = "";
      document.getElementById("loc_yellow_value").innerText = "";
      document.getElementById("loc_gold_value").innerText = "";
      document.getElementById("loc_silver_value").innerText = "";
      document.getElementById("loc_crystal_value").innerText = "";
      document.getElementById("loc_rubsap_value").innerText = "";
      document.getElementById("loc_fred_lgreen_value").innerText = "";
      document.getElementById("loc_emerald_value").innerText = "";
      document.getElementById("loc_diaperl_value").innerText = "";
      document.getElementById("loc_platinum_value").innerText = "";
      document.getElementById("loc_hgss_value").innerText = "";
      document.getElementById("loc_black_value").innerText = "";
      document.getElementById("loc_white_value").innerText = "";
      document.getElementById("loc_b2w2_value").innerText = "";
      document.getElementById("loc_oras_value").innerText = "";
      document.getElementById("loc_xy_value").innerText = "";
      document.getElementById("loc_sunmoon_value").innerText = "";
      document.getElementById("loc_usum_value").innerText = "";
      document.getElementById("loc_lgplge_value").innerText = "";
      document.getElementById("loc_swoshi_value").innerText = "";
    }


    function evo_chain_calculate(Edata) {
      let evoChain = [];
      let evoData = Edata;

      console.log(evoData);

      do {
        let numberOfEvolutions = evoData['evolves_to'].length;  
        
        let evolves_into = [];
        for (let j = 0; j < evoData.evolves_to.length; j++) {
          evolves_into.push(evoData.evolves_to[j].species.name)
        }

        evoChain.push({
          "species_name": evoData.species.name,
          "trigger": evoData.evolution_details,
          "evo_list": evolves_into
        });

        if(numberOfEvolutions > 1) {
          
          for (let i = 1; i < numberOfEvolutions; i++) { 
            console.log("AAA: " + evoData.evolves_to[i].species.name)
            evoChain.push({
              "species_name": evoData.evolves_to[i].species.name,
              "trigger": evoData.evolves_to[i].evolution_details,
              "evo_list": []
          });
          }
        }        

        evoData = evoData['evolves_to'][0];

      } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

      return evoChain;
    }



    function get_pokemon_chain(evoChain, pk_name, list) {

      for (let i = 0; i < evoChain.length; i++) {
        for (let j = 0; j < evoChain[i].evo_list.length; j++) {
          if (evoChain[i].evo_list[j] === pk_name) {
            // add object
            const obj = {
              species_name: evoChain[i].species_name,
              trigger: evoChain[i].trigger
            }
            list.push(obj);
            get_pokemon_chain(evoChain, evoChain[i].species_name, list)
          }
        }
      }

      return list;
    }

    function change_location_map(circle, location_name) {

      if (location_name === "ja-Hrkt" || location_name === "roomaji" || location_name === "ja") {
        circle.style.backgroundImage = 'url("https://www.pikpng.com/pngl/b/281-2816816_japan-flag-png.png")';
      } else if (location_name === "ko") {
        circle.style.backgroundImage = 'url("https://cdn4.iconfinder.com/data/icons/square-world-flags/180/flag_korea_square-512.png")';
      } else if (location_name === "zh-Hant" || location_name === "zh-Hans") {
        circle.style.backgroundImage = 'url("https://th.bing.com/th/id/R.46a9ff1d47757fb079dc7d235b6dd18f?rik=EOfN%2bTB1%2f7KDyQ&riu=http%3a%2f%2fcdn.countryflags.com%2fthumbs%2fchina%2fflag-square-250.png&ehk=S12%2bymIDiIJrLflY%2b6cghzygQRP05BetGFSy3ixXCvY%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1")';
      } else if (location_name === "fr") {
        circle.style.backgroundImage = 'url("https://www.stmarys-ca.edu/sites/default/files/France%20Flag.jpg")';
      } else if (location_name === "de") {
        circle.style.backgroundImage = 'url("https://cdn4.iconfinder.com/data/icons/square-world-flags/180/flag_germany_square-512.png")';
      } else if (location_name === "es") {
        circle.style.backgroundImage = 'url("https://cdn4.iconfinder.com/data/icons/square-world-flags/180/flag_spain_square-512.png")';
      } else if (location_name === "it") {
        circle.style.backgroundImage = 'url("https://th.bing.com/th/id/OIP.RV31zJXwZN5C5GrVtiXIrAHaHa?pid=ImgDet&rs=1")';
      } else if (location_name === "en") {
        circle.style.backgroundImage = 'url("https://i.redd.it/blac1bw4iqa21.png")';
      } else {
        circle.style.backgroundImage = 'url("https://th.bing.com/th/id/OIP.Hy5g66TVT7xHTYWyglhc7wHaHa?pid=ImgDet&w=512&h=512&rs=1")';
      }
      
      
    }

    function create_evolution_visual(evoChain) {
      console.log(evoChain);

      let pokemon_chain = [];
      for (let i = 0; i < evoChain.length; i++) {
        if (evoChain[i].evo_list.length === 0) {
          const temp_o = {
            species_name: evoChain[i].species_name,
            trigger: evoChain[i].trigger
          }
          const temp = get_pokemon_chain(evoChain, evoChain[i].species_name, [temp_o])
          pokemon_chain.push(temp.reverse());
        }
      }

      // Rearrange for the correct ID order
      var obj = pokemon_chain[pokemon_chain.length-1];
      pokemon_chain.splice(pokemon_chain.length-1, 1);
      pokemon_chain.unshift(obj);

      console.log(pokemon_chain);

      for (let i = 0; i < pokemon_chain.length; i++) {

        const evolution_chain_div = document.createElement("div");
        evolution_chain_div.className = "evolution_chain_div";

        for (let j = 0; j < pokemon_chain[i].length; j++) {
          P.getPokemonByName(pokemon_chain[i][j].species_name).then((pkm) => {
          
            // Create the individual pokemon DIV (Img, ID, Name, Type)
            const curr_pkm_div = document.createElement("div");
            curr_pkm_div.className = "pokemon_evo_chain";


            const pkm_img_div = document.createElement("div");
            pkm_img_div.className = "pkm_img_div";
            const pkm_img = document.createElement("img");
            pkm_img.src = pkm.sprites.other['official-artwork'].front_default;
            pkm_img.style.width = "100px";
            pkm_img.style.height = "100px";
            pkm_img_div.appendChild(pkm_img);

            const pkm_id = document.createElement("div");
            pkm_id.className = "pkm_evo_chain_id";
            pkm_id.innerText = "#" + pkm.id;
            const pkm_name = document.createElement("div");
            pkm_name.innerText = pkm.name.replace(/\b\w/g, (c) => c.toUpperCase());;

            let type1 = "";
            let type2 = "_";
            if (pkm.types.length === 1) { type1 = pkm.types[0].type.name; } 
            else {
              type1 = pkm.types[0].type.name;
              type2 = pkm.types[1].type.name;
            }
            const pkm_types = document.createElement("div");
            const pkm_types1 = document.createElement("div");
            const pkm_types2 = document.createElement("div");
            pkm_types1.innerText = type1.toUpperCase();
            pkm_types2.innerText = type2.toUpperCase();
            pkm_types1.className = "pkm_evo_chain_type_" + type1 + " pkm_evotype";
            pkm_types2.className = "pkm_evo_chain_type_" + type2 + " pkm_evotype";
            pkm_types.appendChild(pkm_types1);
            pkm_types.appendChild(pkm_types2);


            

            curr_pkm_div.appendChild(pkm_img_div);
            curr_pkm_div.appendChild(pkm_id);
            curr_pkm_div.appendChild(pkm_name); 
            curr_pkm_div.appendChild(pkm_types);

            if(pokemon_chain[i][j].trigger.length !== 0) {
              console.log('Trigger for:')
              console.log(pokemon_chain[i][j].species_name);
              const evo_trigger = document.createElement("div");

              const arrow = document.createElement("div");
              arrow.innerText = "🢡"
              const arrow_text = document.createElement("div");
              arrow_text.innerText = get_evolution_text(pokemon_chain[i][j].trigger[0]);

              evo_trigger.className = "evo_trigger_arrow";
              evo_trigger.appendChild(arrow);
              evo_trigger.appendChild(arrow_text);

              const trigger_text = get_evolution_text(pokemon_chain[i][j].trigger[0]);
              console.log(trigger_text);
              evolution_chain_div.appendChild(evo_trigger);
            }
            
            
            evolution_chain_div.appendChild(curr_pkm_div);


          }).catch((error) => {
            console.log('There was an ERROR: ', error);
          });
          
          document.getElementById("pkm_modal_evolution_chart").appendChild(evolution_chain_div);
        }
          
        
        
      }
    }



    // Recrusively Call the Evolutions
    function recurseEvolutionChart(Edata, evo_list) {

      // Get the text for the evolution method
      let evo_trigger;
      if (Edata.evolution_details.length === 0) { evo_trigger = ""; } 
      else { evo_trigger = Edata.evolution_details[0]; }

      // Get the evolutions
      let next_pk_name;
      if (Edata.evolves_to.length === 0) { next_pk_name = ""; } 
      else { next_pk_name = Edata.evolves_to; }

      // Object of the pokemon
      let new_obj = {
        name: Edata.species.name,
        evo_method: evo_trigger,
        next_pkm: next_pk_name,
        checked: 0,
      }

      evo_list.push(Edata.species.name);

      
      console.log("Evo Data & List:");
      console.log(Edata);
      console.log(evo_list);
      
      if (Edata.evolves_to.length === 0) {

        /*const evolution_chain_div = document.createElement("div");
        evolution_chain_div.style.border = "thin dotted black";
        
        for (let i = 0; i < evo_list.length; i++) {
          
          P.getPokemonByName(evo_list[i].name).then((pkm) => {
          
            let types = "";
            if (pkm.types.length === 1) { types = pkm.types[0].type.name; } 
            else {types = pkm.types[0].type.name + " | " + pkm.types[1].type.name;}


            const curr_pkm_div = document.createElement("div");
            curr_pkm_div.style.display = "inline-block";
            curr_pkm_div.style.border = "thin dotted red";

            const pkm_img_div = document.createElement("div");
            const pkm_img = document.createElement("img");
            pkm_img.src = pkm.sprites.other['official-artwork'].front_default;
            pkm_img.style.width = "100px";
            pkm_img.style.height = "100px";
            pkm_img_div.appendChild(pkm_img);

            const pkm_name = document.createElement("div");
            pkm_name.innerText = pkm.name;

            const pkm_id = document.createElement("div");
            pkm_id.innerText = pkm.id;

            const pkm_types = document.createElement("div");
            pkm_types.innerText = types;


            if (evo_list[i].evo_method !== "") {
              const div_arrow = document.createElement("div");
              div_arrow.innerText = "==>";
              console.log("evo");
              console.log(evo_list[i].evo_method);
              div_arrow.innerText = get_evolution_text(evo_list[i].evo_method);
              evolution_chain_div.appendChild(div_arrow);

            }

            curr_pkm_div.appendChild(pkm_img_div);
            curr_pkm_div.appendChild(pkm_name);
            curr_pkm_div.appendChild(pkm_id);
            curr_pkm_div.appendChild(pkm_types);
            
            evolution_chain_div.appendChild(curr_pkm_div);

            if (evo_list[i].name === Edata.species.name) {
              evo_list[i].checked = 1;
            }

          }).catch((error) => {
            console.log('There was an ERROR: ', error);
          });
          
        }

        document.getElementById("pkm_modal_evolution_chart").appendChild(evolution_chain_div);*/
        return evo_list;
      }
      
      for (let i = 0; i < Edata.evolves_to.length; i++) {
        return recurseEvolutionChart(Edata.evolves_to[i], evo_list);
      }
      
    }


















    const close_modal = () => {
      document.getElementById("pkm_modal").style.display = "none";
    }

    // =======================================================================
    // =======================================================================
    // =======================================================================


    const update_type_defense_colour = (type_id, type_value) => {
      

      const type_box = document.getElementById(type_id);
      if (type_value === 0) {
        type_box.style.backgroundColor = "rgb(46,52,54)";
        type_box.innerText = type_value;
      }
      else if (type_value === 0.25) {
        type_box.style.backgroundColor = "rgb(124,0,0)";
        type_box.innerText = "1/4";
      }
      else if (type_value === 0.5) {
        type_box.style.backgroundColor = "rgb(164,0,0)";
        type_box.innerText = "1/2";
      }
      else if (type_value === 1) {
        type_box.style.backgroundColor = "rgb(200,200,200)";
        type_box.innerText = "";
      }
      else if (type_value === 2) {
        type_box.style.backgroundColor = "rgb(78,154,6)";
        type_box.innerText = type_value;
      }
      else if (type_value === 4) {
        type_box.style.backgroundColor = "rgb(65,131,5)";
        type_box.innerText = type_value;
      }
      else {
        type_box.innerText = type_value;
      }

    }

    // Function to calculate the pokemon type weaknesses
    const update_type_defenses = (type_1, type_2) => {
      
      // Get the types of the pokemon
      const types = [type_1.type.name];
      if (type_2 !== undefined) { types.push(type_2.type.name) }
      
      // Call API call to check the weaknesses
      P.getTypeByName(types).then((response) => {
    
        // Type Multipliers per type for the pokemon
        let nor = 1;  let fir = 1;  let wat = 1;  let ele = 1;  let gra = 1;
        let ice = 1;  let fig = 1;  let poi = 1;  let gro = 1;  let fly = 1;
        let psy = 1;  let bug = 1;  let roc = 1;  let gho = 1;  let dra = 1;
        let dar = 1;  let ste = 1;  let fai = 1;
        
    
        // First Type Defenses
        let t1 = response;
        const list_of_double_dmg = t1[0].damage_relations.double_damage_from;

        for (let i = 0; i < list_of_double_dmg.length; i++) {
          if (list_of_double_dmg[i].name === "normal") nor = 2;
          else if (list_of_double_dmg[i].name === "fire") fir = 2;
          else if (list_of_double_dmg[i].name === "water") wat = 2;
          else if (list_of_double_dmg[i].name === "electric") ele = 2;
          else if (list_of_double_dmg[i].name === "grass") gra = 2;
          else if (list_of_double_dmg[i].name === "ice") ice = 2;
          else if (list_of_double_dmg[i].name === "fighting") fig = 2;
          else if (list_of_double_dmg[i].name === "poison") poi = 2;
          else if (list_of_double_dmg[i].name === "ground") gro = 2;
          else if (list_of_double_dmg[i].name === "flying") fly = 2;
          else if (list_of_double_dmg[i].name === "psychic") psy = 2;
          else if (list_of_double_dmg[i].name === "bug") bug = 2;
          else if (list_of_double_dmg[i].name === "rock") roc = 2;
          else if (list_of_double_dmg[i].name === "ghost") gho = 2;
          else if (list_of_double_dmg[i].name === "dragon") dra = 2;
          else if (list_of_double_dmg[i].name === "dark") dar = 2;
          else if (list_of_double_dmg[i].name === "steel") ste = 2;
          else if (list_of_double_dmg[i].name === "fairy") fai = 2;
        }

        const list_of_half_dmg = t1[0].damage_relations.half_damage_from;
        for (let j = 0; j < list_of_half_dmg.length; j++) {
          if (list_of_half_dmg[j].name === "normal") nor = 0.5;
          else if (list_of_half_dmg[j].name === "fire") fir = 0.5;
          else if (list_of_half_dmg[j].name === "water") wat = 0.5;
          else if (list_of_half_dmg[j].name === "electric") ele = 0.5;
          else if (list_of_half_dmg[j].name === "grass") gra = 0.5;
          else if (list_of_half_dmg[j].name === "ice") ice = 0.5;
          else if (list_of_half_dmg[j].name === "fighting") fig = 0.5;
          else if (list_of_half_dmg[j].name === "poison") poi = 0.5;
          else if (list_of_half_dmg[j].name === "ground") gro = 0.5;
          else if (list_of_half_dmg[j].name === "flying") fly = 0.5;
          else if (list_of_half_dmg[j].name === "psychic") psy = 0.5;
          else if (list_of_half_dmg[j].name === "bug") bug = 0.5;
          else if (list_of_half_dmg[j].name === "rock") roc = 0.5;
          else if (list_of_half_dmg[j].name === "ghost") gho = 0.5;
          else if (list_of_half_dmg[j].name === "dragon") dra = 0.5;
          else if (list_of_half_dmg[j].name === "dark") dar = 0.5;
          else if (list_of_half_dmg[j].name === "steel") ste = 0.5;
          else if (list_of_half_dmg[j].name === "fairy") fai = 0.5;
        }

        const list_of_immune_dmg = t1[0].damage_relations.no_damage_from;
        for (let k = 0; k < list_of_immune_dmg.length; k++) {
          if (list_of_immune_dmg[k].name === "normal") nor = 0;
          else if (list_of_immune_dmg[k].name === "fire") fir = 0;
          else if (list_of_immune_dmg[k].name === "water") wat = 0;
          else if (list_of_immune_dmg[k].name === "electric") ele = 0;
          else if (list_of_immune_dmg[k].name === "grass") gra = 0;
          else if (list_of_immune_dmg[k].name === "ice") ice = 0;
          else if (list_of_immune_dmg[k].name === "fighting") fig = 0;
          else if (list_of_immune_dmg[k].name === "poison") poi = 0;
          else if (list_of_immune_dmg[k].name === "ground") gro = 0;
          else if (list_of_immune_dmg[k].name === "flying") fly = 0;
          else if (list_of_immune_dmg[k].name === "psychic") psy = 0;
          else if (list_of_immune_dmg[k].name === "bug") bug = 0;
          else if (list_of_immune_dmg[k].name === "rock") roc = 0;
          else if (list_of_immune_dmg[k].name === "ghost") gho = 0;
          else if (list_of_immune_dmg[k].name === "dragon") dra = 0;
          else if (list_of_immune_dmg[k].name === "dark") dar = 0;
          else if (list_of_immune_dmg[k].name === "steel") ste = 0;
          else if (list_of_immune_dmg[k].name === "fairy") fai = 0;
        }
        

        // If the pokemon has 2 types then multiply the two type values
        if (type_2 !== undefined) {
          let t2 = response[1].damage_relations;

          const list_of_double_dmg2 = t2.double_damage_from;
          const list_of_half_dmg2   = t2.half_damage_from;
          const list_of_immune_dmg2 = t2.no_damage_from;

          for (let i = 0; i < list_of_double_dmg2.length; i++) {
            const curr_type = list_of_double_dmg2[i].name;
            if (curr_type === "normal") nor = nor*2;
            else if (curr_type === "fire") fir = fir*2;
            else if (curr_type === "water") wat = wat*2;
            else if (curr_type === "electric") ele = ele*2;
            else if (curr_type === "grass") gra = gra*2;
            else if (curr_type === "ice") ice = ice*2;
            else if (curr_type === "fighting") fig = fig*2;
            else if (curr_type === "poison") poi = poi*2;
            else if (curr_type === "ground") gro = gro*2;
            else if (curr_type === "flying") fly = fly*2;
            else if (curr_type === "psychic") psy = psy*2;
            else if (curr_type === "bug") bug = bug*2;
            else if (curr_type === "rock") roc = roc*2;
            else if (curr_type === "ghost") gho = gho*2;
            else if (curr_type === "dragon") dra = dra*2;
            else if (curr_type === "dark") dar = dar*2;
            else if (curr_type === "steel") ste = ste*2;
            else if (curr_type === "fairy") fai = fai*2;
          }
          for (let j = 0; j < list_of_half_dmg2.length; j++) {
            const curr_type = list_of_half_dmg2[j].name;
            if (curr_type === "normal") nor = nor*0.5;
            else if (curr_type === "fire") fir = fir*0.5;
            else if (curr_type === "water") wat = wat*0.5;
            else if (curr_type === "electric") ele = ele*0.5;
            else if (curr_type === "grass") gra = gra*0.5;
            else if (curr_type === "ice") ice = ice*0.5;
            else if (curr_type === "fighting") fig = fig*0.5;
            else if (curr_type === "poison") poi = poi*0.5;
            else if (curr_type === "ground") gro = gro*0.5;
            else if (curr_type === "flying") fly = fly*0.5;
            else if (curr_type === "psychic") psy = psy*0.5;
            else if (curr_type === "bug") bug = bug*0.5;
            else if (curr_type === "rock") roc = roc*0.5;
            else if (curr_type === "ghost") gho = gho*0.5;
            else if (curr_type === "dragon") dra = dra*0.5;
            else if (curr_type === "dark") dar = dar*0.5;
            else if (curr_type === "steel") ste = ste*0.5;
            else if (curr_type === "fairy") fai = fai*0.5;
          }
          for (let k = 0; k < list_of_immune_dmg2.length; k++) {
            const curr_type = list_of_immune_dmg2[k].name;
            if (curr_type === "normal") nor = nor*0;
            else if (curr_type === "fire") fir = fir*0;
            else if (curr_type === "water") wat = wat*0;
            else if (curr_type === "electric") ele = ele*0;
            else if (curr_type === "grass") gra = gra*0;
            else if (curr_type === "ice") ice = ice*0;
            else if (curr_type === "fighting") fig = fig*0;
            else if (curr_type === "poison") poi = poi*0;
            else if (curr_type === "ground") gro = gro*0;
            else if (curr_type === "flying") fly = fly*0;
            else if (curr_type === "psychic") psy = psy*0;
            else if (curr_type === "bug") bug = bug*0;
            else if (curr_type === "rock") roc = roc*0;
            else if (curr_type === "ghost") gho = gho*0;
            else if (curr_type === "dragon") dra = dra*0;
            else if (curr_type === "dark") dar = dar*0;
            else if (curr_type === "steel") ste = ste*0;
            else if (curr_type === "fairy") fai = fai*0;
          }
          
        }

        // Update all the colours
        update_type_defense_colour("pkm_type_nor_val", nor);
        update_type_defense_colour("pkm_type_fir_val", fir);
        update_type_defense_colour("pkm_type_wat_val", wat);
        update_type_defense_colour("pkm_type_ele_val", ele);
        update_type_defense_colour("pkm_type_gra_val", gra);
        update_type_defense_colour("pkm_type_ice_val", ice);
        update_type_defense_colour("pkm_type_fig_val", fig);
        update_type_defense_colour("pkm_type_poi_val", poi);
        update_type_defense_colour("pkm_type_gro_val", gro);
        update_type_defense_colour("pkm_type_fly_val", fly);
        update_type_defense_colour("pkm_type_psy_val", psy);
        update_type_defense_colour("pkm_type_bug_val", bug);
        update_type_defense_colour("pkm_type_roc_val", roc);
        update_type_defense_colour("pkm_type_gho_val", gho);
        update_type_defense_colour("pkm_type_dra_val", dra);
        update_type_defense_colour("pkm_type_dar_val", dar);
        update_type_defense_colour("pkm_type_ste_val", ste);
        update_type_defense_colour("pkm_type_fai_val", fai);

      }).catch((error) => {
        console.log('There was an ERROR: ', error);
      });
    }
    // =======================================================================
    // =======================================================================
    // =======================================================================

    const change_image_strip_colours = (types) => {
      // If single type 
      if (types.length === 1) {
        // Set for a big strip
        document.getElementById("type_block_2").style.display = "none";
        document.getElementById("type_block_1").style.height = "60px";
        document.getElementById("type_block_1").style.borderBottom = "5px solid rgb(62,65,78)";
        // Set the actual type to be background
        document.getElementById("type_block_1").className = "type_block_" + types[0].type.name;
      } 
      // If double type
      else {
        // Set to be 2 different strips
        document.getElementById("type_block_2").style.display = "block";
        document.getElementById("type_block_1").style.height = "30px";
        document.getElementById("type_block_1").style.borderBottom = "none";
        // Set the two strips
        document.getElementById("type_block_1").className = "type_block_" + types[0].type.name;
        document.getElementById("type_block_2").className = "type_block_" + types[1].type.name;
      }
    }


    const update_type_colours = (changed_type_div, type_name) => {
      let background_color;
      let border_color; 
      
      
      if (type_name === "normal") {
        background_color = 'rgb(170,170,153)';
        border_color = 'rgb(136,136,122)';
      } else if (type_name === "fire") {
        background_color = 'rgb(255,68,34)';
        border_color = 'rgb(204,54,27)';
      } else if (type_name === "water") {
        background_color = 'rgb(51,153,255)';
        border_color = 'rgb(41,122,204)';
      } else if (type_name === "electric") {
        background_color = 'rgb(255,204,51)';
        border_color = 'rgb(204,163,41)';
      } else if (type_name === "grass") {
        background_color = 'rgb(119,204,85)';
        border_color = 'rgb(95,163,68)';
      } else if (type_name === "ice") {
        background_color = 'rgb(102,204,255)';
        border_color = 'rgb(82,163,204)';
      } else if (type_name === "fighting") {
        background_color = 'rgb(187,85,68)';
        border_color = 'rgb(150,68,54)';
      } else if (type_name === "poison") {
        background_color = 'rgb(170,85,153)';
        border_color = 'rgb(136,68,122)';
      } else if (type_name === "ground") {
        background_color = 'rgb(221,187,85)';
        border_color = 'rgb(177,150,68)';
      } else if (type_name === "flying") {
        background_color = 'rgb(136,153,255)';
        border_color = 'rgb(109,122,204)';
      } else if (type_name === "psychic") {
        background_color = 'rgb(255,85,153)';
        border_color = 'rgb(204,68,122)';
      } else if (type_name === "bug") {
        background_color = 'rgb(170,187,34)';
        border_color = 'rgb(136,150,27)';
      } else if (type_name === "rock") {
        background_color = 'rgb(187,170,102)';
        border_color = 'rgb(150,136,82)';
      } else if (type_name === "ghost") {
        background_color = 'rgb(102,102,187)';
        border_color = 'rgb(82,82,150)';
      } else if (type_name === "dragon") {
        background_color = 'rgb(119,102,238)';
        border_color = 'rgb(95,82,190)';
      } else if (type_name === "dark") {
        background_color = 'rgb(119,85,68)';
        border_color = 'rgb(95,68,54)';
      } else if (type_name === "steel") {
        background_color = 'rgb(170,170,187)';
        border_color = 'rgb(136,136,150)';
      } else if (type_name === "fairy") {
        background_color = 'rgb(238,153,238)';
        border_color = 'rgb(190,122,190)';
      }

      changed_type_div.style.backgroundColor = background_color;
      changed_type_div.style.borderColor = border_color;

    }


    const change_bar_appearances = (hp, atk, def, spatk, spdef, speed) => {
      document.getElementById("pkm_base_stat_hp").innerText   = hp;
      document.getElementById("pkm_base_stat_atk").innerText  = atk;
      document.getElementById("pkm_base_stat_def").innerText  = def;
      document.getElementById("pkm_base_stat_satk").innerText = spatk;
      document.getElementById("pkm_base_stat_sdef").innerText = spdef;
      document.getElementById("pkm_base_stat_spd").innerText  = speed;

      change_bar_colour("pkm_base_stat_hp_bar", hp);
      change_bar_colour("pkm_base_stat_atk_bar", atk);
      change_bar_colour("pkm_base_stat_def_bar", def);
      change_bar_colour("pkm_base_stat_satk_bar", spatk);
      change_bar_colour("pkm_base_stat_sdef_bar", spdef);
      change_bar_colour("pkm_base_stat_spd_bar", speed);

    }
    const change_bar_colour = (id, stat) => {
      let bar = document.getElementById(id);
      bar.style.width = stat*1.5 + "px";

     /* if (stat === 0 || stat < 0) {
        bar.style.borderColor = "black";
      }
      else if (stat > 0 && stat <= 30) {
        bar.style.borderColor = "rgb(207,58,58)";
        bar.style.backgroundColor = "rgb(243, 68, 68)";
      } 
      else if (stat > 30 && stat <= 60) {
        bar.style.borderColor = "rgb(217,108,13)";
        bar.style.backgroundColor = "rgb(255, 127, 15)";
      } 
      else if (stat > 60 && stat <= 90) {
        bar.style.borderColor = "rgb(217,188,74)";
        bar.style.backgroundColor = "rgb(255, 221, 87)";
      }
      else if (stat > 90 && stat <= 120) {
        bar.style.borderColor = "rgb(136,195,18)";
        bar.style.backgroundColor = "rgb(160, 229, 21)";
      }
      else if (stat > 120 && stat <= 150) {
        bar.style.borderColor = "rgb(0,165,157)";
        bar.style.backgroundColor = "rgb(0, 194, 184)";
      } else {
        bar.style.borderColor = "rgb(1,140,192)";
        bar.style.backgroundColor = "rgb(1, 180, 248)";
      }*/
    }

    const set_moves_table = (moves) => {
      document.getElementById("pkm_modal_list_moves").innerHTML = "";
      document.getElementById("pkm_modal_list_tm_moves").innerHTML = "";
      document.getElementById("pkm_modal_list_egg_moves").innerHTML = "";

      const latest_game = "sword-shield";

      console.log(moves);
      
      for (let i = 0; i < moves.length; i++) {

        let latest_move = {};
        latest_move =  moves[i].version_group_details[moves[i].version_group_details.length - 1];
        for (let j = 0; j < moves[i].version_group_details.length; j++) {
          if (moves[i].version_group_details[j].version_group.name === latest_game) {

            latest_move = moves[i].version_group_details[j];
          }
        }

        P.getMoveByName(moves[i].move.name).then((response) => {

          const move_row = document.createElement("tr");
          const method = latest_move.move_learn_method.name;

          const r_move = document.createElement("td");
          let temp_move = moves[i].move.name.replace(/\b\w/g, (c) => c.toUpperCase())
          temp_move = temp_move.replace('-', ' ');
          r_move.className = "move_name_text";
          r_move.innerText = (temp_move);

          const r_type = document.createElement("td");
          r_type.className = "move_name_text_center add_type_text_shadow";
          update_type_colours(r_type, response.type.name);
          r_type.innerText = response.type.name.toUpperCase();
          
          const r_category = document.createElement("td");
          r_category.className = "move_name_text_center";
          let temp_cat = response.damage_class.name.charAt(0).toUpperCase() + response.damage_class.name.slice(1);
          r_category.innerText = temp_cat;

          const r_power = document.createElement("td");
          (response.power !== null) ? r_power.innerText = response.power : r_power.innerText = "-" ;
          r_power.className = "move_number";

          const r_accuracy = document.createElement("td");
          (response.accuracy !== null) ? r_accuracy.innerText = response.accuracy : r_accuracy.innerText = "-" ;
          r_accuracy.className = "move_number";

          if (method === "level-up") {
            const r_level = document.createElement("td");
            r_level.innerText = latest_move.level_learned_at;
            r_level.className = "move_number";

            move_row.appendChild(r_level);
            move_row.appendChild(r_move); 
            move_row.appendChild(r_type);
            move_row.appendChild(r_category);
            move_row.appendChild(r_power);
            move_row.appendChild(r_accuracy);
            document.getElementById("pkm_modal_list_moves").appendChild(move_row);
          } 

          else if (method === "machine") {
            const r_id = document.createElement("td");
            for (let tm = 0; tm < response.machines.length; tm++) {
              if (response.machines[tm].version_group.name === latest_game) {
                let pokemon_locations_promise = fetch(response.machines[tm].machine.url);
                pokemon_locations_promise.then(response => {
                  response.json().then(data => {
                    r_id.innerText = data.item.name.toUpperCase();
                  })
                }).catch((error) => {
                  console.log('There was an ERROR: ', error);
                });
              }
            }
            move_row.appendChild(r_id);
            move_row.appendChild(r_move); 
            move_row.appendChild(r_type);
            move_row.appendChild(r_category);
            move_row.appendChild(r_power);
            move_row.appendChild(r_accuracy);
            document.getElementById("pkm_modal_list_tm_moves").appendChild(move_row);
          } 
          
          
          else if (method === "egg") {
            move_row.appendChild(r_move); 
            move_row.appendChild(r_type);
            move_row.appendChild(r_category);
            move_row.appendChild(r_power);
            move_row.appendChild(r_accuracy);
            document.getElementById("pkm_modal_list_egg_moves").appendChild(move_row);
          }

        }).catch((error) => {
          console.log('There was an ERROR: ', error);
        });
      }
    }


    const set_up_pagination = (pkm_list) => {
      const num_entries = document.getElementById("num_entries").value;
      const num_pages = Math.ceil(pkm_list.length/num_entries)
      console.log(num_pages);

      document.getElementById("pokedex_pagination").innerHTML = "";

      for (let i = 0; i < num_pages; i++) {
        const paginate = document.createElement("a");
        paginate.innerText = i + 1;

        paginate.onclick = function(){
          document.getElementById("pokedex_table").innerHTML = "";
          const num_entries_end = parseInt( (i)*num_entries) + parseInt(num_entries)
          const subset_list = pkm_list.slice((i)*num_entries, num_entries_end);

          prev_and_next(pkm_list, num_entries, i);
          
          change_paginate_colour(paginate);
          create_db_entries(subset_list);
        }
        document.getElementById("pokedex_pagination").appendChild(paginate);
      }
      
    }

    const prev_and_next = (pkm_list, num_entries, i) => {
      let nodes = document.getElementById("pokedex_pagination").childNodes;
      document.getElementById("left_arrow").onclick = function() {
        if (i > 0) {
          const end = parseInt( (i-1)*num_entries) + parseInt(num_entries)
          const subset = pkm_list.slice((i-1)*num_entries, end);
          document.getElementById("pokedex_table").innerHTML = "";
          
          left_and_right_arrow("left");
          prev_and_next(pkm_list, num_entries, i-1);
          create_db_entries(subset);
        }
      }
      document.getElementById("right_arrow").onclick = function() {
        if (i < nodes.length - 1) {
          const end = parseInt( (i+1)*num_entries) + parseInt(num_entries)
          const subset = pkm_list.slice((i+1)*num_entries, end);
          document.getElementById("pokedex_table").innerHTML = "";
          
          left_and_right_arrow("right");
          prev_and_next(pkm_list, num_entries, i+1);
          create_db_entries(subset);
        }
      }
    }

    const left_and_right_arrow = (direction) => {
      let dir;
      if (direction === "left") {dir = -1;}
      else if (direction === "right") {dir = 1;}
      else {dir = 0}

      let nodes = document.getElementById("pokedex_pagination").childNodes;
      for(let i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() === 'a' && nodes[i].className === "pagination_clicked") {
          if (i > 0 && direction === "left") {
            console.log(i + dir);
            nodes[i + dir].className = "pagination_clicked";
            nodes[i].className = "pagination_noraml";
            break;
          } else if ( i < nodes.length - 1 && direction === "right") {
            console.log(i + dir);
            nodes[i + dir].className = "pagination_clicked";
            nodes[i].className = "pagination_noraml";
            break;
          }
        }
      }
    }

    const change_paginate_colour = (paginate) => {
      const nodes = document.getElementById("pokedex_pagination").childNodes;
      for(let i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() === 'a') {
            nodes[i].className = "pagination_noraml";
        }
      }
      paginate.className = "pagination_clicked";
    } 

    const fill_pokemon_db_table = (pkm_list) => {

      const num_entries = document.getElementById("num_entries").value;
      const og_node = document.getElementById("pokedex_pagination").childNodes;
      
      set_up_pagination(pkm_list);

      for (let i = 0; i < og_node.length; i++) {
        og_node[i].className = "pagination_noraml";
      }
      document.getElementById("pokedex_pagination").childNodes[0].className = "pagination_clicked";

      const subset_list = pkm_list.slice(0, num_entries);
      console.log(subset_list);


      change_paginate_colour(og_node[0]);
      prev_and_next(pkm_list, num_entries, 0);
      
      create_db_entries(subset_list);

    }

    const create_db_entries = (pkm_list) => {

      let pokedex = document.getElementById("pokedex_table");
      P.getPokemonByName(pkm_list) // with Promise
      .then((response) => {
        
        for (let r = 0; r < response.length; r++) {


        //console.log(response);
        const current_pokemon = response[r];
        const current_pokemon_img = current_pokemon.sprites;

        const image_original = current_pokemon_img.front_default; // Original Sprite of the Pokemon
        const image_dream_world = current_pokemon_img.other.dream_world.front_default; // Clean line of Pokemon
        const image_3d = current_pokemon_img.other.home.front_default; // 3D Image of Pokemon
        const image_official_art = current_pokemon_img.other['official-artwork'].front_default; // Official Art of Pokemon
        const pkm_img_icons = current_pokemon_img.versions['generation-viii']['icons'].front_default; // Pixel art of the pokemon from the box
        const pkm_img_red = current_pokemon_img.versions['generation-i']['red-blue'].front_default;
        const pkm_img_yellow = current_pokemon_img.versions['generation-i']['yellow'].front_default;
        const pkm_img_crystal = current_pokemon_img.versions['generation-ii']['crystal'].front_default;
        const pkm_img_gold = current_pokemon_img.versions['generation-ii']['gold'].front_default;
        const pkm_img_silver = current_pokemon_img.versions['generation-ii']['silver'].front_default;
        const pkm_img_emerald = current_pokemon_img.versions['generation-iii']['emerald'].front_default;
        const pkm_img_firered = current_pokemon_img.versions['generation-iii']['firered-leafgreen'].front_default;
        const pkm_img_ruby = current_pokemon_img.versions['generation-iii']['ruby-sapphire'].front_default;
        const pkm_img_diamond = current_pokemon_img.versions['generation-iv']['diamond-pearl'].front_default;
        const pkm_img_heartgold = current_pokemon_img.versions['generation-iv']['heartgold-soulsilver'].front_default;
        const pkm_img_platinum = current_pokemon_img.versions['generation-iv']['platinum'].front_default;
        const pkm_img_black = current_pokemon_img.versions['generation-v']['black-white'].front_default;
        const pkm_img_omegaruby = current_pokemon_img.versions['generation-vi']['omegaruby-alphasapphire'].front_default;
        const pkm_img_xy = current_pokemon_img.versions['generation-vi']['x-y'].front_default;
        const pkm_img_ultrasun = current_pokemon_img.versions['generation-vii']['ultra-sun-ultra-moon'].front_default;
        

        const curr_pkm_moves = current_pokemon.moves;
        
        




        let pkm_full_info = document.createElement('tr');
        pkm_full_info.className = "pkm_expanded_info";

        

        let pkm_full_info_data = document.createElement('td');
        pkm_full_info_data.rowSpan = "1";

        let pkm_i = document.createElement('img'); 
        pkm_i.src = image_official_art;

        let temp = document.createElement('div');
        temp.appendChild(pkm_i);
        let temp2 = document.createElement('div');
        temp2.innerText = "hello";
        temp.appendChild(temp2);
        pkm_full_info_data.appendChild(temp);

        
          
        pkm_full_info.appendChild(pkm_full_info_data);
        

        

        //const curr_pkm_weight = current_pokemon.weight;
        //const curr_pkm_height = current_pokemon.height;





        // Current Pokemon ID
        const curr_pkm_id = current_pokemon.id;
        const curr_pkm_name = current_pokemon.name;
        const curr_pkm_sprite = current_pokemon.sprites.front_default;
        // Current Pokemon Stats
        const curr_pkm_hp     = current_pokemon.stats[0].base_stat;
        const curr_pkm_atk    = current_pokemon.stats[1].base_stat;
        const curr_pkm_def    = current_pokemon.stats[2].base_stat;
        const curr_pkm_sp_atk = current_pokemon.stats[3].base_stat;
        const curr_pkm_sp_def = current_pokemon.stats[4].base_stat;
        const curr_pkm_speed  = current_pokemon.stats[5].base_stat;
        const curr_pkm_total  = curr_pkm_hp + curr_pkm_atk + curr_pkm_def + curr_pkm_sp_atk + curr_pkm_sp_def + curr_pkm_speed;


        const curr_pkm_type_1 = current_pokemon.types[0];
        const curr_pkm_type_2 = current_pokemon.types[1];
        
        


        

        


        



        // Add a new row to the pokedex
        let new_pokemon_row = document.createElement('tr');
        
        // Current Pokemon Information (Id, name, image)
        let pkm_data_id = document.createElement('td');
        pkm_data_id.className = 'darker_table_colour';
        pkm_data_id.innerText = curr_pkm_id;
        let pkm_data_name = document.createElement('td');
        pkm_data_name.className = "pkm_name_highlgiht";
        pkm_data_name.innerText = curr_pkm_name.replace(/\b\w/g, (c) => c.toUpperCase());

        let pkm_data_sprite = document.createElement('td');
        pkm_data_sprite.className = 'darker_table_colour';
        let pkm_data_img = document.createElement('img'); 
        pkm_data_img.src = curr_pkm_sprite;
        pkm_data_sprite.appendChild(pkm_data_img);
        // Check if pokemon is multi-typed
        let pkm_data_type = document.createElement('td');
        pkm_data_type.className = 'lighter_table_colour';
        let pkm_data_type_1 = document.createElement('div');
        pkm_data_type_1.className = "pkm_type";
        update_type_colours(pkm_data_type_1, curr_pkm_type_1.type.name);
        pkm_data_type_1.innerText = curr_pkm_type_1.type.name.toUpperCase();
        pkm_data_type.appendChild(pkm_data_type_1);
        if (curr_pkm_type_2 !== undefined) {
          let pkm_data_type_2 = document.createElement('div');
          pkm_data_type_2.className = "pkm_type";
          update_type_colours(pkm_data_type_2, curr_pkm_type_2.type.name);
          pkm_data_type_2.innerText = curr_pkm_type_2.type.name.toUpperCase();
          pkm_data_type.appendChild(pkm_data_type_2);
        }

        
        



        // Giving the table columns the corresponding values
        let pkm_data_hp = document.createElement('td');
        pkm_data_hp.className = 'darker_table_colour';
        pkm_data_hp.innerText = curr_pkm_hp;
        let pkm_data_atk = document.createElement('td');
        pkm_data_atk.className = 'lighter_table_colour';
        pkm_data_atk.innerText = curr_pkm_atk;
        let pkm_data_def = document.createElement('td');
        pkm_data_def.className = 'darker_table_colour';
        pkm_data_def.innerText = curr_pkm_def;
        let pkm_data_sak = document.createElement('td');
        pkm_data_sak.className = 'lighter_table_colour';
        pkm_data_sak.innerText = curr_pkm_sp_atk;
        let pkm_data_sdf = document.createElement('td');
        pkm_data_sdf.className = 'darker_table_colour';
        pkm_data_sdf.innerText = curr_pkm_sp_def;
        let pkm_data_spd = document.createElement('td');
        pkm_data_spd.className = 'lighter_table_colour';
        pkm_data_spd.innerText = curr_pkm_speed;
        let pkm_data_total = document.createElement('td');
        pkm_data_total.className = "total_table_colour";
        pkm_data_total.innerText = curr_pkm_total;

        

        // Expand the pokemon if the user wishes to chose to
        


        
        




        // Add each column & their value to the row and then add the row to the table (pokedex)
        new_pokemon_row.appendChild(pkm_data_id);
        new_pokemon_row.appendChild(pkm_data_name);
        new_pokemon_row.appendChild(pkm_data_sprite);
        new_pokemon_row.appendChild(pkm_data_type);
        new_pokemon_row.appendChild(pkm_data_hp);
        new_pokemon_row.appendChild(pkm_data_atk);
        new_pokemon_row.appendChild(pkm_data_def);
        new_pokemon_row.appendChild(pkm_data_sak);
        new_pokemon_row.appendChild(pkm_data_sdf);
        new_pokemon_row.appendChild(pkm_data_spd);
        new_pokemon_row.appendChild(pkm_data_total);

        new_pokemon_row.onmouseover = function() {
          pkm_data_id.className = "highlight_row";
          pkm_data_name.className = "highlight_row";
          pkm_data_sprite.className = "highlight_row";
          pkm_data_type.className = "highlight_row";
          pkm_data_hp.className = "highlight_row";
          pkm_data_atk.className = "highlight_row";
          pkm_data_def.className = "highlight_row";
          pkm_data_sak.className = "highlight_row";
          pkm_data_sdf.className = "highlight_row";
          pkm_data_spd.className = "highlight_row";
          pkm_data_total.className = "highlight_row";
        }
        new_pokemon_row.onmouseout = function() {
          pkm_data_id.className = "darker_table_colour";
          pkm_data_name.className = "pkm_name_highlgiht";
          pkm_data_sprite.className = "darker_table_colour";
          pkm_data_type.className = "lighter_table_colour";
          pkm_data_hp.className = "darker_table_colour";
          pkm_data_atk.className = "lighter_table_colour";
          pkm_data_def.className = "darker_table_colour";
          pkm_data_sak.className = "lighter_table_colour";
          pkm_data_sdf.className = "darker_table_colour";
          pkm_data_spd.className = "lighter_table_colour";
          pkm_data_total.className = "total_table_colour"; 
        }

        new_pokemon_row.onclick = function(){
          document.getElementById("pkm_modal_name").innerText = current_pokemon.name.replace(/\b\w/g, (c) => c.toUpperCase());
          document.getElementById("pkm_modal_id").innerText = "#" + current_pokemon.id;
          if (new_pokemon_row.style.display === "none" || new_pokemon_row.style.display === "") {
            document.getElementById("pkm_modal").style.display = "block"; 
            
          } 
          change_image_strip_colours(current_pokemon.types);

          change_bar_appearances(curr_pkm_hp, curr_pkm_atk, curr_pkm_def, curr_pkm_sp_atk, curr_pkm_sp_def, curr_pkm_speed);
          document.getElementById("pkm_base_stat_ttl").innerText  = curr_pkm_total;

          // Check the types, if they have multiple then have to display it while also dyamically updating colours
          document.getElementById("pkm_type_1").innerText = (curr_pkm_type_1.type.name).toUpperCase();
          let type_1_div = document.getElementById("pkm_type_1");
          let type_2_div = document.getElementById("pkm_type_2");

          update_type_colours(type_1_div, curr_pkm_type_1.type.name);
          if (curr_pkm_type_2 !== undefined) {
            document.getElementById("pkm_type_2").style.display = "inline-block";
            document.getElementById("pkm_type_2").innerText = (curr_pkm_type_2.type.name).toUpperCase();
            update_type_colours(type_2_div, curr_pkm_type_2.type.name);
          } else {
            document.getElementById("pkm_type_2").style.display = "none";
          }


          // Update the Abilities section
          document.getElementById("pkm_modal_list_of_abilities").innerHTML = "";
          const list_of_abilities = document.getElementById("pkm_modal_list_of_abilities");
          for (let i = 0; i < current_pokemon.abilities.length; i++) {

            let ability_text = "test" + i;
            let clicked = 0;

            // check if it's a hidden ability for special character
            let temp_ability = document.createElement("li");
            let ability_name = current_pokemon.abilities[i].ability.name.replace(/\b\w/g, (c) => c.toUpperCase())
            ability_name = ability_name.replace('-', ' ');
            
            let temp_ability_name = document.createElement("div");
            temp_ability_name.className = "ability_name";

            if (current_pokemon.abilities[i].is_hidden === true) {
              temp_ability_name.innerText = ability_name + "(*)";
            } else {
              temp_ability_name.innerText = ability_name;
            }

            const ability_description = document.createElement("div");

            P.getAbilityByName(current_pokemon.abilities[i].ability.name).then((ab_resp) => {

              // Get the latest english (en) text
              for (let k = 0; k < ab_resp.effect_entries.length; k++) {
                if (ab_resp.effect_entries[k].language.name === "en") ability_text = ab_resp.effect_entries[k].effect;
              }
              
              ability_description.innerText = ability_text;
              ability_description.className = "ability_name_more_details";
              

              temp_ability_name.onclick = function() {
                if (clicked === 0) {

                  ability_description.style.display = "block";
                  temp_ability_name.style.backgroundImage = "url('https://i.imgur.com/LHQU04g.png')";
                  clicked = 1;
                } else {
                  ability_description.style.display = "none";
                  temp_ability_name.style.backgroundImage = "url('https://i.imgur.com/X2fIe3o.png')";
                  clicked = 0;
                }
              }
              temp_ability.appendChild(temp_ability_name);
              temp_ability.appendChild(ability_description);
            })
            .catch((error2) => {
              console.log('Couldnt find ability: ', error2);
            });

            list_of_abilities.appendChild(temp_ability);           
                    
          }

          // Get the Pokemon's Location
          const pokemon_locations = "https://pokeapi.co/api/v2/pokemon/" + curr_pkm_name + "/encounters";
          let pokemon_locations_promise = fetch(pokemon_locations);
          pokemon_locations_promise.then(response=>{
             if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
              response.json().then(data => {
                console.log(data);
                
                clear_all_loactions();
                for (let l = 0; l < data.length; l++) {
                  //console.log(data[l].version_details);
                  
                  // Game Location
                  let temp_area_name = data[l].location_area.name.replace("-area", "");
                  temp_area_name = temp_area_name.replace(/\b\w/g, (c) => c.toUpperCase())
                  temp_area_name = temp_area_name.replaceAll('-', ' ');

                  for (let g = 0; g < data[l].version_details.length; g++) {
                    if (data[l].version_details[g].version.name === "red" || data[l].version_details[g].version.name === "blue") {
                      document.getElementById("loc_redblu_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "yellow") {
                      document.getElementById("loc_yellow_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "gold") {
                      document.getElementById("loc_gold_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "silver") {
                      document.getElementById("loc_silver_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "crystal") {
                      document.getElementById("loc_crystal_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "ruby" ) {
                      document.getElementById("loc_rubsap_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "firered") {
                      document.getElementById("loc_fred_lgreen_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "emerald") {
                      document.getElementById("loc_emerald_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "diamond") {
                      document.getElementById("loc_diaperl_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "platinum") {
                      document.getElementById("loc_platinum_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "heartgold") {
                      document.getElementById("loc_hgss_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "black") {
                      document.getElementById("loc_black_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "white") {
                      document.getElementById("loc_white_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "black-2" ) {
                      document.getElementById("loc_b2w2_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "omegaruby" ) {
                      document.getElementById("loc_oras_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "x" ) {
                      document.getElementById("loc_xy_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "sun" ) {
                      document.getElementById("loc_sunmoon_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "ultrasun" ) {
                      document.getElementById("loc_usum_value").innerText += temp_area_name +"\n";
                    } else if (data[l].version_details[g].version.name === "letsgoeevee") {
                      document.getElementById("loc_lgplge_value").innerText += temp_area_name+"\n";
                    } else if (data[l].version_details[g].version.name === "sword") {
                      document.getElementById("loc_swoshi_value").innerText += temp_area_name + "\n";
                    }
                  }
                  
                }

              }).catch(error => {
                console.log(error.message);
              })
          });


          // Weight is in hectograms: to convert to pounds divide by 4.5359237
          //                          to convert to kilograms divide by 10
          // Height is in decimetres: to convert to feet divide by 3.048
          //                          to convert to metres divide by 10
          const feet = Math.floor(current_pokemon.height/3.048);
          const inches =  (current_pokemon.height/3.048)*12;
          const inch_modulo = (inches % 12).toFixed(0);

          document.getElementById("pkm_modal_height").innerText = feet + "' " + inch_modulo + "\"";
          document.getElementById("pkm_modal_height_m").innerText = current_pokemon.height/10 + "m";
          document.getElementById("pkm_modal_weight").innerText = (current_pokemon.weight/4.5359237).toFixed(1) + "lbs";
          document.getElementById("pkm_modal_weight_kg").innerText = current_pokemon.weight/10 + "kg";
          
          // Update the Pokemon with more specialised Information
          P.getPokemonSpeciesByName(curr_pkm_name) // with Promise
          .then((response) => {
            console.log("Species By Name!")
            console.log(response);

            document.getElementById("pkm_modal_evolution_chart");
            
            // Get the Evolution Line
            console.log('evolution line:');
            let pokemon_locations_promise = fetch(response.evolution_chain.url);
            pokemon_locations_promise.then(evo_family => {
              evo_family.json().then(Edata => {

                //let evo_list = "";
                let evo_list = [];
                document.getElementById("pkm_modal_evolution_chart").innerHTML = "";
                //console.log(recurseEvolutionChart(Edata.chain, evo_list));
                const evo_chain = evo_chain_calculate(Edata.chain)
                create_evolution_visual(evo_chain);
                console.log();

              });
            }).catch((error) => {
              console.log('There was an ERROR: ', error);
            });

            // List of Pokemon Egg Groups
            /*document.getElementById("pkm_modal_egg_family").innerHTML = "";
            const egg_groups_list = document.createElement("ul");
            for (let e = 0; e < response.egg_groups.length; e++) {
              const egg_group_name = document.createElement("li");
              egg_group_name.innerText = response.egg_groups[e].name;
              egg_groups_list.appendChild(egg_group_name);
            }
            document.getElementById("pkm_modal_egg_family").appendChild(egg_groups_list);*/

            // List of all other Pokemon Names (other languages)
            //<div className='circle_location'></div>
            document.getElementById("pkm_modal_other_language_names").innerHTML = "";
            const pkm_other_lng_names_list = document.createElement("ul");
            pkm_other_lng_names_list.className = "list_of_pkm_alt_names";
            for (let e = 0; e < response.names.length; e++) {

              const lng_name = document.createElement("li");
              lng_name.className = "alt_pkm_names";
              const lng_emblem = document.createElement("div");
              change_location_map(lng_emblem, response.names[e].language.name);
              lng_emblem.className = 'circle_location';
              const lng_pk_name = document.createElement("span");
              lng_pk_name.innerText = ": " + response.names[e].name;
              const lng_pk_loc = document.createElement("span");
              lng_pk_loc.innerText = "(" + response.names[e].language.name + ")";
              lng_pk_loc.className = "lng_pk_loc_text";

              lng_name.appendChild(lng_emblem);
              lng_name.appendChild(lng_pk_name);
              lng_name.appendChild(lng_pk_loc);
              pkm_other_lng_names_list.appendChild(lng_name);
            }
            document.getElementById("pkm_modal_other_language_names").appendChild(pkm_other_lng_names_list);

            // Change Genera
            let genera_text = "";
            for (let e = 0; e < response.genera.length; e++) {
              if (response.genera[e].language.name === "en") genera_text = response.genera[e].genus;
            }
            document.getElementById("pkm_modal_genera").innerText = genera_text;




            console.log(response.flavor_text_entries);
            // Change Flavour Text
            let flavour_text = "";
            document.getElementById("pkm_modal_flavour_text").innerHTML = "";
            for (let e = 0; e < response.flavor_text_entries.length; e++) {
              if (response.flavor_text_entries[e].language.name === "en" && 
                  no_duplicate_version(response.flavor_text_entries[e])) {
                flavour_text = response.flavor_text_entries[e].flavor_text;
                const version_name = response.flavor_text_entries[e].version.name;
                const pokemon_desc = response.flavor_text_entries[e].flavor_text;

                
                const separator = document.createElement("span");
                separator.style.color = "rgb(149, 153, 163)";
                separator.innerText = " / ";

                // Game Version + Colour
                const version_row = document.createElement("div");
                const version_span = document.createElement("span");
                version_row.className = "version_row_style";
                let v_name = version_name.replace(/\b\w/g, (c) => c.toUpperCase());
                v_name.replace('-', ' ');
                version_span.innerText = v_name;
                version_row.appendChild(version_span);

                if (version_name === "red") {
                  const add_v = document.createElement("span");
                  add_v.innerText = "Blue";
                  version_span.style.color = "#d64541";
                  add_v.style.color = "#4b77be";
                  version_row.appendChild(separator);
                  version_row.appendChild(add_v);
                } else if (version_name === "yellow") {
                  version_span.style.color = "#f5d76e";
                } else if (version_name === "gold") {
                  version_span.style.color = "#c7a720";
                } else if (version_name === "silver") {
                  version_span.style.color = "#bdc3c7";
                } else if (version_name === "crystal") {
                  version_span.style.color = "#68c3a3";
                } else if (version_name === "ruby") {
                  const add_v = document.createElement("span");
                  add_v.innerText = "Sapphire";
                  version_span.style.color = "#d64541";
                  add_v.style.color = "#4b77be";
                  version_row.appendChild(separator);
                  version_row.appendChild(add_v);
                } else if (version_name === "emerald") {
                  version_span.style.color = "#3cb572";
                } else if (version_name === "firered") {
                  version_span.style.color = "#d64541";
                } else if (version_name === "leafgreen") {
                  version_span.style.color = "#3cb572";
                } else if (version_name === "pearl") {
                  const add_v = document.createElement("span");
                  add_v.innerText = "Diamond";
                  add_v.style.color = "#add8e6";
                  const add_v2 = document.createElement("span");
                  add_v2.innerText = " / Platinum";
                  add_v2.style.color = "#bdc3c7";
                  version_span.style.color = "#dda0dd";
                  version_row.appendChild(separator);
                  version_row.appendChild(add_v);
                  version_row.appendChild(add_v2);
                } else if (version_name === "heartgold") {
                  version_span.style.color = "#c7a720";
                } else if (version_name === "soulsilver") {
                  version_span.style.color = "#bdc3c7";
                } else if (version_name === "white") {
                  const add_v = document.createElement("span");
                  add_v.innerText = "Black";
                  version_span.style.color = "#d5d5d5";
                  add_v.style.color = "#808080";
                  version_row.appendChild(separator);
                  version_row.appendChild(add_v);
                } else if (version_name === "x") {
                  version_span.style.color = "#4b77be";
                } else if (version_name === "y") {
                  version_span.style.color = "#d64541";
                } else if (version_name === "omega-ruby") {
                  const add_v = document.createElement("span");
                  add_v.innerText = "Alpha Sapphire";
                  version_span.style.color = "#d64541";
                  add_v.style.color = "#4b77be";
                  version_row.appendChild(separator);
                  version_row.appendChild(add_v);
                } else if (version_name === "lets-go-pikachu") {
                  const add_v = document.createElement("span");
                  add_v.innerText = "Lets Go Eevee";
                  version_span.style.color = "#f5d76e";
                  add_v.style.color = "#bb671c";
                  version_row.appendChild(separator);
                  version_row.appendChild(add_v);
                } else if (version_name === "sword") {
                  version_span.style.color = "#d64541";  
                } else if (version_name === "shield") {
                  version_span.style.color = "#4b77be";  
                } else {
                  version_span.style.color = "#bdc3c7";
                }

                


                
                // Description of Game
                const new_desc_row = document.createElement("div");
                new_desc_row.className = "new_desc_row_style";
                const desc_row = document.createElement("div");
                let d_name = pokemon_desc.replace(/[\n\r\f]/g, ' ');
                d_name.replace('-', ' ');
                desc_row.innerText = d_name;
                

                new_desc_row.appendChild(version_row);
                new_desc_row.appendChild(desc_row);
                document.getElementById("pkm_modal_flavour_text").appendChild(new_desc_row);

              };
            }

            let f_text = flavour_text.replace(/[\n\r\f]/g, ' ');
            document.getElementById("pkm_modal_default_fltext").innerText = f_text;

            let clicked = 0;
            const expand_box = document.getElementById("pkm_modal_default_text");
            expand_box.onclick = function() {
                if (clicked === 0) {
                  document.getElementById("pkm_all_flavour_text_entries").style.display = "block";
                  document.getElementById("pkm_modal_default_fltext").style.display = "none";
                  document.getElementById("pkm_modal_default_text").style.backgroundImage = "url('https://i.imgur.com/LHQU04g.png')";
                  clicked = 1;
                } else {
                  document.getElementById("pkm_all_flavour_text_entries").style.display = "none";
                  document.getElementById("pkm_modal_default_fltext").style.display = "inline-block";
                  document.getElementById("pkm_modal_default_text").style.backgroundImage = "url('https://i.imgur.com/X2fIe3o.png')";
                  clicked = 0;
                }
              }


          }).catch((error) => {
            console.log('There was an ERROR: ', error);
          })


          // Set the pokemon's moves
          set_moves_table(curr_pkm_moves);
          
          // Update type weaknesses
          // Assign the weaknesses of the pokemon
          update_type_defenses(curr_pkm_type_1, curr_pkm_type_2);


          document.getElementById("pkm_modal_pkm_image").innerHTML = "";
          let pkm_image = document.createElement("img")
          pkm_image.src = image_official_art;
          document.getElementById("pkm_modal_pkm_image").appendChild(pkm_image);



          // Change the clicker to a spinner
          const list_of_images = [
            {src: image_original, name: "Original Sprite"},
            {src: image_3d, name: "3D"},
            {src: image_official_art, name: "Official Artwork"},
            {src: image_dream_world, name: "Dream World"},
            {src: pkm_img_icons, name: "PC Icon"},
            {src: pkm_img_red, name: "Red/Blue"},
            {src: pkm_img_yellow, name: "Yellow"},
            {src: pkm_img_crystal, name: "Crystal"},
            {src: pkm_img_gold, name: "Gold"},
            {src: pkm_img_silver, name: "Silver"},
            {src: pkm_img_emerald, name: "Emerald"},
            {src: pkm_img_firered, name: "Fire Red/Leaf Green"},
            {src: pkm_img_ruby, name: "Ruby/Sapphire"},
            {src: pkm_img_diamond, name: "Diamond/Perl"},
            {src: pkm_img_heartgold, name: "Heartgold/Soul Silver"},
            {src: pkm_img_platinum, name: "Platinum"},
            {src: pkm_img_black, name: "Black/White"},
            {src: pkm_img_omegaruby, name: "Omega Ruby/Sapphire"},
            {src: pkm_img_xy, name: "X/Y"},
            {src: pkm_img_ultrasun, name: "Ultra Sun/Moon"},
          ];
          set_spinner_images(list_of_images);

        }; 

        pokedex.appendChild(new_pokemon_row);
        pokedex.appendChild(pkm_full_info);
      }
      })
      .catch((error) => {
        console.log('There was an ERROR: ', error);
      });
    }






    



    


    // =======================================================================
    // ============================ SEARCH BAR ===============================
    // =======================================================================

    // Check if string is a number
    function isNumeric(str) {
      if (typeof str != "string") return false // we only process strings!  
      return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    // clicking the Enter key will update the list
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        get_filtered_list();
      }
    }

    function get_filtered_list() {
      document.getElementById("pokedex_table").innerHTML = "";
      let filtered_pkm = [];
      const substring = document.getElementById("pkm_search").value;
      // If given a number, filter on ID number
      if (isNumeric(substring)) {
        console.log('yes');
        for (let i = 0; i < list_of_all_pokemon_id.length; i++) {
          if (i.toString().includes(substring)) filtered_pkm.push(i);
        }
        fill_pokemon_db_table(filtered_pkm);
      } else {
        let pkm_ar = fetch(all_pkm_array);
        pkm_ar.then(response => {
          response.json().then(data => { // data is the array of pkm names
            // If given a string, filter on Substring
            for (let i = 0; i < data.length; i++) {
              if (data[i].includes(substring)) filtered_pkm.push(data[i]);
            }
            fill_pokemon_db_table(filtered_pkm);
          })
        }).catch((error) => {
          console.log('There was an ERROR: ', error);
        });
      }
    }
    
    // =======================================================================
    // =======================================================================
    // =======================================================================

    return (
      <div id="pkm_db_background">
        
        <div id="pkm_page_header">
          <img className="pkball_logo" src="https://2.bp.blogspot.com/-nnriC7RO7dM/VOuR_46Eb_I/AAAAAAAAAVs/u5J-XjN79SY/s1600/Pokeball.png" alt="pokeball logo"/>
          <span> Pokémon Database </span>
          <img className="pkball_logo" src="https://2.bp.blogspot.com/-nnriC7RO7dM/VOuR_46Eb_I/AAAAAAAAAVs/u5J-XjN79SY/s1600/Pokeball.png" alt="pokeball logo"/>
        </div>

        <div id="pkm_search_bar">
          <input id="pkm_search" className='search_bar' placeholder={"type to filter"} onKeyPress={(e) => handleKeyPress(e)}></input>
          <button type="submit" className="search-button">
            <img src={maginfy_glass} alt="Search" onClick={get_filtered_list}/>
          </button>
          <select id="num_entries">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div> {/* Just some test functions*/}
          <button onClick={test}>
            Test
          </button>
          <button onClick={test2}>
            Test 2
          </button>
          <button onClick={()=>fill_pokemon_db_table([4,5,6,10,145,146,147,148,149,150,151,152,153,154, 242, 280, 133, 390, 532, 270, 167, 400, 500, 600 ,700, 800])}>
            Test 3
          </button>
          <button onClick={showFile}>
            Test 4
          </button>
        </div>

          {/* Modal for the pokemon */}
          <div id="pkm_modal" className="full_pkm_info_modal" onClick={close_modal}>
            <div className="full_pkm_info_modal_content" onClick={e => e.stopPropagation()}>
              <button className="full_pkm_info_modal_close" onClick={close_modal}>&times;</button>

              <div id="pkm_modal_flexbox">

                <div id="pkm_modal_image">
                  <div id="type_block_1"/>
                  <div id="type_block_2"/>
                  <div id="pkm_modal_pkm_image">
                    Image
                  </div>
                  <div id="pkm_modal_pkmimg_flex">
                    <div id="pkm_modal_pkmimg_1" className='round_selector'></div>
                    <div id="pkm_modal_pkmimg_2" className='round_selector'></div>
                    <div id="pkm_modal_pkmimg_3" className='round_selector'></div>
                    <div id="pkm_modal_pkmimg_4" className='round_selector'></div>
                    <div id="pkm_modal_pkmimg_5" className='round_selector'></div>
                  </div>
                  <div id="pkm_modal_pkm_game_name">
                    Official Artwork
                  </div>


                  
                </div>


                

                <div id="pkm_modal_info">
                  <span id="pkm_modal_id"> ID </span>
                  <span id="pkm_modal_name"> Name </span>
                  
                  <div id="pkm_modal_further_details">

                    <div className='pkm_info_section'>
                       <div>
                        <div className='header_triangle_text'>POKÉDEX ENTRY</div>
                        <div className='triangle'/>
                      </div>
                      <div id="pkm_info_pokedex_entry">
                        <span><u>Pokémon Species:</u></span>
                        <div id="pkm_modal_genera">
                          Species
                        </div>
                      </div>

                      <div id="pkm_modal_flavour_text_initial">
                        <div id="pkm_modal_default_text">
                          POKÉDEX DESCRIPTION
                        </div>   
                        <div id="pkm_modal_default_fltext">
                          Flavour text
                        </div>             
                      </div>

                      

                      
                      
                      <div id="pkm_all_flavour_text_entries" className='pkm_flavour_text'>
                        <div id="pkm_modal_flavour_text">
                          Flavour Text
                        </div>
                      </div>
                      

                        
                    </div> 
                    

                    <div className='pkm_info_section'>
                      <div>
                        <div className='header_triangle_text'>TYPE(S)</div>
                        <div className='triangle'/>
                      </div>
                      <div id="pkm_types_section">
                        <div id="pkm_type_1" className="pkm_type type_inline">Fire</div>
                        <div id="pkm_type_2" className="pkm_type type_inline">Water</div>
                      </div>
                      
                      <div>
                        <div className='header_triangle_text'>RESISTANCES AND WEAKNESSES</div>
                        <div className='triangle'/>
                      </div>
                      <div id="type_defenses" className='sc5'> 
                        <table id="type_defenses_table">
                          <thead>
                          <tr>
                            <td id="pkm_type_nor" className="type_def_header">NOR</td>
                            <td id="pkm_type_fir" className="type_def_header">FIR</td>
                            <td id="pkm_type_wat" className="type_def_header">WAT</td>
                            <td id="pkm_type_ele" className="type_def_header">ELE</td>
                            <td id="pkm_type_gra" className="type_def_header">GRA</td>
                            <td id="pkm_type_ice" className="type_def_header">ICE</td>
                            <td id="pkm_type_fig" className="type_def_header">FIG</td>
                            <td id="pkm_type_poi" className="type_def_header">POI</td>
                            <td id="pkm_type_gro" className="type_def_header">GRO</td>
                          </tr>
                          <tr>
                            <td id="pkm_type_nor_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_fir_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_wat_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_ele_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_gra_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_ice_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_fig_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_poi_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_gro_val" className="type_def_multiplier"></td>
                          </tr>
                          <tr>
                            <td id="pkm_type_fly" className="type_def_header">FLY</td>
                            <td id="pkm_type_psy" className="type_def_header">PSY</td>
                            <td id="pkm_type_bug" className="type_def_header">BUG</td>
                            <td id="pkm_type_roc" className="type_def_header">ROC</td>
                            <td id="pkm_type_gho" className="type_def_header">GHO</td>
                            <td id="pkm_type_dra" className="type_def_header">DRA</td>
                            <td id="pkm_type_dar" className="type_def_header">DAR</td>
                            <td id="pkm_type_ste" className="type_def_header">STE</td>
                            <td id="pkm_type_fai" className="type_def_header">FAI</td>
                          </tr>
                          <tr>
                            <td id="pkm_type_fly_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_psy_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_bug_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_roc_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_gho_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_dra_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_dar_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_ste_val" className="type_def_multiplier"></td>
                            <td id="pkm_type_fai_val" className="type_def_multiplier"></td>
                          </tr>
                          </thead>
                        </table>               
                      </div>

                    </div>

                    <div className='pkm_info_section'>

                      <div>
                        <div className='header_triangle_text'>BASE STATS</div>
                        <div className='triangle'/>
                      </div>
                      
                      <div className='table_stat_pos sc5'>

                        <table id="pkm_base_stats">
                          <thead>
                          <tr>
                            <th className='pkm_base_stat_name'>HP</th>
                            <th id="pkm_base_stat_hp" className='pkm_base_stat_value'>75</th>
                            <th className='pkm_base_stat_bar_space'>
                              <div id="pkm_base_stat_hp_bar"
                                    className='pkm_bar_appearance'>
                              </div>
                            </th>
                          </tr>
                          <tr>
                            <th className='pkm_base_stat_name'>Attack</th>
                            <th id="pkm_base_stat_atk" className='pkm_base_stat_value'>75</th>
                            <th className='pkm_base_stat_bar_space'>
                              <div id="pkm_base_stat_atk_bar"
                                    className='pkm_bar_appearance'>
                              </div>
                            </th>
                          </tr>
                          <tr>
                            <th className='pkm_base_stat_name'>Defense</th>
                            <th id="pkm_base_stat_def" className='pkm_base_stat_value'>75</th>
                            <th className='pkm_base_stat_bar_space'>
                              <div id="pkm_base_stat_def_bar"
                                    className='pkm_bar_appearance'>
                              </div>
                            </th>
                          </tr>
                          <tr>
                            <th className='pkm_base_stat_name'>Sp. Atk</th>
                            <th id="pkm_base_stat_satk" className='pkm_base_stat_value'>75</th>
                            <th className='pkm_base_stat_bar_space'>
                              <div id="pkm_base_stat_satk_bar"
                                    className='pkm_bar_appearance'>
                              </div>
                            </th>
                          </tr>
                          <tr>
                            <th className='pkm_base_stat_name'>Sp. Def</th>
                            <th id="pkm_base_stat_sdef" className='pkm_base_stat_value'>75</th>
                            <th className='pkm_base_stat_bar_space'>
                              <div id="pkm_base_stat_sdef_bar"
                                    className='pkm_bar_appearance'>
                              </div>
                            </th>
                          </tr>
                          <tr>
                            <th className='pkm_base_stat_name'>Speed</th>
                            <th id="pkm_base_stat_spd" className='pkm_base_stat_value'>75</th>
                            <th className='pkm_base_stat_bar_space'>
                              <div id="pkm_base_stat_spd_bar"
                                    className='pkm_bar_appearance'>
                              </div>
                            </th>
                          </tr>
                          <tr>
                            <th className='pkm_base_stat_name'>TOTAL</th>
                            <th id="pkm_base_stat_ttl" className='pkm_base_stat_value'>75</th>
                          </tr>
                          </thead>
                        </table>
                      </div>
                    </div>

                    
                    <div className='pkm_info_section wh_sec'>
                      <div>
                        <div className='header_triangle_text'>HEIGHT & WEIGHT</div>
                        <div className='triangle'/>
                      </div>
                      <div className='weight_height_line'>
                        <div className='wh_padding'><u>Height:</u></div>
                        <div className='wh_box'>
                          <span id="pkm_modal_height" className='wh_text'> 0 </span>
                          <span className='weight_height_separator'> | </span>
                          <span id="pkm_modal_height_m" className='wh_text'> 0 </span>
                        </div>
                        
                      </div>
                      <div className='weight_height_line'>
                        <div className='wh_padding'><u>Weight:</u></div>
                        <div className='wh_box'>
                          <span id="pkm_modal_weight" className='wh_text'> 0 </span>
                          <span className='weight_height_separator'> | </span>
                          <span id="pkm_modal_weight_kg" className='wh_text'> 0 </span>
                        </div>
                      </div>
              
                    </div>
                    
                    <div id="pkm_modal_abilities" className='pkm_info_section wh_sec'>
                      <div>
                        <div className='header_triangle_text'>ABILITIES</div>
                        <div className='triangle'/>
                      </div>
                      <div >
                        <ul id="pkm_modal_list_of_abilities">
                          <li>Ab1</li>
                          <li>Ab2</li>
                          <li>Ab3</li>
                        </ul>
                      </div>
                      
                    </div>

                    <div className='pkm_info_section wh_sec'>
                      <div>
                        <div className='header_triangle_text'>EVOLUTION CHART</div>
                        <div className='triangle'/>
                      </div>
                      <div id="pkm_modal_evolution_chart">
                        A to B to C
                      </div>
                    </div>
                    


                    <div className='pkm_info_section wh_sec'>
                      <div>
                        <div className='header_triangle_text'>ALTERNATE NAMES</div>
                        <div className='triangle'/>
                      </div>
                      <div id="pkm_modal_other_language_names">
                        French: aaa
                      </div>
                    </div>
                    
                    

                    <div className='pkm_info_section wh_sec'>
                      <div>
                        <div className='header_triangle_text'>MOVES LEARNED</div>
                        <div className='triangle'/>
                      </div>

                      <div className='moves_section_banner'>Moves Learned by Level Up</div>
                      <div className='learn_table_container sc5'>
                        <table id="pkm_modal_moves" className='learned_move_table'>
                          <thead>
                            <tr>
                              <th>LEVEL</th>
                              <th>MOVE</th>
                              <th>TYPE</th>
                              <th>CATEGORY</th>
                              <th>POWER</th>
                              <th>ACCURACY</th>
                            </tr>
                          </thead>
                          <tbody id="pkm_modal_list_moves">
                            <tr>
                              <th>1</th>
                              <th>Atk 1</th>
                              <th>Fire</th>
                              <th>Special</th>
                              <th>100</th>
                              <th>0.9</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className='moves_section_banner'>Moves Learned by TM </div>
                      <div className='learn_table_container sc5'>
                        <table id="pkm_modal_tm_moves" className='learned_move_table'>
                          <thead>
                            <tr>
                              <th>TM</th>
                              <th>MOVE</th>
                              <th>TYPE</th>
                              <th>CATEGORY</th>
                              <th>POWER</th>
                              <th>ACCURACY</th>
                            </tr>
                          </thead>
                          <tbody id="pkm_modal_list_tm_moves">
                            <tr>
                              <th>1</th>
                              <th>Atk 1</th>
                              <th>Fire</th>
                              <th>Special</th>
                              <th>100</th>
                              <th>0.9</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>


                      <div className='moves_section_banner'>Egg Moves</div>
                      <div className='learn_table_container sc5'>
                        <table id="pkm_modal_egg_moves"  className='learned_move_table'>
                          <thead>
                            <tr>
                              <th>MOVE</th>
                              <th>TYPE</th>
                              <th>CATEGORY</th>
                              <th>POWER</th>
                              <th>ACCURACY</th>
                            </tr>
                          </thead>
                          <tbody id="pkm_modal_list_egg_moves">
                            <tr>
                              <th>Atk 1</th>
                              <th>Fire</th>
                              <th>Special</th>
                              <th>100</th>
                              <th>0.9</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>


                    <div className='pkm_info_section wh_sec'>
                      <div>
                        <div className='header_triangle_text'>WHERE TO FIND</div>
                        <div className='triangle'/>
                      </div>
                      <div>
                        <table id="pkm_modal_loc_table"  className='learned_move_table'>
                          <tbody id="pkm_modal_loc_table_entries">
                            <tr id="loc_redblu">
                              <th className='pkm_game_loc'>
                                <span className='pkm_game_red_text'>Red</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className='pkm_game_blu_text'>Blue</span>
                              </th>
                              <th id="loc_redblu_value"></th>
                            </tr>
                            <tr id="loc_yellow">
                              <th className='pkm_game_yel_text'>Yellow</th>
                              <th id="loc_yellow_value"></th>
                            </tr>
                            <tr id="loc_gold">
                              <th className='pkm_game_gold_text'>Gold</th>
                              <th id="loc_gold_value"></th>
                            </tr>
                            <tr id="loc_silver">
                              <th className='pkm_game_sil_text'>Silver</th>
                              <th id="loc_silver_value"></th>
                            </tr>
                            <tr id="loc_crystal">
                              <th className='pkm_game_cry_text'>Crystal</th>
                              <th id="loc_crystal_value"></th>
                            </tr>
                            <tr id="loc_rubsap">
                              <th className='pkm_game_loc'>
                                <span className='pkm_game_red_text'>Ruby</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className='pkm_game_blu_text'>Sapphire</span>
                              </th>
                              <th id="loc_rubsap_value"></th>
                            </tr>
                            <tr id="loc_fred_lgreen">
                              <th className='pkm_game_loc'>
                                <span className='pkm_game_red_text'>FireRed</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className="loc_emerald_value">LeafGreen</span>
                              </th>
                              <th id="loc_fred_lgreen_value"></th>
                            </tr>
                            <tr id="loc_emerald">
                              <th className="pkm_game_eme_text">Emerald</th>
                              <th id="loc_emerald_value"></th>
                            </tr>
                            <tr id="loc_diaperl">
                              <th className='pkm_game_loc'>
                                <span className='pkm_game_dia_text'>Diamond</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className='pkm_game_per_text'>Pearl</span>
                              </th>
                              <th id="loc_diaperl_value"></th>
                            </tr>
                            <tr id="loc_platinum">
                              <th className='pkm_game_sil_text'>Platinum</th>
                              <th id="loc_platinum_value"></th>
                            </tr>
                            <tr id="loc_hgss">
                              <th className='pkm_game_loc'> 
                                <span className='pkm_game_gold_text'>HeartGold</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className='pkm_game_sil_text'>SoulSilver</span>
                              </th>
                              <th id="loc_hgss_value"></th>
                            </tr>
                            <tr id="loc_black">
                              <th className='pkm_game_bla_text'>Black</th>
                              <th id="loc_black_value"></th>
                            </tr>
                            <tr id="loc_white">
                              <th className='pkm_game_whi_text'>White</th>
                              <th id="loc_white_value"></th>
                            </tr>
                            <tr id="loc_b2w2">
                              <th>Black 2 White 2	</th>
                              <th id="loc_b2w2_value"></th>
                            </tr>
                            <tr id="loc_xy">
                              <th>
                                <span className='pkm_game_blu_text'>X</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className='pkm_game_red_text'>Y</span>
                              </th>
                              <th id="loc_xy_value"></th>
                            </tr>
                            <tr id="loc_oras">
                              <th className='pkm_game_loc'> 
                                <span className='pkm_game_red_text'>Omega Ruby</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className='pkm_game_blu_text'>Alpha Sapphire</span>
                              </th>
                              <th id="loc_oras_value"></th>
                            </tr>
                            <tr id="loc_sunmoon">
                              <th className='pkm_game_loc'>
                                <span className='pkm_game_sun_text'>Sun</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className='pkm_game_moon_text'>Moon</span>
                              </th>
                              <th id="loc_sunmoon_value"></th>
                            </tr>
                            <tr id="loc_usum">
                              <th className='pkm_game_loc'>
                                <span className='pkm_game_sun_text'>Ultra Sun</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className='pkm_game_moon_text'>Ultra Moon</span>
                              </th>
                              <th id="loc_usum_value"></th>
                            </tr>
                            <tr id="loc_lgplge"> 
                              <th className='pkm_game_loc'>
                                <span className='pkm_game_yel_text'>Let's Go Pikachu</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className='pkm_game_eev_text'>Let's Go Eevee</span>
                              </th>
                              <th id="loc_lgplge_value"></th>
                            </tr>
                            <tr id="loc_swoshi">
                              <th className='pkm_game_loc'>
                                <span className='pkm_game_red_text'>Sword</span>
                                <span className='pkm_game_sep_text'> | </span>
                                <span className='pkm_game_blu_text'>Shield</span>
                              </th>
                              <th id="loc_swoshi_value"></th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                
                  </div>
                  
                </div>
              </div>
              
            </div>
          </div>
          

          <div className='learn_table_container sc5'> {/* Display the pokedex */}
            <table id="pokedex_table">
              <thead>
                <tr id="table_header">
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>HP</th>
                  <th>ATK</th>
                  <th>DEF</th>
                  <th>SP ATK</th>
                  <th>SP DEF</th>
                  <th>SPD</th>
                  <th>Total</th>
                </tr>
              </thead>
              
            </table>
          </div>

          <div>
            <div id="left_arrow" className='arrow pagination leftarrow'>&laquo;</div>
            <div id="pokedex_pagination" className="pagination learn_table_container sc5">
              <a href="#">&laquo;</a>
              <a className="active" href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">6</a>
              <a href="#">&raquo;</a>
            </div>
            <div id="right_arrow" className='arrow pagination rightarrow' >&raquo;</div>
          </div>
          
      </div>
    );
}

export default PokemonPage;