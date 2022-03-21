import React from 'react';
import { Difficulty } from './Difficulty';
import { Timer } from './Timer';
import { Numbers } from './Numbers.js';
import { Action } from './Action';
import { Mode } from './Mode';

// Section containing the Undo, Erase, Hint & Modes
export const StatusSection = (props) => {
  return (
    <section className="status">
      <Difficulty onChange={props.onChange}/>
      <Timer/>
      <Numbers onClickNumber={(number) => props.onClickNumber(number)} />

      <div id="user_actions">
        <Action action='undo'   onClickAction={props.undo_move} />
        <Action action='erase'  onClickAction={props.clear_cell} />
        <Action action='hint'   onClickAction={props.cell_hint} />
        <Mode   mode='mistakes' onClickMode={props.change_mistakes_mode} />
        <Mode   mode='fast'     onClickMode={props.change_fast_mode} />
      </div>
    </section>
  )
}
