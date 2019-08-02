import React from 'react';
import PropTypes from 'prop-types';

import BingoTr from './BingoTr';

const BingoTable = ({ bingoDatas }) => {
  return (
    <>
      <div>
        {bingoDatas[0][0].user}  
      </div>
      <table>
        <tbody>
          {
            bingoDatas.map((tr, i) => {
              return <BingoTr key={i} rowDatas={tr}/>
            })
          }
        </tbody>
      </table>
    </>
  );
};

BingoTable.propTypes = {
  bingoDatas: PropTypes.array
};

export default BingoTable;