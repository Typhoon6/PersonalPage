const { makepuzzle, solvepuzzle } = require('sudoku');
const { List } = require('immutable');

//HARD=25,MEDIUM=35,EASY=45

const DIFFICULTIES = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD'
};
const DIFF_FORMATTER = {
  EASY: () => Math.floor(Math.random() * 5) <= 1,
  MEDIUM: () => Math.floor(Math.random() * 15) <= 2,
  HARD: () => Math.floor(Math.random() * 40) <= 2
};

const getInitalValues = board => {
  let initialValues = 0;

  board.forEach(x => x !== null && initialValues++);

  return initialValues;
};

const addAnswers = (difficulty, board, answerBoard) => {
  return board.map((v, index) => {
    if (DIFF_FORMATTER[difficulty]()) {
      v = difficulty === DIFFICULTIES.HARD ? null : answerBoard[index];
    }

    return v;
  });
};

const getBoard = difficulty => {
  let arr = [];
  const x = makepuzzle();
  const y = solvepuzzle(x);

  const initialAnswers = addAnswers(difficulty, x, y);

  const board = y.reduce((acc, j, i) => {
    const formatValue = v => (v === null ? null : v + 1);
    if (arr.length === 8) {
      const y = [
        ...arr,
        { answer: formatValue(j), value: formatValue(initialAnswers[i]) }
      ];
      arr = [];
      return acc.push(y);
    } else {
      arr = [
        ...arr,
        { answer: formatValue(j), value: formatValue(initialAnswers[i]) }
      ];
      return acc;
    }
  }, new List());
  return board;
};

const easy = () => {
  return getBoard(DIFFICULTIES.EASY);
};
const medium = () => {
  return getBoard(DIFFICULTIES.MEDIUM);
};
const hard = () => {
  return getBoard(DIFFICULTIES.HARD);
};

const Sudoku = {
  easy,
  medium,
  hard
};
module.exports = Sudoku;
