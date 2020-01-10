import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BingoTableContainer from './BingoTable';
import BingoResultContainer from './BingoResult';
import BingoButtonContainer from './BingoButton';

import * as bingoActions from '../reducers';

import { BINGO_LEN, COMPLETE_BINGO_COUNT, PLAYER } from '../constant';

const BingoGameContainer = () => {
    const dispatch = useDispatch();
    const { bingoOneRes, bingoTwoRes, resultString } = useSelector((state) => state);

    useEffect(() => {
        const isCompletBingoOne = isCompleteAllBingo(bingoOneRes);
        const isCompleteBingoTwo = isCompleteAllBingo(bingoTwoRes);

        if (isCompletBingoOne && isCompleteBingoTwo) {
            dispatch(bingoActions.setResult('무승부입니다.'));
        } else if (isCompletBingoOne) {
            dispatch(bingoActions.setResult(`${PLAYER.ONE}가 빙고를 완성했습니다.`));
        } else if (isCompleteBingoTwo) {
            dispatch(bingoActions.setResult(`${PLAYER.TWO}가 빙고를 완성했습니다.`));
        }
    }, [bingoOneRes, bingoTwoRes]);
    

    useEffect(() => {
        if (resultString) {
            setTimeout(() => {
                alert(resultString);
                dispatch(bingoActions.resetGame());
            }, 300)
        }
    }, [resultString]);

    const isCompleteBingo = useCallback((bingoResData) => {
        return bingoResData.length >= BINGO_LEN;
    }, []);

    const isCompleteAllBingo = useCallback((bingoRes) => {
        let completeBingoCount = 0;

        Object.values(bingoRes).map((bingoType) => {
            return bingoType.map((bingoArr) => {
                if (isCompleteBingo(bingoArr)) {
                    completeBingoCount += 1;
                }
            });
        });

        if (completeBingoCount >= COMPLETE_BINGO_COUNT) {
            return true;
        }
        return false;
    }, []);

    return (
        <>
            <BingoTableContainer />
            <BingoResultContainer />
            <BingoButtonContainer />
        </>
    )
};

export default BingoGameContainer;
