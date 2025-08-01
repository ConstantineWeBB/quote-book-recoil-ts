import { atom } from 'recoil';

export const authorFilterState = atom<string>({
  key: 'authorFilterState',
  default: '',
});

export const quoteFilterState = atom<string>({
  key: 'quoteFilterState',
  default: '',
});

export const onlyFavoriteFilterState = atom<boolean>({
  key: 'onlyFavoriteFilterState',
  default: false,
});
