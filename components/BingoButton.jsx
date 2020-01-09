import React from 'react';

const BingoButton = ({ onClickButton, buttonText, turnText}) => {
    return (
        <>
            <button onClick={onClickButton}>
                {buttonText}
            </button>
            <div>
               {turnText}
            </div>
       </>
    )
};

export default BingoButton;
