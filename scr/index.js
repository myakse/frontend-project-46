import { readFileSync } from 'fs';
import path from 'path';
import comparison from './comparison.js';
import parsers from './parsers.js';
import choosingFormaters from './formatters/index.js';

const getData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
const getTypeFile = (filepath) => path.extname(filepath);

const gendiff = (filepath1, filepath2, formatType) => {
  const parseFile1 = parsers(getData(filepath1), getTypeFile(filepath1));
  const parseFile2 = parsers(getData(filepath2), getTypeFile(filepath2));
  const genDiff = comparison(parseFile1, parseFile2);

  return choosingFormaters(genDiff, formatType);
};

export default gendiff;
