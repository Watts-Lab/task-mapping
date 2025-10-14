import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // Putting Food Into Categories Instance Zero
  {
    name: 'Putting Food Into Categories instance zero',
    list_name: 'Berry List',
    list: [
      {name: 'Strawberry'},
      {name: 'Blueberry'},
      {name: 'Raspberry'},
      {name: 'Blackberry'},
      {name: 'Cranberry'},
    ],
    calculateScore: !showPracticeStage,
  },
  // Putting Food Into Categories Instance One
  {
    name: 'Putting Food Into Categories instance one',
    list_name: 'Fruit List',
    list: [
      {name: 'Apple'},
      {name: 'Orange'},
      {name: 'Pear'},
      {name: 'Mango'},
      {name: 'Pineapple'},
      {name: 'Peach'},
      {name: 'Plum'},
      {name: 'Lemon'},
      {name: 'Grapes'},
      {name: 'Watermelon'},
      {name: 'Guava'},
      {name: 'Cantaloupe'},
    ],
    calculateScore: true,
  },
  // Putting Food Into Categories Instance Two
  {
    name: 'Putting Food Into Categories instance two',
    list_name: 'Vegetable List',
    list: [
      {name: 'Carrot'},
      {name: 'Celery'},
      {name: 'Potato'},
      {name: 'Lettuce'},
      {name: 'Cauliflower'},
      {name: 'Cucumber'},
      {name: 'Corn'},
      {name: 'Broccoli'},
      {name: 'Avocado'},
      {name: 'Onion'},
      {name: 'Peas'},
      {name: 'Mushroom'},
    ],
    calculateScore: true,
  },
  // Putting Food Into Categories Instance Three
  {
    name: 'Putting Food Into Categories instance three',
    list_name: 'Dessert List',
    list: [
      {name: 'Tiramisu'},
      {name: 'Macaron'},
      {name: 'Donut'},
      {name: 'Sorbet'},
      {name: 'Frozen yogurt'},
      {name: 'Pudding'},
      {name: 'Cookie'},
      {name: 'Brownie'},
      {name: 'Cheesecake'},
      {name: 'Candy apple'},
      {name: 'Soufflé'},
      {name: 'Churro'},
    ],
    calculateScore: true,
  },
];
