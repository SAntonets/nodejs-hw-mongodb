
const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseBoolean = (value) => {
  if (typeof value === 'boolean') {
    return value;
  } else if (typeof value === 'string') {
    const lowercaseValue = value.toLowerCase();
    if (lowercaseValue === 'true') {
      return true;
    } else if (lowercaseValue === 'false') {
      return false;
    }
  }
};


export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
