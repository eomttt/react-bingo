import React, { useCallback } from 'react';

const BingoTable = ({ bingo, selectedBingos, onClickBingo }) => {
  const isSelected = useCallback((bingoNumber) => {
    const selectedNumbers = selectedBingos.map((selectedBingos) => {
      return selectedBingos.number;
    });

    return selectedNumbers.includes(bingoNumber);
  }, [selectedBingos]);
  
  return (
    <div className="bingotable-container">
      {
        bingo.map((bingoRow, rowIndex) => {
          return (
            <div className="bingotable-line" key={`row-${rowIndex}`}>
              {
                bingoRow.map((bingoItem, columnIndex) => {
                  return (
                    <div className={`bingotable-item ${isSelected(bingoItem) && 'bingotable-item-selected'}`}
                         key={`${bingoItem}-${columnIndex}`}
                         onClick={() => onClickBingo(bingoItem, rowIndex, columnIndex)}>
                      <div className="bingotable-text">
                        <div>
                          {bingoItem}
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )
        })
      }
    </div>
  );
};

export default BingoTable;
