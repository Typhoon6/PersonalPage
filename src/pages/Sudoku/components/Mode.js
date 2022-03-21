import React from 'react';

// Either Enable Mistakes Mode or Fast Mode
export function Mode(props) {
  return (
    <div className={ props.mode === 'mistakes' ? "prevent_mistake_section" : "fast_section"}>
      <label htmlFor={ props.mode === 'mistakes' ? "mistake_input" : "fast_input"} className="mistake_fast_switch">
        <input id={ props.mode === 'mistakes' ? "mistake_input" : "fast_input"} type="checkbox"/>
        <span className="mistake_fast_slider" onClick={props.onClickMode}/>
      </label>
      <p className="mistake_fast_text">{ props.mode === 'mistakes' ? 'Prevent Mistakes' : 'Fast Mode'}</p>
    </div>
  )
}
