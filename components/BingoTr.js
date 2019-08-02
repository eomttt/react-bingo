import React from 'react';
import PropTypes from 'prop-types';

import BingoTd from '../containers/BingoTd';

const BingoTr = ({ rowDatas }) => {
  return (
    <tr>
      {
        rowDatas.map((data, i) => {
          return <BingoTd key={i} bingoData={data}/>
        })
      }
    </tr>
  );
};

BingoTr.propTypes = {
  rowDatas: PropTypes.array
};

export default BingoTr;