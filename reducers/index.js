import { BINGO_LEN, PLAYER } from '../constant';

const initialState = {
  resultString: null,
  nowTurn: PLAYER.ONE,
  bingoOne: Array(BINGO_LEN).fill().map(() => Array(BINGO_LEN).fill(null)),
  bingoOneSelected: [],
  bingoOneRes: {
    row: [],
    columns: [],
    cross: [],
  },
  bingoTwo: Array(BINGO_LEN).fill().map(() => Array(BINGO_LEN).fill(null)),
  bingoTwoSelected: [],
  bingoTwoRes: {
    row: [],
    columns: [],
    cross: [],
  },
  isStart: false
};

const CLICK_BINGO_ONE = 'CLICK_BINGO_ONE';
const SET_BINGO_ONE_RESULTS = 'SET_BINGO_ONE_RESULTS';

const CLICK_BINGO_TWO = 'CLICK_BINGO_TWO';
const SET_BINGO_TWO_RESULTS = 'SET_BINGO_TWO_RESULTS';

const START_GAME = 'START_GAME';
const RESET_GAME = 'RESET_GAME';
const SET_RESULT = 'SET_RESULT';

export const clickBingoOne = ({ number, row, column, opositeBingoData }) => {
  return {
    type: CLICK_BINGO_ONE,
    number,
    row,
    column,
    opositeBingoData,
  }
};

export const setBingoOneResult = (bingoRes) => {
  return {
    type: SET_BINGO_ONE_RESULTS,
    bingoRes,
  }
};

export const clickBingoTwo = ({ number, row, column, opositeBingoData }) => {
  return {
    type: CLICK_BINGO_TWO,
    number,
    row,
    column,
    opositeBingoData,
  }
};

export const setBingoTwoResult = (bingoRes) => {
  return {
    type: SET_BINGO_TWO_RESULTS,
    bingoRes,
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

export const setResult = (value) => {
  return {
    type: SET_RESULT,
    value,
  }
}

export default (state=initialState, action) => {
  const { type } = action;
  switch (type) {
    case CLICK_BINGO_ONE: {
      const { number, row, column, opositeBingoData } = action;
      return {
        ...state,
        bingoOneSelected: [...state.bingoOneSelected, { number, row, column }],
        bingoTwoSelected: [...state.bingoTwoSelected, { ...opositeBingoData }],
        nowTurn: PLAYER.TWO,
      }
    }
    case SET_BINGO_ONE_RESULTS: {
      return {
        ...state,
        bingoOneRes: action.bingoRes,
      }
    }
    case CLICK_BINGO_TWO: {
      const { number, row, column, opositeBingoData } = action;
      return {
        ...state,
        bingoOneSelected: [...state.bingoOneSelected, { ...opositeBingoData }],
        bingoTwoSelected: [...state.bingoTwoSelected, { number, row, column }],
        nowTurn: PLAYER.ONE,
      }
    }
    case SET_BINGO_TWO_RESULTS: {
      return {
        ...state,
        bingoTwoRes: action.bingoRes,
      }
    }
    case START_GAME: {
      return {
        ...state,
        ...initialState,
        nowTurn: PLAYER.ONE,
        bingoOne: action.bingoOne,
        bingoTwo: action.bingoTwo,
        isStart: true
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        ...initialState
      };
    }
    case SET_RESULT: {
      return {
        ...state,
        resultString: action.value,
      }
    }
    default: 
      return state;
  }
}
