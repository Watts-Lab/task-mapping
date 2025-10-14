import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // Instance Zero
  {
    calculateScore: false,
    instance: 'zero',
    name: 'Wolf Goat Cabbage instance zero',
    characters: ['wolf', 'goat', 'cabbage'],
  },
  // Task Instance One
  {
    calculateScore: true,
    instance: 'one',
    name: 'Wolf Goat Cabbage instance one',
    maxPossibleScore: 142.857,
    fewestMoves: 7,
    characters: ['wolf', 'goat', 'cabbage'],
  },
  {
    calculateScore: true,
    instance: 'two',
    name: 'Wolf Goat Cabbage instance two',
    maxPossibleScore: 333.3333,
    fewestMoves: 3,
    characters: ['wolf', 'goat', 'cabbage'],
  },
  {
    calculateScore: true,
    instance: 'three',
    name: 'Wolf Goat Cabbage instance three',
    maxPossibleScore: 333.3333,
    fewestMoves: 3,
    characters: ['wolf', 'goat', 'cabbage', 'caterpillar'],
  },
];
