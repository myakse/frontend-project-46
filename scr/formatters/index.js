import stylish from './stylish.js';
import plain from './plain.js';

const choosingFormaters = (diff, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`Format ${format} is not supported`);
  }
};

export default choosingFormaters;
