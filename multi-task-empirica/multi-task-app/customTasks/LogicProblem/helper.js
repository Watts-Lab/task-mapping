export function calculateScore(playerGrid, correctGrid) {
    let currScore = 0; 
    for (let i = 0; i < 48; i += 1) {
        if (playerGrid[i] == correctGrid[i]) {
            currScore += 1; 
        }
    }
    return Math.floor((currScore / 48) * 100);
}