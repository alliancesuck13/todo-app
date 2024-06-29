import randomInteger from './randomInteger';

export default function generateUniqueID() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const chars = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'j',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const uniqueID = [];
  uniqueID.length = 0;

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < 5; index++) {
    const randomIndexForNumber = randomInteger(0, 8);
    const randomIndexForChar = randomInteger(0, 25);
    uniqueID.push(`${numbers[randomIndexForNumber]}${chars[randomIndexForChar]}`);
  }

  return uniqueID.join('');
}
