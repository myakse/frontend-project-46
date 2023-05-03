import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../scr/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('cheсk json', () => {
  const expected = readFile('file_result.txt');
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toBe(expected);
});

test('check yml', () => {
  const expected = readFile('file_result.txt');
  const actual = gendiff(getFixturePath('filepath1.yml'), getFixturePath('filepath2.yml'));
  expect(actual).toBe(expected);
});
