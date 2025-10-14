import {showPracticeStage} from '../gameConfiguration';

export const TASK_CONFIG = [
  // Word Construction Instance ZERO
  {
    name: 'Word Construction instance zero',
    calculateScore: !showPracticeStage,
    characters: 'P, E, A, K',
    //characters: "E, A, K, B, P, R, N, M, W",
    possible_trie: require('./wci0Trie.json')['root'],
    max_score: require('./wci0Trie.json')['count'],
  },
  // Word Construction Instance ONE
  {
    name: 'Word Construction instance one',
    calculateScore: true,
    characters: 'D, B, A, U, P, R, J, X, S',
    possible_trie: require('./wci1Trie.json')['root'],
    max_score: require('./wci1Trie.json')['count'],
  },
  // Word Construction Instance TWO
  {
    name: 'Word Construction instance two',
    calculateScore: true,
    characters: 'A, F, H, B, E, J, N, K, D',
    possible_trie: require('./wci2Trie.json')['root'],
    max_score: require('./wci2Trie.json')['count'],
  },
  // Word Construction Instance THREE
  {
    name: 'Word Construction instance three',
    calculateScore: true,
    characters: 'W, I, M, O, T, Y, Z, K, H',
    possible_trie: require('./wci3Trie.json')['root'],
    max_score: require('./wci3Trie.json')['count'],
  },
];
