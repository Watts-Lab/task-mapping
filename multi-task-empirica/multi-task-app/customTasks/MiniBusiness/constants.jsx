import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // MiniBusiness Instance Zero
  {
    name: 'Mini Business instance zero',
    priceArrays: [
      [15, 10, 5, 12, 18, 34, 20, 42, 15, 25],
      [45, 60, 12, 54, 13, 45, 23, 30, 10, 22],
      [19, 12, 15, 26, 4, 33, 35, 40, 42, 50],
      [25, 16, 5, 10, 26, 31, 32, 40, 50, 58],
    ],
    changeTime: 60000,
    calculateScore: !showPracticeStage,
  },
  // MiniBusiness Instance One
  {
    name: 'Mini Business instance one',
    priceArrays: [
      [10, 20, 17, 30, 8, 5, 10, 12, 27, 30],
      [5, 8, 27, 3, 12, 6, 3, 10, 14, 20],
      [1, 5, 27, 20, 12, 13, 10, 9, 22, 28],
      [4, 12, 14, 23, 18, 15, 21, 16, 22, 25],
      [12, 18, 6, 12, 13, 17, 20, 18, 7, 22],
      [10, 18, 1, 12, 3, 27, 2, 8, 17, 12],
    ],
    changeTime: 60000,
    calculateScore: true,
  },
  // MiniBusiness Instance Two
  {
    name: 'Mini Business instance two',
    priceArrays: [
      [12, 21, 10, 13, 8, 12, 10, 14, 7, 5],
      [14, 8, 30, 2, 22, 16, 30, 20, 24, 27],
      [3, 12, 6, 30, 11, 17, 18, 22, 3, 19],
      [24, 5, 18, 13, 11, 25, 19, 26, 32, 25],
      [28, 9, 10, 18, 15, 23, 1, 29, 25, 24],
      [30, 4, 21, 3, 8, 27, 6, 11, 2, 12],
      [14, 7, 22, 19, 13, 5, 16, 26, 20, 17],
      [19, 2, 23, 20, 17, 14, 25, 26, 8, 16],
      [30, 1, 13, 3, 15, 21, 4, 27, 6, 7],
      [18, 10, 12, 11, 29, 5, 22, 28, 24, 9],
      [1, 8, 10, 12, 13, 17, 12, 18, 27, 12],
    ],
    changeTime: 30000,
    calculateScore: true,
  },
  // MiniBusiness Instance Three
  {
    name: 'Mini Business instance three',
    priceArrays: [
      [11, 22, 13, 31, 22, 30, 13, 19, 21, 34],
      [8, 25, 24, 5, 5, 7, 23, 22, 29, 17],
      [26, 18, 1, 12, 30, 26, 15, 25, 9, 29],
      [9, 1, 2, 17, 29, 8, 16, 15, 22, 28],
      [3, 12, 15, 5, 5, 6, 9, 2, 1, 17],
      [1, 19, 15, 29, 28, 4, 8, 24, 6, 19],
      [17, 29, 18, 23, 17, 13, 24, 3, 19, 13],
      [18, 13, 5, 1, 4, 24, 2, 26, 24, 11],
      [27, 30, 29, 17, 2, 8, 22, 11, 23, 27],
      [17, 28, 1, 21, 29, 7, 18, 27, 30, 30],
      [14, 11, 9, 9, 25, 2, 13, 20, 30, 12],
      [18, 20, 17, 2, 7, 30, 10, 20, 15, 4],
      [6, 18, 29, 26, 9, 10, 1, 30, 30, 19],
      [10, 6, 27, 21, 27, 11, 12, 19, 6, 18],
      [10, 30, 15, 11, 23, 4, 8, 26, 12, 1],
      [2, 14, 12, 23, 13, 12, 15, 18, 7, 3],
    ],
    changeTime: 20000,
    calculateScore: true,
  },
];

export const tools = {
  TOP: {
    dowel: 1,
    wheel: 1,
    string: 0,
    clay: 0,
    wood: 0,
    glue: 1,
    paper: 0,
    wire: 0,
  },
  MAN: {
    dowel: 3,
    wheel: 0,
    string: 2,
    clay: 2,
    wood: 0,
    glue: 1,
    paper: 0,
    wire: 0,
  },
  AIRPLANE: {
    dowel: 3,
    wheel: 4,
    string: 0,
    clay: 0,
    wood: 1,
    glue: 1,
    paper: 0,
    wire: 2,
  },
  WAGON: {
    dowel: 4,
    wheel: 4,
    string: 2,
    clay: 0,
    wood: 0,
    glue: 1,
    paper: 0,
    wire: 0,
  },
  LADDER: {
    dowel: 6,
    wheel: 0,
    string: 0,
    clay: 0,
    wood: 0,
    glue: 2,
    paper: 0,
    wire: 0,
  },
};
