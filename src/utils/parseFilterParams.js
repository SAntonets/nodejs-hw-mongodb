const parseType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isType = (type) => ['work', 'home', 'personal'].includes(type);

    if (isType(type)) return type;
  };

const parseIsFavourite = (isFavourite) => {
    return isFavourite;
  };



  export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = parseType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    console.log({ parsedType, parsedIsFavourite });

    return {
      type: parsedType,
      isFavourite: parsedIsFavourite,
    };
  };
