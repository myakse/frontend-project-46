import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../scr/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylish = readFileSync(path.resolve(process.cwd(), '__fixtures__/resultStylish.txt'), 'utf-8');
const plain = readFileSync(path.resolve(process.cwd(), '__fixtures__/resultPlain.txt'), 'utf-8');
const json = readFileSync(path.resolve(process.cwd(), '__fixtures__/resultJson.txt'), 'utf-8');

const extensions = ['json', 'yaml'];

test.each(extensions)('%s extensions ', (extention) => {
  const file1 = getFixturePath(`file1.${extention}`);
  const file2 = getFixturePath(`file2.${extention}`);

  expect(gendiff(file1, file2)).toEqual(stylish);
  expect(gendiff(file1, file2, 'stylish')).toEqual(stylish);
  expect(gendiff(file1, file2, 'plain')).toEqual(plain);
  expect(gendiff(file1, file2, 'json')).toEqual(json);
});
