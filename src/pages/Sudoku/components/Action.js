import React from 'react';

export function Action(props) {
  // Action takes either [Undo, Erase, Hint] and gives it an img and name + their corresponding move
  return (
    <div id={ 
          props.action === 'undo' ? "undo_button" :
          props.action === 'erase' ? "remove_button" :
          props.action === 'hint' ? "hint_button" : ""
        } onClick={props.onClickAction}>

      <ActionImg action={props.action} />

      <p className="action_text"> {
        props.action === 'undo' ? 'Undo' :
        props.action === 'erase' ? 'Erase' :
        props.action === 'hint' ? 'Hint' : ''
      }</p>
    </div>
  )
}

// Helper Class: Get Image for Corresponding Action
const ActionImg = (props) => {
  if (props.action === 'undo') {
    return ( <img id="undo_btn" src="https://cdn-icons-png.flaticon.com/512/1276/1276491.png" alt="undo"/> )
  } else if (props.action === 'erase') {
    return (<img id="erase_btn" src="https://cdn-icons-png.flaticon.com/512/717/717967.png" alt="erase"/>)
  } else if (props.action === 'hint') {
    return (<img id="hint_btn" src="https://cdn-icons-png.flaticon.com/512/831/831752.png" alt="hint"/>)
  } else {
    return null;
  }
}