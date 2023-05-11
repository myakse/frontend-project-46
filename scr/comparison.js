import _ from 'lodash';

const comparison = (file1, file2) => {
  const keys = _.union(_.keys(file1), _.keys(file2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    if (!_.has(file1, key)) {
      return { key, value: file2[key], type: 'added' };
    }
    if (!_.has(file2, key)) {
      return { key, value: file1[key], type: 'deleted' };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, children: comparison(file1[key], file2[key]), type: 'nested' };
    }
    if (file1[key] !== file2[key]) {
      return {
        key, value1: file1[key], value: file2[key], type: 'changed',
      };
    }
    return { key, value: file2[key], type: 'unchanged' };
  });
  return result;
};

export default comparison;
