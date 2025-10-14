import taskWhiteList from '../customTasks/taskWhiteList';
import {devTask} from '../dev';

taskWhiteList();

// Game Config will list the tasks that will be included in the game and the instance configuration that will be referenced
export let GameConfiguration = [
  // {
  //   task_class: 'Typing',
  //   humanize: 'Typing',
  //   practice_stage: 0,
  //   instances: [1,2,3],
  //   intro: true,
  //   outro: false,
  //   duration: 180,
  // },
  // {
  //   task_class: 'UnscrambleWords',
  //   practice_stage: 0,
  //   humanize: 'Unscramble Words',
  //   instances: [1,2,3],
  //   intro: true,
  //   outro: false,
  //   duration: 120,
  // },
  // {
  //   task_class: "RandomDotMotion",
  //   humanize: "Random Dot Motion",
  //   practice_stage: 0,
  //   instances: [1,2,3],
  //   intro: true,
  //   outro: false,
  //   duration: 60,
  // },
  // {
  //   task_class: 'LogicProblem',
  //   humanize: 'Logic Problem',
  //   practice_stage: 0,
  //   instances: [1,2,3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  // },
  // {
  //   task_class: 'RecallWordLists',
  //   humanize: 'Recall Word Lists',
  //   practice_stage: 0,
  //   instances: [1,2,3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  // },
  {
    task_class: 'WildCam',
    humanize: 'WildCam',
    practice_stage: 0,
    instances: [1, 2, 3],
    intro: true,
    outro: false,
    duration: 60,
  },
  {
    task_class: 'RecallAssociation',
    practice_stage: 0,
    humanize: 'Recall Association',
    instances: [1, 2, 3],
    intro: true,
    outro: false,
    duration: 300,
  },
  {
    task_class: 'AdvertisementWriting',
    humanize: 'Advertisement Writing',
    practice_stage: 0,
    instances: [1, 2, 3],
    intro: true,
    outro: false,
    duration: 300,
  },
  {
    task_class: 'WildcatWells',
    humanize: 'Wildcat Wells',
    practice_stage: 0,
    instances: [1, 2, 3],
    intro: true,
    outro: false,
    duration: 105,
  },
  {
    task_class: 'PuttingFoodIntoCategories',
    humanize: 'Putting Food Into Categories',
    practice_stage: 0,
    instances: [1, 2, 3],
    intro: true,
    outro: false,
    duration: 120,
  },
  // {
  //   task_class: 'Sudoku',
  //   humanize: 'Sudoku',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  // },
  // {
  //   task_class: 'GuessTheCorrelation',
  //   humanize: 'Guess the Correlation',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 120,
  // },
  // {
  //   task_class: 'MoralReasoning',
  //   humanize: 'Moral Reasoning',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  // },
  // {
  //   task_class: 'AllocatingResources',
  //   humanize: 'Allocating Resources',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 180,
  // },
  // {
  //   task_class: 'WhacAMole',
  //   humanize: 'Whac a Mole',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 120,
  // },
  // {
  //   task_class: 'RoomAssignment',
  //   humanize: 'Room Assignment',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  // },
  // {
  //   task_class: 'DivergentAssociationTask',
  //   humanize: 'Divergent Association',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 180,
  // },
  // {
  //   task_class: 'WordConstruction',
  //   humanize: 'Word Construction',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 180,
  // },
  // {
  //   task_class: 'WolfGoatCabbage',
  //   humanize: 'Wolf Goat Cabbage',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  // },
  // {
  //   task_class: 'WritingStory',
  //   practice_stage: 0,
  //   humanize: 'Writing Story',
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  //   // https://doi.org/10.1037/0022-3514.49.2.395 (why we made the time duraton 10 minutes)
  // },
  // {
  //   task_class: 'PuttingFoodIntoCategories',
  //   humanize: 'Putting Food Into Categories',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  // },
  // {
  //   task_class: 'GuessTheCorrelation',
  //   humanize: 'Guess the Correlation',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 120,
  // },
  // {
  //   task_class: 'MoralReasoning',
  //   humanize: 'Moral Reasoning',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  // },
  // {
  //   task_class: 'AllocatingResources',
  //   humanize: 'Allocating Resources',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 180,
  // },
  // {
  //   task_class: 'WhacAMole',
  //   humanize: 'Whac a Mole',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 120,
  // },
  // {
  //   task_class: 'RoomAssignment',
  //   humanize: 'Room Assignment',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  // },
  // {
  //   task_class: 'DivergentAssociationTask',
  //   humanize: 'Divergent Association',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 180,
  // },
  // {
  //   task_class: 'WordConstruction',
  //   humanize: 'Word Construction',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 180,
  // },
  // {
  //   task_class: 'WolfGoatCabbage',
  //   humanize: 'Wolf Goat Cabbage',
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  // },
  // {
  //   task_class: 'WritingStory',
  //   practice_stage: 0,
  //   humanize: 'Writing Story',
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 300,
  //   // https://doi.org/10.1037/0022-3514.49.2.395 (why we made the time duraton 10 minutes)
  // },
  // {
  //   task_class: 'NineDots',
  //   humanize: 'Nine Dots',
  //   practice_stage: 0,
  //   instances: [1],
  //   intro: true,
  //   outro: false,
  //   duration: 60,
  // },
  //   {
  //     task_class: "MiniBusiness",
  //     humanize: "Mini Business",
  //     instances: [0, 1, 2, 3],
  //     intro: true,
  //     outro: false,
  //     // values set for max 5 minutes
  //     duration: 180,
  //   },
  //   {
  //     task_class: "ObjectBasedReasoning",
  //     humanize: "Object Based Reasoning",
  //     instances: [0, 1, 2, 3],
  //     intro: true,
  //     outro: false,
  //     duration: 300,
  //   },
  // {
  //   task_class: "EuclideanTravelingSalesperson",
  //   humanize: "Euclidean Traveling Salesperson",
  //   instances: [0, 1, 2],
  //   intro: true,
  //   outro: false,
  //   duration: 120,
  // },

  // {
  //   task_class: "ImageRating",
  //   humanize: "Image Rating",
  //   practice_stage: 0,
  //   instances: [1, 2, 3],
  //   intro: true,
  //   outro: false,
  //   duration: 60,
  // },

  // {
  //   task_class: "AbstractGrid",
  //   humanize: "Abstract Grid",
  //   instances: [0, 1, 2],
  //   intro: true,
  //   outro: false,
  //   duration: 180,
  // }
];

