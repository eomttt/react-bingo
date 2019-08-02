import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../reducers';

import BingoTdComp from '../components/BingoTd';

const BingoTd = ({ bingoData }) => {
  const dispatch = useDispatch();
  const { turn } = useSelector(state => state);

  const onClickCell = useCallback(() => {
    if (!!bingoData.value) {
      if (turn === bingoData.user) {
        dispatch(actions.clickCell({
          value: bingoData.value
        }));
      } else {
        alert('Please click my bingo.');
      }
    }
  }, [bingoData, turn])

  return (
    <BingoTdComp data={bingoData.value} selected={bingoData.select} onClickCell={onClickCell}/>
  );
};

BingoTd.propTypes = {
  bingoData: PropTypes.object
};

export default BingoTd