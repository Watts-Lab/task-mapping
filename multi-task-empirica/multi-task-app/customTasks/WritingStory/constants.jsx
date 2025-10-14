import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // Writing Story Instance Zero - practice
  {
    name: 'Writing Story instance zero',
    instance_number: 0,
    calculateScore: !showPracticeStage,
    question: 'Here is an example prompt to respond to.',
    //'What makes for success in our culture? Write a paragraph or two summarizing your opinions on this question.',
    numEtherpads: 1,
  },
  // Writing Story Instance One
  {
    name: 'Writing Story instance one',
    instance_number: 1,
    calculateScore: true,
    question:
      'Assuming for the moment that federal action is desirable in discouraging the consumption of alcohol, write out a plan of action which the government could follow.',
    numEtherpads: 1,
  },
  // Writing Story Instance Two
  {
    name: 'Writing Story instance two',
    instance_number: 2,
    calculateScore: true,
    question:
      'How does the growth in population affect the environment? Write a paragraph or two summarizing your opinions on this question.',
    numEtherpads: 1,
  },
  // Writing Story Instance Three
  {
    name: 'Writing Story instance three',
    instance_number: 3,
    calculateScore: true,
    question:
      'Does technology make us more alone/ isolated? Write a paragraph or two summarizing your opinions on this question.',
    numEtherpads: 1,
  },
  // // Writing Story Instance Four
  // {
  //   name: 'Writing Story instance four',
  //   instance_number: 4,
  //   calculateScore: true,
  //   question:
  //     'What factors shape our values and beliefs? Write a paragraph or two summarizing your opinions on this question.',
  // numEtherpads: 1,
  // },
  // // Writing Story Instance Five
  // {
  //   name: 'Writing Story instance five',
  //   instance_number: 5,
  //   calculateScore: true,
  //   question:
  //     'What is creativity and what is its importance for the individual / the culture? Write a paragraph or two summarizing your opinions on this question.',
  //   numEtherpads: 1,
  // },
  // // Writing Story Instance Six
  // {
  //   name: 'Writing Story instance six',
  //   instance_number: 6,
  //   calculateScore: true,
  //   question:
  //     'Assuming for the moment that federal action is desirable in discouraging the use of electronic cigarettes, write out a plan of action which the government could follow.',
  //   numEtherpads: 1,
  // },
];
