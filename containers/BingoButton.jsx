import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BingoButton from '../components/BingoButton';

import { PLAYER, BINGO_LEN } from '../constant';

import * as bingoActions from '../reducers';

const BingoButtonContainer = () => {
    const dispatch = useDispatch();
    const { isStart, nowTurn } = useSelector((state) => state);

    const makeBingoNum = useCallback((user) => {
        const array = Array(25).fill().map((v, i ) => i + 1);
        const shuffledArray = [];
    
        while(array.length > 0) {
          shuffledArray.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
        }
    
        return Array(BINGO_LEN).fill().map(() =>
            Array(BINGO_LEN).fill().map(() => {
                return shuffledArray.pop(); 
        }));
    }, []);

    const onClickButton = useCallback(() => {
        dispatch(bingoActions.startGame({
            bingoOne: makeBingoNum(PLAYER.ONE),
            bingoTwo: makeBingoNum(PLAYER.TWO),
        }));
    }, []);

    return (
        <BingoButton
            onClickButton={onClickButton}
            buttonText={isStart ? '게임 재시작' : '게임 시작'}
            turnText={isStart ? `${nowTurn} 차례` : '게임 시작 버튼을 눌러주세요.'}
        />
    )
};

export default BingoButtonContainer;
