import {showPracticeStage} from '../gameConfiguration';

let elephant = new Word('ELEPHANT', 'LEPHEANT');

let round = new Word('ROUND', 'ONDRU');
let lunch = new Word('LUNCH', 'HCUNL');
let fault = new Word('FAULT', 'AUFLT');
let dress = new Word('DRESS', 'SERSD');
let proud = new Word('PROUD', 'UPDRO');
let leave = new Word('LEAVE', 'VEALE');
let honor = new Word('HONOR', 'HORON');
let mouth = new Word('MOUTH', 'OUTMH');

let apathy = new Word('APATHY', 'TYAAPH');
let member = new Word('MEMBER', 'EMERMB');
let island = new Word('ISLAND', 'NDLSAI');
let budget = new Word('BUDGET', 'UTDEGB');
let peanut = new Word('PEANUT', 'TANEPU');
let happen = new Word('HAPPEN', 'PPANHE');
let rotate = new Word('ROTATE', 'TTEARO');
let canvas = new Word('CANVAS', 'ACAVNS');

let freedom = new Word('FREEDOM', 'EDMOFRE');
let pudding = new Word('PUDDING', 'UPGNIDD');
let paradox = new Word('PARADOX', 'DPXORAA');
let absence = new Word('ABSENCE', 'BACENSE');
let confine = new Word('CONFINE', 'ONFEINC');
let extreme = new Word('EXTREME', 'ETEXERM');
let science = new Word('SCIENCE', 'ESICNCE');
let convict = new Word('CONVICT', 'TONCIVC');

export const TASK_CONFIG = [
  // Unscramble Words Instance ZERO
  {
    name: 'Unscramble Words instance zero',
    calculateScore: !showPracticeStage,
    wordList: [elephant],
    displayFeedback: false,
  },
  //  Unscramble Words Instance ONE
  {
    name: 'Unscramble Words instance one',
    calculateScore: true,
    wordList: [round, lunch, fault, dress, proud, leave, honor, mouth],
    displayFeedback: false,
  },
  // Unscramble Words Instance TWO
  {
    name: 'Unscramble Words instance two',
    calculateScore: true,
    wordList: [apathy, member, island, budget, peanut, happen, rotate, canvas],
    displayFeedback: false,
  },
  // Unscramble Words Instance THREE
  {
    name: 'Unscramble Words instance three',
    calculateScore: true,
    wordList: [freedom, pudding, paradox, absence, confine, extreme, science, convict],
    displayFeedback: false,
  },
];

function Word(word, letters) {
  this.word = word;
  this.letters = letters;
}
