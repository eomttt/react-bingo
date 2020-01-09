import { BINGO_LEN, PLAYER } from '../constant';

const initialState = {
  result: null,
  nowTurn: PLAYER.ONE,
  bingoOne: Array(BINGO_LEN).fill().map(() => Array(BINGO_LEN).fill(null)),
  bingoOneSelected: [],
  bingoOneRes: [],
  bingoOneRecentClick: {
    row: -1,
    column: -1
  },
  bingoTwo: Array(BINGO_LEN).fill().map(() => Array(BINGO_LEN).fill(null)),
  bingoTwoSelected: [],
  bingoTwoRes: [],
  bingoTwoRecentClick: {
    row: -1,
    column: -1
  },
  isStart: false
};

const SET_BINGO = 'SET_BINGO';
const CHANGE_TURN = 'CHANGE_TURN';
const SET_RESULT = 'SET_RESULT';

const CLICK_BINGO_ONE = 'CLICK_BINGO_ONE';
const CLICK_BINGO_TWO = 'CLICK_BINGO_TWO';
const START_GAME = 'START_GAME';
const RESET_GAME = 'RESET_GAME';

export const clickBingoOne = ({ number, row, column }) => {
  return {
    type: CLICK_BINGO_ONE,
    number,
    row,
    column,
  }
};

export const clickBingoTwo = ({ numbe, row, column }) => {
  return {
    type: CLICK_BINGO_TWO,
    number,
    row,
    column
  }
};

export const startGame = ({
  bingoOne, bingoTwo,
}) => {
  return {
    type: START_GAME,
    bingoOne,
    bingoTwo,
  }
}

export const resetGame = () => {
  return {
    type: RESET_GAME,
  }
}

export const clickCell = ({ row, column }) => {
  return {
    type: CLICK_CELL,
    row,
    column,
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

export const setResult = () => {
  return {
    type: SET_RESULT
  }
}

export default (state=initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLICK_BINGO_ONE: {
      const { number, row, column } = action;
      return {
        ...state,
        bingoOneSelected: [...state.bingoOneSelected, {number, row, column}],
      }
    }
    case CLICK_BINGO_TWO: {
      const { number, row, column } = action;
      return {
        ...state,
        bingoTwoSelected: [...state.bingoOneSelected, {number, row, column}],
      }
    }
    case START_GAME: {
      return {
        ...state,
        bingoOne: action.bingoOne,
        bingoOneSelected: [],
        bingoTwo: action.bingoTwo,
        bingoTwoSelected: [],

        isStart: true
      };
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
        nowTurn: state.nowTurn === '1P' ? '2P' : '1P'
      };

    case RESET_GAME:
      return {
        ...state,
        nowTurn: '1P',
        bingoOne: Array(BINGO_LEN).fill().map(() => Array(BINGO_LEN).fill({user: '1P', value: null, select: false})),
        bingoOneRes: [],
        bingoOneRecentClick: {row: -1, column: -1},
        bingoTwo: Array(BINGO_LEN).fill().map(() => Array(BINGO_LEN).fill({user: '2P', value: null, select: false})),
        bingoTwoRes: [],
        bingoTwoRecentClick: {row: -1, column: -1},
        isStart: false
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