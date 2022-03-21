import React, { useState, useEffect } from 'react';
import { useSudokuContext } from '../context/SudokuContext';
import moment from 'moment';

// Timer of game time
export function Timer () {  
  let [time, setTime] = useState(moment());
  let { timeGameStarted, won } = useSudokuContext();

  // Increase timer every second
  useEffect(() => {
    if (!won) { setTimeout(() => setTime(moment()), 1000) };
  });

  // Time converted into a readable string formation
  function getTimer() {
    let secondsTotal = time.diff(timeGameStarted, 'seconds');
    let dur = moment.duration(secondsTotal, 'seconds');
    let hour   = dur.hours();
    let minute = dur.minutes();
    let second = dur.seconds();

    let readable_time = '';
    if (secondsTotal <= 0) {
      return '00:00'
    } else {
      // Time in form: hr:min:sec with minute and second in double digit form i.e. 01 to 59
      readable_time += (hour) ? '' + hour + ':' : '';
      readable_time += (minute) ? (minute < 10 ? '0' : '') + minute + ':' : '00:';
      readable_time += (second < 10) ? '0' + second : second;
      return readable_time;
    } 
  }

  return (
    <div id="timer">{getTimer()}</div>
  )
}
