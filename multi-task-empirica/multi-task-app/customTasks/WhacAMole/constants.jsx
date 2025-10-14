import {showPracticeStage} from '../gameConfiguration';

export const TASK_CONFIG = [
  // Whac A Mole instance 0
  {
    name: 'Whac A Mole instance 0',
    calculateScore: !showPracticeStage,
    dimensions: {width: 800, height: 500},
    dots: [
      {
        name: 'green',
        color: 'green',
        appearanceFrequency: 1,
        teamPointsEarned: 1,
        opponentPointsEarned: 0,
      },
    ], //the types of dots that will be used for the game.
    // name: name of dot, this is used for identifying different types of dots
    // color: a css color for the dot
    // appearanceFrequency: ratio of how frequent each color dot will appear
    // teamPointsEarned: the amount of points the team earns for capturing the dot
    // opponentPointsEarned: the amount of points the opponent earns for capturing the dot

    generationInterval: 800, // The time interval between generation attempts
    generationsPerInterval: 2, // The number of generation attempts per interval
    appearanceProbability: 0.55, // Probability of generating a dot for each generation attempt
    appearanceTime: 4000, // How long a dot will stay on the screen for
    numberOfTeams: 1, // The number of teams playing
    dotRadius: 10, // Radius of the dots
    touchDistance: 25, // Distance between the center of the dot and the player circle to be considered touching
    seed: 'gamezero', // Seed used to generate dots
  },
  // Whac A Mole instance 1
  {
    name: 'Whac A Mole instance 1',
    calculateScore: true,
    dimensions: {width: 800, height: 500},
    dots: [
      {
        name: 'green',
        color: 'green',
        appearanceFreuqency: 1,
        teamPointsEarned: 1,
        opponentPointsEarned: 0,
      },
    ], //the types of dots that will be used for the game.
    // name: name of dot, this is used for identifying different types of dots
    // color: a css color for the dot
    // appearanceFrequency: ratio of how frequent each color dot will appear
    // teamPointsEarned: the amount of points the team earns for capturing the dot
    // opponentPointsEarned: the amount of points the opponent earns for capturing the dot

    generationInterval: 500, // The time interval between generation attempts
    generationsPerInterval: 4, // The number of generation attempts per interval
    appearanceProbability: 0.25, // Probability of generating a dot for each generation attempt
    appearanceTime: 2000, // How long a dot will stay on the screen for
    numberOfTeams: 1, // The number of teams playing
    dotRadius: 10, // Radius of the dots
    touchDistance: 25, // Distance between the center of the dot and the player circle to be considered touching
    seed: 'gamezero', // Seed used to generate dots
  },
  // Whac A Mole instance 2
  {
    name: 'Whac A Mole instance 2',
    calculateScore: true,
    dimensions: {width: 800, height: 500},

    dots: [
      {
        name: 'green',
        color: 'green',
        appearanceFrequency: 1,
        teamPointsEarned: 1,
        opponentPointsEarned: 0,
      },
      {
        name: 'red',
        color: 'red',
        appearanceFrequency: 1,
        teamPointsEarned: -1,
        opponentPointsEarned: 0,
      },
    ], //the types of dots that will be used for the game.
    // name: name of dot, this is used for identifying different types of dots
    // color: a css color for the dot
    // appearanceFrequency: ratio of how frequent each color dot will appear
    // teamPointsEarned: the amount of points the team earns for capturing the dot
    // opponentPointsEarned: the amount of points the opponent earns for capturing the dot

    generationInterval: 500, // The time interval between generation attempts
    generationsPerInterval: 8, // The number of generation attempts per interval
    appearanceProbability: 0.25, // Probability of generating a dot for each generation attempt
    appearanceTime: 2000, // How long a dot will stay on the screen for
    numberOfTeams: 1, // The number of teams playing
    dotRadius: 10, // Radius of the dots
    touchDistance: 25, // Distance between the center of the dot and the player circle to be considered touching
    seed: 'gameone', // Seed used to generate dots
  },
  // Whac A Mole instance 3
  {
    name: 'Whac A Mole instance 3',
    calculateScore: true,
    dimensions: {width: 800, height: 500},

    dots: [
      {
        name: 'green',
        color: 'green',
        appearanceFrequency: 1,
        teamPointsEarned: 1,
        opponentPointsEarned: 0,
      },
      {
        name: 'red',
        color: 'red',
        appearanceFrequency: 1,
        teamPointsEarned: -1,
        opponentPointsEarned: 0,
      },
      {
        name: 'blue',
        color: 'blue',
        appearanceFrequency: 1,
        teamPointsEarned: 0,
        opponentPointsEarned: 0,
      },
    ], //the types of dots that will be used for the game.
    // name: name of dot, this is used for identifying different types of dots
    // color: a css color for the dot
    // appearanceFrequency: ratio of how frequent each color dot will appear
    // teamPointsEarned: the amount of points the team earns for capturing the dot
    // opponentPointsEarned: the amount of points the opponent earns for capturing the dot

    generationInterval: 300, // The time interval between generation attempts
    generationsPerInterval: 12, // The number of generation attempts per interval
    appearanceProbability: 0.25, // Probability of generating a dot for each generation attempt
    appearanceTime: 2000, // How long a dot will stay on the screen for
    numberOfTeams: 1, // The number of teams playing
    dotRadius: 10, // Radius of the dots
    touchDistance: 25, // Distance between the center of the dot and the player circle to be considered touching
    seed: 'gametwo', // Seed used to generate dots
  },
];
