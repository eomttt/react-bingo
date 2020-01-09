import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PLAYER } from '../constant';

import BingoTable from '../components/BingoTable'; 
// import BingoResult from '../components/BingoResult';

import * as bingoActions from '../reducers';

const BingoTableContainer = () => {
    const dispatch = useDispatch();
    const { bingoOne, bingoOneSelected, bingoTwo, bingoTwoSelected,
            nowTurn, isStart } = useSelector((state) => state);

    useEffect(() => {
        console.log('bingoOne', bingoOne);
    }, []);

    const onClickBingoOne = (bingoNumber, row, column) => {
        if (isStart && nowTurn === PLAYER.ONE) {
            dispatch(bingoActions.clickBingoOne({
                number: bingoNumber,
                row,
                column,
            }));
        }
    }

    const onClickBingoTwo = (bingoNumber, row, column) => {
        console.log('BBB', bingoNumber, row, column);
        if (isStart && nowTurn === PLAYER.TWO) {
            dispatch(bingoActions.clickBingoOne({
                number: bingoNumber,
                row,
                column,
            }));
        }
    }

    return (
        <>
            <BingoTable bingo={bingoOne} selectedBingos={bingoOneSelected} onClickBingo={onClickBingoOne} />
            <BingoTable bingo={bingoTwo} selectedBingos={bingoTwoSelected} onClickBingo={onClickBingoTwo} />
        </>
    );
};

export default BingoTableContainer;
