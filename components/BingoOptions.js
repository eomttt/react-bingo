import React from 'react';
import PropTypes from 'prop-types';

const BingoOptions = ({ turnText, buttonText, onClickButton }) => {
  return (
    <>
     <button onClick={onClickButton}>
      {buttonText}
     </button>
     <div>
       Now Turn: {turnText}
     </div>
    </>
  );
};

BingoOptions.propTypes = {
  buttonText: PropTypes.string,
  turnText: PropTypes.string,
  onClickButton: PropTypes.func
};

export default BingoOptions;