import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // Task Instance Zero - Practice Round
  {
    calculateScore: !showPracticeStage,
    name: 'Task Name instance zero',
  },
  // Task Instance One
  {
    calculateScore: true,
    name: 'Task Name instance one',
  },
  // Task Instance Two
  {
    calculateScore: true,
    name: 'Task Name instance two',
  },
  // Task Instance Three
  {
    calculateScore: true,
    name: 'Task Name instance three',
  },
];
