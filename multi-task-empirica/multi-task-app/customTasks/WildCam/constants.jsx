import {showPracticeStage} from '../gameConfiguration';

const animals = [
  {
    name: 'Aardvark',
    image_path: 'wildcam/aardvark-circle.png',
    image_path: 'wildcam/aardvark-circle.png',
    color: ['Red', 'Brown', 'Gray'],
    body: ['Other', 'Weasel'],
    horn: [],
  },
  {
    name: 'Baboon',
    image_path: 'wildcam/baboon-circle.png',
    color: ['Tan', 'Brown', 'Gray'],
    body: ['Other', 'Cat/Dog', 'Primate'],
    horn: [],
  },
  {
    name: 'Buffalo',
    image_path: 'wildcam/buffalo-circle.png',
    color: ['Red', 'Brown', 'Gray'],
    body: ['Cow/Horse'],
    horn: ['Curved', 'U-Shaped'],
  },
  {
    name: 'Bushbuck',
    image_path: 'wildcam/bushbuck-circle.png',
    color: ['Tan', 'Red', 'Brown', 'White'],
    body: ['Antelope/Deer'],
    horn: ['Straight', 'Spiral'],
  },
  {
    name: 'Bushpig',
    image_path: 'wildcam/bushpig-circle.png',
    color: ['Red', 'Brown'],
    body: ['Other'],
    horn: [],
  },
  {
    name: 'Caracal',
    image_path: 'wildcam/caracal-circle.png',
    color: ['Tan', 'Red', 'Brown', 'White'],
    body: ['Cat/Dog'],
    horn: [],
  },
  {
    name: 'Civet',
    image_path: 'wildcam/civet-circle.png',
    color: ['Tan', 'Brown', 'White', 'Gray'],
    body: ['Cat/Dog', 'Weasel'],
    horn: [],
  },
  {
    name: 'Crane',
    image_path: 'wildcam/crane-circle.png',
    color: ['Tan', 'White', 'Gray'],
    body: ['Bird'],
    horn: [],
  },
  {
    name: 'Eland',
    image_path: 'wildcam/eland-circle.png',
    color: ['Tan', 'Red', 'Brown', 'White', 'Gray'],
    body: ['Cow/Horse', 'Antelope/Deer'],
    horn: ['Straight', 'Spiral'],
  },
  {
    name: 'Elephant',
    image_path: 'wildcam/elephant-circle.png',
    color: ['Gray'],
    body: ['Other', 'Cow/Horse'],
    horn: [],
  },
  {
    name: 'Genet',
    image_path: 'wildcam/genet-circle.png',
    color: ['Brown', 'Gray'],
    body: ['Cat/Dog', 'Weasel'],
    horn: [],
  },
  {
    name: 'Hare',
    image_path: 'wildcam/hare-circle.png',
    color: ['Tan', 'Brown', 'White', 'Gray'],
    body: ['Other'],
    horn: [],
  },
  {
    name: 'Hartebeest',
    image_path: 'wildcam/hartebeest-circle.png',
    color: ['Tan', 'Red', 'Brown'],
    body: ['Cow/Horse', 'Antelope/Deer'],
    horn: ['Curved', 'Spiral'],
  },
  {
    name: 'Hippopotamus',
    image_path: 'wildcam/hippopotamus-circle.png',
    color: ['Red', 'Brown', 'Gray'],
    body: ['Other', 'Cow/Horse'],
    horn: [],
  },
  {
    name: 'Honey Badger',
    image_path: 'wildcam/honey-badger-circle.png',
    color: ['White', 'Gray'],
    body: ['Cat/Dog', 'Weasel'],
    horn: [],
  },
  {
    name: 'Hornbill',
    image_path: 'wildcam/hornbill-circle.png',
    color: ['Red', 'White'],
    body: ['Bird'],
    horn: [],
  },
  {
    name: 'Hyena',
    image_path: 'wildcam/hyena-circle.png',
    color: ['Tan', 'Brown'],
    body: ['Cat/Dog'],
    horn: [],
  },
  {
    name: 'Impala',
    image_path: 'wildcam/impala-circle.png',
    color: ['Tan', 'Red', 'Brown', 'White'],
    body: ['Antelope/Deer'],
    horn: ['Curved', 'Straight', 'Spiral'],
  },
  {
    name: 'Jackal',
    image_path: 'wildcam/jackal-circle.png',
    color: ['Tan', 'Red', 'Brown', 'White', 'Gray'],
    body: ['Cat/Dog'],
    horn: [],
  },
  {
    name: 'Kudu',
    image_path: 'wildcam/kudu-circle.png',
    color: ['Tan', 'Red', 'Brown', 'White', 'Gray'],
    body: ['Cow/Horse', 'Antelope/Deer'],
    horn: ['Curved', 'Spiral'],
  },
  {
    name: 'Leopard',
    image_path: 'wildcam/leopard-circle.png',
    color: ['Tan', 'Gray'],
    body: ['Cat/Dog'],
    horn: [],
  },
  {
    name: 'Lion',
    image_path: 'wildcam/lion-circle.png',
    color: ['Tan', 'Red', 'Brown', 'Gray'],
    body: ['Cat/Dog'],
    horn: [],
  },
  {
    name: 'Mongoose',
    image_path: 'wildcam/mongoose-circle.png',
    color: ['Red', 'Brown', 'Gray'],
    body: ['Cat/Dog', 'Weasel'],
    horn: [],
  },
  {
    name: 'Nyala',
    image_path: 'wildcam/nyala-circle.png',
    color: ['Red', 'Brown', 'Gray'],
    body: ['Cow/Horse', 'Antelope/Deer'],
    horn: ['Curved', 'Spiral'],
  },
  {
    name: 'Oribi',
    image_path: 'wildcam/oribi-circle.png',
    color: ['Tan', 'Red', 'Brown', 'White'],
    body: ['Antelope/Deer'],
    horn: ['Straight'],
  },
  {
    name: 'Otter',
    image_path: 'wildcam/otter-circle.png',
    color: ['Gray', 'Black'],
    body: ['Cat/Dog', 'Weasel'],
    horn: [],
  },
  {
    name: 'Pangolin',
    image_path: 'wildcam/pangolin-circle.png',
    color: ['Red', 'Brown', 'Gray'],
    body: [],
    horn: [],
  },
  {
    name: 'Porcupine',
    image_path: 'wildcam/porcupine-circle.png',
    color: ['Brown', 'White', 'Black'],
    body: [],
    horn: [],
  },
  {
    name: 'Reedbuck',
    image_path: 'wildcam/reedbuck-circle.png',
    color: ['Red', 'Brown'],
    body: ['Antelope/Deer'],
    horn: ['Curved', 'Straight'],
  },
  {
    name: 'Sable Antelope',
    image_path: 'wildcam/sable-circle.png',
    color: ['Red', 'Brown', 'Black'],
    body: ['Cow/Horse'],
    horn: ['Curved'],
  },
  {
    name: 'Samango Monkey',
    image_path: 'wildcam/samango-circle.png',
    color: ['Brown', 'White', 'Gray', 'Black'],
    body: ['Other', 'Primate'],
    horn: [],
  },
  {
    name: 'Secretary Bird',
    image_path: 'wildcam/secretarybird-circle.png',
    color: ['Tan', 'Red', 'White', 'Gray', 'Black'],
    body: ['Bird'],
    horn: [],
  },
  {
    name: 'Serval',
    image_path: 'wildcam/serval-circle.png',
    color: ['Tan', 'Red', 'Brown', 'Black'],
    body: ['Cat/Dog'],
    horn: [],
  },
  {
    name: 'Vervet Monkey',
    image_path: 'wildcam/vervet-circle.png',
    color: ['Brown', 'Gray', 'Black'],
    body: ['Other', 'Primate'],
    horn: [],
  },
  {
    name: 'Vulture',
    image_path: 'wildcam/vulture-circle.png',
    color: ['Tan', 'Red', 'Brown', 'White', 'Gray', 'Black'],
    body: ['Bird'],
    horn: [],
  },
  {
    name: 'Warthog',
    image_path: 'wildcam/warthog-circle.png',
    color: ['Red', 'Brown', 'Gray', 'Black'],
    body: ['Other'],
    horn: [],
  },
  {
    name: 'Waterbuck',
    image_path: 'wildcam/waterbuck-circle.png',
    color: ['Brown', 'Gray'],
    body: ['Cow/Horse', 'Antelope/Deer'],
    horn: ['Curved', 'Straight'],
  },
  {
    name: 'Weasel',
    image_path: 'wildcam/weasel-circle.png',
    color: ['Brown', 'Gray'],
    body: ['Weasel'],
    horn: [],
  },
  {
    name: 'Wild Dog',
    image_path: 'wildcam/wild-dog-circle.png',
    color: ['Tan', 'Brown', 'White', 'Black'],
    body: ['Cat/Dog'],
    horn: [],
  },
  {
    name: 'Wildcat',
    image_path: 'wildcam/wildcat-circle.png',
    color: ['Tan', 'Red', 'Brown', 'Gray', 'Black'],
    body: ['Cat/Dog'],
    horn: [],
  },
  {
    name: 'Wildebeest',
    image_path: 'wildcam/wildebeest-circle.png',
    color: ['Red', 'Brown', 'Gray', 'Black'],
    body: ['Cow/Horse', 'Antelope/Deer'],
    horn: ['Curved', 'U-Shaped', 'Spiral'],
  },
  {
    name: 'Zebra',
    image_path: 'wildcam/zebra-circle.png',
    color: ['White', 'Black'],
    body: ['Cow/Horse'],
    horn: [],
  },
];

