import { readFileSync } from 'fs';
import path from 'path';
import comparison from './comparison.js';
import parsers from './parsers.js';

const getData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
const getTypeFile = (filepath) => path.extname(filepath);

const gendiff = (filepath1, filepath2) => {
  const parseFile1 = parsers(getData(filepath1), getTypeFile(filepath1));
  const parseFile2 = parsers(getData(filepath2), getTypeFile(filepath2));

  return comparison(parseFile1, parseFile2);
};

export default gendiff;
