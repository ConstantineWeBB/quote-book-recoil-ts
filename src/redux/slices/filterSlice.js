import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  author: '',
  quote: '',
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAuthorFilter: (state, action) => {
        state.author = action.payload
    },
    setQuoteFilter: (state, action) => {
        state.quote = action.payload
    },
    setOnlyFavoriteToggle: (state) => {
      state.onlyFavorite = !state.onlyFavorite;
    },
    resetFilter: () => {
      return initialState;
    },
  },
});

export const { setAuthorFilter, setQuoteFilter, setOnlyFavoriteToggle, resetFilter } =
  filterSlice.actions;
export const selectAuthorFilter = (state) => state.filter.author
export const selectQuoteFilter = (state) => state.filter.quote
export const selectOnlyFavoriteToggle = (state) => state.filter.onlyFavorite
export default filterSlice.reducer