import {showPracticeStage} from '../gameConfiguration';

export const TASK_CONFIG = [
  // Random Dot Motion Instance ZERO
  {
    name: 'Random Dot Motion instance zero',
    calculateScore: !showPracticeStage,
    corrDotPercent: 0.9,
    corrAngle: 270,
    dotSpeed: 100,
    numberOfDots: 50,
    seed: 'gamezero ',
  },
  // Random Dot Motion Instance ONE
  {
    name: 'Random Dot Motion instance one',
    calculateScore: true,
    corrDotPercent: 0.5,
    corrAngle: 327,
    dotSpeed: 100,
    numberOfDots: 50,
    seed: 'gameone ',
  },
  // Random Dot Motion Instance TWO
  {
    name: 'Random Dot Motion instance two',
    calculateScore: true,
    corrDotPercent: 0.3,
    corrAngle: 185,
    dotSpeed: 100,
    numberOfDots: 50,
    seed: 'gametwo ',
  },
  // Random Dot Motion Instance THREE
  {
    name: 'Random Dot Motion instance three',
    calculateScore: true,
    corrDotPercent: 0.05,
    corrAngle: 54,
    dotSpeed: 100,
    numberOfDots: 50,
    seed: 'gamethree ',
  },
];
