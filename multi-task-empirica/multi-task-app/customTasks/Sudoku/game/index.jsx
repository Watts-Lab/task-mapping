import React from 'react';
import {TaskLayout} from '../../../client/common/TaskLayout';
import {Button} from '../../../client/common/components/Button';
import GameBoard from './GameBoard.js';
import {getEditableCellID, calculateScore} from '../helper/helper';
import {Callout} from '../../../client/common/components/Callout';
import Instructions from '../intro/Instructions';
import ViewInstructions from '../../../client/common/components/ViewInstructions';

export default class TaskTemplate extends React.Component {
  constructor(props) {
    super(props);
    const editableCellID = getEditableCellID(this.props.stage.get('constants').initBoardData);
    this.state = {
      editableCellID: editableCellID,
    };
    this.inputHandler = this.inputHandler.bind(this);
    // this.clickHandler = this.clickHandler.bind(this)
  }

  inputHandler(xPos, yPos, event) {
    const {stage, game, player} = this.props;
    let boardData = stage.get('currBoardData');

    event.persist();
    if (stage.get('isDisagree') == true) {
      stage.set('isDisagree', false);
    }
    // check whether the input is valid
    // if it is invalid, then nothing will show on the board
    if (!this.isInputValid(boardData, event.target.value)) {
      event.target.value = '';
      return;
    }

    const val =
      event.target.value == '' || event.target.value == null ? 0 : parseInt(event.target.value);
    boardData[xPos][yPos] = val;
    stage.set('currBoardData', boardData);

    // Only calculate score at stage end (in callbacks.jsx)
    // otherwise the score will leak information about correctness
    // const finalGrid = stage.get("currBoardData");
    // const startGrid = stage.get("constants").initBoardData;
    // const solution = stage.get("constants").solution;
    // const score = calculateScore(startGrid, finalGrid, solution, stage.get("maxPossibleScore"));
    // game.players.forEach((player) => {
    //   player.stage.set("score", score)
    // })

    stage.set('duplicateCellID', []);

    // check whether there are duplicate numbers in row, column or box
    if (this.validSudoku(boardData)) {
      stage.set('isDuplicate', false);
    } else {
      stage.set('isDuplicate', true);
    }

    // check whether the input is the same as solution
    const solutionBoard = stage.get('constants').solution;
    if (this.checkSolution(boardData, solutionBoard)) {
      stage.set('isSolved', true);
    } else {
      stage.set('isSolved', false);
    }
    for (let currPlayer of game.players) {
      if (
        currPlayer.get('approved') == true &&
        !this.isEqualBoard(currPlayer.stage.get('currBoardData'), stage.get('currBoardData'))
      ) {
        stage.set('isDisagree', true);
        game.players.forEach(curPlayer => curPlayer.set('approved'), false);
      }
    }
    player.stage.set('currBoardData', boardData);
  }

  isEqualBoard(array1, array2) {
    if (!Array.isArray(array1) && !Array.isArray(array2)) {
      return array1 === array2;
    }

    if (array1.length !== array2.length) {
      return false;
    }

    for (var i = 0, len = array1.length; i < len; i++) {
      if (!this.isEqualBoard(array1[i], array2[i])) {
        return false;
      }
    }

    return true;
  }

  clickHandler(xPos, yPos) {
    const {stage, game, player} = this.props;
    let counter = 9 * xPos + yPos;
    player.set('playerClickingCellID', counter);
    for (const [i, playerIter] of game.players.entries()) {
      if (playerIter._id == player._id) {
        game.players[i].set('playerClickingCellID', counter);
        break;
      }
    }
    let newClickingCellID = [];
    game.players.forEach(curPlayer =>
      newClickingCellID.push(curPlayer.get('playerClickingCellID'))
    );
    stage.set('clickingCellID', newClickingCellID);
  }

