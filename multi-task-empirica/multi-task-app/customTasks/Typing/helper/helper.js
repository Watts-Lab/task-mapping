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

const { diffWords } = require('diff');

export function calculateScore(text, typed) {
  
  // console.log(text);
  // console.log(typed);
  let score = 0;

  if(typed != undefined && typed != '')
  {
  const diffs = diffWords(text, typed);
  //console.log(diffs);

  for (let i = 0; i < diffs.length; i++) {
    const diff = diffs[i];
    if (!(diff.added || diff.removed)) 
    {
      // console.log(diff);
      words = diff.value.split(/\s+/);
      
      for(let j = 0; j < words.length; j++)
      {
        if(words[j] != '')
        {
          score++;
        }
      }
    }
  }
  }

  var words = text.split(/\s+/); 
  var wordCount = words.length; 
  score = Math.round((score * 100) / wordCount);

  if(score < 0)
  {
    score = 0;
  }

  return score;
}