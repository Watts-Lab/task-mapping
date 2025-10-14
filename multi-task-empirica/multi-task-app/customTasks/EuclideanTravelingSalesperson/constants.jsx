import {showPracticeStage} from '../gameConfiguration';

const SIZE = 600;
const DOT_RADIUS = 1 / 40;
const LINE_WIDTH = 1 / 60;

// Task Configuration Instances
export const TASK_CONFIG = [
  // Euclidean Traveling Salesman Instance Zero - Demo
  {
    cities: [
      [0.1, 0.1],
      [0.9, 0.9],
      [0.1, 0.9],
      [0.9, 0.1],
    ],
    bestDistance: 3.2,
    worstDistance: 3.86,
    maxPossibleScore: 10,
    size: SIZE,
    dotRadius: DOT_RADIUS,
    lineWidth: LINE_WIDTH,
    exposureStage: undefined,
    collaboration: true,
    calculateScore: !showPracticeStage,
    name: 'Euclidean Traveling Salesman instance one',
  },
  // Euclidean Traveling Salesman Instance One
  {
    cities: [
      [0.1, 0.1],
      [0.1, 0.7],
      [0.2, 0.2],
      [0.3, 0.4],
      [0.4, 0.2],
      [0.5, 0.8],
      [0.7, 0.5],
      [0.9, 0.3],
    ],
    bestDistance: 2.607,
    worstDistance: 5.092,
    maxPossibleScore: 10,
    size: SIZE,
    dotRadius: DOT_RADIUS,
    lineWidth: LINE_WIDTH,
    exposureStage: undefined,
    collaboration: true,
    calculateScore: true,
    name: 'Euclidean Traveling Salesman instance one',
  },
  // Euclidean Traveling Salesman Instance Two
  {
    cities: [
      [0.1, 0.31],
      [0.12, 0.45],
      [0.18, 0.65],
      [0.22, 0.07],
      [0.39, 0.31],
      [0.45, 0.56],
      [0.53, 0.93],
      [0.64, 0.67],
      [0.78, 0.21],
      [0.84, 0.88],
      [0.77, 0.54],
    ],
    bestDistance: 3.093,
    worstDistance: 7.456,
    maxPossibleScore: 10,
    size: SIZE,
    dotRadius: DOT_RADIUS,
    lineWidth: LINE_WIDTH,
    exposureStage: undefined,
    collaboration: true,
    calculateScore: true,
    name: 'Euclidean Traveling Salesman instance two',
  },
];