const questions = [
  {
    name: 'animal',
    text: 'What is the species of animal?',
    answers: animals,
  },
  {
    name: 'number',
    text: 'How many?',
    answers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11-50', '51+'],
  },
  {
    name: 'behavior',
    text: 'What is the primary behavior you see?',
    answers: ['Resting', 'Standing', 'Moving', 'Eating', 'Interacting'],
  },
  {
    name: 'young',
    text: 'Are there any young present?',
    answers: ['Yes', 'No'],
  },
];
// Task Configuration Instances
export const TASK_CONFIG = [
  // Wildcam Instance Zero
  {
    name: 'Wildcam instance zero',
    calculateScore: false,
    animals: animals,
    questions: questions,
    stimulus: [
      {
        image: 'img/elephant-trailcam-2.JPG',
        answer: {
          animal: 'Elephant',
          number: '1',
          behavior: 'Moving',
          young: 'No',
        },
      },
    ],
  },
  // {
  //   name: "Wildcam instance zero",
  //   image_name: "The last night of a two week stay on the North Shore of Oahu, Hawaii.",
  //   address: ["img/elephant-trailcam-2.JPG"],
  //   rating: 7,
  //   calculateScore: !showPracticeStage
  // },
  // Wildcam Instance One
  {
    name: 'Wildcam instance one',
    calculateScore: true,
    animals: animals,
    questions: questions,
    stimulus: [
      {
        image: 'img/lion-trailcam-1.jpg',
        answer: {
          animal: 'Lion',
          number: '1',
          behavior: 'Standing',
          young: 'No',
        },
      },
      {
        image: 'img/baboon-trailcam-1.JPG',
        answer: {
          animal: 'Baboon',
          number: '2',
          behavior: 'Moving',
          young: 'No',
        },
      },
      {
        image: 'img/buffalo-trailcam-1.JPG',
        answer: {
          animal: 'Buffalo',
          number: '1',
          behavior: 'Moving',
          young: 'No',
        },
      },
      {
        image: 'img/hornbill-trailcam-1.JPG',
        answer: {
          animal: 'Ground Hornbill',
          number: '1',
          behavior: 'Moving',
          young: 'No',
        },
      },
      {
        image: 'img/wild-dog-trailcam-1.JPG',
        answer: {
          animal: 'Wild Dog',
          number: '5',
          behavior: 'Standing',
          young: 'No',
        },
      },
    ],
  },
  // Wildcam Instance Two
  {
    name: 'Wildcam instance two',
    calculateScore: true,
    animals: animals,
    questions: questions,
    stimulus: [
      {
        image: 'img/hyena-trailcam-2.jpg',
        answer: {
          animal: 'Hyena',
          number: '2',
          behavior: 'Resting',
          young: 'No',
        },
      },
      {
        image: 'img/elephant-trailcam-3.JPG',
        answer: {
          animal: 'Elephant',
          number: '2',
          behavior: 'Moving',
          young: 'Yes',
        },
      },
      {
        image: 'img/vulture-trailcam-1.jpg',
        answer: {
          animal: 'Vulture',
          number: '11-50',
          behavior: 'Interacting',
          young: 'Yes',
        },
      },
      {
        image: 'img/warthog-trailcam-2.JPG',
        answer: {
          animal: 'Warthog',
          number: '4',
          behavior: 'Moving',
          young: 'Yes',
        },
      },
      {
        image: 'img/baboon-trailcam-2.JPG',
        answer: {
          animal: 'Baboon',
          number: '2',
          behavior: 'Interacting',
          young: 'No',
        },
      },
    ],
  },
  // Wildcam Instance Three
  {
    name: 'Wildcam instance three',
    calculateScore: true,
    animals: animals,
    questions: questions,
    stimulus: [
      {
        image: 'img/wildcat-trailcam-1.jpg',
        answer: {
          animal: 'Wildcat',
          number: '1',
          behavior: 'Standing',
          young: 'No',
        },
      },
      {
        image: 'img/hippo-trailcam-1.JPG',
        answer: {
          animal: 'Hippopotamus',
          number: '1',
          behavior: 'Moving',
          young: 'No',
        },
      },
      {
        image: 'img/mongoose-trailcam-3.JPG',
        answer: {
          animal: 'Mongoose',
          number: '2',
          behavior: 'Moving',
          young: 'No',
        },
      },
      {
        image: 'img/lion-trailcam-2.jpg',
        answer: {
          animal: 'Lion',
          number: '6',
          behavior: 'Moving',
          young: 'Yes',
        },
      },
      {
        image: 'img/hyena-trailcam-3.JPG',
        answer: {
          animal: 'Hyena',
          number: '1',
          behavior: 'Standing',
          young: 'No',
        },
      },
    ],
  },
];
