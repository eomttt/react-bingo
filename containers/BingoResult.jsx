import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BingoResult from '../components/BingoResult';

import { BINGO_LEN, PLAYER } from '../constant';
import * as bingoAction from '../reducers';

const BingoResultContainer = () => {
    const dispatch = useDispatch();
    const { bingoOneSelected, bingoOneRes,
            bingoTwoSelected, bingoTwoRes } = useSelector((state) => state);

    useEffect(() => {
        dispatch(
            bingoAction.setBingoOneResult(getBingoResult(bingoOneSelected))
        );
    }, [bingoOneSelected]);

    useEffect(() => {
        dispatch(
            bingoAction.setBingoTwoResult(getBingoResult(bingoTwoSelected))
        );
    }, [bingoTwoSelected]);

    const getBingoResult = useCallback((selectedBingos) => {
        let rows = [];
        let columns = [];
        let cross = [[], []];

        selectedBingos.forEach((selectedBingo) => {
            const { number, row, column } = selectedBingo;
            if (!rows[`${row}`]) {
                rows[row] = [];
            }
            if (!columns[`${column}`]) {
                columns[column] = [];
            }

            if (row === column) {
                cross[0].push(number);
            }

            if (row === BINGO_LEN - column - 1) {
                cross[1].push(number);
            }
            
            rows[row].push(number);
            columns[column].push(number);
        });

        return {
            rows,
            columns,
            cross,
        };
    }, []);

    return (
        <>
            <BingoResult 
                user={PLAYER.ONE}
                bingoRes={bingoOneRes}
            />
            <BingoResult
                user={PLAYER.TWO}
                bingoRes={bingoTwoRes}
            />
        </>
    )
};

export default BingoResultContainer;
