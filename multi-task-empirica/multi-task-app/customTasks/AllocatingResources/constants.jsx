import {showPracticeStage} from '../gameConfiguration';

// Unresolved treatments
export const // Task Configuration Instances
  TASK_CONFIG = [
    // Instance Zero
    {
      name: 'Allocating Resources instance zero',
      calculateScore: !showPracticeStage,
      projects: [
        {
          project: 'Here is a description of a project requesting funds.',
          amountNeeded: 500000,
        },
      ], // the different project proposals
      money: 500000, // the amount of money participants can allocate
      numEtherpads: 1,
    },
    {
      name: 'Allocating Resources instance one',
      calculateScore: true,
      projects: [
        {
          project:
            'To purchase a new computer system for the county government in order to hold local taxes constant.',
          amountNeeded: 200000,
        },
        {
          project:
            'To establish a community arts program featuring art, music, and dance programs for children and adults.',
          amountNeeded: 300000,
        },
        {
          project: 'To establish an additional shelter for the homeless in the community.',
          amountNeeded: 400000,
        },
      ], // the different project proposals
      money: 1000000, // the amount of money participants can allocate
      numEtherpads: 1,
    },
    // Instance One
    {
      name: 'Allocating Resources instance two',
      calculateScore: true,
      projects: [
        {
          project:
            'To purchase a new computer system for the county government in order to hold local taxes constant.',
          amountNeeded: 200000,
        },
        {
          project:
            'To establish a community arts program featuring art, music, and dance programs for children and adults.',
          amountNeeded: 300000,
        },
        {
          project: 'To establish an additional shelter for the homeless in the community.',
          amountNeeded: 400000,
        },
      ], // the different project proposals
      money: 500000, // the amount of money participants can allocate
      numEtherpads: 1,
    },
    // Instance Two
    {
      name: 'Allocating Resources instance three',
      calculateScore: true,
      projects: [
        {
          project:
            'To purchase a new computer system for the county government in order to hold local taxes constant.',
          amountNeeded: 500000,
        },
        {
          project:
            'To establish a community arts program featuring art, music, and dance programs for children and adults.',
          amountNeeded: 500000,
        },
        {
          project: 'To establish an additional shelter for the homeless in the community.',
          amountNeeded: 500000,
        },
      ], // the different project proposals
      money: 500000, // the amount of money participants can allocate
      numEtherpads: 1,
    },
  ];
