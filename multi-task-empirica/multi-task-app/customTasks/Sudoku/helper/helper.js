export function calculateScore(startGrid, finalGrid, solution, maxScore) {
  // first find how many unfilled cells of startGrid
  let count = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (startGrid[i][j] === 0) {
        count++;
      }
    }
  }

  let startScore = 50;
  let scorePerCell = (maxScore - startScore) / count;

  let correctNum = 0;
  let wrongNum = 0;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (startGrid[i][j] === 0) {
        if (
          finalGrid[i][j] === 0 ||
          finalGrid[i][j] == undefined ||
          finalGrid[i][j] == ""
        ) {
          continue;
        } else if (finalGrid[i][j] === solution[i][j]) {
          correctNum++;
        } else {
          wrongNum++;
        }
      }
    }
  }

  const score =
    startScore + correctNum * scorePerCell - wrongNum * scorePerCell;

  return score;
}

export function getEditableCellID(boardData) {
  let editableGridID = new Set();
  let counter = 0;
  for (let i = 0; i < boardData.length; i++) {
    for (let j = 0; j < boardData.length; j++) {
      if (boardData[i][j] === 0) {
        editableGridID.add(counter);
      }
      counter++;
    }
  }
  return editableGridID;
}
