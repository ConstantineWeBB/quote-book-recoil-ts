import { v4 as uuidv4 } from 'uuid';
import { QuoteInput, Quote } from '../types/Quote';

const createQuoteWithID = (
  quote: QuoteInput,
  source: Quote['source']
): Quote => {
  return {
    ...quote,
    id: uuidv4(),
    isFavorite: false,
    source,
  };
};

export default createQuoteWithID;
