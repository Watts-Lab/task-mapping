import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // DAT Instance Zero - Practice Round
  {
    name: 'Divergent Association Task instance zero',
    numElems: 2,
    maxScore: 20,
    calculateScore: !showPracticeStage,
  },
  // DAT Instance One
  {
    name: 'Divergent Association Task instance zero',
    numElems: 5,
    maxScore: 50,
    calculateScore: true,
  },
  // DAT Instance Two
  {
    name: 'Divergent Association Task instance one',
    numElems: 10,
    maxScore: 100,
    calculateScore: true,
  },
  // DAT Instance Three
  {
    name: 'Divergent Association Task instance two',
    numElems: 15,
    maxScore: 150,
    calculateScore: true,
  },
];
