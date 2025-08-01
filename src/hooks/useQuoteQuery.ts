import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import createQuoteWithID from '../utils/createQuoteWithID';

export const useQuoteQuery = (url: string) => {
  return useQuery({
    queryKey: ['quote', url],
    queryFn: async () => {
      const res = await axios.get(url);
      const newData = createQuoteWithID(res.data, 'API');

      const savedData = JSON.parse(localStorage.getItem('quotes') || '{}');

      if (newData.quote) {
        savedData.lastRandomQuote = newData;
        if (!savedData.allQuotes) savedData.allQuotes = [];
        savedData.allQuotes.push(newData);
      }

      localStorage.setItem('quotes', JSON.stringify(savedData));

      return newData;
    },
    enabled: false,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
