import { atom } from 'recoil';

export const errorState = atom<string | null>({
  key: 'errorState',
  default: null,
});
