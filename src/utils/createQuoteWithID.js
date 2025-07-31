import { v4 as uuidv4 } from 'uuid';

const createQuoteWithID = (quote, source) => {
  return {
    ...quote,
    id: uuidv4(),
    source,
    isFavorite: false,
  };
};

export default createQuoteWithID;
