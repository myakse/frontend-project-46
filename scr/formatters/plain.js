import _ from 'lodash';

const stringFormat = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (diff, path = '') => {
  const result = diff
    .filter((elem) => elem.type && elem.type !== 'unchanged')
    .map((elem) => {
      const iter = path === '' ? `${elem.key}` : `${path}.${elem.key}`;
      switch (elem.type) {
        case 'added':
          return `Property '${iter}' was added with value: ${stringFormat(elem.value)}`;
        case 'deleted':
          return `Property '${iter}' was removed`;
        case 'changed':
          return `Property '${iter}' was updated. From ${stringFormat(elem.value1)} to ${stringFormat(elem.value)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return plain(elem.children, iter);
        default:
          throw new Error(`This ${elem.type} is not supported`);
      }
    });

  return result.join('\n');
};

export default plain;
