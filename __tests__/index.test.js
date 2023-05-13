import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../srс/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const extensions = ['json', 'yaml'];

test.each(extensions)('%s extensions ', (extention) => {
  const file1 = getFixturePath(`file1.${extention}`);
  const file2 = getFixturePath(`file2.${extention}`);

  expect(gendiff(file1, file2)).toEqual(readFile('resultStylish.txt'));
  expect(gendiff(file1, file2, 'stylish')).toEqual(readFile('resultStylish.txt'));
  expect(gendiff(file1, file2, 'plain')).toEqual(readFile('resultPlain.txt'));
  expect(gendiff(file1, file2, 'json')).toEqual(readFile('resultJson.txt'));
});
