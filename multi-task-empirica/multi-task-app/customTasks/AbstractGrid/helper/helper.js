export function calculateScore(startGrid, endGrid, maxScore) {
    const size = endGrid.length;

    let isCorrect = true;
    let optimal = 0;

    for (let i = 0; i < size / 2; i++) {
        for (let j = 0; j < size / 2; j++) {
        const quadsColoredAtStart = calcQuadrantsColored(size, i, j, startGrid);
        const quadsColoredAtEnd = calcQuadrantsColored(size, i, j, endGrid);
        const stillCorrect = quadsColoredAtEnd === 4 || quadsColoredAtEnd === 0;

        isCorrect = isCorrect && stillCorrect;
        optimal += Math.min(quadsColoredAtStart, 4 - quadsColoredAtStart);
        }
    }

    let nChanged = numberChanged(startGrid, endGrid);

    if (isCorrect) {
        const realScore = 10 - Math.floor((nChanged - optimal) / 2);
        const stageScore = 10 * Math.max(3, realScore);
        const normalizedScore = (100 * stageScore) / maxScore;
        return normalizedScore;
    } else {
        return 0;
    }
}

function calcQuadrantsColored(size, i, j, grid) {
    return (
      grid[i][j] +
      grid[i][size - 1 - j] +
      grid[size - 1 - i][j] +
      grid[size - 1 - i][size - 1 - j]
    );
}

export function numberChanged(startGrid, endGrid) {
    const size = endGrid.length;
    let nChanged = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
        if (endGrid[i][j] != startGrid[i][j]) {
            nChanged++;
        }}
    }
    return nChanged; 
}