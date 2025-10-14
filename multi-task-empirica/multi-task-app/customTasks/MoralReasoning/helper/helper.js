export function getOption(players) {
  let frequency = {};

  players.forEach(curPlayer => {
    let option = curPlayer.stage.get('option');
    if (option != undefined && frequency[option]) {
      frequency[option]++;
    } else if (option != undefined) {
      frequency[option] = 1;
    }
  });

  let maxFreq = -1;
  let mostOption = null;
  for (let option of Object.keys(frequency)) {
    if (frequency[option] > maxFreq) {
      maxFreq = frequency[option];
      mostOption = option;
    }
  }
  //console.log('mostOption: ' + mostOption);
  return mostOption;
}