  // check whether there are duplicate numbers in row, column or box for the entire Sudoku
  validSudoku(board) {
    const {stage, game, player} = this.props;
    let isValid = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const value = board[i][j];
        if (value == '0' || value == '' || isNaN(value)) continue;
        if (value) {
          if (
            !this.validRow(board, i, j, value) |
            !this.validColumn(board, i, j, value) |
            !this.validBox(board, i, j, value)
          ) {
            isValid = false;
          }
        }
      }
    }
    return isValid;
  }

  // The row function
  validRow(board, row, col, value) {
    const {stage, game, player} = this.props;
    // j represents on column
    let isValid = true;
    for (let j = 0; j < 9; j++) {
      // check if the current column matches the passed in column
      if (j !== col) {
        if (board[row][j] === value) {
          let currDuplicateCellIDs = stage.get('duplicateCellID');
          currDuplicateCellIDs.push(9 * row + col);
          currDuplicateCellIDs.push(9 * row + j);
          stage.set('duplicateCellID', currDuplicateCellIDs);
          isValid = false;
        }
      }
    }

    return isValid;
  }

  // The column function
  validColumn(board, row, col, value) {
    const {stage, game, player} = this.props;
    let isValid = true;
    // j represents on row
    for (let i = 0; i < 9; i++) {
      // check if the current row matches the passed in row
      if (i !== row) {
        if (board[i][col] === value) {
          let currDuplicateCellIDs = stage.get('duplicateCellID');
          currDuplicateCellIDs.push(9 * row + col);
          currDuplicateCellIDs.push(9 * i + col);
          stage.set('duplicateCellID', currDuplicateCellIDs);
          isValid = false;
        }
      }
    }

    return isValid;
  }

  //The sub-boxes function
  validBox(board, row, col, value) {
    const {stage, game, player} = this.props;
    const startRow = row - (row % 3),
      startCol = col - (col % 3);

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (i !== row && j !== col) {
          if (board[i][j] === value) {
            let currDuplicateCellIDs = stage.get('duplicateCellID');
            currDuplicateCellIDs.push(9 * row + col);
            currDuplicateCellIDs.push(9 * i + j);
            return false;
          }
        }
      }
    }

    return true;
  }

  isInputValid(gameBoard, val) {
    if (val == '') return true;
    //checks if val is number and within bounds
    val = parseInt(val);
    if (Number.isNaN(val)) return false;
    if (val < 0 || val > gameBoard.length) return false;

    return true;
  }

  checkSolution(gameBoard, solutionBoard) {
    for (let i = 0; i < solutionBoard.length; i++) {
      for (let j = 0; j < solutionBoard[0].length; j++) {
        if (parseInt(gameBoard[i][j]) === 0 || parseInt(gameBoard[i][j]) !== solutionBoard[i][j])
          return false;
      }
    }
    return true;
  }

  componentDidMount() {
    const {game, stage} = this.props;
    // should update when changes made in diff parts of task
    stage.set('clickingCellID', []);
    stage.set('duplicateCellID', []);
    stage.set('isDisagree', false);
    game.players.forEach(curPlayer => curPlayer.set('playerClickingCellID', -1));
    game.players.forEach(curPlayer => curPlayer.set('approved', false));
  }

  approve() {
    const {game, player} = this.props;
    player.set('approved', true);
    if (
      game.players.reduce(
        (prev, curPlayer) => prev && (curPlayer.get('approved') || curPlayer.exitStatus)
      )
    ) {
      game.players.forEach(curPlayer => curPlayer.stage.submit());
    }
  }

  reset() {
    const {game, stage} = this.props;
    stage.set('currBoardData', stage.get('constants').initBoardData);
    stage.set('duplicateCellID', []);
    stage.set('isDisagree', false);
    stage.set('isDuplicate', false);
    game.players.forEach(curPlayer => curPlayer.set('approved', false));
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  render() {
    const {round, stage, player, game} = this.props;
    const {editableCellID} = this.state;

    return (
      <TaskLayout
        {...this.props}
        nextForm={() => (
          <div className='flex h-full items-center justify-center space-x-1'>
            <Button
              type='submit'
              onClick={this.approve.bind(this)}
              disabled={player.get('approved')}
            >
              Approve Configuration
            </Button>
            <Button secondary onClick={this.reset.bind(this)} disabled={player.get('approved')}>
              Reset
            </Button>
          </div>
        )}
      >
        <div style={{position: 'absolute', bottom: '5px', right: '330px'}}>
          <ViewInstructions inside={true} instruction={Instructions} props></ViewInstructions>
        </div>
        <div>
          <div className='content'>
            {/* <p className='sudoku-text'>
              Please input digit 1 - 9 in the empty cell. A number can only be used once per row,
              per column and per 3x3 square. The cell with duplicate numbers will be highlighted.
              You can click Reset button to clear the board.
              {game.players.length > 1 ? (
                <p>
                  All the players in your group will input numbers on the same grid simultaneously.
                </p>
              ) : (
                <p></p>
              )}
            </p> */}
            <GameBoard
              boardData={stage.get('currBoardData')}
              clickingCellID={stage.get('clickingCellID')}
              editableCellID={editableCellID}
              duplicateCellID={stage.get('duplicateCellID')}
              inputHandler={this.inputHandler}
              // clickHandler={this.clickHandler}
            />
            <br />
            {stage.get('isSolved') && (
              <div>Congratulations! You solve the Sudoku puzzle successfully. </div>
            )}
            {stage.get('isDuplicate') ? (
              <div className='callout my-8'>
                <Callout title={'Duplicate numbers in your row, column or 3x3 square'}>
                  A number can only be used once per row, per column and per 3x3 square.
                </Callout>
              </div>
            ) : (
              <div className='mt-8'></div>
            )}
            {stage.get('isDisagree') ? (
              <div className='callout my-8'>
                <Callout title={'Someone in your team changed the response.'}>
                  You should agree with all the teammates before clicking Approve Configuration
                  button. You must approve again.
                </Callout>
              </div>
            ) : (
              <div className='mt-8'></div>
            )}
          </div>
        </div>
      </TaskLayout>
    );
  }
}
