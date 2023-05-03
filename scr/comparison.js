import _ from 'lodash';

const comparison = (file1, file2) => {
  const keys = _.union(_.keys(file1), _.keys(file2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    if (!_.has(file1, key)) {
      return ` + ${key} : ${file2[key]}`;
    }
    if (!_.has(file2, key)) {
      return ` - ${key} : ${file1[key]}`;
    }
    if (file1[key] === file2[key]) {
      return `   ${key} : ${file1[key]}`;
    }
    if (file1[key] !== file2[key]) {
      return [` - ${key} : ${file1[key]}`,
        ` + ${key}: ${file2[key]}`];
    }
    return result;
  });
  return (`{\n ${result.flat().join('\n ')}\n}`);
};

export default comparison;
