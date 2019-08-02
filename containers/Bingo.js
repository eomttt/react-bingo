import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import * as actions from '../reducers';

import BingoTable from '../components/BingoTable';
import BingoResult from '../components/BingoResult';

const Bingo = () => {
  const dispatch = useDispatch();
  const { bingoOne, bingoOneRes, bingoOneRecentClick,
    bingoTwo, bingoTwoRes, bingoTwoRecentClick,
    result } = useSelector(state => state);

  useEffect(() => {
    if (bingoOneRecentClick.row < 0 || bingoTwoRecentClick.row < 0) {
      // Click not yet
      return;
    }

    _setBingoRes(bingoOne, bingoOneRecentClick);
    _setBingoRes(bingoTwo, bingoTwoRecentClick);
  
    dispatch(actions.changeTurn())
  }, [bingoOneRecentClick, bingoTwoRecentClick]);

  useEffect(() => {
    if (bingoOneRes.length >= 5 || bingoTwoRes.length >= 5) {
      dispatch(actions.setResult());
    }
  }, [bingoOneRes, bingoTwoRes]);

  useEffect(() => {
    if (!!result) {
      alert(result);
      dispatch(actions.resetGame());
    }
  }, [result])

  const _setBingoRes = (bingo, { row, column }) => {
    let bingoRes = {
      row: [],
      column: [],
      cross: [],
      reverseCross: []
    };

    bingo.forEach((data, index) => {
      if (bingo[row][index].select) {
        bingoRes.row.push(bingo[row][index]);
      }
      if (bingo[index][column].select) {
        bingoRes.column.push(bingo[index][column]);
      }
      if (bingo[index][index].select) {
        bingoRes.cross.push(bingo[index][index]);
      }
      if (bingo[index][bingo.length - 1 - index].select) {
        bingoRes.reverseCross.push(bingo[index][bingo.length - 1 - index]);
      }
    });

    if (bingoRes.row.length >= 5) {
      dispatch(actions.setBingo({
        value: bingoRes.row
      }));
    }
    if (bingoRes.column.length >= 5) {
      dispatch(actions.setBingo({
        value: bingoRes.column
      }));
    }
    if (bingoRes.cross.length >= 5) {
      dispatch(actions.setBingo({
        value: bingoRes.cross
      }));
    }
    if (bingoRes.reverseCross.length >= 5) {
      dispatch(actions.setBingo({
        value: bingoRes.reverseCross
      }));
    }
  }

  return (
    <>
      <div className='bingo-container'>
        <BingoTable bingoDatas={bingoOne}/>
        <BingoResult bingoRes={bingoOneRes}/>
      </div>
      <div className='bingo-container'>
        <BingoTable bingoDatas={bingoTwo}/>
        <BingoResult bingoRes={bingoTwoRes}/>
      </div>
    </>
  );
};

export default Bingo;