export const parseIsFavourite = (isFavourite) => {
  return { isFavourite: isFavourite === 'true' };
};

export const parseContactType = (contactType) => {
  return { type: contactType || undefined };
};

export const parseFilterParams = (isFavourite, contactType) => {
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    ...parsedIsFavourite,
    ...parsedContactType
  };
};

