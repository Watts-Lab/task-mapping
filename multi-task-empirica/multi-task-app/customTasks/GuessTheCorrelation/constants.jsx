import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // Task Instance Zero - Practice Round
  {
    calculateScore: !showPracticeStage,
    path: 'img/gtc_prac.png',
    correlation: 0,
    practice: true,
    name: 'Guess The Correlation instance zero',
  },
  // Task Instance One
  {
    calculateScore: true,
    path: 'img/gtc_0.91.png',
    correlation: 0.91,
    practice: false,
    maxPossibleScore: 100,
    name: 'Guess The Correlation instance one',
  },
  // Task Instance Two
  {
    calculateScore: true,
    path: 'img/gtc_0.78.png',
    correlation: 0.78,
    practice: false,
    maxPossibleScore: 100,
    name: 'Guess The Correlation instance two',
  },
  // Task Instance Three
  {
    calculateScore: true,
    path: 'img/gtc_0.09.png',
    correlation: 0.09,
    practice: false,
    maxPossibleScore: 100,
    name: 'Guess The Correlation instance three',
  },
];
