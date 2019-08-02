const BINGO_LEN = 5;

const initialState = {
  result: null,
  turn: '1P',
  bingoOne: Array(BINGO_LEN).fill().map(() => Array(BINGO_LEN).fill({user: '1P', value: null, select: false})),
  bingoOneRes: [],
  bingoOneRecentClick: {
    row: -1,
    column: -1
  },
  bingoTwo: Array(BINGO_LEN).fill().map(() => Array(BINGO_LEN).fill({user: '2P', value: null, select: false})),
  bingoTwoRes: [],
  bingoTwoRecentClick: {
    row: -1,
    column: -1
  },
  start: false
};

const CLICK_CELL = 'CLICK_CELL';
const SET_BINGO = 'SET_BINGO';
const CHANGE_TURN = 'CHANGE_TURN';
const START_GMAE = 'START_GAME';
const RESET_GAME = 'RESET_GAME';
const SET_RESULT = 'SET_RESULT';

export const clickCell = ({ value }) => {
  return {
    type: CLICK_CELL,
    payload: {
      value
    }
  }
};

export const setBingo = ({ value }) => {
  return {
    type: SET_BINGO,
    payload: {
      value
    }
  }
}

export const changeTurn = () => {
  return {
    type: CHANGE_TURN
  }
};

export const startGame = ({ bingoOne, bingoTwo }) => {
  return {
    type: START_GMAE,
    payload: {
      bingoOne,
      bingoTwo
    }
  }
};

export const resetGame = () => {
  return {
    type: RESET_GAME
  }
};

export const setResult = () => {
  return {
    type: SET_RESULT
  }
}

export default (state=initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLICK_CELL:
      const bingoOne = [...state.bingoOne],
        bingoTwo = [...state.bingoTwo];

      let bingoOneIndex = _getIndex(bingoOne, payload.value),
        bingoTwoIndex = _getIndex(bingoTwo, payload.value);

      bingoOne[bingoOneIndex.row] = [...bingoOne[bingoOneIndex.row]];
      bingoOne[bingoOneIndex.row][bingoOneIndex.column] = {...bingoOne[bingoOneIndex.row][bingoOneIndex.column], select: true}; 

      bingoTwo[bingoTwoIndex.row] = [...bingoTwo[bingoTwoIndex.row]];
      bingoTwo[bingoTwoIndex.row][bingoTwoIndex.column] = {...bingoTwo[bingoTwoIndex.row][bingoTwoIndex.column], select: true}; 

      return {
        ...state,
        bingoOne: bingoOne,
        bingoOneRecentClick: bingoOneIndex,
        bingoTwo: bingoTwo,
        bingoTwoRecentClick: bingoTwoIndex
      }
    case SET_BINGO:
      const payloadValue = payload.value;
      let newRes = payloadValue[0].user === '1P' ? [...state.bingoOneRes] : [...state.bingoTwoRes];
      let alreadySet = false;
      
      newRes.forEach((newResItem) => {
        if (newResItem[0].value === payloadValue[0].value && newResItem[BINGO_LEN - 1].value === payloadValue[BINGO_LEN - 1].value) {
          alreadySet = true;
        }
      });

      if (!alreadySet) {
        newRes = [...newRes, payloadValue] 
      }

      return {
        ...state,
        bingoOneRes: payloadValue[0].user === '1P' ? newRes : state.bingoOneRes,
        bingoTwoRes: payloadValue[0].user === '2P' ? newRes : state.bingoTwoRes
      }
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === '1P' ? '2P' : '1P'
      };
    case START_GMAE:
      return {
        ...state,
        bingoOne: payload.bingoOne,
        bingoTwo: payload.bingoTwo,
        start: true
      };
    case RESET_GAME:
      return {
        ...state,
        turn: '1P',
        bingoOne: Array(BINGO_LEN).fill().map(() => Array(BINGO_LEN).fill({user: '1P', value: null, select: false})),
        bingoOneRes: [],
        bingoOneRecentClick: {row: -1, column: -1},
        bingoTwo: Array(BINGO_LEN).fill().map(() => Array(BINGO_LEN).fill({user: '2P', value: null, select: false})),
        bingoTwoRes: [],
        bingoTwoRecentClick: {row: -1, column: -1},
        start: false
      };
    case SET_RESULT:
      return {
        ...state,
        result: state.bingoOneRes.length >= BINGO_LEN && state.bingoTwoRes.length >= BINGO_LEN ? 'Draw!!!' : (state.bingoOneRes.length >= BINGO_LEN ? 'Winner is 1P': 'Winner is 2P')
      }
    default: 
      return state;
  }
}

const _getIndex = (array, value) => {
  let index = {
    row: -1,
    column: -1
  }
  array.some((rowDatas, rowIndex) => {
    let columnIndex = rowDatas.findIndex((data) => {
      return data.value === value;
    });

    if (columnIndex > -1) {
      index = {
        row: rowIndex,
        column: columnIndex
      }
      return;
    }
  })
  return index;
}