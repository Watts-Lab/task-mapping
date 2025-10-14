import {showPracticeStage} from '../gameConfiguration';

// Task Configuration Instances
export const TASK_CONFIG = [
  // Advertisement Instance Zero - Practice Round
  {
    name: 'Advertisement Writing instance zero',
    calculateScore: !showPracticeStage,
    product_name: 'Que',
    description: 'a convertible totepack made of recyclable plastic',
    address:
      'https://www.kickstarter.com/projects/getque/que-the-everywhere-convertible-totepack?ref=discovery_staff_picks',
    img_address: 'advertisements/totepack.html',
  },
  {
    name: 'Advertisement Writing instance one',
    calculateScore: true,
    product_name: 'Prepd Chef Skillet',
    description: 'a lighter, smoother, non-stick cast iron skillet',
    address:
      'https://www.kickstarter.com/projects/prepd/chef-skillet?ref=discovery_staff_picks_category',
    img_address: 'advertisements/skillet.html',
  },
  {
    name: 'Advertisement Writing instance two',
    calculateScore: true,
    product_name: 'Bird Buddy',
    description: 'a smart bird feeder with an AI-powered camera',
    address:
      'https://www.kickstarter.com/projects/mybirdbuddy/bird-buddy-a-smart-bird-feeder?ref=discovery_staff_picks_category',
    img_address: 'advertisements/bird-buddy.html',
  },
  {
    name: 'Advertisement Writing instance three',
    calculateScore: true,
    product_name: 'Uniek',
    description: 'a portable pottery wheel machine set',
    address:
      'https://www.kickstarter.com/projects/uniek-pottery-studio/uniek-your-portable-pottery-studio-0?ref=discovery_staff_picks_category',
    img_address: 'advertisements/pottery-studio.html',
  },
];
