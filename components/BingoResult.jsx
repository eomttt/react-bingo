import React from 'react';
import PropTypes from 'prop-types';

const BingoResult = ({ bingoRes }) => {
  return (
    <div>
      {
        bingoRes.map((resArr, resArrIndex) => {
          return <div key={`resArrkey${resArrIndex}`}>
            {
              resArr.map((bingoData, bingoDataINdex) => {
                return <span key={`bingoData${bingoDataINdex}`}>{bingoData.value} </span>
              })
            }
          </div>
        })
      }
    </div>
  );
};

BingoResult.propTypes = {
  bingoRes: PropTypes.array
};

export default BingoResult;