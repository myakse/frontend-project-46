import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const choosingFormatters = (diff, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error(`Format ${format} is not supported`);
  }
};

export default choosingFormatters;
