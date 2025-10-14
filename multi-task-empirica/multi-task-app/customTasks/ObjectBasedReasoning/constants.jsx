import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // OBR Instance Zero
  {
    name: 'Object Based Reasoning instance zero',
    game: 0,
    calculateScore: !showPracticeStage,
  },
  // OBR Instance One
  {
    name: 'Object Based Reasoning instance one',
    game: 1,
    calculateScore: true,
  },
  // OBR Instance two
  {
    name: 'Object Based Reasoning instance two',
    game: 2,
    calculateScore: true,
  },
  // OBR Instance three
  {
    name: 'Object Based Reasoning instance three',
    game: 3,
    calculateScore: true,
  },
];
