import React, { useCallback } from 'react';

import { BINGO_LEN } from '../constant';

const BingoResult = ({ user, bingoRes }) => {
  const isCompleteBingo = useCallback((bingoResData) => {
    return bingoResData.length >= BINGO_LEN;
  }, []);

  return (
    <div className="bingoresult-container">
      <div>
        {`${user} 결과 `}
      </div>
      {
        Object.values(bingoRes).map((bingoType) => {
          return bingoType.map((bingoArr, bingoArrIndex) => {
            return (
              <div key={`bingoArr-${bingoArrIndex}`}>
                {
                  isCompleteBingo(bingoArr) && bingoArr.map((bingoItem, bingoItemIndex) => {
                    return (
                      <span key={`bingoItem-${bingoItemIndex}`}>
                        {`${bingoItem} `}
                      </span>
                    )
                  })
                }
              </div>
            )
          })
        })
      }
    </div>
  );
};

export default BingoResult;