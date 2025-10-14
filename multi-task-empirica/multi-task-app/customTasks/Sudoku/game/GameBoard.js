import React from 'react';
import './boardlayoutstyle.css';

function GameBoard(props) {

    let inputAreas = [];

    if (props.boardData != null) {
        let counter = 0;
        for (let i = 0; i < props.boardData.length; i++) {
            for (let j = 0; j < props.boardData.length; j++) {
                /*determines background color of square*/
                let x = Math.floor(j / 3);
                let y = Math.floor(i / 3);
                let isEditable = props.editableCellID.has(counter);
                let isClicking = false;
                if (Array.isArray(props.clickingCellID)) {
                    isClicking = props.clickingCellID.includes(counter);
                }
                let isDuplicate = false;
                if (Array.isArray(props.duplicateCellID)) {
                    isDuplicate = props.duplicateCellID.includes(counter);
                }
                let inputVal = props.boardData[i][j];
                let flag = isNaN(inputVal) ? true : false;
                inputAreas.push(<input
                    autoComplete="off"
                    key={counter}
                    id={counter}
                    className={`inputBox ${(x + y) % 2 === 0 ? "grayBox" : "whiteBox"} ${isEditable ? "normal" : "prefilled"} ${isClicking ? "clicked" : ""} ${isDuplicate ? "duplicate" : ""}`}
                    type="text"
                    disabled={!isEditable}
                    value={inputVal === 0 || inputVal === "" || flag ? "" : inputVal}
                    onChange={(e) => props.inputHandler(i, j, e)}
                // onClick={(e) => props.clickHandler(i, j)}
                />);
                counter++;
            }
        }
    }

    return (
        <div>
            <div className="gameBoard">
                {inputAreas}
            </div>
        </div>

    );
}

export default GameBoard;
