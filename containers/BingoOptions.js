import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../reducers';

import BingoOptionsComp from '../components/BingoOptions';

const BingoOptions = () => {
  const dispatch = useDispatch();
  const { start, turn } = useSelector(state => state);

  const onClickButton = useCallback(() => {
    if (!!start) {
      dispatch(actions.resetGame());
    }

    dispatch(actions.startGame({
      bingoOne: _makeBingoNum('1P'),
      bingoTwo: _makeBingoNum('2P')
    }));
  }, [start]);

  const _makeBingoNum = (user) => {
    const array = Array(25).fill().map((v, i ) => i + 1);
    const shuffledArray = [];

    while(array.length > 0) {
      shuffledArray.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
    }

    return Array(5).fill().map(() => Array(5).fill().map(() => {
      return {
        user: user,
        value: shuffledArray.pop(),
        select: false
      }
    }));
  }

  return (
    <BingoOptionsComp turnText = {turn}
                      buttonText = {
                        !!start
                        ? 'Reset Game'
                        : 'Start Game'
                      }
                      onClickButton={onClickButton}/>
  );
};

export default BingoOptions;