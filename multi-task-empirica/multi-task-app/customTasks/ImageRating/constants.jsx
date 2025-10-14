import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // Image Rating Instance Zero
  {
    name: 'Image Rating instance zero',
    image_name: 'The last night of a two week stay on the North Shore of Oahu, Hawaii.',
    address:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80',
    rating: 7,
    calculateScore: !showPracticeStage,
  },
  // Image Rating Instance One
  {
    name: 'Image Rating instance one',
    image_name: 'S like Speed',
    address:
      'https://images.unsplash.com/photo-1501290301209-7a0323622985?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    rating: 5,
    calculateScore: true,
  },
  // Image Rating Instance Two
  {
    name: 'Image Rating instance two',
    image_name: 'Near Brodick, Isle Of Arran, Scotland, 1849-1851 by William Andrews Nesfield',
    address:
      'https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1568&q=80',
    rating: 10,
    calculateScore: true,
  },
  // Image Rating Instance Three
  {
    name: 'Image Rating instance three',
    image_name: 'Autumn.',
    address:
      'https://images.unsplash.com/photo-1579783483346-b4b3f315096b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=758&q=80',
    rating: 3,
    calculateScore: true,
  },
];
