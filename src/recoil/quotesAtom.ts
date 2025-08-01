import { atom } from 'recoil';

export const quotesState = atom({
  key: 'quotesState',
  default: [],
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const saved = localStorage.getItem('quotes');
      if (saved) {
        try {
          const parsed = JSON.parse(saved)?.allQuotes;
          if (parsed) setSelf(parsed);
        } catch (err) {
          console.error('Failed to parse localStorage data', err);
        }
      }

      onSet((newValue) => {
        const existing = JSON.parse(localStorage.getItem('quotes') || '{}');
        existing.allQuotes = newValue;
        localStorage.setItem('quotes', JSON.stringify(existing));
      });
    },
  ],
});
