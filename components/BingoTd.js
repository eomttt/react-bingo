import React from 'react';
import PropTypes from 'prop-types';

const BingoTd = ({ data, selected, onClickCell}) => {
  const _getSelectedStyle = () => {
    return !!selected ? 'bingo-selected' : ''
  }

  return (
    <td className={_getSelectedStyle()} onClick={onClickCell}>{data}</td>
  );
};

BingoTd.propTypes = {
  data: PropTypes.number,
  onClickCell: PropTypes.func
};

export default BingoTd