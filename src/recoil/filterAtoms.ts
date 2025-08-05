import { atom } from 'recoil';

export const authorFilterState = atom<string>({
  key: 'authorFilterState',
  default: '',
});

export const quoteFilterState = atom<string>({
  key: 'quoteFilterState',
  default: '',
});

export const onlyFavoriteState = atom<boolean>({
  key: 'onlyFavoriteState',
  default: false,
});

