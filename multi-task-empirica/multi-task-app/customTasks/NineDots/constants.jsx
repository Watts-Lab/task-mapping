import {showPracticeStage} from '../gameConfiguration';

const DOTS = [
  [0.3, 0.3],
  [0.3, 0.5],
  [0.3, 0.7],
  [0.5, 0.3],
  [0.5, 0.5],
  [0.5, 0.7],
  [0.7, 0.3],
  [0.7, 0.5],
  [0.7, 0.7],
];
const DEMO_DOTS = [
  [0.3, 0.5],
  [0.7, 0.5],
];
const UPDATE_INTERVAL = 50;
const SIZE = 600;
const DOT_RADIUS = 1 / 50;
const LINE_WIDTH = 1 / 100;
const JOINT_RADIUS = 1 / 75;

// Task Configuration Instances
export const TASK_CONFIG = [
  // Nine Dots Instance Zero
  {
    dots: DEMO_DOTS,
    updateInterval: UPDATE_INTERVAL,
    size: SIZE,
    dotRadius: DOT_RADIUS,
    lineWidth: LINE_WIDTH,
    jointRadius: JOINT_RADIUS,
    maxPossibleScore: 1,
    numEdges: 1,
    name: 'Nine Dots instance zero',
    calculateScore: !showPracticeStage,
  },
  // Nine Dots Instance One
  {
    dots: DOTS,
    updateInterval: UPDATE_INTERVAL,
    size: SIZE,
    dotRadius: DOT_RADIUS,
    lineWidth: LINE_WIDTH,
    jointRadius: JOINT_RADIUS,
    maxPossibleScore: 9,
    numEdges: 4,
    name: 'Nine Dots instance one',
    calculateScore: true,
  },
];
