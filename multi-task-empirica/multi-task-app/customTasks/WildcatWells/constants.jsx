import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // Task Instance Zero - Practice Round
  {
    calculateScore: !showPracticeStage,
    name: 'Wildcat Wells instance zero',
    img: 'desert2.png',
    functionSeed: 1,
    startingGrid: [
      ['Interval', '1', '2', '3', '4', '5', '6'],
      ['Score', '-', '-', '-', '-', '-', '-'],
    ],
    intervalDuration: 10,
  },
  // Task Instance One
  {
    calculateScore: true,
    name: 'Wildcat Wells instance one',
    img: 'desert3.png',
    functionSeed: 5,
    startingGrid: [
      ['Interval', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      ['Score', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ],
    intervalDuration: 10,
  },
  // Task Instance Two
  {
    calculateScore: true,
    name: 'Wildcat Wells instance two',
    img: 'desert6.png',
    functionSeed: 4,
    startingGrid: [
      ['Interval', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      ['Score', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ],
    intervalDuration: 10,
  },
  // Task Instance Three
  {
    calculateScore: true,
    name: 'Wildcat Wells instance three',
    img: 'desert8.png',
    functionSeed: 3,
    startingGrid: [
      ['Interval', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      ['Score', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ],
    intervalDuration: 10,
  },
];
