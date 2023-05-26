import { readFileSync } from 'fs';
import path from 'path';
import comparison from './comparison.js';
import parsers from './parsers.js';
import choosingFormatters from './formatters/index.js';

const getData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), 'utf8');

const gendiff = (filepath1, filepath2, formatType) => {
  const getFileType1 = path.extname(filepath1);
  const getFileType2 = path.extname(filepath2);
  const parseFile1 = parsers(getData(filepath1), getFileType1);
  const parseFile2 = parsers(getData(filepath2), getFileType2);
  const genDiff = comparison(parseFile1, parseFile2);

  return choosingFormatters(genDiff, formatType);
};

export default gendiff;