if (devTask) {
  GameConfiguration = GameConfiguration.filter(conf => conf.task_class.toLowerCase() === devTask);
}
export const payPerHour = 15;

export const TaskCallBacks = {};
export const TaskConfigs = {};

// in seconds
export const idleTimeNoActivity = 120;
export const warningTime = 30;
export const idleTimeDifferentTab = 60;

export const offlineKickout = 30;

// true: shows practice stage (first stage in config is automatically the practice stage)
// false: no practice stage (first stage in game config becomes a real stage)
export const showPracticeStage = true;
export const showQuiz = true;

// duration in seconds
export const practiceStageDuration = 60;

const load = async task => {
  const {OnStageStart, OnStageEnd, OnRoundStart, OnRoundEnd} = await import(
    `../customTasks/${task.task_class}/callbacks`
  );
  const {TASK_CONFIG} = await import(`../customTasks/${task.task_class}/constants`);
  TaskCallBacks[task.task_class] = {
    OnStageStart: OnStageStart,
    OnStageEnd: OnStageEnd,
    OnRoundStart: OnRoundStart,
    OnRoundEnd: OnRoundEnd,
  };
  TaskConfigs[task.task_class] = TASK_CONFIG;
};

const meteorWrapPromiseFunction = fn => {
  return Meteor.wrapAsync((...args) => {
    const callback = args.pop();
    fn(...args)
      .then((...result) => {
        callback(null, ...result);
      })
      .catch(err => {
        callback(err);
      });
  });
};

const fnFiber = (...args) => {
  return meteorWrapPromiseFunction(load)(...args);
};

GameConfiguration.forEach(task => {
  fnFiber(task);
});
