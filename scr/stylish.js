import _ from 'lodash';

const stringFormat = (value, depth, replacer = '    ') => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keyIndent = replacer.repeat(depth + 1);
  const bracketIndent = replacer.repeat(depth);
  const lines = Object.entries(value)
    .map(([key, val]) => `${keyIndent}${key}: ${stringFormat(val, depth + 1)}`);
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (arr) => {
  const indent = (depth, char = ' ') => char.repeat(depth * 4 - 2);
  const iter = (node, depth = 1) => {
    const bracketIndent = ' '.repeat(depth * 4 - 4);
    const diff = node.map((elem) => {
      switch (elem.type) {
        case 'nested':
          return `${indent(depth)}  ${elem.key}: ${iter(elem.children, depth + 1)}`;
        case 'unchanged':
          return `${indent(depth)}  ${elem.key}: ${stringFormat(elem.value, depth)}`;
        case 'added':
          return `${indent(depth)}+ ${elem.key}: ${stringFormat(elem.value, depth)}`;
        case 'deleted':
          return `${indent(depth)}- ${elem.key}: ${stringFormat(elem.value, depth)}`;
        case 'changed':
          return `${indent(depth)}- ${elem.key}: ${stringFormat(elem.value1, depth)}\n${indent(depth)}+ ${elem.key}: ${stringFormat(elem.value, depth)}`;
        default:
          throw new Error(`This ${elem.type} is not supported`);
      }
    });
    return `{\n${diff.join('\n')}\n${bracketIndent}}`;
  };
  return iter(arr);
};

export default stylish;
