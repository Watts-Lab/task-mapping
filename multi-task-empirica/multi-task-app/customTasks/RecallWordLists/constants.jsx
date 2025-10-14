import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // Task Instance Zero - Practice Round
  {
    calculateScore: !showPracticeStage,
    name: 'Recall Word Lists instance zero',
    audioStartDelay: 10,
    audioFile: 'sounds/practice_audio.mp3',
    listAnswers: ['one', 'two', 'three', 'four'],
    wordAnswer: 'five',
  },
  // Task Instance One
  {
    calculateScore: true,
    name: 'Recall Word Lists instance one',
    audioStartDelay: 30,
    audioFile: 'sounds/round1_audio.mp3',
    listAnswers: ['apple', 'dog', 'table', 'happy'],
    wordAnswer: 'book',
  },
  // Task Instance Two
  {
    calculateScore: true,
    name: 'Recall Word Lists instance two',
    audioStartDelay: 30,
    audioFile: 'sounds/round2_audio.mp3',
    listAnswers: ['joy', 'explore', 'simple', 'gentle', 'trust', 'dream'],
    wordAnswer: 'brave',
  },
  // Task Instance Three
  {
    calculateScore: true,
    name: 'Recall Word Lists instance three',
    audioStartDelay: 30,
    audioFile: 'sounds/round3_audio.mp3',
    listAnswers: [
      'harmony',
      'vivid',
      'house',
      'moon',
      'clock',
      'banana',
      'window',
      'melody',
      'wind',
    ],
    wordAnswer: 'love',
  },
];
