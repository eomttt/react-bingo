import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PLAYER } from '../constant';

import BingoResultContainer from './BingoResult';

import BingoTable from '../components/BingoTable'; 

import * as bingoActions from '../reducers';

const BingoTableContainer = () => {
    const dispatch = useDispatch();
    const { bingoOne, bingoOneSelected, bingoTwo, bingoTwoSelected,
            nowTurn, isStart } = useSelector((state) => state);

    const getSelectedNumbers = useCallback((selectedNumberData) => {
        return selectedNumberData.map((data) => {
            return data.number;
        });
    }, []);

    const getOpositeBingoData = useCallback((clickedNumber, opositeBingo) => {
        let row = -1, column = -1;
        
        opositeBingo.some((opositeBingoRow, rowIndex) => {
            const finded = opositeBingoRow.some((opositeBingoItem, columnIndex) => {
                if (clickedNumber === opositeBingoItem) {
                    column = columnIndex;
                    return true;
                }
                return false;
            });
            if (finded) {
                row = rowIndex;
                return true;
            }
            return false;
        });

        return {
            number: clickedNumber,
            row,
            column,
        }
    }, []);

    const onClickBingoOne = useCallback((bingoNumber, row, column) => {
        if (!isStart) {
            alert('게임 시작을 눌러주세요!');
            return;
        }

        if (nowTurn === PLAYER.ONE) {
            dispatch(bingoActions.clickBingoOne({
                opositeBingoData: getOpositeBingoData(bingoNumber, bingoTwo),
                number: bingoNumber,
                row,
                column,
            }));
        } else {
            alert('잘못된 차례 입니다.');
        }
    }, [bingoTwo, nowTurn, isStart]);

    const onClickBingoTwo = useCallback((bingoNumber, row, column) => {
        if (!isStart) {
            alert('게임 시작을 눌러주세요!');
            return;
        }

        if (nowTurn === PLAYER.TWO) {
            dispatch(bingoActions.clickBingoTwo({
                opositeBingoData: getOpositeBingoData(bingoNumber, bingoOne),
                number: bingoNumber,
                row,
                column,
            }));
        } else {
            alert('잘못된 차례 입니다.');
        }
    }, [bingoOne, nowTurn, isStart]);

    return (
        <>
            <BingoTable
                bingo={bingoOne}
                selectedBingos={getSelectedNumbers(bingoOneSelected)}
                onClickBingo={onClickBingoOne}
            />
            <BingoTable
                bingo={bingoTwo}
                selectedBingos={getSelectedNumbers(bingoTwoSelected)}
                onClickBingo={onClickBingoTwo}
            />
        </>
    );
};

export default BingoTableContainer;
